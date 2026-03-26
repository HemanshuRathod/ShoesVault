

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify'; // Ensure toast is imported if you use it here
// import 'react-toastify/dist/ReactToastify.css';
// const Checkout = ({ cart, userName, userId, setCart }) => {
//   const navigate = useNavigate();

//   // ૧. ફોર્મ ડેટા માટે સ્ટેટ (ઈમેલ ને ખાલી રાખ્યો છે શરૂઆતમાં)
//   const [shippingInfo, setShippingInfo] = useState({
//     firstName: userName || "",
//     lastName: "",
//     email: "", // આ નીચે useEffect થી ઓટો-ભરાશે
//     address: "",
//     paymentMethod: "Online Payment"
//   });

//   // --- આ નવો ભાગ ઉમેર્યો છે: લોગિન યુઝરનો ઈમેલ મેળવવા માટે ---
//   useEffect(() => {
//     const savedUser = sessionStorage.getItem("shoevault_user");
//     if (savedUser) {
//       const user = JSON.parse(savedUser);
//       if (user.email) {
//         setShippingInfo(prev => ({ ...prev, email: user.email }));
//       }
//     }
//   }, []); 

//   // ૨. ટોટલ ગણતરી (INR)
//   const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
//   const discount = 500; 
//   const finalTotal = subtotal > discount ? subtotal - discount : subtotal;

//   const formatINR = (num) => new Intl.NumberFormat('en-IN', {
//     style: 'currency', currency: 'INR', maximumFractionDigits: 0
//   }).format(num);

//   const handleChange = (e) => {
//     setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
//   };

//   // ૩. ઓર્ડર પ્લેસ કરવાનું ફંક્શન
//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     if (!userId) {
//       alert("Please login again to place an order.");
//       return navigate('/login');
//     }

//     if (cart.length === 0) {
//       return alert("Your cart is empty.");
//     }

//     const orderData = {
//       user_id: userId,
//       user_email: shippingInfo.email, // ઓટો-ફિલ થયેલો ઈમેલ અહીં જશે
//       total_price: finalTotal,
//       payment_method: shippingInfo.paymentMethod,
//       items: cart.map(item => ({
//         productId: item.productId || item._id || item.id, 
//         name: item.name,
//         price: item.price,
//         img: item.image || item.img || "https://via.placeholder.com/150",
//         quantity: item.quantity || 1
//       }))
//     };

//     try {
//       const response = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(orderData)
//       });

//       const data = await response.json(); 

//       if (response.ok) {
//         alert("SUCCESS: Your order has been placed!!");
        
//         setCart([]); 
//         navigate('/order-success', { state: { orderId: data.id } }); 
//       } else {
//         alert("Order failed: " + (data.error || "Unknown error"));
//       }
//     } catch (err) {
//       alert("Connection error.");
//     }
//   };

//   return (
//     <div className="container mt-5 pb-5">
//       <div className="row g-5">
//         <div className="col-md-7">
//           <h4 className="mb-3 fw-bold italic text-uppercase">Shipping_Details</h4>
//           <form onSubmit={handlePlaceOrder} className="card p-4 shadow-sm border-0 rounded-4">
//             <div className="row g-3">
//               <div className="col-sm-6">
//                 <label className="form-label small fw-bold">FIRST NAME</label>
//                 <input type="text" name="firstName" className="form-control rounded-pill px-3" value={shippingInfo.firstName} onChange={handleChange} required />
//               </div>
//               <div className="col-sm-6">
//                 <label className="form-label small fw-bold">LAST NAME</label>
//                 <input type="text" name="lastName" className="form-control rounded-pill px-3" value={shippingInfo.lastName} onChange={handleChange} required />
//               </div>
//               <div className="col-12">
//                 <label className="form-label small fw-bold">EMAIL (Auto-filled)</label>
//                 <input 
//                   type="email" 
//                   name="email" 
//                   className="form-control rounded-pill px-3 bg-light" 
//                   value={shippingInfo.email} 
//                   onChange={handleChange} 
//                   required 
//                   readOnly // જો તમે ઈચ્છો કે યુઝર ઈમેલ ના બદલી શકે તો
//                 />
//               </div>
//               <div className="col-12">
//                 <label className="form-label small fw-bold">DELIVERY ADDRESS</label>
//                 <input type="text" name="address" className="form-control rounded-pill px-3" placeholder="Street, Area, Landmark" value={shippingInfo.address} onChange={handleChange} required />
//               </div>
//             </div>

//             <hr className="my-4" />
            
//             <h4 className="mb-3 fw-bold italic text-uppercase">Payment_Method</h4>
//             <div className="my-3">
//               {/* <div className="form-check mb-2">
//                 <input name="paymentMethod" type="radio" value="Online Payment" className="form-check-input" checked={shippingInfo.paymentMethod === "Online Payment"} onChange={handleChange} />
//                 <label className="form-check-label">Online Payment (UPI/Card)</label>
//               </div> */}
//               <div className="form-check">
//                 <input name="paymentMethod" type="radio" value="Cash on Delivery" className="form-check-input" checked={shippingInfo.paymentMethod === "Cash on Delivery"} onChange={handleChange} />
//                 <label className="form-check-label">Cash on Delivery (COD)</label>
//               </div>
//             </div>

//             <button className="btn btn-warning btn-lg w-100 shadow-sm fw-black italic text-uppercase mt-3 py-3" type="submit">
//               Confirm & Place Order
//             </button>
//           </form>
//         </div>

//         <div className="col-md-5">
//           <h4 className="d-flex justify-content-between align-items-center mb-3">
//             <span className="text-dark fw-bold italic text-uppercase">Your_Vault</span>
//             <span className="badge bg-dark rounded-pill">{cart.length}</span>
//           </h4>
          
//           <ul className="list-group mb-3 shadow-sm rounded-4 overflow-hidden">
//             {cart.map((item, index) => (
//               <li key={index} className="list-group-item d-flex justify-content-between lh-sm py-3">
//                 <div>
//                   <h6 className="my-0 fw-bold">{item.name}</h6>
//                   <small className="text-muted text-uppercase">Qty: {item.quantity || 1}</small>
//                 </div>
//                 <span className="text-dark fw-bold">{formatINR(item.price * (item.quantity || 1))}</span>
//               </li>
//             ))}
//             <li className="list-group-item d-flex justify-content-between bg-light py-3">
//               <div className="text-warning">
//                 <h6 className="my-0 fw-bold">Vault Discount</h6>
//                 <small className="text-uppercase">VAULT500</small>
//               </div>
//               <span className="text-black fw-bold">−{formatINR(discount)}</span>
//             </li>
//             <li className="list-group-item d-flex justify-content-between py-3">
//               <span className="fw-black text-uppercase italic">Net Value</span>
//               <strong className="fs-4 fw-black text-warning">{formatINR(finalTotal)}</strong>
//             </li>
//           </ul>

//           <button 
//             type="button" 
//             className="btn btn-outline-dark w-100 fw-bold rounded-pill"
//             onClick={() => navigate('/cart')}
//           >
//             ← Back to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ cart, userName, userId, setCart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // New loading state

  // 1. Form Data State
  const [shippingInfo, setShippingInfo] = useState({
    firstName: userName || "",
    lastName: "",
    email: "", 
    address: "",
    paymentMethod: "Cash on Delivery" // Defaulting to your only active option
  });

  // Fetch email from session on mount
  useEffect(() => {
    const savedUser = sessionStorage.getItem("shoevault_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email) {
        setShippingInfo(prev => ({ ...prev, email: user.email }));
      }
    }
  }, []); 

  // 2. Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const discount = 500; 
  const finalTotal = subtotal > discount ? subtotal - discount : subtotal;

  const formatINR = (num) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(num);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // 3. Place Order Function
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.warn("Please login again to place an order.");
      return navigate('/login');
    }

    if (cart.length === 0) {
      return toast.error("Your cart is empty.");
    }

    setLoading(true); // Disable button

    const orderData = {
      user_id: userId,
      user_email: shippingInfo.email,
      total_price: finalTotal,
      payment_method: shippingInfo.paymentMethod,
      items: cart.map(item => ({
        productId: item.productId || item._id || item.id, 
        name: item.name,
        price: item.price,
        img: item.image || item.img || "https://via.placeholder.com/150",
        quantity: item.quantity || 1
      }))
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await response.json(); 

      if (response.ok) {
        toast.success("SUCCESS: Your order has been placed!");
        setCart([]); 
        navigate('/order-success', { state: { orderId: data.id } }); 
      } else {
        toast.error("Order failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      toast.error("Connection error. Check your server.");
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div className="container mt-5 pb-5">
      <div className="row g-5">
        <div className="col-md-7">
          <h4 className="mb-3 fw-bold fst-italic text-uppercase">Shipping Details</h4>
          <form onSubmit={handlePlaceOrder} className="card p-4 shadow-sm border-0 rounded-4">
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label small fw-bold">FIRST NAME</label>
                <input type="text" name="firstName" className="form-control rounded-pill px-3" value={shippingInfo.firstName} onChange={handleChange} required />
              </div>
              <div className="col-sm-6">
                <label className="form-label small fw-bold">LAST NAME</label>
                <input type="text" name="lastName" className="form-control rounded-pill px-3" value={shippingInfo.lastName} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold">EMAIL (Auto-filled)</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-control rounded-pill px-3 bg-light" 
                  value={shippingInfo.email} 
                  required 
                  readOnly 
                />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold">DELIVERY ADDRESS</label>
                <input type="text" name="address" className="form-control rounded-pill px-3" placeholder="Street, Area, Landmark" value={shippingInfo.address} onChange={handleChange} required />
              </div>
            </div>

            <hr className="my-4" />
            
            <h4 className="mb-3 fw-bold fst-italic text-uppercase">Payment Method</h4>
            <div className="my-3">
              <div className="form-check">
                <input name="paymentMethod" type="radio" value="Cash on Delivery" className="form-check-input" checked={shippingInfo.paymentMethod === "Cash on Delivery"} onChange={handleChange} />
                <label className="form-check-label">Cash on Delivery (COD)</label>
              </div>
            </div>

            <button 
              className="btn btn-warning btn-lg w-100 shadow-sm fw-bold fst-italic text-uppercase mt-3 py-3" 
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm & Place Order"}
            </button>
          </form>
        </div>

        {/* --- Vault Summary Sidebar --- */}
        <div className="col-md-5">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-dark fw-bold fst-italic text-uppercase">Your Vault</span>
            <span className="badge bg-dark rounded-pill">{cart.length}</span>
          </h4>
          
          <ul className="list-group mb-3 shadow-sm rounded-4 overflow-hidden">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between lh-sm py-3">
                <div>
                  <h6 className="my-0 fw-bold">{item.name}</h6>
                  <small className="text-muted text-uppercase">Qty: {item.quantity || 1}</small>
                </div>
                <span className="text-dark fw-bold">{formatINR(item.price * (item.quantity || 1))}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between bg-light py-3">
              <div className="text-warning">
                <h6 className="my-0 fw-bold">Vault Discount</h6>
                <small className="text-uppercase">VAULT500</small>
              </div>
              <span className="text-black fw-bold">−{formatINR(discount)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between py-3">
              <span className="fw-bold text-uppercase fst-italic">Net Value</span>
              <strong className="fs-4 fw-bold text-warning">{formatINR(finalTotal)}</strong>
            </li>
          </ul>

          <button 
            type="button" 
            className="btn btn-outline-dark w-100 fw-bold rounded-pill"
            onClick={() => navigate('/cart')}
            disabled={loading}
          >
            ← Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;