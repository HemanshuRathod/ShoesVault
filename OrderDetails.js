


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaFileInvoice, FaArrowLeft } from 'react-icons/fa';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/order-details/${orderId}`)
      .then(res => res.json())
      .then(data => {
        setOrderDetails(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching vault records:", err);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <div className="p-5 text-center mt-5"><div className="spinner-border text-warning"></div><p>Loading Vault Records...</p></div>;
  if (!orderDetails || orderDetails.length === 0) return <div className="p-5 text-center mt-5"><h4>No records found for this ID.</h4><Link to="/orders">Return to Orders</Link></div>;

  const orderMeta = orderDetails[0];
  const subtotal = orderDetails.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gst = subtotal * 0.18; // 18% GST for India

  return (
    <div className="container py-5 mt-5">
      {/* Navigation and Title */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <Link to="/orders" className="text-decoration-none text-dark small fw-bold mb-2 d-block">
            <FaArrowLeft className="me-1" /> BACK TO MY VAULT
          </Link>
          <h2 className="fw-black italic text-uppercase mb-0">Vault_Receipt <span className="text-warning">#{orderId}</span></h2>
        </div>
        <button onClick={() => window.print()} className="btn btn-outline-dark fw-bold rounded-pill px-4">
          <FaFileInvoice className="me-2" /> PRINT GST INVOICE
        </button>
      </div>

      <div className="row g-4">
        {/* Item List */}
        <div className="col-md-8">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="bg-light p-3 border-bottom px-4 fw-bold text-uppercase small tracking-widest">
              Secured_Items_Log
            </div>
            <div className="card-body p-4">
              {orderDetails.map((item, index) => (
                <div key={index} className="d-flex align-items-center mb-3 pb-3 border-bottom last-child-no-border">
                  <div className="bg-light rounded-3 p-2">
                    <img src={item.image} width="80" height="80" style={{objectFit: 'contain'}} alt={item.name} />
                  </div>
                  <div className="ms-4 flex-grow-1">
                    <h6 className="fw-black mb-1">{item.name}</h6>
                    <p className="small text-muted mb-0">Unit Price: ₹{item.price.toLocaleString('en-IN')}</p>
                    <p className="small fw-bold mb-0">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-end">
                    <span className="fw-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="col-md-4">
          <div className="card border-0 bg-dark text-white rounded-4 p-4 shadow-lg">
            <h5 className="fw-bold border-bottom border-secondary pb-3 mb-3 italic">FINANCIAL_LOG</h5>
            
            <div className="d-flex justify-content-between mb-2 opacity-75">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="d-flex justify-content-between mb-2 opacity-75">
              <span>GST (18%)</span>
              <span>₹{gst.toLocaleString('en-IN')}</span>
            </div>
            <div className="d-flex justify-content-between mb-2 opacity-75">
              <span>Shipping</span>
              <span className="text-success fw-bold">FREE</span>
            </div>

            <div className="d-flex justify-content-between border-top border-warning pt-3 mt-3">
              <span className="h5 fw-black text-warning">NET_TOTAL</span>
              <span className="h5 fw-black text-warning">₹{orderMeta.total_amount?.toLocaleString('en-IN') || subtotal + gst}</span>
            </div>

            <div className="mt-4 pt-4 border-top border-secondary">
              <p className="x-small text-muted mb-1 text-uppercase fw-bold tracking-widest">Billing Info</p>
              <p className="small mb-0">Status: <span className="text-success fw-bold">● PAID</span></p>
              <p className="small mb-0">Method: UPI / Online Payment</p>
            </div>
          </div>
          
          <div className="alert alert-warning mt-4 rounded-4 border-0 small">
            <strong>Note:</strong> This is a digitally generated tax invoice for your sneaker investment. Keep this for your records.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;