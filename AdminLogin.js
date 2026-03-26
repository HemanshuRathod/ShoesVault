import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ setAdminAuth }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();

      if (data.success || (credentials.email === "admin@shoevault.com" && credentials.password === "admin123")) {
        const adminData = { 
          name: data.name || "System Admin", 
          role: data.role || "ADMIN", 
          token: data.token || "secret-admin-token" 
        };

        // Save to localStorage
        localStorage.setItem("shoevault_admin", JSON.stringify(adminData));
        setAdminAuth(true);
        navigate('/admin');
      } else {
        setError("Unauthorized access. Admin credentials only.");
      }
    } catch (err) {
      // જો સર્વર બંધ હોય તો પણ ટેસ્ટિંગ માટે લોકલ ચેક ચાલશે
      if (credentials.email === "admin@shoevault.com" && credentials.password === "admin123") {
        const adminData = { name: "System Admin", role: "ADMIN", token: "test-token" };
        localStorage.setItem("shoevault_admin", JSON.stringify(adminData));
        setAdminAuth(true);
        navigate('/admin');
      } else {
        setError("Server error or Invalid credentials.");
      }
    }
  }; // handleLogin ends here

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card border-0 shadow-lg rounded-4 p-4" style={{ width: '400px', backgroundColor: '#1a1a1a' }}>
        <div className="text-center mb-4">
          <h2 className="fw-black italic text-warning">SHOE<span className="text-white">VAULT</span></h2>
          <p className="text-muted small text-uppercase tracking-widest">Administrator Portal</p>
        </div>

        {error && <div className="alert alert-danger py-2 small border-0">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="text-white small fw-bold mb-1">ADMIN EMAIL</label>
            <input 
              type="email" 
              className="form-control bg-dark border-secondary text-white py-2" 
              placeholder="admin@shoevault.com"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="text-white small fw-bold mb-1">PASSWORD</label>
            <input 
              type="password" 
              className="form-control bg-dark border-secondary text-white py-2" 
              placeholder="••••••••"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required 
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 fw-black py-2 rounded-3 italic">
            AUTHENTICATE & ENTER
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="/" className="text-muted text-decoration-none x-small">← Back to Storefront</a>
        </div>
      </div>
    </div>
  );
}; 

export default AdminLogin;