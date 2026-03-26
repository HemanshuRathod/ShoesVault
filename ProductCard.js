


import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';

const ProductCard = ({ shoe, addToCart, toggleWishlist, isWishlisted }) => {
  // Unify ID for SQLite (id) or MongoDB (_id)
  const shoeId = shoe.id || shoe._id;

  // Helper to format currency in INR (₹)
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="card h-100 shoe-card border-0 shadow-sm rounded-4 overflow-hidden position-relative transition-up">
      {/* Category Badge */}
      <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: 5 }}>
        <span className="badge bg-dark text-uppercase italic fw-bold px-3 py-2 shadow-sm">
          {shoe.category || shoe.type}
        </span>
      </div>

      {/* Wishlist Button */}
      <button 
        className="position-absolute top-0 end-0 m-3 btn btn-white rounded-circle p-2 shadow-sm border-0"
        onClick={() => toggleWishlist(shoe)}
        style={{ zIndex: 5, width: '40px', height: '40px' }}
      >
        <Heart 
          size={20} 
          fill={isWishlisted ? "#ff4757" : "none"} 
          stroke={isWishlisted ? "#ff4757" : "#000"} 
        />
      </button>

      {/* Product Image Section */}
      
      <div className="shoe-img-container bg-light d-flex align-items-center justify-content-center" style={{ height: '260px' }}>
        <img 
          src={shoe.image || shoe.img} 
          className="card-img-top p-4 transition-transform" 
          alt={shoe.name}
          style={{ maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Card Body */}
      <div className="card-body text-center d-flex flex-column p-4">
        <small className="text-warning fw-bold text-uppercase tracking-widest" style={{ fontSize: '0.7rem' }}>
          {shoe.brand}
        </small>
        <h5 className="card-title fw-black italic text-uppercase mb-2 text-truncate">{shoe.name}</h5>
        
        <div className="mt-auto">
          <div className="mb-3">
            <h4 className="fw-black text-dark mb-0">{formatINR(shoe.price)}</h4>
            <small className="text-success fw-bold">FREE DELIVERY</small>
          </div>
          
          <div className="d-flex gap-2 justify-content-center">
            <Link to={`/product/${shoeId}`} className="btn btn-outline-dark rounded-pill px-3 py-2 flex-grow-1 fw-bold small text-uppercase">
              <Eye size={16} className="me-1" /> View
            </Link>
            <button 
              className="btn btn-warning rounded-pill px-3 py-2 flex-grow-1 fw-black italic small text-uppercase shadow-sm"
              onClick={() => addToCart(shoe)}
            >
              <ShoppingCart size={16} className="me-1" /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;