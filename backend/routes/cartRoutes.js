const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// 1. GET CART: ચોક્કસ યુઝરનું કાર્ટ મેળવવા માટે
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
            res.json(cart);
        } else {
            res.json({ items: [] });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. ADD TO CART: કાર્ટમાં આઈટમ ઉમેરવા અથવા કવોન્ટિટી વધારવા માટે
// routes/cartroutes.js માં POST /add વાળો ભાગ આ રીતે બદલો
router.post('/add', async (req, res) => {
    const { userId, userEmail, productId, name, price, image, stock } = req.body; // stock અહીથી મેળવો

    try {
        let cart = await Cart.findOne({ userId });
        if (cart) {
            const itemIndex = cart.items.findIndex(p => p.productId == productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                // અહીં stock: stock ઉમેરો
                cart.items.push({ productId, name, price, image, stock, quantity: 1 });
            }
            cart = await cart.save();
            return res.status(201).json(cart);
        } else {
            const newCart = await Cart.create({
                userId,
                userEmail,
                items: [{ productId, name, price, image, stock, quantity: 1 }]
            });
            return res.status(201).json(newCart);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. UPDATE QUANTITY: + અથવા - બટન માટે
// router.put('/update', async (req, res) => {
//     const { userId, productId, change } = req.body; // change: 1 અથવા -1

//     try {
//         const cart = await Cart.findOne({ userId });
//         const itemIndex = cart.items.findIndex(p => p.productId == productId);

//         if (itemIndex > -1) {
//             cart.items[itemIndex].quantity += change;
            
//             // જો કવોન્ટિટી 1 થી ઓછી થાય તો આઈટમ કાઢી નાખો
//             if (cart.items[itemIndex].quantity <= 0) {
//                 cart.items.splice(itemIndex, 1);
//             }
            
//             await cart.save();
//             res.json(cart);
//         } else {
//             res.status(404).json({ message: "Item not found" });
//         }
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// 3. UPDATE QUANTITY: + અથવા - બટન માટે
router.put('/update', async (req, res) => {
    // અહીં 'change' ની જગ્યાએ 'amount' કરો કારણ કે તમે ફ્રન્ટએન્ડથી 'amount' મોકલો છો
    const { userId, productId, amount } = req.body; 

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId.toString());

        if (itemIndex > -1) {
            let item = cart.items[itemIndex];
            
            // નવી ક્વોન્ટિટી ચેક કરો
            const newQuantity = item.quantity + amount;

            // જો સ્ટોક કરતા વધી જાય તો એરર આપો
            if (amount > 0 && newQuantity > item.stock) {
                return res.status(400).json({ error: `Only ${item.stock} items available in stock` });
            }

            item.quantity = newQuantity;
            
            // જો ક્વોન્ટિટી 0 કે તેથી ઓછી થાય તો આઈટમ કાઢી નાખો
            if (item.quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            }
            
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: "Item not found in cart" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. REMOVE ITEM: 🗑️ બટન માટે
// router.post('/remove', async (req, res) => {
//     const { userId, productId } = req.body;
//     try {
//         let cart = await Cart.findOne({ userId });
//         cart.items = cart.items.filter(p => p.productId != productId);
//         await cart.save();
//         res.json(cart);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// 4. REMOVE ITEM: 🗑️ બટન માટે
router.post('/remove', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        // filter માં ખાતરી કરો કે ID બરાબર ચેક થાય છે
        cart.items = cart.items.filter(p => p.productId.toString() !== productId.toString());
        
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;