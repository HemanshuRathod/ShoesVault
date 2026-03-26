import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = ({ userName }) => {
  const location = useLocation();
  // Get the real ID from the backend (passed via navigate) or fallback to a placeholder
  const actualOrderId = location.state?.orderId || "SV-TXN";

  // Helper for Indian Date Format
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-5 overflow-hidden text-center bg-white">
            
            {/* Top Success Banner */}
            <div className="bg-warning py-5 text-white position-relative overflow-hidden">
              <div className="position-absolute bg-white opacity-10 rounded-circle" style={{ width: '200px', height: '200px', top: '-50px', right: '-50px' }}></div>
              <div className="position-absolute bg-white opacity-10 rounded-circle" style={{ width: '100px', height: '100px', bottom: '-20px', left: '-20px' }}></div>
              
              <div className="display-1 mb-0" style={{ filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.1))' }}>🎊</div>
              <h2 className="fw-black italic text-uppercase mt-2">Awesome!</h2>
            </div>

            <div className="card-body p-4 p-md-5">
              <h1 className="fw-black text-uppercase mb-3 h2">Order Confirmed</h1>
              <p className="text-muted px-md-2">
                Hey <span className="text-dark fw-bold">{userName || "Shopper"}</span>, your order has been received and is now being processed in the vault.
              </p>
              
              {/* Order Info Bar */}
              <div className="my-5 py-4 border-top border-bottom d-flex justify-content-around align-items-center bg-light rounded-4 shadow-sm">
                <div className="text-center">
                  <p className="mb-1 text-uppercase small text-muted fw-bold tracking-widest" style={{ fontSize: '0.65rem' }}>Order ID</p>
                  <h5 className="mb-0 fw-black text-warning">#{actualOrderId}</h5>
                </div>
                <div className="vr opacity-10" style={{ height: '40px' }}></div>
                <div className="text-center">
                  <p className="mb-1 text-uppercase small text-muted fw-bold tracking-widest" style={{ fontSize: '0.65rem' }}>Date</p>
                  <h5 className="mb-0 fw-black">{today}</h5>
                </div>
              </div>

              {/* Order Status Tracker */}
              <div className="mb-5 px-3">
                <h6 className="text-start fw-black text-uppercase italic mb-4 small tracking-tighter">Live_Logistics_Status</h6>
                <div className="d-flex justify-content-between position-relative">
                  <div className="text-center" style={{ zIndex: 1 }}>
                    <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center mb-2 mx-auto shadow" style={{ width: '35px', height: '35px' }}>1</div>
                    <span className="small fw-bold d-block">Placed</span>
                  </div>
                  <div className="text-center" style={{ zIndex: 1 }}>
                    <div className="bg-white text-muted border rounded-circle d-flex align-items-center justify-content-center mb-2 mx-auto shadow-sm" style={{ width: '35px', height: '35px' }}>2</div>
                    <span className="small text-muted">Packing</span>
                  </div>
                  <div className="text-center" style={{ zIndex: 1 }}>
                    <div className="bg-white text-muted border rounded-circle d-flex align-items-center justify-content-center mb-2 mx-auto shadow-sm" style={{ width: '35px', height: '35px' }}>3</div>
                    <span className="small text-muted">Shipped</span>
                  </div>
                  <div className="position-absolute bg-light" style={{ height: '4px', width: '90%', top: '16px', left: '5%', zIndex: 0 }}></div>
                </div>
              </div>

              {/* --- Action Buttons (સુધારેલું સેક્શન) --- */}
              <div className="d-grid gap-3">
                <Link to="/orders" className="btn btn-warning btn-lg rounded-pill py-3 fw-black text-uppercase italic shadow-sm">
                  View My Orders
                </Link>
                <Link to="/home" className="btn btn-dark btn-lg rounded-pill py-3 fw-bold text-uppercase shadow-sm">
                  Continue Shopping
                </Link>
                {/* <button 
                  className="btn btn-link text-decoration-none text-muted small fw-bold mt-2"
                  onClick={() => window.print()}
                >
                  📄 Save Receipt as PDF
                </button> */}
              </div>
            </div>
          </div>
          
          <p className="text-center mt-4 text-muted small">
            Need help with your shipment? <Link to="/contact" className="text-success text-decoration-none fw-bold">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;