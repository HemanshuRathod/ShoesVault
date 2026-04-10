const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// યુઝર જ્યારે શૂઝ વેચવા માટે મૂકે (CASH OUT)
router.post('/products/sell', async (req, res) => {
    try {
        const { name, price, image, userId } = req.body;
        const newProduct = new Product({
            name,
            price,
            image,
            sellerId: userId
        });
        await newProduct.save();
        res.status(201).json({ message: "Sneaker listed for review!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to list sneaker" });
    }
});

// બધા અપ્રૂવ થયેલા પ્રોડક્ટ્સ મેળવવા (Home/Men/Women Pages માટે)
router.get('/products', async (req, res) => {
    const products = await Product.find({ isApproved: true });
    res.json(products);
});

module.exports = router;