import React from 'react';
import { Link, Outlet,NavLink } from 'react-router-dom';
// import "../Admin/admin.css"

const AdminLayout = () => {
  return (
    <div className="d-flex bg-light min-vh-100">

      {/* SIDEBAR */}
      <div className="bg-dark text-white p-4 position-fixed h-100" style={{ width: '260px' }}>
        <h3 className="fw-black italic text-warning mb-5">ADMIN<span className="text-white">PANEL</span></h3>
        <div className="list-group list-group-flush">
          <Link to="/admin" className="list-group-item list-group-item-action bg-transparent text-white border-0 py-3 fw-bold">📊 Dashboard</Link>
          <Link to="/admin/products" className="list-group-item list-group-item-action bg-transparent text-white border-0 py-3 fw-bold">👟 Products</Link>
          <Link to="/admin/category" className="list-group-item list-group-item-action bg-transparent text-white border-0 py-3 fw-bold">👟 category</Link>
          <Link to="/admin/users" className="list-group-item list-group-item-action bg-transparent text-white border-0 py-3 fw-bold">👥 Users</Link>
          <Link to="/admin/orders" className="list-group-item list-group-item-action bg-transparent text-white border-0 py-3 fw-bold">📦 Orders</Link>
     

          <hr className="bg-secondary" />
          <Link to="/home" className="list-group-item list-group-item-action bg-transparent text-warning border-0 py-3 small">← Exit to Store</Link>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow-1" style={{ marginLeft: '260px', padding: '40px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;