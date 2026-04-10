// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
// const User=require('../models/User')
// const Product = require('../models/Product');
// const Cart = require('../models/Cart'); 

// // ૧. ઓર્ડર પ્લેસ કરવા માટે (URL: /api/orders)
// router.post('/', async (req, res) => {
//     try {
//         const { user_id,user_email, total_price, items, payment_method } = req.body;

//         // ૧.૧ નવો ઓર્ડર ડેટાબેઝમાં બનાવો
//         const newOrder = new Order({
//             user_id,
//             user_email,
//             total_price,
//             items,
//             payment_method: payment_method || 'Online Payment'
//         });

//         const savedOrder = await newOrder.save();

//         // ૧.૨ દરેક પ્રોડક્ટનો સ્ટોક ડેટાબેઝમાં ઘટાડવા માટેનું લૂપ (તમારો નવો કોડ)
//         for (const item of items) {
//             if (item.productId) {
//                 // findByIdAndUpdate થી પ્રોડક્ટ શોધો અને $inc થી સ્ટોક બાદ કરો
//                 await Product.findByIdAndUpdate(
//                     item.productId,
//                     { $inc: { stock: -item.quantity } } 
//                 );
//             }
//         }
             
//         // ૧.૩ ઓર્ડર સફળ થયા પછી યુઝરનું કાર્ટ સાફ કરો
//         await Cart.findOneAndDelete({ userId: user_id });

//         res.status(201).json({ 
//             message: "Order placed successfully, stock updated and cart cleared!", 
//             id: savedOrder._id 
//         });
//     } catch (err) {
//         console.error("Order Error:", err);
//         res.status(500).json({ error: "Order failed: " + err.message });
//     }
// });

// // ૨. યુઝરના બધા ઓર્ડર મેળવવા
// // router.get('/user/:userId', async (req, res) => {
// //     try {
// //         const orders = await Order.find({ user_id: req.params.userId }).sort({ created_at: -1 });
// //         res.json({ orders });
// //     } catch (err) {
// //         res.status(500).json({ error: "Failed to fetch orders" });
// //     }
// // });

// // ordersroutes.js
// // ૨. યુઝરના ઓર્ડર મેળવવા (URL: /api/orders/user/:userId)
// router.get('/user/:userId', async (req, res) => {
//     try {
//         const uid = req.params.userId;
//         // અહીં find() ની અંદર 'user_id' લખવું જરૂરી છે જેથી ફિલ્ટર થાય
//         const orders = await Order.find({ user_id: uid }).sort({ created_at: -1 });
        
//         res.json({ orders });
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch orders" });
//     }
// });

// // ૩. સિંગલ ઓર્ડરની વિગત મેળવવા
// router.get('/details/:orderId', async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.orderId);
//         if (!order) return res.status(404).json({ error: "Order not found" });
//         res.json(order);
//     } catch (err) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// // ordersroutes.js માં આ નવો રૂટ ઉમેરો
// router.put('/:id/status', async (req, res) => {
//     try {
//         const { status } = req.body;
//         // enum મુજબ status અપડેટ કરો
//         const updatedOrder = await Order.findByIdAndUpdate(
//             req.params.id,
//             { status: status },
//             { new: true }
//         );
//         if (!updatedOrder) return res.status(404).json({ error: "Order not found" });
//         res.json(updatedOrder);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // એડમિન માટે બધા ઓર્ડર મેળવવાનો રૂટ (જો ના હોય તો)
// router.get('/admin/all', async (req, res) => {
//     try {
//         const orders = await Order.find().populate('user_id', 'username email').sort({ created_at: -1 });
//         res.json(orders);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });



// router.get('/admin/stats', async (req, res) => {
//     try {
//         const totalSalesData = await Order.aggregate([
//             { $group: { _id: null, total: { $sum: "$total_price" } } }
//         ]);
        
//         const totalSales = totalSalesData.length > 0 ? totalSalesData[0].total : 0;
//         const totalUsers = await User.countDocuments({ role: 'USER' });
//         const pendingOrders = await Order.countDocuments({ status: 'PENDING' });
//         const outOfStock = await Product.countDocuments({ stock: { $lte: 0 } });

//         res.json({
//             totalSales,
//             totalUsers,
//             pendingOrders,
//             outOfStock
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
// const User = require('../models/User');
// const Product = require('../models/Product');
// const Cart = require('../models/Cart'); 

// // ૧. ઓર્ડર પ્લેસ કરવા માટે (URL: /api/orders)
// router.post('/', async (req, res) => {
//     try {
//         // Added 'address' to the destructuring
//         const { user_id, user_email, total_price, items, payment_method, address } = req.body;

//         // Validation: Ensure address exists
//         if (!address) {
//             return res.status(400).json({ error: "Shipping address is required to secure your vault items." });
//         }

//         // ૧.૧ નવો ઓર્ડર ડેટાબેઝમાં બનાવો (Include address here)
//         const newOrder = new Order({
//             user_id,
//             user_email,
//             total_price,
//             items,
//             address, // Added this field
//             payment_method: payment_method || 'Cash on Delivery',
//             status: 'PENDING'
//         });

//         const savedOrder = await newOrder.save();

//         // ૧.૨ દરેક પ્રોડક્ટનો સ્ટોક ડેટાબેઝમાં ઘટાડવા માટેનું લૂપ
//         for (const item of items) {
//             if (item.productId) {
//                 await Product.findByIdAndUpdate(
//                     item.productId,
//                     { $inc: { stock: -item.quantity } } 
//                 );
//             }
//         }
             
//         // ૧.૩ ઓર્ડર સફળ થયા પછી યુઝરનું કાર્ટ સાફ કરો
//         await Cart.findOneAndDelete({ userId: user_id });

//         res.status(201).json({ 
//             message: "Order placed successfully! Stock updated and vault secured.", 
//             id: savedOrder._id 
//         });
//     } catch (err) {
//         console.error("Order Error:", err);
//         res.status(500).json({ error: "Order failed: " + err.message });
//     }
// });

// // ૨. યુઝરના ઓર્ડર મેળવવા (URL: /api/orders/user/:userId)
// router.get('/user/:userId', async (req, res) => {
//     try {
//         const uid = req.params.userId;
//         const orders = await Order.find({ user_id: uid }).sort({ created_at: -1 });
//         res.json({ orders });
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch orders" });
//     }
// });

// // ૩. સિંગલ ઓર્ડરની વિગત મેળવવા (Includes Address for Tracking Page)
// router.get('/details/:orderId', async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.orderId);
//         if (!order) return res.status(404).json({ error: "Order not found" });
//         res.json(order);
//     } catch (err) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// // ૪. ઓર્ડર સ્ટેટસ અપડેટ (For Admin or Cancellation)
// router.put('/:id/status', async (req, res) => {
//     try {
//         const { status } = req.body;
//         const updatedOrder = await Order.findByIdAndUpdate(
//             req.params.id,
//             { status: status },
//             { new: true }
//         );
//         if (!updatedOrder) return res.status(404).json({ error: "Order not found" });
//         res.json(updatedOrder);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // ૫. એડમિન માટે બધા ઓર્ડર મેળવવા
// router.get('/admin/all', async (req, res) => {
//     try {
//         const orders = await Order.find().populate('user_id', 'username email').sort({ created_at: -1 });
//         res.json(orders);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // ૬. એડમિન ડેશબોર્ડ સ્ટેટ્સ
// router.get('/admin/stats', async (req, res) => {
//     try {
//         const totalSalesData = await Order.aggregate([
//             { $match: { status: { $ne: "CANCELLED" } } }, // Don't count cancelled orders in sales
//             { $group: { _id: null, total: { $sum: "$total_price" } } }
//         ]);
        
//         const totalSales = totalSalesData.length > 0 ? totalSalesData[0].total : 0;
//         const totalUsers = await User.countDocuments({ role: 'USER' });
//         const pendingOrders = await Order.countDocuments({ status: 'PENDING' });
//         const outOfStock = await Product.countDocuments({ stock: { $lte: 0 } });

//         res.json({
//             totalSales,
//             totalUsers,
//             pendingOrders,
//             outOfStock
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

// 1. Place Order (URL: /api/orders)
router.post('/', async (req, res) => {
    try {
        const { user_id, user_email, total_price, items, payment_method, address } = req.body;

        // Validation
        if (!address) {
            return res.status(400).json({ error: "Shipping address is required to secure your vault items." });
        }

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Your vault is empty. Cannot place order." });
        }

        // 1.1 Create the Order
        const newOrder = new Order({
            user_id,
            user_email,
            total_price,
            items,
            address,
            payment_method: payment_method || 'Cash on Delivery',
            status: 'PENDING'
        });

        const savedOrder = await newOrder.save();

        // 1.2 Update stock for each product
        // Using Promise.all ensures all updates happen efficiently
        await Promise.all(items.map(item => {
            if (item.productId) {
                return Product.findByIdAndUpdate(
                    item.productId,
                    { $inc: { stock: -item.quantity } }
                );
            }
            return null;
        }));
             
        // 1.3 Clear User Cart
        await Cart.findOneAndDelete({ userId: user_id });

        res.status(201).json({ 
            message: "Order placed successfully! Stock updated and vault secured.", 
            id: savedOrder._id 
        });
    } catch (err) {
        console.error("Order Error:", err);
        res.status(500).json({ error: "Order failed: " + err.message });
    }
});

// 2. Get User Orders
router.get('/user/:userId', async (req, res) => {
    try {
        const uid = req.params.userId;
        const orders = await Order.find({ user_id: uid }).sort({ createdAt: -1 }); // Changed to createdAt
        res.json({ orders });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// 3. Get Single Order Details
router.get('/details/:orderId', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// 4. Update Order Status (FIXED DEPRECATION WARNING HERE)
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        // REPLACED { new: true } with { returnDocument: 'after' }
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { returnDocument: 'after' } 
        );

        if (!updatedOrder) return res.status(404).json({ error: "Order not found" });
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Admin: Get All Orders
router.get('/admin/all', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user_id', 'username email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Admin Dashboard Stats
router.get('/admin/stats', async (req, res) => {
    try {
        const totalSalesData = await Order.aggregate([
            { $match: { status: { $ne: "CANCELLED" } } }, 
            { $group: { _id: null, total: { $sum: "$total_price" } } }
        ]);
        
        const totalSales = totalSalesData.length > 0 ? totalSalesData[0].total : 0;
        const totalUsers = await User.countDocuments({ role: 'USER' });
        const pendingOrders = await Order.countDocuments({ status: 'PENDING' });
        const outOfStock = await Product.countDocuments({ stock: { $lte: 0 } });

        res.json({
            totalSales,
            totalUsers,
            pendingOrders,
            outOfStock
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;