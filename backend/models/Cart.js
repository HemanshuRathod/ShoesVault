const mongoose = require('mongoose');

// models/Cart.js માં આ મુજબ સુધારો
const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userEmail: { type: String },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: String,
            price: Number,
            image: String,
            stock: Number, // આ લાઇન ખાસ ઉમેરો
            quantity: { type: Number, default: 1 }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);