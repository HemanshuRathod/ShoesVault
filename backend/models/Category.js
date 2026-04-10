const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    // description: String,
    // આ લાઇન હોવી જ જોઈએ, નહીંતર ડેટાબેઝમાં સેવ નહીં થાય
    parentCategory: { type: String, default: 'None' }, 
    status: { type: String, default: 'Active' },
    count: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);