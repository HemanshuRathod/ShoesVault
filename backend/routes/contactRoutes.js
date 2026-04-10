const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Contact Form સબમિટ કરવા માટે (URL: /api/contact)
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ error: "બધી વિગતો ભરવી ફરજિયાત છે." });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();
        
        res.status(200).json({ message: "Message received successfully!" });
    } catch (err) {
        res.status(500).json({ error: "સર્વર એરર: " + err.message });
    }
});

// એડમિન માટે મેસેજ જોવા
router.get('/admin/messages', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ created_at: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;