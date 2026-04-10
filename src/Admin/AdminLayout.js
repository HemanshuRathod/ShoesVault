

import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';

const AdminLayout = () => {
  // Active લિંક માટે સ્ટાઇલ (જ્યારે લિંક પર ક્લિક કરો ત્યારે તે પીળી દેખાશે)
  const activeLinkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? 'rgba(255, 193, 7, 0.2)' : 'transparent',
    color: isActive ? '#ffc107' : 'white',
    borderRadius: '8px',
    transition: '0.3s'
  });

  return (
    <div className="d-flex bg-light min-vh-100">

      {/* SIDEBAR */}
      <div 
        className="bg-dark text-white p-4 position-fixed h-100 shadow" 
        style={{ width: '260px', zIndex: 1000 }}
      >
        <h3 className="fw-black text-warning mb-5 tracking-tighter">
          ADMIN<span className="text-white">PANEL</span>
        </h3>

        <div className="nav flex-column gap-2">
          <NavLink 
            to="/admin" 
            end 
            className="nav-link text-white py-3 fw-bold d-flex align-items-center" 
            style={activeLinkStyle}
          >
            <span className="me-2">📊</span> Dashboard
          </NavLink>

          <NavLink 
            to="/admin/products" 
            className="nav-link text-white py-3 fw-bold d-flex align-items-center" 
            style={activeLinkStyle}
          >
            <span className="me-2">👟</span> Products
          </NavLink>

          <NavLink 
            to="/admin/category" 
            className="nav-link text-white py-3 fw-bold d-flex align-items-center" 
            style={activeLinkStyle}
          >
            <span className="me-2">📂</span> Category
          </NavLink>

          <NavLink 
            to="/admin/users" 
            className="nav-link text-white py-3 fw-bold d-flex align-items-center" 
            style={activeLinkStyle}
          >
            <span className="me-2">👥</span> Users
          </NavLink>

          <NavLink 
            to="/admin/orders" 
            className="nav-link text-white py-3 fw-bold d-flex align-items-center" 
            style={activeLinkStyle}
          >
            <span className="me-2">📦</span> Orders
          </NavLink>

          <hr className="my-4 border-secondary" />

          <Link 
            to="/home" 
            className="nav-link text-warning py-2 small fw-bold mt-auto"
          >
            ← Exit to Store
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div 
        className="flex-grow-1" 
        style={{ marginLeft: '260px', padding: '40px', minHeight: '100vh' }}
      >
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;