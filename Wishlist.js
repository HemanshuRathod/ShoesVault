

import React from 'react';
import { Link } from 'react-router-dom';

const Wishlist = ({ wishlist, toggleWishlist, addToCart }) => {
  
  // Helper to format currency in INR (₹)
  const formatINR = (amount) => {
    // Handle cases where price might be a string with commas
    const numericPrice = typeof amount === 'string' ? parseFloat(amount.replace(/,/g, '')) : amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(numericPrice || 0);
  };

  // Logic to Move item from Wishlist to Cart
  const handleMoveToCart = (shoe) => {
    // 1. Normalize the object for the Cart logic
    const formattedItem = {
      ...shoe,
      id: shoe.id || shoe._id,
      // Ensure price is a clean number for calculations
      price: typeof shoe.price === 'string' ? parseFloat(shoe.price.replace(/,/g, '')) : shoe.price
    };

    // 2. Add to cart
    addToCart(formattedItem);

    // 3. Remove from wishlist (using your existing toggle function)
    toggleWishlist(shoe);
  };

  return (
    <div className="wishlist-page bg-light min-vh-100">
      
      {/* Premium Dark Header */}
      <div className="bg-dark text-white py-5 mb-5 shadow-lg border-bottom border-warning border-4">
        <div className="container text-center py-4">
          <h1 className="display-3 fw-black italic mb-2 text-uppercase">
            YOUR <span className="text-warning">Vault_List</span>
          </h1>
          <p className="lead opacity-75 text-uppercase tracking-widest small fw-bold">
            {wishlist.length} {wishlist.length === 1 ? 'Asset' : 'Assets'} secured for deployment
          </p>
        </div>
      </div>

      <div className="container pb-5">
        {wishlist.length === 0 ? (
          /* Empty State */
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-5 py-5 text-center bg-white">
                <div className="display-1 mb-3 opacity-25"> 💔</div>
                <h3 className="fw-black text-uppercase italic">Your vault is empty.</h3>
                <p className="text-muted mb-4 px-4 small fw-bold">Start adding your favorite Indian and global pairs to see them here.</p>
                <div className="px-5">
                   <Link to="/home" className="btn btn-warning btn-lg rounded-pill w-100 py-3 fw-black text-uppercase italic shadow-sm">
                    Back to Store
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Product Grid */
          <div className="row g-4">
            {wishlist.map((shoe) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={shoe.id || shoe._id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative bg-white transition-up">
                  
                  {/* Remove Button */}
                  <button 
                    className="btn position-absolute top-0 end-0 m-3 rounded-circle shadow-sm border-0"
                    onClick={() => toggleWishlist(shoe)}
                    style={{ 
                        zIndex: 10, 
                        background: 'rgba(255, 255, 255, 0.9)', 
                        backdropFilter: 'blur(5px)',
                        width: '38px',
                        height: '38px'
                    }}
                    // title="Remove from wishlist"
                  >
                    ❤️
                  </button>
                  
                  {/* Image Area */}
                  <div className="p-4 d-flex align-items-center justify-content-center bg-white" style={{ height: '220px' }}>
                    <img 
                      src={shoe.image || shoe.img} 
                      className="img-fluid" 
                      alt={shoe.name} 
                      style={{ maxHeight: '100%', objectFit: 'contain' }} 
                    />
                  </div>
                  
                  {/* Details Area */}
                  <div className="card-body text-center p-4">
                    <span className="text-uppercase text-warning fw-black italic small d-block mb-1" style={{ fontSize: '0.7rem', letterSpacing: '2px' }}>
                        {shoe.brand}
                    </span>
                    <h6 className="fw-bold mb-2 text-truncate">{shoe.name}</h6>
                    
                    {/* Display formatted INR Price */}
                    <h5 className="text-dark fw-black mb-3">{formatINR(shoe.price)}</h5>
                    
                    {/* "Move to Cart" button now handles normalization and removal */}
                    <button 
                      className="btn btn-warning w-100 rounded-pill py-2 fw-black text-uppercase italic shadow-sm"
                      onClick={() => handleMoveToCart(shoe)}
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;