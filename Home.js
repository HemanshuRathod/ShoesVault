


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ShoeApp = ({ addToCart, userName, toggleWishlist, wishlist = [] }) => {
  const [products, setProducts] = useState([]); // લાઈવ પ્રોડક્ટ્સ
  const [categories, setCategories] = useState([]); // લાઈવ કેટેગરીઝ (VKC, Sports વગેરે)
  const [loading, setLoading] = useState(true);
  
  const [mainFilter, setMainFilter] = useState("All"); // Men, Women, Kids
  const [subFilter, setSubFilter] = useState("All");   // VKC, Sports વગેરે
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();

  // 1. બેકએન્ડમાંથી ડેટા ખેંચવા માટે
  const fetchData = async () => {
    try {
      // પ્રોડક્ટ્સ ફેચ કરો
      const prodResponse = await fetch('http://localhost:5000/api/products');
      const prodData = await prodResponse.json();
      setProducts(prodData);

      // કેટેગરીઝ ફેચ કરો (જેમાં parentCategory હશે)
      const catResponse = await fetch('http://localhost:5000/api/categories');
      const catData = await catResponse.json();
      setCategories(catData);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. અત્યારે પસંદ કરેલી મેઈન કેટેગરીની અંદર કઈ સબ-કેટેગરી આવે છે તે શોધો
  const availableSubCats = categories.filter(cat => cat.parentCategory === mainFilter);

  // 3. ફિલ્ટર લોજિક
  const filteredShoes = products.filter(shoe => {
    // જો મેઈન ફિલ્ટર "All" હોય તો બધું બતાવો, નહીંતર પ્રોડક્ટની category મેચ કરો
    // નોંધ: જો તમે પ્રોડક્ટમાં સીધું "VKC" સેવ કરો છો, તો સબ-ફિલ્ટર કામ કરશે
    const matchesMain = mainFilter === "All" || shoe.category === mainFilter || categories.find(c => c.name === shoe.category)?.parentCategory === mainFilter;
    const matchesSub = subFilter === "All" || shoe.category === subFilter;
    const matchesSearch = shoe.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesMain && matchesSub && matchesSearch;
  });

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-warning mb-3"></div>
          <p className="fw-bold text-uppercase">Opening Vault...</p>
        </div>
      </div>
    );
  }

  return (
    // <div className="bg-light min-vh-100 pb-5">
    //   {/* Hero Section */}
    //   <div className="bg-dark text-white py-5 mb-5 overflow-hidden">
    //     <div className="container text-center">
    //       {userName && (
    //         <span className="badge bg-warning text-dark mb-2 fw-bold uppercase">
    //           WELCOME BACK, {userName}
    //         </span>
    //       )}
    //       <h1 className="display-4 fw-black italic">THE VAULT IS OPEN.</h1>
    //       <p className="lead text-secondary">
    //         Currently showing <strong>{filteredShoes.length}</strong> exclusive pairs.
    //       </p>
    //       <div className="col-md-5 d-none d-md-block">
    //           <img 
    //             src="https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&w=600" 
    //             alt="Hero" 
    //             className="img-fluid rounded-3 shadow border border-warning border-3" 
    //             style={{ transform: 'rotate(3deg)', width: '100%' }}
    //           />
    //         </div>
    //     </div>
    //   </div>
 <div className="bg-light min-vh-100 pb-5">
      {/* Hero Section */}
      <div className="bg-dark text-white py-5 mb-5 overflow-hidden">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 py-3">
              {userName && (
                <span className="badge bg-warning text-dark mb-2 fw-bold">
                  WELCOME BACK, {userName.toUpperCase()}
                </span>
              )}
              <h1 className="display-4 fw-bold italic">THE VAULT IS OPEN.</h1>
              <p className="lead text-secondary">
                Currently showing <strong>{filteredShoes.length}</strong> exclusive pairs.
              </p>
           
              
            </div>
            <div className="col-md-5 d-none d-md-block">
              <img 
                src="https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&w=600" 
                alt="Hero" 
                className="img-fluid rounded-3 shadow border border-warning border-3" 
                style={{ transform: 'rotate(3deg)', width: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {/* Search Bar */}
        <div className="row mb-5">
          <div className="col-md-8 mx-auto">
            <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden border bg-white">
              <span className="input-group-text bg-white border-0 ps-4">🔍</span>
              <input
                type="text"
                className="form-control border-0 py-3 ps-2 shadow-none"
                placeholder="Search sneakers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ૧. Main Category Filters (Men, Women, Kids) */}
        <div className="mb-4 text-center">
          <h6 className="fw-black italic mb-3 text-uppercase">Section_Select</h6>
          <div className="d-flex gap-2 overflow-auto pb-2 justify-content-center">
            {["All", "Men", "Women", "Kids"].map((mCat) => (
              <button
                key={mCat}
                onClick={() => { setMainFilter(mCat); setSubFilter("All"); }}
                className={`btn rounded-pill px-4 fw-bold transition ${mainFilter === mCat ? 'btn-dark shadow' : 'btn-white border text-muted'}`}
              >
                {mCat}
              </button>
            ))}
          </div>
        </div>

        {/* ૨. Dynamic Sub-Category Filters (VKC, Sports વગેરે) */}
        {mainFilter !== "All" && availableSubCats.length > 0 && (
            <div className="mb-5 p-3 bg-white rounded-4 shadow-sm border-start border-4 border-warning">
                <h6 className="fw-bold small text-muted mb-2 text-uppercase ps-2">Refine {mainFilter}'s Collection:</h6>
                <div className="d-flex gap-2 overflow-auto">
                    <button 
                        onClick={() => setSubFilter("All")}
                        className={`btn btn-sm rounded-pill px-3 ${subFilter === "All" ? 'btn-warning fw-bold' : 'btn-outline-secondary'}`}
                    >
                        All {mainFilter}
                    </button>
                    {availableSubCats.map((sCat) => (
                        <button
                            key={sCat._id}
                            onClick={() => setSubFilter(sCat.name)}
                            className={`btn btn-sm rounded-pill px-3 ${subFilter === sCat.name ? 'btn-warning fw-bold' : 'btn-outline-secondary'}`}
                        >
                            {sCat.name}
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* Product Grid */}
        <div className="row g-4">
          {filteredShoes.length > 0 ? (
            filteredShoes.map((shoe) => {
              const isWishlisted = wishlist?.some(item => (item._id === shoe._id || item.id === shoe._id));
              
              return (
                <div key={shoe._id} className="col-12 col-sm-6 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm rounded-4 card-hover transition">
                    <div className="position-relative">
                      <Link to={`/product/${shoe._id}`}>
                        <img 
                          src={shoe.image} 
                          className="card-img-top p-3" 
                          alt={shoe.name} 
                          style={{ height: '220px', objectFit: 'contain' }} 
                        />
                      </Link>
                      <button 
                        onClick={() => toggleWishlist(shoe)}
                        className="btn btn-white shadow-sm rounded-circle position-absolute top-0 end-0 m-3 border"
                        style={{ width: '40px', height: '40px', zIndex: 2 }}
                      >
                        {isWishlisted ? "❤️" : "🤍"}
                      </button>
                    </div>
                    
                    <div className="card-body text-center p-3">
                      <span className="text-muted small fw-bold text-uppercase tracking-widest" style={{fontSize: '0.7rem'}}>
                        {shoe.category}
                      </span>
                      <h6 className="fw-black my-2 text-truncate">{shoe.name}</h6>
                      <p className="text-warning fw-black mb-3 h5">{formatINR(shoe.price)}</p>
                      
                      <div className="d-flex flex-column gap-2">
                        <Link to={`/product/${shoe._id}`} className="btn btn-light border w-100 rounded-3 py-2 small fw-bold">
                          DETAILS
                        </Link>
                        <button 
                          onClick={() => {
                            addToCart(shoe);
                            navigate('/cart');
                          }}
                          className="btn btn-dark w-100 rounded-pill py-2 fw-bold"
                          disabled={shoe.stock <= 0}
                        >
                          {shoe.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-5 w-100">
              <h3 className="fw-black text-muted uppercase">No inventory found in this vault section.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoeApp;