



import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-top py-5 mt-5">
      <div className="container">
        <div className="row">
          
          {/* COLUMN 1: BRAND */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold text-warning text-uppercase mb-4">SHOE VAULT</h5>
            <p className="text-secondary small lh-lg">
              The most trusted sneaker collective in Jamnagar, Gujarat. <br />
              100% Authenticity guaranteed on every pair. <br />
              Quality and style are our identity.
            </p>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="col-lg-3 col-md-6 mb-4 px-lg-5">
            <h5 className="fw-bold text-warning text-uppercase mb-4">QUICK LINKS</h5>
            <div className="d-flex flex-column gap-3">
              <Link to="/home" className="text-decoration-none text-dark small hover-warning-text">Home</Link>
              <Link to="/About" className="text-decoration-none text-dark small hover-warning-text">About Us</Link>
              <Link to="/Contact" className="text-decoration-none text-dark small hover-warning-text">Contact</Link>
             
            </div>
          </div>

          {/* COLUMN 3: CONTACT */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold text-warning text-uppercase mb-4">CONTACT</h5>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center small text-dark">
                <FaMapMarkerAlt className="me-3 text-warning" /> Jamnagar, Gujarat, India.
              </div>
              <a href="mailto:rathodhemanshu76@gmail.com" className="d-flex align-items-center small text-dark text-decoration-none hover-warning-text">
                <FaEnvelope className="me-3 text-warning" /> rathodhemanshu76@gmail.com
              </a>
              <a href="tel:+919016183770" className="d-flex align-items-center small text-dark text-decoration-none hover-warning-text">
                <FaPhoneAlt className="me-3 text-warning" /> +91 90161 83770
              </a>
            </div>
          </div>

          {/* COLUMN 4: FOLLOW US */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold text-warning text-uppercase mb-4">FOLLOW US</h5>
            <div className="d-flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-dark hover-warning-text"><FaFacebookF size={22} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-dark hover-warning-text"><FaInstagram size={22} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-dark hover-warning-text"><FaLinkedinIn size={22} /></a>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <hr className="my-5 opacity-10" />
        <div className="text-center py-2">
          <p className="text-dark mb-0 small">
            © 2026 All Rights Reserved by: <span className="text-warning fw-bold">ShoeVault</span>
          </p>
        </div>
      </div>

      {/* Internal CSS for Hover Effects */}
      <style>{`
        .hover-warning-text:hover {
          color: #ffc107 !important; /* Bootstrap Warning Yellow */
          transition: 0.3s;
          padding-left: 2px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
