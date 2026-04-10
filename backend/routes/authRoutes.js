const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- REGISTER ---
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, image, gender, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ error: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, email, password: hashedPassword, image, gender, role
        });

        await newUser.save();
        res.status(201).json({ message: "VAULT_ACCOUNT_CREATED" });
    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// --- LOGIN ---
// router.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username });
        
//         if (!user) return res.status(401).json({ error: "User not found" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

//         const token = jwt.sign({ id: user._id, role: user.role }, "vault_secret", { expiresIn: '1d' });

//         res.json({ success: true, token, user });
//     } catch (err) {
//         res.status(500).json({ error: "Server Error" });
//     }
// });
// --- LOGIN ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body; // username ની જગ્યાએ email લો
        
        // ડેટાબેઝમાં email થી યુઝર શોધો
        const user = await User.findOne({ email }); 
        
        if (!user) return res.status(401).json({ error: "This email is not registered." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Incorrect password." });

        const token = jwt.sign({ id: user._id, role: user.role }, "vault_secret", { expiresIn: '1d' });

        res.json({ success: true, token, user });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});



// --- બધા યુઝર્સનું લિસ્ટ મેળવવા માટે (Admin User Page માટે) ---
router.get('/admin/users', async (req, res) => {
    try {
        // ડેટાબેઝમાંથી બધા યુઝર્સ શોધો (સિક્યુરિટી માટે પાસવર્ડ સિવાયનો ડેટા)
        const users = await User.find().select('-password'); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Error fetching users." });
    }
});


// --- યુઝરની ભૂમિકા (Role) બદલવા માટે ---

router.put('/admin/users/:id/role', async (req, res) => {
    try {
        const { role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { role }, 
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: "Error updating user role." });
    }
});

// --- યુઝરને ડિલીટ કરવા માટે ---
router.delete('/admin/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting user." });
    }
});

// --- RESET PASSWORD ---
router.post('/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // 1. ચેક કરો કે આ ઈમેલ વાળો યુઝર છે કે નહીં
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Email not registered." });
        }

        // 2. નવા પાસવર્ડને હેશ કરો
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 3. પાસવર્ડ અપડેટ કરો
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "PASSWORD_UPDATED_SUCCESSFULLY: You can now log in." });
    } catch (err) {
        res.status(500).json({ error: "Failed to update password." });
    }
});

// --- ૧. વિશલિસ્ટમાં આઈટમ ઉમેરવી અથવા કાઢવી (Toggle) ---
router.post('/wishlist/toggle', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ error: "User not found" });

        // String માં કન્વર્ટ કરીને ચેક કરો જેથી ભૂલ ના પડે
        const isPresent = user.wishlist.some(id => id.toString() === productId.toString());

        if (!isPresent) {
            user.wishlist.push(productId);
            await user.save();
            res.json({ message: "Added", wishlist: user.wishlist });
        } else {
            // ફિલ્ટર વાપરો જે વધારે ચોક્કસ છે
            user.wishlist = user.wishlist.filter(id => id.toString() !== productId.toString());
            await user.save();
            res.json({ message: "Removed", wishlist: user.wishlist });
        }
    } catch (err) {
        res.status(500).json({ error: "Wishlist update failed" });
    }
});

// --- ૨. યુઝરની પૂરી વિશલિસ્ટ વિગતો સાથે મેળવવી ---
router.get('/wishlist/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('wishlist');
        res.json(user.wishlist);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch wishlist" });
    }
});

module.exports = router;