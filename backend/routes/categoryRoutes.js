const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// 1. GET ALL CATEGORIES - બધી કેટેગરીઝ મેળવવા માટે
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "કેટેગરીઝ લોડ કરવામાં ભૂલ આવી." });
    }
});

// 2. POST - NEW CATEGORY - નવી કેટેગરી ઉમેરવા માટે
router.post('/', async (req, res) => {
    try {
        // અહીં parentCategory ને પણ સ્વીકારો (Destructuring)
        const { name, description, parentCategory } = req.body; 
        
        const newCategory = new Category({
            name,
            // description,
            parentCategory: parentCategory || "None", // આ લાઈન ડેટાબેઝમાં મોકલશે
            status: "Active",
            count: 0
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(400).json({ error: "કેટેગરી સેવ કરવામાં ભૂલ આવી." });
    }
});

// 3. PUT - UPDATE CATEGORY - કેટેગરીમાં સુધારો કરવા માટે (Status બદલવા વગેરે)
router.put('/:id', async (req, res) => {
    try {
        // req.body આખું મોકલશો તો parentCategory પણ અપડેટ થઈ જશે
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ error: "અપડેટ નિષ્ફળ રહ્યું." });
    }
});

// 4. DELETE - REMOVE CATEGORY - કેટેગરી ડિલીટ કરવા માટે
router.delete('/:id', async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category successfully deleted from vault." });
    } catch (err) {
        res.status(500).json({ error: "ડિલીટ કરવામાં ભૂલ આવી." });
    }
});

module.exports = router;