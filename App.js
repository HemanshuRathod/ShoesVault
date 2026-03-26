// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // Components
// import Navbar from "./pages/Navbar"; 
// import Footer from "./pages/Footer";

// // Pages
// import ShoeApp from "./pages/Home"; 
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import OrderSuccess from "./pages/OrderSuccess";
// import ForgotPassword from "./pages/ForgotPassword";

// import Wishlist from "./pages/Wishlist"; 
// import MyOrders from "./pages/MyOrders";

// import TrackOrder from "./pages/TrackOrder";
// import NewArrivalsPage from './pages/NewArrivalsPage';

// // Admin Pages
// import AdminProducts from "./Admin/AdminProducts";
// import AdminLogin from "./Admin/AdminLogin";
// import AdminDashboard from "./Admin/AdminDashboard";
// import AdminLayout from "./Admin/AdminLayout";
// import AdminOrders from "./Admin/AdminOrders";
// import AdminUsers from "./Admin/AdminUsers";
// import AdminCategory from "./Admin/AdminCategory";
// import AdminSettings from "./Admin/AdminSettings";

// import "./App.css";

// // --- GATEKEEPERS ---
// const ProtectedRoute = ({ isLoggedIn, children }) => {
//   return isLoggedIn ? children : <Navigate to="/login" replace />;
// };

// const PublicRoute = ({ isLoggedIn, children }) => {
//   return isLoggedIn ? <Navigate to="/home" replace /> : children; 
// };

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null); 
//   const [userName, setUserName] = useState("");
//   const [userEmail, setUserEmail] = useState(""); // નવું સ્ટેટ ઉમેર્યું
//   const [userRole, setUserRole] = useState("USER");
//   const [userImage, setUserImage] = useState(""); 
  
//   const [wishlist, setWishlist] = useState([]);
//   const [cart, setCart] = useState([]);

//   const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
//     return localStorage.getItem("shoevault_admin") !== null;
//   });

//   // ૧. સેશન સ્ટોરેજમાંથી યુઝર ડેટા મેળવો
//   useEffect(() => {
//     const savedUser = sessionStorage.getItem("shoevault_user");
//     if (savedUser) {
//       const user = JSON.parse(savedUser);
//       setIsLoggedIn(true);
//       setUserId(user._id || user.id); 
//       setUserName(user.username);
//       setUserEmail(user.email || ""); // અહીં ઈમેલ સેટ કરો
//       setUserRole(user.role || "USER");
//       setUserImage(user.image || "");
//     }
//   }, []);

//   // ૨. ડેટાબેઝમાંથી કાર્ટ ફેચ કરો
//   useEffect(() => {
//     const fetchCart = async () => {
//       if (userId) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
//           const data = await response.json();
//           if (data && data.items) {
//             setCart(data.items);
//           }
//         } catch (error) {
//           console.error("Error fetching cart:", error);
//         }
//       }
//     };
//     fetchCart();
//   }, [userId]);

//   // ૩. ડેટાબેઝમાંથી વિશલિસ્ટ ફેચ કરો
//   useEffect(() => {
//     const fetchUserWishlist = async () => {
//       if (userId) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
//           const data = await response.json();
//           if (Array.isArray(data)) {
//             setWishlist(data);
//           }
//         } catch (error) {
//           console.error("Error fetching wishlist:", error);
//         }
//       }
//     };
//     fetchUserWishlist();
//   }, [userId]);

//   // લોગિન હેન્ડલર
//   const handleLogin = async (credentials) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(credentials) 
//       });
      
//       const result = await response.json();
      
//       if (response.ok) {
//           setIsLoggedIn(true);
//           setUserId(result.user._id || result.user.id);
//           setUserName(result.user.username);
//           setUserEmail(result.user.email); // ઈમેલ સ્ટેટ સેટ કર્યું
//           setUserRole(result.user.role || "USER");
//           setUserImage(result.user.image || "");
          
//           sessionStorage.setItem("shoevault_user", JSON.stringify(result.user));
//           return true;
//       } else {
//           alert(result.error || "Login Failed");
//           return false;
//       }
//     } catch (error) {
//       alert("સર્વર બંધ છે.");
//       return false;
//     }
//   };

//   // લોગઆઉટ હેન્ડલર
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUserId(null);
//     setUserName("");
//     setUserEmail(""); // ઈમેલ ક્લિયર કર્યો
//     setUserRole("USER");
//     setCart([]); 
//     setWishlist([]); 
//     sessionStorage.removeItem("shoevault_user");
//   };

//   // ૪. ડેટાબેઝમાં કાર્ટ આઈટમ ઉમેરો (ઈમેલ સાથે)
//   const addToCart = async (shoe) => {
//     if (!userId) {
//       alert("Please login to add items to cart");
//       return;
//     }

//     const existingItem = cart.find(item => (item._id === shoe._id || item.id === shoe.id));

//     if (existingItem && existingItem.quantity >= shoe.stock) {
//       alert(`Sorry! Only ${shoe.stock} units available in stock.`);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/cart/add', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: userId,
//           userEmail: userEmail, // ઈમેલ મોકલ્યો
//           productId: shoe._id,
//           name: shoe.name,
//           price: shoe.price,
//           image: shoe.image,
//           stock: shoe.stock 
//         })
//       });

//       const updatedCart = await response.json();
//       if (response.ok) {
//         setCart(updatedCart.items);
//         alert("Added to cart!");
//       }
//     } catch (error) {
//       console.error("Cart API Error:", error);
//     }
//   };

//   // કાર્ટમાંથી કાઢવા માટે
//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => (item._id !== id && item.id !== id)));
//   };
  
//   // ક્વોન્ટિટી કંટ્રોલ
//   const updateQuantity = (id, amount) => {
//     setCart(cart.map(item => {
//       const itemId = item._id || item.id;
//       if (itemId === id) {
//         const newQuantity = item.quantity + amount;
//         if (newQuantity < 1) return item;
//         if (newQuantity > item.stock) {
//           alert(`Sorry! Only ${item.stock} items are available in stock.`);
//           return item; 
//         }
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     }));
//   };

//   // વિશલિસ્ટ ટોગલ
//   const toggleWishlist = async (shoe) => {
//     if (!userId) return alert("Please login to use Wishlist");
//     try {
//       const response = await fetch('http://localhost:5000/api/wishlist/toggle', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId: userId, productId: shoe._id })
//       });
//       if (response.ok) {
//         setWishlist((prev) => {
//           const isPresent = prev.find(item => item._id === shoe._id);
//           if (isPresent) return prev.filter(item => item._id !== shoe._id);
//           return [...prev, shoe];
//         });
//       }
//     } catch (error) {
//       console.error("Wishlist error:", error);
//     }
//   };

//   return (
//     <Router>
//       <Navbar 
//         isLoggedIn={isLoggedIn} 
//         userName={userName} 
//         userImage={userImage} 
//         cartCount={cart.length} 
//         wishlistCount={wishlist.length} 
//         handleLogout={handleLogout} 
//       />

//       <Routes>
//         <Route path="/login" element={<PublicRoute isLoggedIn={isLoggedIn}><Login handleLogin={handleLogin} /></PublicRoute>} />
//         <Route path="/register" element={<PublicRoute isLoggedIn={isLoggedIn}><Register /></PublicRoute>} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         <Route path="/admin/login" element={<AdminLogin setAdminAuth={setIsAdminAuthenticated} />} />
//         <Route path="/admin" element={isAdminAuthenticated ? <AdminLayout /> : <Navigate to="/admin/login" />}>
//           <Route index element={<AdminDashboard />} />
//           <Route path="products" element={<AdminProducts />} />
//           <Route path="category" element={<AdminCategory/>}/>
//           <Route path="users" element={<AdminUsers />} />
//           <Route path="orders" element={<AdminOrders />} />
//           <Route path="settings" element={<AdminSettings />} />
//         </Route>

//         <Route path="/" element={<Navigate to="/home" replace />} />
//         <Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ShoeApp addToCart={addToCart} userName={userName} toggleWishlist={toggleWishlist} wishlist={wishlist} /></ProtectedRoute>} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/category/new" element={<ProtectedRoute isLoggedIn={isLoggedIn}><NewArrivalsPage addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} /></ProtectedRoute>} />
//         {/* <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile userName={userName} userImage={userImage} wishlist={wishlist} wishlistCount={wishlist.length} handleLogout={handleLogout} /></ProtectedRoute>} /> */}
//         <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
//         <Route path="/wishlist" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} /></ProtectedRoute>} />
//         <Route path="/cart" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} /></ProtectedRoute>} />
//         <Route path="/checkout" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Checkout cart={cart} userId={userId} userName={userName} setCart={setCart} /></ProtectedRoute>} />
//         <Route path="/order-success" element={<OrderSuccess userName={userName} />} />
//         <Route path="/orders" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MyOrders userId={userId} /></ProtectedRoute>} />
//         {/* <Route path="/orders/:orderId" element={<ProtectedRoute isLoggedIn={isLoggedIn}><OrderDetails /></ProtectedRoute>} /> */}
//         {/* <Route path="/track-order" element={<TrackOrder />} /> */}
//         <Route path="/track-order/:orderId" element={<TrackOrder />} />

//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // 1. Import Toastify components and CSS
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Components
// import Navbar from "./pages/Navbar"; 
// import Footer from "./pages/Footer";

// // Pages
// import ShoeApp from "./pages/Home"; 
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import OrderSuccess from "./pages/OrderSuccess";
// import ForgotPassword from "./pages/ForgotPassword";
// import Wishlist from "./pages/Wishlist"; 
// import MyOrders from "./pages/MyOrders";
// import TrackOrder from "./pages/TrackOrder";
// import NewArrivalsPage from './pages/NewArrivalsPage';
// import Welcome from "./pages/welcome";

// // Admin Pages
// import AdminProducts from "./Admin/AdminProducts";
// import AdminLogin from "./Admin/AdminLogin";
// import AdminDashboard from "./Admin/AdminDashboard";
// import AdminLayout from "./Admin/AdminLayout";
// import AdminOrders from "./Admin/AdminOrders";
// import AdminUsers from "./Admin/AdminUsers";
// import AdminCategory from "./Admin/AdminCategory";
// import AdminSettings from "./Admin/AdminSettings";

// import "./App.css";

// const ProtectedRoute = ({ isLoggedIn, children }) => {
//   return isLoggedIn ? children : <Navigate to="/login" replace />;
// };

// const PublicRoute = ({ isLoggedIn, children }) => {
//   return isLoggedIn ? <Navigate to="/home" replace /> : children; 
// };

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null); 
//   const [userName, setUserName] = useState("");
//   const [userEmail, setUserEmail] = useState(""); 
//   const [userRole, setUserRole] = useState("USER");
//   const [userImage, setUserImage] = useState(""); 
//   const [wishlist, setWishlist] = useState([]);
//   const [cart, setCart] = useState([]);

//   const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
//     return localStorage.getItem("shoevault_admin") !== null;
//   });

//   useEffect(() => {
//     const savedUser = sessionStorage.getItem("shoevault_user");
//     if (savedUser) {
//       const user = JSON.parse(savedUser);
//       setIsLoggedIn(true);
//       setUserId(user._id || user.id); 
//       setUserName(user.username);
//       setUserEmail(user.email || ""); 
//       setUserRole(user.role || "USER");
//       setUserImage(user.image || "");
//     }
//   }, []);

//   useEffect(() => {
//     const fetchCart = async () => {
//       if (userId) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
//           const data = await response.json();
//           if (data && data.items) {
//             setCart(data.items);
//           }
//         } catch (error) {
//           console.error("Error fetching cart:", error);
//         }
//       }
//     };
//     fetchCart();
//   }, [userId]);

//   useEffect(() => {
//     const fetchUserWishlist = async () => {
//       if (userId) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
//           const data = await response.json();
//           if (Array.isArray(data)) {
//             setWishlist(data);
//           }
//         } catch (error) {
//           console.error("Error fetching wishlist:", error);
//         }
//       }
//     };
//     fetchUserWishlist();
//   }, [userId]);

//   const handleLogin = async (credentials) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(credentials) 
//       });
      
//       const result = await response.json();
      
//       if (response.ok) {
//           setIsLoggedIn(true);
//           setUserId(result.user._id || result.user.id);
//           setUserName(result.user.username);
//           setUserEmail(result.user.email);
//           setUserRole(result.user.role || "USER");
//           setUserImage(result.user.image || "");
          
//           sessionStorage.setItem("shoevault_user", JSON.stringify(result.user));
//           toast.success(`Welcome back, ${result.user.username}!`); // Toast Success
//           return true;
//       } else {
//           toast.error(result.error || "Login Failed"); // Toast Error
//           return false;
//       }
//     } catch (error) {
//       toast.error("Server is down. Please try again later.");
//       return false;
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUserId(null);
//     setUserName("");
//     setUserEmail(""); 
//     setUserRole("USER");
//     setCart([]); 
//     setWishlist([]); 
//     sessionStorage.removeItem("shoevault_user");
//     toast.info("Logged out successfully"); // Toast Info
//   };

//   const addToCart = async (shoe) => {
//     if (!userId) {
//       toast.warning("Please login to add items to cart"); // Toast Warning
//       return;
//     }

//     const existingItem = cart.find(item => (item._id === shoe._id || item.id === shoe.id));

//     if (existingItem && existingItem.quantity >= shoe.stock) {
//       toast.error(`Sorry! Only ${shoe.stock} units available in stock.`);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/cart/add', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: userId,
//           userEmail: userEmail,
//           productId: shoe._id,
//           name: shoe.name,
//           price: shoe.price,
//           image: shoe.image,
//           stock: shoe.stock 
//         })
//       });

//       const updatedCart = await response.json();
//       if (response.ok) {
//         setCart(updatedCart.items);
//         toast.success("Added to cart!");
//       }
//     } catch (error) {
//       toast.error("Failed to add item to cart.");
//     }
//   };

//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => (item._id !== id && item.id !== id)));
//     toast.info("Item removed from cart");
//   };
  
//   const updateQuantity = (id, amount) => {
//     setCart(cart.map(item => {
//       const itemId = item._id || item.id;
//       if (itemId === id) {
//         const newQuantity = item.quantity + amount;
//         if (newQuantity < 1) return item;
//         if (newQuantity > item.stock) {
//           toast.warning(`Only ${item.stock} items in stock.`);
//           return item; 
//         }
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     }));
//   };

//   const toggleWishlist = async (shoe) => {
//     if (!userId) return toast.warning("Please login to use Wishlist");
//     try {
//       const response = await fetch('http://localhost:5000/api/wishlist/toggle', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId: userId, productId: shoe._id })
//       });
//       if (response.ok) {
//         setWishlist((prev) => {
//           const isPresent = prev.find(item => item._id === shoe._id);
//           if (isPresent) {
//             toast.info("Removed from wishlist");
//             return prev.filter(item => item._id !== shoe._id);
//           }
//           toast.success("Added to wishlist!");
//           return [...prev, shoe];
//         });
//       }
//     } catch (error) {
//       toast.error("Could not update wishlist");
//     }
//   };

//   return (
//     <Router>
//       {/* 2. Add ToastContainer here */}
//       <ToastContainer 
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />

//       <Navbar 
//         isLoggedIn={isLoggedIn} 
//         userName={userName} 
//         userImage={userImage} 
//         cartCount={cart.length} 
//         wishlistCount={wishlist.length} 
//         handleLogout={handleLogout} 
//       />

//       <Routes>
//         <Route path="/login" element={<PublicRoute isLoggedIn={isLoggedIn}><Login handleLogin={handleLogin} /></PublicRoute>} />
//         <Route path="/register" element={<PublicRoute isLoggedIn={isLoggedIn}><Register /></PublicRoute>} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         <Route path="/admin/login" element={<AdminLogin setAdminAuth={setIsAdminAuthenticated} />} />
//         <Route path="/admin" element={isAdminAuthenticated ? <AdminLayout /> : <Navigate to="/admin/login" />}>
//           <Route index element={<AdminDashboard />} />
//           <Route path="products" element={<AdminProducts />} />
//           <Route path="category" element={<AdminCategory/>}/>
//           <Route path="users" element={<AdminUsers />} />
//           <Route path="orders" element={<AdminOrders />} />
//           <Route path="settings" element={<AdminSettings />} />
//         </Route>

//         <Route path="/" element={<Navigate to="/home" replace />} />
//         <Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ShoeApp addToCart={addToCart} userName={userName} toggleWishlist={toggleWishlist} wishlist={wishlist} /></ProtectedRoute>} />
//         <Route path="/about" element={<About />} />
//         <Route path="/welcome" element={<Welcome/>}/>
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/category/new" element={<ProtectedRoute isLoggedIn={isLoggedIn}><NewArrivalsPage addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} /></ProtectedRoute>} />
//         <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
//         <Route path="/wishlist" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} /></ProtectedRoute>} />
//         <Route path="/cart" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} /></ProtectedRoute>} />
//         <Route path="/checkout" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Checkout cart={cart} userId={userId} userName={userName} setCart={setCart} /></ProtectedRoute>} />
//         <Route path="/order-success" element={<OrderSuccess userName={userName} />} />
//         <Route path="/orders" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MyOrders userId={userId} /></ProtectedRoute>} />
//         <Route path="/track-order/:orderId" element={<TrackOrder />} />

//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components & Pages
import Navbar from "./pages/Navbar"; 
import Footer from "./pages/Footer";
import ShoeApp from "./pages/Home"; 
import About from './pages/About';
import Contact from './pages/Contact';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import Wishlist from "./pages/Wishlist"; 
import MyOrders from "./pages/MyOrders";
import TrackOrder from "./pages/TrackOrder";
import NewArrivalsPage from './pages/NewArrivalsPage';
import Welcome from "./pages/welcome";

// Admin Pages
import AdminProducts from "./Admin/AdminProducts";
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLayout from "./Admin/AdminLayout";
import AdminOrders from "./Admin/AdminOrders";
import AdminUsers from "./Admin/AdminUsers";
import AdminCategory from "./Admin/AdminCategory";
import AdminSettings from "./Admin/AdminSettings";

import "./App.css";

// 1. Improved ProtectedRoute for better UX
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? <Navigate to="/home" replace /> : children; 
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); 
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState(""); 
  const [userRole, setUserRole] = useState("USER");
  const [userImage, setUserImage] = useState(""); 
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem("shoevault_admin") !== null;
  });

  // 2. Load user from session on mount
  useEffect(() => {
    const savedUser = sessionStorage.getItem("shoevault_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setUserId(user._id || user.id); 
      setUserName(user.username);
      setUserEmail(user.email || ""); 
      setUserRole(user.role || "USER");
      setUserImage(user.image || "");
    }
  }, []);

  // 3. Centralized Fetchers using useCallback to avoid infinite loops
  const fetchCart = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
      const data = await response.json();
      if (data?.items) setCart(data.items);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [userId]);

  const fetchWishlist = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
      const data = await response.json();
      if (Array.isArray(data)) setWishlist(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, [fetchCart, fetchWishlist]);

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials) 
      });
      
      const result = await response.json();
      if (response.ok) {
          setIsLoggedIn(true);
          setUserId(result.user._id || result.user.id);
          setUserName(result.user.username);
          setUserEmail(result.user.email);
          setUserRole(result.user.role || "USER");
          sessionStorage.setItem("shoevault_user", JSON.stringify(result.user));
          toast.success(`Welcome back, ${result.user.username}!`);
          return true;
      } else {
          toast.error(result.error || "Login Failed");
          return false;
      }
    } catch (error) {
      toast.error("Server connection failed.");
      return false;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setCart([]); 
    setWishlist([]); 
    sessionStorage.removeItem("shoevault_user");
    toast.info("Logged out successfully");
  };

  const addToCart = async (shoe) => {
    if (!isLoggedIn) return toast.warning("Please login first");

    // Check stock locally first for speed
    const existingItem = cart.find(item => item.productId === shoe._id || item.id === shoe._id);
    if (existingItem && existingItem.quantity >= shoe.stock) {
      return toast.error("Out of stock!");
    }

    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          userEmail,
          productId: shoe._id,
          name: shoe.name,
          price: shoe.price,
          image: shoe.image,
          stock: shoe.stock 
        })
      });
      if (response.ok) {
        await fetchCart(); // Refresh cart from server
        toast.success("Added to cart!");
      }
    } catch (error) {
      toast.error("Cart update failed");
    }
  };

  // 4. Quantity & Remove should update the backend as well
  const removeFromCart = async (productId) => {
    try {
      // Logic for backend delete call should go here
      setCart(prev => prev.filter(item => (item.productId !== productId && item._id !== productId)));
      toast.info("Item removed");
    } catch (e) { toast.error("Delete failed"); }
  };

  const toggleWishlist = async (shoe) => {
    if (!userId) return toast.warning("Please login to use Wishlist");
    try {
      const response = await fetch('http://localhost:5000/api/wishlist/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: shoe._id })
      });
      if (response.ok) {
        await fetchWishlist(); // Sync with server
        const isCurrentlyInWishlist = wishlist.some(item => item._id === shoe._id);
        isCurrentlyInWishlist ? toast.info("Removed from wishlist") : toast.success("Added to wishlist!");
      }
    } catch (error) { toast.error("Wishlist sync error"); }
  };

  return (
    <Router>
      <ToastContainer position="bottom-right" theme="dark" />

      <Navbar 
        isLoggedIn={isLoggedIn} 
        userName={userName} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} // Count total items, not just unique ones
        wishlistCount={wishlist.length} 
        handleLogout={handleLogout} 
      />

      <div className="main-content-wrapper"> {/* Beneficial for footer pushing */}
        <Routes>
          <Route path="/login" element={<PublicRoute isLoggedIn={isLoggedIn}><Login handleLogin={handleLogin} /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute isLoggedIn={isLoggedIn}><Register /></PublicRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin setAdminAuth={setIsAdminAuthenticated} />} />
          <Route path="/admin" element={isAdminAuthenticated ? <AdminLayout /> : <Navigate to="/admin/login" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="category" element={<AdminCategory/>}/>
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* User Routes */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<Welcome/>}/>
          <Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ShoeApp addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/wishlist" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={fetchCart} /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Checkout cart={cart} userId={userId} userName={userName} setCart={setCart} /></ProtectedRoute>} />
          <Route path="/order-success" element={<OrderSuccess userName={userName} />} />
          <Route path="/orders" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MyOrders userId={userId} /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;