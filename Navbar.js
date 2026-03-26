import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Add this import at the top

const Navbar = ({ isLoggedIn, userName, userImage, cartCount, wishlistCount, handleLogout }) => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout(); // App.js માંથી આવતું ફંક્શન
    navigate('/login'); // લોગઆઉટ પછી લોગિન પેજ પર મોકલો
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3">
      <div className="container">
        
        {/* ૧. બ્રાન્ડ લોગો */}
        <Link className="navbar-brand fw-black tracking-tighter fs-3" to={isLoggedIn ? "/home" : "/"}>
          SHOE<span className="text-warning">VAULT</span>
        </Link>

        {/* મોબાઈલ માટે ટોગલ બટન */}
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ૨. મેઈન લિંક્સ */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-lg-4 gap-2">
             <li className="nav-item">
              <Link to="/welcome" className="nav-link fw-bold small text-uppercase">home</Link>
            </li>
            <li className="nav-item">
              <Link to="/home" className="nav-link fw-bold small text-uppercase">Shop All</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link fw-bold small text-uppercase">About Us</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link fw-bold small text-uppercase">Contact</Link>
            </li>
            {/* લોગિન હોય ત્યારે My Orders ને બહાર જ મૂકી દીધું છે */}
            {isLoggedIn && (
              <li className="nav-item">
                <Link to="/orders" className="nav-link fw-bold small text-uppercase">My Orders</Link>
              </li>
            )}
          </ul>

          {/* ૩. જમણી બાજુના આઈકોન્સ અને પ્રોફાઇલ */}
          <div className="ms-auto d-flex align-items-center gap-3 mt-3 mt-lg-0">
            
            {/* વિશલિસ્ટ આઈકોન */}
            <Link to="/wishlist" className="text-decoration-none text-dark position-relative">
              <span className="fs-5">❤️</span>
              {wishlistCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-dark" style={{fontSize: '0.6rem'}}>
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* કાર્ટ આઈકોન */}
            <Link to="/cart" className="text-decoration-none text-dark position-relative">
              <span className="fs-5">🛒</span>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-warning text-dark" style={{fontSize: '0.6rem'}}>
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="vr d-none d-lg-block mx-2" style={{height: '25px'}}></div>

            {/* ૪. યુઝર સેક્શન (તમારી ઈમેજ મુજબ સીધું લોગઆઉટ બટન) */}
            {isLoggedIn ? (
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                     <div 
  className="rounded-circle me-2 d-flex align-items-center justify-content-center" 
  style={{ 
    width: '32px', 
    height: '32px', 
    backgroundColor: '#ffc107', // Your Brand Yellow
    color: '#000',             // Black Icon
    fontSize: '20px',
    border: '1px solid #ffc107'
  }}
>
  <FaUserCircle />
  
</div>

                  <span className="fw-bold small d-none d-md-block text-uppercase">{userName}</span>
                </div>
                
                {/* ઈમેજમાં બતાવ્યા મુજબનું લોગઆઉટ બટન */}
                <button 
                  className="btn btn-sm btn-dark rounded-pill px-3 fw-bold small" 
                  onClick={onLogoutClick}
                >
                  LOGOUT 🚪
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-dark rounded-pill px-4 btn-sm fw-bold">Login</Link>
                <Link to="/register" className="btn btn-dark rounded-pill px-4 btn-sm fw-bold">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;