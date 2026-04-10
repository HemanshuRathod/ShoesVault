// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors()); // CORS એરર સોલ્વ કરવા માટે
// app.use(express.json());

// // MongoDB Connection
// // mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shoes')
// // mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://<db_username>:<db_password>@node.yvgp6x2.mongodb.net/?appName=NODE')


// //     .then(() => console.log("MongoDB Connected Successfully"))
// //     .catch(err => console.log("MongoDB Connection Error: ", err));

// const MONGO_URI = "mongodb+srv://users_2004:admin%4012@node.yvgp6x2.mongodb.net/shoevault?retryWrites=true&w=majority&appName=NODE";

// mongoose.connect(MONGO_URI)
//     .then(() => console.log("MongoDB Connected Successfully"))
//     .catch(err => console.log("MongoDB Connection Error: ", err));

    
// // Routes Configuration
// // બધા રૂટ્સને '/api' થી શરૂ કરો
// app.use('/api', require('./routes/authRoutes')); 
// app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/categories', require('./routes/categoryRoutes'));
// app.use('/api/contact', require('./routes/contactRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));
// app.use('/api/cart', require('./routes/cartRoutes'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Shard Connection String
// યુઝરનેમ: users_2004
// પાસવર્ડ: admin%4012 (@ માટે %40 વાપરેલ છે)
// ડેટાબેઝ: shoevault1
const MONGO_URI = "mongodb://users_2004:admin%4012@ac-etgd3qy-shard-00-00.yvgp6x2.mongodb.net:27017,ac-etgd3qy-shard-00-01.yvgp6x2.mongodb.net:27017,ac-etgd3qy-shard-00-02.yvgp6x2.mongodb.net:27017/shoevault1?ssl=true&replicaSet=atlas-ls613l-shard-0&authSource=admin&appName=NODE";

// MongoDB કનેક્શન
mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB Shard Connected Successfully to shoevault1"))
    .catch(err => {
        console.error("MongoDB Connection Error Details:");
        console.error(err.message);
    });

// Routes Configuration
app.use('/api', require('./routes/authRoutes')); 
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));