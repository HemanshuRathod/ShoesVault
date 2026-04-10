const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    brand: { type: String, default: 'User Consigned' },
    category: { type: String, default: 'Lifestyle' },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // કોણે વેચવા મૂક્યું છે
    isApproved: { type: Boolean, default: false } // એડમિન અપ્રૂવ કરે પછી જ સાઈટ પર દેખાશે
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);