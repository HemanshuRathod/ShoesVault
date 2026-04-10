const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    // આ લાઇન ઉમેરવી ખૂબ જ જરૂરી છે
    parentCategory: { type: String, default: 'None' }, 
    stock: { type: Number, required: true },
    image: { type: String, default: 'https://via.placeholder.com/150' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);