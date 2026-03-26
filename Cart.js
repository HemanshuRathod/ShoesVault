// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// const Cart = ({ cart, userName, removeFromCart, updateQuantity }) => {
//   const navigate = useNavigate();

//   // ડેટા ચેક કરવા માટે (Console માં જુઓ)
//   console.log("Current Cart Data:", cart);

//   const formatINR = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };
//   const addToCart = async (shoe) => {
//   // 1. Check if user is logged in
//   if (!userId) {
//     toast.warn("Please login to add items to your cart!");
//     return;
//   }

//   // 2. Check existing stock in local state before API call
//   const existingItem = cart.find(item => (item._id === shoe._id || item.id === shoe.id));

//   if (existingItem && existingItem.quantity >= shoe.stock) {
//     toast.error(`Stock Limit Reached: Only ${shoe.stock} units available.`);
//     return;
//   }

//   try {
//     const response = await fetch('http://localhost:5000/api/cart/add', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         userId: userId,
//         userEmail: userEmail,
//         productId: shoe._id,
//         name: shoe.name,
//         price: shoe.price,
//         image: shoe.image,
//         stock: shoe.stock 
//       })
//     });

//     const updatedCart = await response.json();

//     if (response.ok) {
//       setCart(updatedCart.items);
//       // 3. Success Toast
//       toast.success(`${shoe.name} added to bag!`, {
//         position: "bottom-right",
//         autoClose: 2000,
//       });
//     } else {
//       toast.error(updatedCart.error || "Could not add to cart");
//     }
//   } catch (error) {
//     console.error("Cart API Error:", error);
//     toast.error("Network error: Failed to update cart");
//   }
// };

//   // સુરક્ષા માટે: જો cart undefined હોય તો ખાલી array ગણવો
//   const safeCart = cart || [];

//   const total = safeCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const tax = total * 0.12;

//   return (
//     <div className="container mt-5 mb-5">
//       <div className="d-flex justify-content-between align-items-end mb-4">
//         <div>
//           <h2 className="fw-bold mb-0 italic">YOUR BAG</h2>
//           <p className="text-muted mb-0">{safeCart.length} items in your cart</p>
//         </div>
//         {userName && <span className="badge bg-dark text-white p-2 px-3 rounded-pill">Shopping as {userName}</span>}
//       </div>

//       {safeCart.length === 0 ? (
//         <div className="text-center py-5 shadow-sm bg-white rounded-5 border">
//           <div className="display-1 mb-3">👟</div>
//           <p className="fs-4 text-muted fw-bold">Your bag is empty!</p>
//           <Link to="/home" className="btn btn-dark btn-lg px-5 rounded-pill shadow-sm">
//             Shop New Arrivals
//           </Link>
//         </div>
//       ) : (
//         <div className="row g-4">
//           <div className="col-lg-8">
//             {safeCart.map((item, index) => {
//               // MongoDB ID (_id) અથવા Local ID (id) શોધો
//               const itemId = item._id || item.id; 
              
//               return (
//                 <div className="card mb-3 shadow-sm border-0 rounded-4 overflow-hidden" key={itemId || index}>
//                   <div className="card-body p-0">
//                     <div className="row g-0 align-items-center">
//                       <div className="col-4 col-md-3 bg-light d-flex align-items-center justify-content-center p-3">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="img-fluid rounded-3"
//                           style={{ maxHeight: '120px', objectFit: 'contain' }}
//                           onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} 
//                         />
//                       </div>

//                       <div className="col-8 col-md-9 p-3 p-md-4">
//                         <div className="d-flex justify-content-between">
//                           <div>
//                             <h5 className="fw-bold mb-1">{item.name}</h5>
//                             <p className="text-muted small mb-2 text-uppercase">{item.category || 'Sneakers'}</p>
//                           </div>
//                           <button
//                             className="btn btn-outline-danger btn-sm rounded-circle border-0"
//                             style={{ width: '35px', height: '35px' }}
//                             onClick={() => removeFromCart(itemId)}
//                           >
//                             🗑️
//                           </button>
//                         </div>

//                         <div className="d-flex justify-content-between align-items-center mt-2">
                          
//                           {/* --- Quantity Controls Section --- */}
//                           <div>
//                             <div className="input-group input-group-sm border rounded-pill overflow-hidden shadow-sm" style={{ width: '110px' }}>
//                               <button
//                                 className="btn btn-white border-0"
//                                 onClick={() => updateQuantity(itemId, -1)}
//                                 disabled={item.quantity <= 1} 
//                               >
//                                 -
//                               </button>

//                               <span className="input-group-text bg-white border-0 fw-bold flex-grow-1 justify-content-center">
//                                 {item.quantity}
//                               </span>

//                               {/* --- નવો કોડ અહીં એડ કર્યો છે --- */}
//                               <button
//                                 className="btn btn-white border-0"
//                                 onClick={() => updateQuantity(itemId, 1)}
                             
//                                 disabled={item.quantity >= item.stock} 
//                               >
//                                 +
//                               </button>
//                             </div>
                            
//                             {/* સ્ટોક લિમિટ માટે ચેતવણી મેસેજ */}
//                             {item.quantity >= item.stock && (
//                               <small className="text-danger d-block mt-1 fw-bold" style={{fontSize: '0.65rem'}}>
//                                  Only{item.stock} items available.
//                               </small>
//                             )}
//                             {/* {item.quantity >= item.stock && (
//   <small className="text-danger d-block mt-1 fw-bold" style={{fontSize: '0.65rem'}}>
//     Only {item.stock} items available.
//   </small>
// )} */}
//                           </div>

//                           <div className="text-end">
//                             <span className="fs-5 fw-bold text-dark">{formatINR(item.price * item.quantity)}</span>
//                             <div className="text-muted small">{formatINR(item.price)} each</div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="col-lg-4">
//             <div className="card p-4 shadow-sm border-0 rounded-5 sticky-top" style={{ top: '6rem' }}>
//               <h4 className="fw-bold mb-4">Summary</h4>
//               <div className="d-flex justify-content-between mb-2">
//                 <span className="text-muted">Subtotal</span>
//                 <span className="fw-bold">{formatINR(total)}</span>
//               </div>
//               <div className="d-flex justify-content-between mb-2">
//                 <span className="text-muted">Estimated GST (12%)</span>
//                 <span className="fw-bold">{formatINR(tax)}</span>
//               </div>
//               <hr className="my-4 opacity-10" />
//               <div className="d-flex justify-content-between mb-4">
//                 <span className="fs-5 fw-bold">Total</span>
//                 <span className="fs-4 fw-bold text-dark">{formatINR(total + tax)}</span>
//               </div>
//               <Link to="/checkout" className="btn btn-dark btn-lg w-100 rounded-pill py-3 shadow mb-3 fw-bold">
//                 Member Checkout
//               </Link>
//               <button 
//                 className="btn btn-outline-secondary btn-sm w-100 rounded-pill py-2 border-0" 
//                 onClick={() => navigate('/home')}
//               >
//                 ← Continue Shopping
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Ensure toast is imported if you use it here
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({ cart, userName, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();

  // Currency Formatter
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Safety: Fallback to empty array
  const safeCart = cart || [];

  // Calculations
  const total = safeCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = total * 0.12;

  return (
    <div className="container mt-5 mb-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="fw-bold mb-0 fst-italic">YOUR BAG</h2>
          <p className="text-muted mb-0">{safeCart.length} items in your cart</p>
        </div>
        {userName && (
          <span className="badge bg-dark text-white p-2 px-3 rounded-pill">
            Shopping as {userName}
          </span>
        )}
      </div>

      {safeCart.length === 0 ? (
        /* Empty State */
        <div className="text-center py-5 shadow-sm bg-white rounded-5 border">
          <div className="display-1 mb-3">👟</div>
          <p className="fs-4 text-muted fw-bold">Your bag is empty!</p>
          <Link to="/home" className="btn btn-dark btn-lg px-5 rounded-pill shadow-sm">
            Shop New Arrivals
          </Link>
        </div>
      ) : (
        /* Cart Content */
        <div className="row g-4">
          <div className="col-lg-8">
            {safeCart.map((item, index) => {
              const itemId = item._id || item.id;
              const isMaxStock = item.quantity >= item.stock;

              return (
                <div className="card mb-3 shadow-sm border-0 rounded-4 overflow-hidden" key={itemId || index}>
                  <div className="card-body p-0">
                    <div className="row g-0 align-items-center">
                      {/* Image */}
                      <div className="col-4 col-md-3 bg-light d-flex align-items-center justify-content-center p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded-3"
                          style={{ maxHeight: '120px', objectFit: 'contain' }}
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                        />
                      </div>

                      {/* Details */}
                      <div className="col-8 col-md-9 p-3 p-md-4">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h5 className="fw-bold mb-1">{item.name}</h5>
                            <p className="text-muted small mb-2 text-uppercase">{item.category || 'Sneakers'}</p>
                          </div>
                          <button
                            className="btn btn-outline-danger btn-sm rounded-circle border-0"
                            style={{ width: '35px', height: '35px' }}
                            onClick={() => removeFromCart(itemId)}
                          >
                            🗑️
                          </button>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-2">
                          {/* Quantity Controls */}
                          <div>
                            <div className="input-group input-group-sm border rounded-pill overflow-hidden shadow-sm" style={{ width: '110px' }}>
                              <button
                                className="btn btn-white border-0"
                                onClick={() => updateQuantity(itemId, -1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="input-group-text bg-white border-0 fw-bold flex-grow-1 justify-content-center">
                                {item.quantity}
                              </span>
                              <button
                                className="btn btn-white border-0"
                                onClick={() => updateQuantity(itemId, 1)}
                                disabled={isMaxStock}
                              >
                                +
                              </button>
                            </div>
                            
                            {/* Stock Limit Message */}
                            {isMaxStock && (
                              <small className="text-danger d-block mt-1 fw-bold" style={{fontSize: '0.7rem'}}>
                                Max stock reached ({item.stock} available)
                              </small>
                            )}
                          </div>

                          {/* Pricing */}
                          <div className="text-end">
                            <span className="fs-5 fw-bold text-dark">{formatINR(item.price * item.quantity)}</span>
                            <div className="text-muted small">{formatINR(item.price)} each</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar Summary */}
          <div className="col-lg-4">
            <div className="card p-4 shadow-sm border-0 rounded-5 sticky-top" style={{ top: '6rem' }}>
              <h4 className="fw-bold mb-4">Summary</h4>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">{formatINR(total)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Estimated GST (12%)</span>
                <span className="fw-bold">{formatINR(tax)}</span>
              </div>
              <hr className="my-4 opacity-10" />
              <div className="d-flex justify-content-between mb-4">
                <span className="fs-5 fw-bold">Total</span>
                <span className="fs-4 fw-bold text-dark">{formatINR(total + tax)}</span>
              </div>
              <Link to="/checkout" className="btn btn-dark btn-lg w-100 rounded-pill py-3 shadow mb-3 fw-bold">
                Member Checkout
              </Link>
              <button 
                className="btn btn-outline-secondary btn-sm w-100 rounded-pill py-2 border-0" 
                onClick={() => navigate('/home')}
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;