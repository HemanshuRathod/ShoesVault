

// import React, { useState, useEffect, useCallback } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Components & Pages
// import Navbar from "./pages/Navbar"; 
// import Footer from "./pages/Footer";
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

// // Protected & Public Route Components
// const ProtectedRoute = ({ isLoggedIn, children }) => {
//   return isLoggedIn ? children : <Navigate to="/login" replace />;
// };

// const PublicRoute = ({ isLoggedIn, children }) => {
//   return isLoggedIn ? <Navigate to="/home" replace /> : children; 
// };

// // નવો કમ્પોનન્ટ: જે ચેક કરશે કે Navbar/Footer બતાવવા કે નહીં
// const LayoutWrapper = ({ isLoggedIn, userName, cartCount, wishlistCount, handleLogout, children }) => {
//   const location = useLocation();
//   // જો પાથ /admin થી શરૂ થતો હોય તો true
//   const isAdminPath = location.pathname.startsWith("/admin");

//   return (
//     <>
//       {!isAdminPath && (
//         <Navbar 
//           isLoggedIn={isLoggedIn} 
//           userName={userName} 
//           cartCount={cartCount} 
//           wishlistCount={wishlistCount} 
//           handleLogout={handleLogout} 
//         />
//       )}
      
//       <div className={!isAdminPath ? "main-content-wrapper" : ""}>
//         {children}
//       </div>

//       {!isAdminPath && <Footer />}
//     </>
//   );
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

//   const fetchCart = useCallback(async () => {
//     if (!userId) return;
//     try {
//       const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
//       const data = await response.json();
//       if (data?.items) setCart(data.items);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   }, [userId]);

//   const fetchWishlist = useCallback(async () => {
//     if (!userId) return;
//     try {
//       const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
//       const data = await response.json();
//       if (Array.isArray(data)) setWishlist(data);
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//     }
//   }, [userId]);

//   useEffect(() => {
//     fetchCart();
//     fetchWishlist();
//   }, [fetchCart, fetchWishlist]);

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
//           sessionStorage.setItem("shoevault_user", JSON.stringify(result.user));
//           toast.success(`Welcome back, ${result.user.username}!`);
//           return true;
//       } else {
//           toast.error(result.error || "Login Failed");
//           return false;
//       }
//     } catch (error) {
//       toast.error("Server connection failed.");
//       return false;
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUserId(null);
//     setCart([]); 
//     setWishlist([]); 
//     sessionStorage.removeItem("shoevault_user");
//     toast.info("Logged out successfully");
//   };

//   const addToCart = async (shoe) => {
//     if (!isLoggedIn) return toast.warning("Please login first");
//     const existingItem = cart.find(item => item.productId === shoe._id || item.id === shoe._id);
//     if (existingItem && existingItem.quantity >= shoe.stock) {
//       return toast.error("Out of stock!");
//     }
//     try {
//       const response = await fetch('http://localhost:5000/api/cart/add', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId,
//           userEmail,
//           productId: shoe._id,
//           name: shoe.name,
//           price: shoe.price,
//           image: shoe.image,
//           stock: shoe.stock 
//         })
//       });
//       if (response.ok) {
//         await fetchCart();
//         toast.success("Added to cart!");
//       }
//     } catch (error) {
//       toast.error("Cart update failed");
//     }
//   };

//   const removeFromCart = async (productId) => {
//     try {
//       setCart(prev => prev.filter(item => (item.productId !== productId && item._id !== productId)));
//       toast.info("Item removed");
//     } catch (e) { toast.error("Delete failed"); }
//   };

//   const toggleWishlist = async (shoe) => {
//     if (!userId) return toast.warning("Please login to use Wishlist");
//     try {
//       const response = await fetch('http://localhost:5000/api/wishlist/toggle', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId, productId: shoe._id })
//       });
//       if (response.ok) {
//         await fetchWishlist();
//         const isCurrentlyInWishlist = wishlist.some(item => item._id === shoe._id);
//         isCurrentlyInWishlist ? toast.info("Removed from wishlist") : toast.success("Added to wishlist!");
//       }
//     } catch (error) { toast.error("Wishlist sync error"); }
//   };

//   return (
//     <Router>
//       <ToastContainer position="bottom-right" theme="dark" />
      
     
//       <LayoutWrapper 
//         isLoggedIn={isLoggedIn} 
//         userName={userName} 
//         cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
//         wishlistCount={wishlist.length} 
//         handleLogout={handleLogout}
//       >
//         <Routes>
//           <Route path="/login" element={<PublicRoute isLoggedIn={isLoggedIn}><Login handleLogin={handleLogin} /></PublicRoute>} />
//           <Route path="/register" element={<PublicRoute isLoggedIn={isLoggedIn}><Register /></PublicRoute>} />
          
//           <Route path="/admin/login" element={<AdminLogin setAdminAuth={setIsAdminAuthenticated} />} />
//           <Route path="/admin" element={isAdminAuthenticated ? <AdminLayout /> : <Navigate to="/admin/login" />}>
//             <Route index element={<AdminDashboard />} />
//             <Route path="products" element={<AdminProducts />} />
//             <Route path="category" element={<AdminCategory/>}/>
//             <Route path="users" element={<AdminUsers />} />
//             <Route path="orders" element={<AdminOrders />} />
//             <Route path="settings" element={<AdminSettings />} />
//           </Route>

//           <Route path="/" element={<Navigate to="/welcome" replace />} />
//           <Route path="/welcome" element={<Welcome/>}/>
//           <Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ShoeApp addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} /></ProtectedRoute>} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
//           <Route path="/wishlist" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} /></ProtectedRoute>} />
//           <Route path="/cart" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={fetchCart} /></ProtectedRoute>} />
//           <Route path="/checkout" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Checkout cart={cart} userId={userId} userName={userName} setCart={setCart} /></ProtectedRoute>} />
//           <Route path="/order-success" element={<OrderSuccess userName={userName} />} />
//           <Route path="/orders" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MyOrders userId={userId} /></ProtectedRoute>} />
//           <Route path="/track-order/:orderId" element={<TrackOrder />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </LayoutWrapper>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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

// Protected & Public Route Components
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? <Navigate to="/home" replace /> : children; 
};

// Layout Wrapper
const LayoutWrapper = ({ isLoggedIn, userName, cartCount, wishlistCount, handleLogout, children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPath && (
        <Navbar 
          isLoggedIn={isLoggedIn} 
          userName={userName} 
          cartCount={cartCount} 
          wishlistCount={wishlistCount} 
          handleLogout={handleLogout} 
        />
      )}
      
      <div className={!isAdminPath ? "main-content-wrapper" : ""}>
        {children}
      </div>

      {!isAdminPath && <Footer />}
    </>
  );
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

  // --- નવી ઉમેરેલી ફંક્શનાલિટી: updateQuantity ---
const updateQuantity = async (productId, amount) => {
  if (!userId) return;

  try {
    const response = await fetch('http://localhost:5000/api/cart/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        productId,
        amount // આ +1 અથવા -1 જશે
      })
    });

    if (response.ok) {
      await fetchCart(); 
    } else {
      const errorData = await response.json();
      toast.error(errorData.error || "Update failed");
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
    toast.error("Server error");
  }
};

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
        await fetchCart();
        toast.success("Added to cart!");
      }
    } catch (error) {
      toast.error("Cart update failed");
    }
  };

  // const removeFromCart = async (productId) => {
  //   try {
  //     // Backend API call update logic logically goes here if needed
  //     setCart(prev => prev.filter(item => (item.productId !== productId && item._id !== productId)));
  //     toast.info("Item removed");
  //   } catch (e) { toast.error("Delete failed"); }
  // };

  const removeFromCart = async (productId) => {
  if (!userId) return;

  try {
    const response = await fetch('http://localhost:5000/api/cart/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId, 
        productId 
      })
    });

    if (response.ok) {
      // ડેટાબેઝમાંથી ડીલીટ થયા પછી ફ્રન્ટએન્ડ સ્ટેટ અપડેટ કરો
      setCart(prev => prev.filter(item => (item.productId !== productId && item._id !== productId)));
      toast.info("Item removed from cart");
    } else {
      toast.error("Failed to remove item from database");
    }
  } catch (error) {
    console.error("Error removing item:", error);
    toast.error("Server error while removing item");
  }
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
        await fetchWishlist();
        const isCurrentlyInWishlist = wishlist.some(item => item._id === shoe._id);
        isCurrentlyInWishlist ? toast.info("Removed from wishlist") : toast.success("Added to wishlist!");
      }
    } catch (error) { toast.error("Wishlist sync error"); }
  };

  return (
    <Router>
      <ToastContainer position="bottom-right" theme="dark" />
      
      <LayoutWrapper 
        isLoggedIn={isLoggedIn} 
        userName={userName} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        wishlistCount={wishlist.length} 
        handleLogout={handleLogout}
      >
        <Routes>
          <Route path="/login" element={<PublicRoute isLoggedIn={isLoggedIn}><Login handleLogin={handleLogin} /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute isLoggedIn={isLoggedIn}><Register /></PublicRoute>} />
<<<<<<< HEAD
          <Route path="/forgot-password" element={<PublicRoute isLoggedIn={isLoggedIn}><ForgotPassword /></PublicRoute>} />
=======
            <Route path="/forgot-password" element={<PublicRoute isLoggedIn={isLoggedIn}><ForgotPassword /></PublicRoute>} />
>>>>>>> 2141a10aad53ce4b65ca8348f16b77f8aa21dad5
          <Route path="/admin/login" element={<AdminLogin setAdminAuth={setIsAdminAuthenticated} />} />
          <Route path="/admin" element={isAdminAuthenticated ? <AdminLayout /> : <Navigate to="/admin/login" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="category" element={<AdminCategory/>}/>
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<Welcome/>}/>
          <Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ShoeApp addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/wishlist" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} /></ProtectedRoute>} />
          
          {/* અહીં updateQuantity પાસ કર્યું છે */}
          <Route path="/cart" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} /></ProtectedRoute>} />
          
          <Route path="/checkout" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Checkout cart={cart} userId={userId} userName={userName} setCart={setCart} /></ProtectedRoute>} />
          <Route path="/order-success" element={<OrderSuccess userName={userName} />} />
          <Route path="/orders" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MyOrders userId={userId} /></ProtectedRoute>} />
          <Route path="/track-order/:orderId" element={<TrackOrder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
