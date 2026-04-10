const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    gender: { type: String, enum: ['male', 'female'], default: 'male' },
    role: { type: String, default: 'USER' },
    // વિશલિસ્ટ ઉમેર્યું (પ્રોડક્ટ્સની આઈડી સ્ટોર થશે)
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], 
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);