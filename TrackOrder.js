


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/details/${orderId}`);
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error("Tracking Error:", error);
      }
    };
    if (orderId) fetchOrderDetails();
  }, [orderId]);

  if (!order) return <div className="vh-100 d-flex justify-content-center align-items-center">Scanning Vault...</div>;

  // સ્ટેટસ મુજબ કયા સ્ટેપ્સ કમ્પ્લીટ છે તે લિસ્ટ
  const steps = [
    { title: "Order Confirmed", completed: true },
    { title: "Packing Started", completed: ['PACKING', 'SHIPPED', 'DELIVERED'].includes(order.status) },
    { title: "Shipped from Vault", completed: ['SHIPPED', 'DELIVERED'].includes(order.status) },
    { title: "Out for Delivery", completed: order.status === 'DELIVERED' },
    { title: "Arrived in Vault", completed: order.status === 'DELIVERED' },
  ];

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg border-0 rounded-5 p-5 bg-white">
            <h3 className="fw-black italic text-uppercase mb-4 border-bottom pb-3">Track_Package</h3>
            <p className="small text-muted mb-4">ORDER ID: <span className="text-dark fw-bold">#SV-{order._id.substring(0,8).toUpperCase()}</span></p>
            
            <div className="position-relative">
              {steps.map((step, index) => (
                <div key={index} className="d-flex mb-4 position-relative">
                  {index !== steps.length - 1 && (
                    <div className={`position-absolute ${step.completed ? 'bg-black' : 'bg-light'}`} 
                         style={{ width: '3px', height: '100%', left: '14px', top: '30px', zIndex: 0 }}></div>
                  )}
                  <div className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm me-4 ${step.completed ? 'bg-warning text-white' : 'bg-light text-muted'}`} 
                       style={{ width: '32px', height: '32px', zIndex: 1 }}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <div>
                    <h6 className={`fw-bold mb-0 ${step.completed ? 'text-dark' : 'text-muted'}`}>{step.title}</h6>
                    <small className="text-muted">{step.completed ? "Task Accomplished" : "In Progress"}</small>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/orders" className="btn btn-dark w-100 rounded-pill mt-4 fw-bold">Back to My Vault</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;