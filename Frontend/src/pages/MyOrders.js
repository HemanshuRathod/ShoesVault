

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0,
    }).format(amount);
  };

  // ઓર્ડર ફેચ કરવા માટેનું ફંક્શન
  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/user/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Failed to fetch vault items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchOrders();
    else setLoading(false);
  }, [userId]);

  // --- નવું કેન્સલ ફંક્શન ---
  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this secure investment?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'CANCELLED' })
        });

        if (response.ok) {
          alert("Order Cancelled Successfully.");
          fetchOrders(); // લિસ્ટ અપડેટ કરો
        }
      } catch (error) {
        alert("Failed to cancel order.");
      }
    }
  };

  if (loading) return <div className="p-5 text-center">Opening Vault...</div>;

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="mb-5 border-start border-warning border-5 ps-4 py-2 d-flex align-items-end justify-content-between flex-wrap gap-3">
          <div>
            <h1 className="display-4 fw-black italic tracking-tighter mb-0 text-uppercase">Your <span className="text-warning">Vault</span> Items</h1>
          </div>
          <Link to="/home" className="btn btn-dark rounded-0 px-4 py-2 fw-bold italic small">← BACK TO SHOP</Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-5 shadow-sm"><h3>The Vault is Empty</h3></div>
        ) : (
          <div className="row g-5">
            {orders.map((order) => (
              <div className="col-12" key={order._id}>
                <div className="card border-0 shadow-lg rounded-5 overflow-hidden">
                  <div className="bg-dark text-white p-4 d-flex flex-wrap justify-content-between align-items-center">
                    <div className="d-flex gap-4">
                      <div>
                        <p className="text-warning mb-0 small fw-bold">ORDER ID</p>
                        <span className="fw-black">#SV-{order._id.substring(0, 8).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="text-muted mb-0 small fw-bold">NET VALUE</p>
                        <span className="fw-black text-warning">{formatINR(order.total_price)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 mt-md-0 d-flex gap-2 align-items-center">
                      {/* --- કેન્સલ બટન લોજિક --- */}
                      {['PENDING', 'PACKING', 'SHIPPED'].includes(order.status) && (
                        <button 
                          onClick={() => handleCancelOrder(order._id)}
                          className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold me-2"
                        >
                          CANCEL ORDER
                        </button>
                      )}

                      {order.status !== 'CANCELLED' && (
                        <Link to={`/track-order/${order._id}`} className="btn btn-outline-light btn-sm rounded-pill px-3">TRACK ORDER</Link>
                      )}
                      
                      <span className={`badge rounded-pill px-4 py-2 ${
                        order.status === 'DELIVERED' ? 'bg-success' : 
                        order.status === 'CANCELLED' ? 'bg-danger text-white' : 'bg-warning text-dark'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="card-body p-4 p-md-5 bg-white">
                    <div className="row g-4">
                      <div className="col-lg-7 border-end">
                        <h6 className="fw-black text-uppercase mb-4 italic">Items_Secured</h6>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="d-flex align-items-center mb-3 bg-light p-3 rounded-4">
                            <img src={item.img} alt={item.name} className="rounded-3 me-3" style={{width: '60px'}} />
                            <div className="flex-grow-1">
                              <h6 className="mb-0 fw-bold">{item.name}</h6>
                              <p className="small mb-0">Qty: {item.quantity}</p>
                            </div>
                            <div className="fw-black">{formatINR(item.price * item.quantity)}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="col-lg-5 ps-lg-5">
                        <h6 className="fw-black text-uppercase mb-4 italic">Logistics_Log</h6>
                        {order.status === 'CANCELLED' ? (
                          <div className="text-center py-4">
                            <h1 className="display-4">🚫</h1>
                            <h6 className="text-danger fw-black uppercase italic">Order_Terminated</h6>
                          </div>
                        ) : (
                          <div className="position-relative ps-4 border-start border-2 border-warning ms-2">
                            <p className="fw-bold mb-0 small">STATUS: {order.status}</p>
                            <p className="x-small text-muted">Your package is currently being processed.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;