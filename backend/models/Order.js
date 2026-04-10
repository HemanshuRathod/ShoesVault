// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     user_email: { type: String }, // આ લાઈન હોવી જોઈએ
//     items: [
//         {
//             productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // આ ઉમેરો
//             name: String,
//             price: Number,
//             quantity: Number,
//             img: String
//         }
//     ],
//     total_price: { type: Number, required: true },
//     status: { 
//         type: String, 
//         enum: ['PENDING', 'PACKING', 'SHIPPED', 'DELIVERED'], 
//         default: 'PENDING' 
//     },
//     payment_method: { type: String, default: 'Online Payment' },
//     created_at: { type: Date, default: Date.now }
// });



// module.exports = mongoose.model('Order', orderSchema);



// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     user_email: { type: String }, 
//     items: [
//         {
//             productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//             name: String,
//             price: Number,
//             quantity: Number,
//             img: String
//         }
//     ],
//     total_price: { type: Number, required: true },
    
//     // NEW FIELD: Added address to secure delivery
//     address: { type: String, required: true }, 

//     status: { 
//         type: String, 
//         // Updated enum to include CANCELLED for your MyOrders page logic
//         enum: ['PENDING', 'PACKING', 'SHIPPED', 'DELIVERED', 'CANCELLED'], 
//         default: 'PENDING' 
//     },
//     payment_method: { type: String, default: 'Cash on Delivery' },
//     created_at: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Order', orderSchema);

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // 1. Linked User with a Reference
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    
    // 2. Verified Email for communication
    user_email: { 
        type: String, 
        required: true,
        trim: true,
        lowercase: true 
    }, 

    // 3. Structured Items Array
    items: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', 
                required: true 
            },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 },
            img: { type: String } // Stores the shoe image URL
        }
    ],

    // 4. Financials
    total_price: { 
        type: Number, 
        required: true,
        min: 0 
    },
    
    // 5. Logistics (Address is Mandatory)
    address: { 
        type: String, 
        required: [true, "Shipping address is essential for delivery"] 
    }, 

    status: { 
        type: String, 
        enum: ['PENDING', 'PACKING', 'SHIPPED', 'DELIVERED', 'CANCELLED'], 
        default: 'PENDING',
        uppercase: true // Ensures consistency in the database
    },

    payment_method: { 
        type: String, 
        default: 'Cash on Delivery' 
    },

    // 6. Modern Timestamps
}, { 
    timestamps: true // Automatically creates 'createdAt' and 'updatedAt'
});

module.exports = mongoose.model('Order', orderSchema);