import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("SUCCESS:Password changed. Please login with your new password.");
        navigate('/login'); 
      } else {
        alert(result.error || "Reset failed");
      }
    } catch (error) {
      alert("SERVER_OFFLINE: Please start the server or check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 p-0 overflow-hidden">
      <div className="row g-0 h-100">
        
        {/* Left Side: Image (Consistent with Login/Register) */}
        <div className="col-md-6 d-none d-md-flex bg-dark align-items-center justify-content-center position-relative">
          <div className="position-absolute top-0 start-0 p-5">
            <h2 className="text-white fw-bold tracking-widest">SHOE<span className="text-warning">VAULT</span></h2>
          </div>
          <div className="text-center z-1 p-5">
            <img 
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800" 
              alt="Reset Password" 
              className="img-fluid floating-sneaker"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))' }}
            />
            <h1 className="text-white mt-5 display-4 fw-bold">SECURE_RECOVERY</h1>
            <p className="text-white-50 lead">Set your new password and regain access to your account.</p>
          </div>
        </div>

        {/* Right Side: Reset Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
          <div className="p-5 w-100" style={{ maxWidth: '500px' }}>
            <div className="mb-5">
              <h2 className="fw-black italic text-uppercase mb-2">Reset_Password</h2>
              <p className="text-muted">Enter your registered email and a new password.</p>
            </div>
            
            <form onSubmit={handleReset}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-uppercase">Registered Email</label>
                <div className="input-group border rounded-3 overflow-hidden">
                  <span className="input-group-text bg-light border-0">✉️</span>
                  <input 
                    type="email" 
                    className="form-control bg-light border-0 py-3 shadow-none" 
                    placeholder="your-email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase">New Password</label>
                <div className="input-group border rounded-3 overflow-hidden">
                  <span className="input-group-text bg-light border-0">🔒</span>
                  <input 
                    type="password" 
                    className="form-control bg-light border-0 py-3 shadow-none" 
                    placeholder="••••••••"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-dark w-100 py-3 rounded-0 fw-black italic shadow-lg mb-4"
                disabled={loading}
              >
                {loading ? "UPDATING_VAULT..." : "UPDATE_PASSWORD"}
              </button>
            </form>

            <div className="text-center mt-4">
              <Link to="/login" className="text-muted small text-decoration-none">← Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;