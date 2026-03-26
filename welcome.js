


import React from 'react';
import { Link } from 'react-router-dom';

// --- Sub-Component 1: CategoryCard ---
const CategoryCard = ({ title, img, link }) => (
  <div className="col-md-4 mb-4">
    <div className="category-card position-relative overflow-hidden" style={{ height: '450px' }}>
      <img src={img} className="w-100 h-100 object-fit-cover transition-transform" alt={title} />
      <div className="position-absolute bottom-0 start-0 p-4 w-100 bg-dark-gradient">
        <h3 className="text-white fw-bold italic">{title}</h3>
        <Link to={link} className="btn btn-light btn-sm rounded-0 fw-bold px-3">SHOP NOW</Link>
      </div>
    </div>
  </div>
);

// --- Sub-Component 2: Footer ---


// --- Main Page Component ---
const Welcome = () => {
  return (
    <div className="welcome-page overflow-hidden">
      {/* Hero Section */}
      <div 
        className="position-relative vh-100 d-flex align-items-center justify-content-center text-white"
        style={{ background: '#000', overflow: 'hidden' }}
      >
        <div className="position-absolute w-100 text-center opacity-10 select-none d-none d-md-block" style={{ zIndex: 0 }}>
          <h1 style={{ fontSize: '25vw', fontWeight: '900', letterSpacing: '-10px' }}>JUST DO IT</h1>
        </div>

        <div className="container position-relative text-center" style={{ zIndex: 1 }}>
          <span className="badge rounded-pill bg-warning text-dark px-3 py-2 fw-bold mb-3">NEW ARRIVAL</span>
          <h1 className="display-1 fw-black italic mb-0 tracking-tighter">WIN FROM WITHIN</h1>
          <p className="lead mb-5 fs-4 text-uppercase tracking-widest opacity-75">Push your limits with the new Air Max series.</p>
          
          <div className="d-flex justify-content-center gap-4">
            <Link to="/home" className="btn btn-light btn-lg px-5 py-3 rounded-0 fw-bold hover-scale">SHOP COLLECTION</Link>
            <Link to="/register" className="btn btn-outline-light btn-lg px-5 py-3 rounded-0 fw-bold hover-scale">JOIN THE CLUB</Link>
          </div>
        </div>

        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80" 
          alt="Hero Sneaker" 
          className="position-absolute d-none d-lg-block hero-shoe"
          style={{ width: '40%', right: '5%', bottom: '10%', transform: 'rotate(-15deg)' }}
        />
      </div>

      {/* Editorial Layout */}
      <div className="container-fluid bg-white py-5 px-0">
        <div className="row g-0">
          <div className="col-md-6">
            <div className="position-relative overflow-hidden bg-light vh-50 feature-card">
              <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80" className="w-100 h-100 object-fit-cover transition-transform" alt="Run" />
              <div className="position-absolute bottom-0 start-0 p-5 text-white bg-dark-gradient w-100">
                <h2 className="fw-bold display-5 italic">FAST DELIVERY</h2>
                <Link to="/home" className="text-white fw-bold text-decoration-underline">Shop Running</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="position-relative overflow-hidden bg-light vh-50 feature-card">
              <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80" className="w-100 h-100 object-fit-cover transition-transform" alt="Style" />
              <div className="position-absolute bottom-0 start-0 p-5 text-white bg-dark-gradient w-100">
                <h2 className="fw-bold display-5 italic">EASY RETURNS</h2>
                <Link to="/home" className="text-white fw-bold text-decoration-underline">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Features */}
      <div className="container py-5 border-top">
        <div className="row text-start g-4">
          <div className="col-md-4">
            <h4 className="fw-bold text-uppercase italic">100% Authentic</h4>
            <p className="text-muted small">Every pair is verified by our team of experts before shipping.</p>
          </div>
          <div className="col-md-4">
            <h4 className="fw-bold text-uppercase italic">Member Access</h4>
            <p className="text-muted small">Log in to see limited edition colorways and member-only prices.</p>
          </div>
          <div className="col-md-4">
            <h4 className="fw-bold text-uppercase italic">Eco Friendly</h4>
            <p className="text-muted small">Move to zero. Discover sustainable materials in our latest gear.</p>
          </div>
        </div>
      </div>

      {/* Essentials Section */}
<section className="container py-5 mt-5">
  <h2 className="fw-black italic mb-4 text-uppercase">The Essentials</h2>

  <div className="row">
    <CategoryCard 
      title="SPORT PERFORMANCE" 
      img="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80" 
      link="/register"
    />

    <CategoryCard 
      title="LIFESTYLE CLASSICS" 
      img="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80" 
      link="/register"
    />

    <CategoryCard 
      title="STREET CULTURE" 
      img="https://media.landmarkshops.in/cdn-cgi/image/h=739,w=499,q=85,fit=cover/max-new/1000015390338-Black-BLACK-1000015390338_01-2100.jpg" 
      link="/register"
    />
  </div>
</section>
      
    
      {/* Footer placement */}
     
    </div>
  );
};

export default Welcome;