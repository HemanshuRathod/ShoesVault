import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shoe, setShoe] = useState(null);
  const [relatedShoes, setRelatedShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);


  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products');
        const allData = await response.json();
        
        const foundShoe = allData.find(s => s._id === id || String(s.id) === String(id));
        setShoe(foundShoe);

       
        if (foundShoe) {
          const related = allData
            .filter(s => s.category === foundShoe.category && (s._id !== foundShoe._id && s.id !== foundShoe.id))
            .slice(0, 4);
          setRelatedShoes(related);
        }

        setLoading(false);
        window.scrollTo(0, 0); 
      } catch (error) {
        console.error("Error fetching product detail:", error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 mt-5 text-center">
        <div className="spinner-border text-warning" role="status"></div>
        <p className="mt-3 fw-bold">Opening the Vault...</p>
      </div>
    );
  }

  if (!shoe) {
    return (
      <div className="container py-5 mt-5 text-center">
        <h2 className="fw-black italic text-uppercase">PRODUCT_NOT_FOUND_IN_VAULT</h2>
        <button className="btn btn-dark mt-3 rounded-0 px-4" onClick={() => navigate('/home')}>RETURN_HOME</button>
      </div>
    );
  }

  const formatINR = (amount) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(amount);

  return (
    <div className="container mt-5 mb-5">
      {/* Back Button */}
      <button 
        className="btn btn-outline-dark rounded-pill px-4 mb-5 shadow-sm transition fw-bold" 
        onClick={() => navigate(-1)}
      >
        ← BACK_TO_COLLECTION
      </button>

      <div className="row g-5 align-items-center">
        {/* LEFT: Product Image Section */}
        <div className="col-md-6">
          <div className="p-5 bg-white rounded-5 shadow-lg position-relative border border-warning border-3 overflow-hidden">
            <div className="position-absolute top-0 end-0 m-4 badge bg-dark text-warning px-3 py-2 rounded-0 fw-black italic z-3">
              VAULT_ID: #{shoe._id ? shoe._id.substring(0, 6).toUpperCase() : shoe.id}
            </div>

            <img 
              src={shoe.image} 
              className="img-fluid transition-zoom" 
              alt={shoe.name} 
              style={{ maxHeight: '450px', width: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* RIGHT: Product Info Section */}
        <div className="col-md-6">
          <div className="ps-md-4">
            <span className="text-uppercase tracking-widest text-warning fw-black small italic">
              {shoe.brand || shoe.category} 
            </span>
            <h1 className="display-4 fw-black mb-3 mt-1 text-uppercase">{shoe.name}</h1>
            
            <div className="d-flex align-items-center gap-3 mb-4">
              <h2 className="text-dark fw-black mb-0">{formatINR(shoe.price)}</h2>
              <span className={`badge ${shoe.stock > 0 ? 'bg-warning text-dark' : 'bg-danger text-white'} px-3 py-2 rounded-pill fw-bold`}>
                {shoe.stock > 0 ? 'READY_TO_SHIP' : 'OUT_OF_STOCK'}
              </span>
            </div>

            <p className="lead text-muted mb-4 fw-bold">
              {shoe.description || "Every pair in our vault is 100% verified for authenticity and quality by our expert team."}
            </p>

            {/* Size Selector */}
            <div className="mb-5">
              <h6 className="fw-black italic mb-3">SELECT_YOUR_SIZE (UK/INDIA)</h6>
              <div className="d-flex flex-wrap gap-2">
                {[7, 8, 9, 10, 11, 12].map(size => (
                  <button 
                    key={size} 
                    className={`btn rounded-0 border-2 px-4 py-2 fw-bold ${selectedSize === size ? 'btn-warning text-dark border-warning' : 'btn-outline-dark'}`}
                    onClick={() => setSelectedSize(size)}
                    disabled={shoe.stock <= 0}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons: Updated with Navigate Logic */}
            <div className="d-flex gap-3">
              <button 
                onClick={() => {
                  addToCart(shoe);     // ૧. પ્રોડક્ટ એડ કરો
                  navigate('/cart');   // ૨. કાર્ટ પેજ પર લઈ જાઓ
                }} 
                className="btn btn-dark btn-lg flex-grow-1 py-3 rounded-0 fw-black italic shadow hover-lift"
                disabled={shoe.stock <= 0}
              >
                {shoe.stock > 0 ? 'ADD_TO_CART' : 'NOT_AVAILABLE'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: Related Items Section */}
      {relatedShoes.length > 0 && (
        <div className="mt-5 pt-5 border-top">
          <h3 className="fw-black italic mb-4 text-outline">MORE_FROM_THE_VAULT</h3>
          <div className="row g-4">
            {relatedShoes.map(related => (
              <div key={related._id || related.id} className="col-6 col-md-3">
                <div 
                  className="card shoe-card border-0 bg-white p-3 hover-lift shadow-sm h-100" 
                  onClick={() => navigate(`/product/${related._id || related.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={related.image} className="img-fluid" alt={related.name} style={{ height: '120px', objectFit: 'contain' }} />
                  <div className="text-center mt-3">
                    <p className="x-small fw-black text-uppercase mb-0 text-truncate">{related.name}</p>
                    <p className="small text-warning fw-bold">{formatINR(related.price)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;