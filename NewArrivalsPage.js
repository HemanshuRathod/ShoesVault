// import React, { useState } from 'react';
// import { FaHeart, FaRegHeart, FaShoppingCart, FaFire } from 'react-icons/fa';

// const ALL_SHOES_DATA = [
//   // --- NEW ARRIVALS / TRENDING ---
//   { id: "n1", name: "Premium Gold Wedding Mojari", brand: "Ethnix", price: 2499, image: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2018/09/pjimage-1535937268.jpg", category: "New", type: "Festival" },
//   { id: "n2", name: "Air Max Pulse Runner", brand: "Nike", price: 12995, image: "https://hummel.net.in/cdn/shop/files/blaze1.png?v=1770182331&width=1946", category: "New", type: "Sports" },
//   { id: "n3", name: "Genuine Leather Derby", brand: "Bata Red Label", price: 3999, image: "https://teakwoodleathers.com/cdn/shop/files/T_SH_CL_103_BR_1080x.jpg?v=1750933027", category: "New", type: "Formal" },
//   { id: "n4", name: "Cloud-Walk Track Shoes", brand: "Skechers", price: 5499, image: "https://m.media-amazon.com/images/I/7185fhK-gEL._AC_UY300_.jpg", category: "New", type: "Track" },
//   { id: "n5", name: "Party Wear Velvet Loafers", brand: "Raymond", price: 4200, image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600", category: "New", type: "Party" },
//   { id: "n6", name: "Canvas Festival Sneakers", brand: "Converse", price: 3299, image: "https://sc04.alicdn.com/kf/H323e08b2e6bd49978a4c6e02caf4bde0B.jpg", category: "New", type: "Festival" },
  
//   // --- MEN COLLECTION ---
//   { id: "m1", name: "Classic Tan Oxford", brand: "Bata", price: 2999, image: "https://teakwoodleathers.com/cdn/shop/files/T_SH_CL_103_BR_1080x.jpg?v=1750933027", category: "Men", type: "Formal" },
//   { id: "m2", name: "Royal Sherwani Mojari", brand: "Manyavar", price: 2199, image: "https://hitz.co.in/cdn/shop/files/6336-BROWN.jpg?v=1755619114", category: "Men", type: "Ethnic" },
//   { id: "m5", name: "Leather Trekking Boots", brand: "Woodland", price: 4495, image: "https://www.albertotorresi.com/cdn/shop/files/DSC_6837.jpg?v=1757404552", category: "Men", type: "Boots" },
//   { id: "m3", name: "Nitro-Blast Runners", brand: "Campus", price: 1850, image: "https://www.asics.co.in/media/catalog/product/1/0/1013a185_300_sl_lt_glb_1.jpg", category: "Men", type: "Sports" },
//   { id: "m4", name: "White Street Sneakers", brand: "Sparx", price: 1299, image: "https://assets.ajio.com/medias/sys_master/root/20240806/ceBM/66b218d31d763220fa62009a/-473Wx593H-700191363-brown-MODEL.jpg", category: "Men", type: "Casual" },
//   { id: "m6", name: "Classic Comfort Floaters", brand: "Action", price: 899, image: "https://hitz.co.in/cdn/shop/files/9357-BLACK.jpg?v=1755619124", category: "Men", type: "Sandals" },

//   // --- WOMEN COLLECTION ---
//   { id: "w1", name: "Zari Work Bridal Jutti", brand: "FabIndia", price: 1499, image: "https://www.jiomart.com/images/product/original/rvsthcnwl5/heer-women-s-traditional-flat-mojari-ethnic-shoes-handmade-shoes-embroidered-canvas-slip-on-bellies-traditional-casual-ethnic-foot-wear-black-product-images-rvsthcnwl5-0-202306011628.jpg", category: "Women", type: "Ethnic" },
//   { id: "w7", name: "Glitter Party Stilettos", brand: "Aldo", price: 6500, image: "https://imagescdn.allensolly.com/img/app/product/3/39727876-15135501.jpg", category: "Women", type: "Party" },
//   { id: "w2", name: "Handcrafted Kolhapuri", brand: "Metro", price: 899, image: "https://images.unsplash.com/photo-1621996659490-3275b4d0d951?w=600", category: "Women", type: "Ethnic" },
//   { id: "w3", name: "Classic Nude Pumps", brand: "Catwalk", price: 2800, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600", category: "Women", type: "Heels" },
//   { id: "w4", name: "Black Block Heels", brand: "Inc.5", price: 3200, image: "https://admin.mochishoes.com/product/31-336/660/31-336-11-36-1.JPG", category: "Women", type: "Formal" },
//   { id: "w5", name: "Cloud-Walk Runners", brand: "Campus", price: 1650, image: "https://paragonfootwear.com/cdn/shop/products/k1016l_pch_1.jpg", category: "Women", type: "Sports" },
//   { id: "w6", name: "Pro-Track Training Shoes", brand: "Action", price: 1200, image: "https://m.media-amazon.com/images/I/61LW17ImwZL._AC_UY1000_.jpg", category: "Women", type: "Track" },
//   { id: "w8", name: "Casual Canvas Sneakers", brand: "Sparx", price: 999, image: "https://fausto.in/cdn/shop/files/FST_FJDWC-7008_SKY_0_400x.jpg", category: "Women", type: "Casual" },

//   // --- KIDS COLLECTION ---
//   { id: "k1", name: "Junior Turbo Runners", brand: "Campus", price: 1299, image: "https://i5.walmartimages.com/asr/815037b7-9d2a-4f84-8d79-3545cadc27ea.4b0f77b5dc6cd73988bd631c362de5e1.jpeg", category: "Kids", type: "Sports" },
//   { id: "k4", name: "Speed-Track Spikes", brand: "Action", price: 1450, image: "https://i5.walmartimages.com/asr/604f42b6-cbf2-4095-b08c-e2c059e1e41f.8f4dc3ac1633c0cedbd6716ef3831435.jpeg", category: "Kids", type: "Track" },
//   { id: "k5", name: "Shimmer Party Bellies", brand: "Catwalk", price: 999, image: "https://m.media-amazon.com/images/I/71VJe6hF27L._AC_UY300_.jpg", category: "Kids", type: "Party" },
//   { id: "k6", name: "Super Hero Casuals", brand: "Disney India", price: 1100, image: "https://img.tatacliq.com/images/i8/437Wx649H/MP000000014873946_437Wx649H_202210151741311.jpeg", category: "Kids", type: "Casual" },
//   { id: "k2", name: "Classic School Gola", brand: "Liberty", price: 599, image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/32000538/2024/12/19/23322304-13f4-491f-a001-162aff46a3d01734582241276STEFENSBoysFormalLace-UpsOxfords1.jpg", category: "Kids", type: "School" },
//   { id: "k3", name: "Golden Ethnic Jutti", brand: "Walkaroo", price: 750, image: "https://www.walkaroo.in/cdn/shop/files/WK478-ROYALBLUE-KIDS.jpg?v=1753513009", category: "Kids", type: "Ethnic" }
// ];

// const NewArrivalsPage = ({ addToCart, toggleWishlist, wishlist }) => {
//   const [activeTab, setActiveTab] = useState("New");

//   const filteredProducts = ALL_SHOES_DATA.filter(shoe => shoe.category === activeTab);

//   const formatINR = (num) => {
//     // Convert string prices like "1,850" to actual numbers before formatting
//     const value = typeof num === 'string' ? Number(num.replace(/,/g, '')) : num;
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency', 
//       currency: 'INR', 
//       maximumFractionDigits: 0
//     }).format(value);
//   };

//   return (
//     <div className="container py-5">
//       {/* Header */}
//       <div className="text-center mb-5">
//         <h1 className="display-3 fw-bold italic text-uppercase">
//           Shoe<span className="text-warning">Vault</span> India
//         </h1>
//         <p className="text-muted">The latest in Formal, Sports, and Ethnic Footwear</p>
//       </div>

//       {/* Category Tabs */}
//       <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
//         {["New", "Men", "Women", "Kids"].map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveTab(cat)}
//             className={`btn rounded-pill px-4 fw-bold transition-all ${activeTab === cat ? 'btn-warning shadow' : 'btn-outline-dark'}`}
//           >
//             {cat === "New" ? <><FaFire className="me-2" />New Arrivals</> : cat}
//           </button>
//         ))}
//       </div>

//       {/* Grid */}
//       <div className="row g-4">
//         {filteredProducts.map((shoe) => {
//           const isWishlisted = wishlist?.some(item => item.id === shoe.id);
          
//           return (
//             <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={shoe.id}>
//               <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                
//                 {/* Badge & Wishlist */}
//                 <span className="position-absolute top-0 start-0 m-3 badge bg-dark text-uppercase" style={{ zIndex: 1 }}>{shoe.type}</span>
//                 <button 
//                   onClick={() => toggleWishlist(shoe)}
//                   className="btn position-absolute top-0 end-0 m-3 bg-white rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center"
//                   style={{ width: '38px', height: '38px', zIndex: 1 }}
//                 >
//                   {isWishlisted ? <FaHeart className="text-danger" /> : <FaRegHeart className="text-muted" />}
//                 </button>

//                 {/* Image */}
//                 <div className="bg-light p-4 text-center">
//                   <img src={shoe.image} alt={shoe.name} className="img-fluid" style={{ height: '220px', objectFit: 'contain' }} />
//                 </div>

//                 {/* Details */}
//                 <div className="card-body p-4">
//                   <small className="text-warning fw-bold text-uppercase">{shoe.brand}</small>
//                   <h5 className="fw-bold text-truncate mb-3" title={shoe.name}>{shoe.name}</h5>
//                   <div className="d-flex align-items-center justify-content-between border-top pt-3">
//                     <span className="fs-5 fw-bold text-dark">{formatINR(shoe.price)}</span>
//                     <button 
//                       onClick={() => addToCart(shoe)}
//                       className="btn btn-warning rounded-pill px-3 py-1 fw-bold shadow-sm"
//                     >
//                       <FaShoppingCart className="me-1" /> ADD
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
      
//       {filteredProducts.length === 0 && (
//         <div className="text-center py-5">
//            <h4 className="text-muted">No products found in this category.</h4>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewArrivalsPage;

import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaShoppingCart, FaFire } from 'react-icons/fa';

const ALL_SHOES_DATA = [
  // --- NEW ARRIVALS / TRENDING ---
  { id: "n1", name: "Premium Gold Wedding Mojari", brand: "Ethnix", price: 2499, image: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2018/09/pjimage-1535937268.jpg", category: "New", type: "Festival" },
  { id: "n2", name: "Air Max Pulse Runner", brand: "Nike", price: 12995, image: "https://hummel.net.in/cdn/shop/files/blaze1.png?v=1770182331&width=1946", category: "New", type: "Sports" },
  { id: "n3", name: "Genuine Leather Derby", brand: "Bata Red Label", price: 3999, image: "https://teakwoodleathers.com/cdn/shop/files/T_SH_CL_103_BR_1080x.jpg?v=1750933027", category: "New", type: "Formal" },
  { id: "n4", name: "Cloud-Walk Track Shoes", brand: "Skechers", price: 5499, image: "https://m.media-amazon.com/images/I/7185fhK-gEL._AC_UY300_.jpg", category: "New", type: "Track" },
  { id: "n5", name: "Party Wear Velvet Loafers", brand: "Raymond", price: 4200, image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600", category: "New", type: "Party" },
  { id: "n6", name: "Canvas Festival Sneakers", brand: "Converse", price: 3299, image: "https://sc04.alicdn.com/kf/H323e08b2e6bd49978a4c6e02caf4bde0B.jpg", category: "New", type: "Festival" },
  
  // --- MEN COLLECTION ---
  { id: "m1", name: "Classic Tan Oxford", brand: "Bata", price: 2999, image: "https://teakwoodleathers.com/cdn/shop/files/T_SH_CL_103_BR_1080x.jpg?v=1750933027", category: "Men", type: "Formal" },
  { id: "m2", name: "Royal Sherwani Mojari", brand: "Manyavar", price: 2199, image: "https://hitz.co.in/cdn/shop/files/6336-BROWN.jpg?v=1755619114", category: "Men", type: "Ethnic" },
  { id: "m5", name: "Leather Trekking Boots", brand: "Woodland", price: 4495, image: "https://www.albertotorresi.com/cdn/shop/files/DSC_6837.jpg?v=1757404552", category: "Men", type: "Boots" },
  { id: "m3", name: "Nitro-Blast Runners", brand: "Campus", price: 1850, image: "https://www.asics.co.in/media/catalog/product/1/0/1013a185_300_sl_lt_glb_1.jpg", category: "Men", type: "Sports" },
  { id: "m4", name: "White Street Sneakers", brand: "Sparx", price: 1299, image: "https://assets.ajio.com/medias/sys_master/root/20240806/ceBM/66b218d31d763220fa62009a/-473Wx593H-700191363-brown-MODEL.jpg", category: "Men", type: "Casual" },
  { id: "m6", name: "Classic Comfort Floaters", brand: "Action", price: 899, image: "https://hitz.co.in/cdn/shop/files/9357-BLACK.jpg?v=1755619124", category: "Men", type: "Sandals" },

  // --- WOMEN COLLECTION ---
  { id: "w1", name: "Zari Work Bridal Jutti", brand: "FabIndia", price: 1499, image: "https://www.jiomart.com/images/product/original/rvsthcnwl5/heer-women-s-traditional-flat-mojari-ethnic-shoes-handmade-shoes-embroidered-canvas-slip-on-bellies-traditional-casual-ethnic-foot-wear-black-product-images-rvsthcnwl5-0-202306011628.jpg", category: "Women", type: "Ethnic" },
  { id: "w7", name: "Glitter Party Stilettos", brand: "Aldo", price: 6500, image: "https://imagescdn.allensolly.com/img/app/product/3/39727876-15135501.jpg", category: "Women", type: "Party" },
  { id: "w2", name: "Handcrafted Kolhapuri", brand: "Metro", price: 899, image: "https://images.unsplash.com/photo-1621996659490-3275b4d0d951?w=600", category: "Women", type: "Ethnic" },
  { id: "w3", name: "Classic Nude Pumps", brand: "Catwalk", price: 2800, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600", category: "Women", type: "Heels" },
  { id: "w4", name: "Black Block Heels", brand: "Inc.5", price: 3200, image: "https://admin.mochishoes.com/product/31-336/660/31-336-11-36-1.JPG", category: "Women", type: "Formal" },
  { id: "w5", name: "Cloud-Walk Runners", brand: "Campus", price: 1650, image: "https://paragonfootwear.com/cdn/shop/products/k1016l_pch_1.jpg", category: "Women", type: "Sports" },
  { id: "w6", name: "Pro-Track Training Shoes", brand: "Action", price: 1200, image: "https://m.media-amazon.com/images/I/61LW17ImwZL._AC_UY1000_.jpg", category: "Women", type: "Track" },
  { id: "w8", name: "Casual Canvas Sneakers", brand: "Sparx", price: 999, image: "https://fausto.in/cdn/shop/files/FST_FJDWC-7008_SKY_0_400x.jpg", category: "Women", type: "Casual" },

  // --- KIDS COLLECTION ---
  { id: "k1", name: "Junior Turbo Runners", brand: "Campus", price: 1299, image: "https://i5.walmartimages.com/asr/815037b7-9d2a-4f84-8d79-3545cadc27ea.4b0f77b5dc6cd73988bd631c362de5e1.jpeg", category: "Kids", type: "Sports" },
  { id: "k4", name: "Speed-Track Spikes", brand: "Action", price: 1450, image: "https://i5.walmartimages.com/asr/604f42b6-cbf2-4095-b08c-e2c059e1e41f.8f4dc3ac1633c0cedbd6716ef3831435.jpeg", category: "Kids", type: "Track" },
  { id: "k5", name: "Shimmer Party Bellies", brand: "Catwalk", price: 999, image: "https://m.media-amazon.com/images/I/71VJe6hF27L._AC_UY300_.jpg", category: "Kids", type: "Party" },
  { id: "k6", name: "Super Hero Casuals", brand: "Disney India", price: 1100, image: "https://img.tatacliq.com/images/i8/437Wx649H/MP000000014873946_437Wx649H_202210151741311.jpeg", category: "Kids", type: "Casual" },
  { id: "k2", name: "Classic School Gola", brand: "Liberty", price: 599, image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/32000538/2024/12/19/23322304-13f4-491f-a001-162aff46a3d01734582241276STEFENSBoysFormalLace-UpsOxfords1.jpg", category: "Kids", type: "School" },
  { id: "k3", name: "Golden Ethnic Jutti", brand: "Walkaroo", price: 750, image: "https://www.walkaroo.in/cdn/shop/files/WK478-ROYALBLUE-KIDS.jpg?v=1753513009", category: "Kids", type: "Ethnic" }
];

const NewArrivalsPage = ({ addToCart, toggleWishlist, wishlist }) => {
  const [activeTab, setActiveTab] = useState("New");

  const filteredProducts = ALL_SHOES_DATA.filter(shoe => shoe.category === activeTab);

  const formatINR = (num) => {
    // Convert string prices like "1,850" to actual numbers before formatting
    const value = typeof num === 'string' ? Number(num.replace(/,/g, '')) : num;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-3 fw-bold italic text-uppercase">
          Shoe<span className="text-warning">Vault</span> India
        </h1>
        <p className="text-muted">The latest in Formal, Sports, and Ethnic Footwear</p>
      </div>

      {/* Category Tabs */}
      <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
        {["New", "Men", "Women", "Kids"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`btn rounded-pill px-4 fw-bold transition-all ${activeTab === cat ? 'btn-warning shadow' : 'btn-outline-dark'}`}
          >
            {cat === "New" ? <><FaFire className="me-2" />New Arrivals</> : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="row g-4">
        {filteredProducts.map((shoe) => {
          const isWishlisted = wishlist?.some(item => item.id === shoe.id);
          
          return (
            <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={shoe.id}>
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                
                {/* Badge & Wishlist */}
                <span className="position-absolute top-0 start-0 m-3 badge bg-dark text-uppercase" style={{ zIndex: 1 }}>{shoe.type}</span>
                <button 
                  onClick={() => toggleWishlist(shoe)}
                  className="btn position-absolute top-0 end-0 m-3 bg-white rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px', zIndex: 1 }}
                >
                  {isWishlisted ? <FaHeart className="text-danger" /> : <FaRegHeart className="text-muted" />}
                </button>

                {/* Image */}
                <div className="bg-light p-4 text-center">
                  <img src={shoe.image} alt={shoe.name} className="img-fluid" style={{ height: '220px', objectFit: 'contain' }} />
                </div>

                {/* Details */}
                <div className="card-body p-4">
                  <small className="text-warning fw-bold text-uppercase">{shoe.brand}</small>
                  <h5 className="fw-bold text-truncate mb-3" title={shoe.name}>{shoe.name}</h5>
                  <div className="d-flex align-items-center justify-content-between border-top pt-3">
                    <span className="fs-5 fw-bold text-dark">{formatINR(shoe.price)}</span>
                    <button 
                      onClick={() => addToCart(shoe)}
                      className="btn btn-warning rounded-pill px-3 py-1 fw-bold shadow-sm"
                    >
                      <FaShoppingCart className="me-1" /> ADD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-5">
           <h4 className="text-muted">No products found in this category.</h4>
        </div>
      )}
    </div>
  );
};

export default NewArrivalsPage;

