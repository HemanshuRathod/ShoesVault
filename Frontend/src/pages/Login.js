


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ handleLogin }) => { 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const credentials = {
      email: email.trim(),
      password: password
    };

    try {
      const success = await handleLogin(credentials);

      if (success) {
        toast.success("ACCESS_GRANTED: Welcome to the Vault.");
        navigate('/home'); 
      } else {
        // Error is usually handled inside handleLogin (in App.js), 
        // but we stop loading here if it fails.
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("CONNECTION_ERROR: Protocol failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 p-0 overflow-hidden">
      <div className="row g-0 h-100">
        {/* Form Section */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-white order-2 order-md-1">
          <div className="p-5 w-100" style={{ maxWidth: '500px' }}>
            <div className="mb-5">
              <h2 className="fw-bold mb-2 fst-italic text-uppercase">Welcome_Back</h2>
              <p className="text-muted small">Access your Jamnagar Vault collection.</p>
            </div>

            <form onSubmit={onFormSubmit}>
              <div className="mb-4">
                <label className="form-label small fw-bold">EMAIL</label>
                <input 
                  type="email" 
                  className="form-control bg-light border-0 py-3" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email"
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">PASSWORD</label>
                <input 
                  type="password" 
                  className="form-control bg-light border-0 py-3" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  required 
                />
              </div>

              <div className="text-end mb-4">
                <Link to="/forgot-password" size="small" className="text-muted small text-decoration-none fw-bold">
                  Forgot Password?
                </Link>
              </div>

              <button 
                type="submit" 
                className="btn btn-dark w-100 py-3 fw-bold fst-italic" 
                disabled={isLoading}
              >
                {isLoading ? "AUTHENTICATING..." : "ACCESS_VAULT"}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <span className="text-muted small">New? </span>
              <Link to="/register" className="text-dark fw-bold small text-decoration-none">JOIN_NOW</Link>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-md-6 bg-dark d-none d-md-flex align-items-center justify-content-center order-1 order-md-2">
           <img 
            src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800" 
            className="img-fluid" 
            style={{maxWidth: '80%', borderRadius: '20px'}} 
            alt="Vault" 
           />
        </div>
      </div>
    </div>
  );
};

export default Login;