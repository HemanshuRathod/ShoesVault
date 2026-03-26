// import React, { useState, useEffect } from 'react';

// const AdminProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [dbCategories, setDbCategories] = useState([]); 
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
  
//   // શરૂઆતી સ્ટેટ
//   const [formData, setFormData] = useState({ 
//     name: '', 
//     price: '', 
//     category: '', 
//     image: '', 
//     stock: '',
//     parentCategory: 'None' 
//   });

//   const fetchData = async () => {
//     try {
//       const prodRes = await fetch('http://localhost:5000/api/products');
//       const prodData = await prodRes.json();
//       setProducts(prodData);

//       const catRes = await fetch('http://localhost:5000/api/categories');
//       const catData = await catRes.json();
//       setDbCategories(catData);
      
//       if (catData.length > 0 && !formData.category) {
//         setFormData(prev => ({ ...prev, category: catData[0].name }));
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => { fetchData(); }, []);

//   const openEdit = (product) => {
//     setEditingProduct(product);
//     setFormData({
//         name: product.name,
//         price: product.price,
//         category: product.category,
//         stock: product.stock,
//         image: product.image,
//         parentCategory: product.parentCategory || 'None'
//     });
//     setIsModalOpen(true);
//   };

//   // --- સુધારેલું handleSubmit ફંક્શન ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ૧. અત્યારે ફોર્મમાં જે કેટેગરી સિલેક્ટ છે તેના આધારે પેરેન્ટ શોધો
//     const selectedCatObj = dbCategories.find(c => c.name === formData.category);
//     const pCat = selectedCatObj ? selectedCatObj.parentCategory : "None";

//     const dataToSave = {
//       ...formData,
//       parentCategory: pCat // ખાતરી કરો કે આ લેટેસ્ટ છે
//     };

//     try {
//       const method = editingProduct ? 'PUT' : 'POST';
//       const url = editingProduct 
//         ? `http://localhost:5000/api/products/${editingProduct._id}` 
//         : `http://localhost:5000/api/products`;

//       const response = await fetch(url, {
//         method: method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(dataToSave) 
//       });

//       const result = await response.json();
      
//       if (response.ok) {
//         if (editingProduct) {
//           setProducts(products.map(p => p._id === editingProduct._id ? result : p));
//           alert("Product Updated Successfully!");
//         } else {
//           setProducts([...products, result]);
//           alert("Product Added Successfully!");
//         }
//         setIsModalOpen(false);
//         setEditingProduct(null);
//         // ફોર્મ ક્લિયર કરતી વખતે parentCategory પણ રીસેટ કરો
//         setFormData({ name: '', price: '', category: '', image: '', stock: '', parentCategory: 'None' });
//       }
//     } catch (err) {
//       alert("Error saving product.");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this product?")) {
//       try {
//         await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
//         setProducts(products.filter(p => p._id !== id));
//       } catch (err) {
//         alert("Delete failed!");
//       }
//     }
//   };

//   return (
//     <div className="admin-container p-4 bg-light min-vh-100">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-black italic">VAULT INVENTORY</h2>
//         <button className="btn btn-dark rounded-pill px-4 fw-bold" onClick={() => {
//           setEditingProduct(null); 
//           setFormData({ name: '', price: '', category: dbCategories[0]?.name || '', image: '', stock: '', parentCategory: 'None' }); 
//           setIsModalOpen(true);
//         }}>
//           + ADD NEW PRODUCT
//         </button>
//       </div>

//       <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
//         <div className="table-responsive">
//           <table className="table table-hover align-middle mb-0">
//             <thead className="table-dark">
//               <tr>
//                 <th className="ps-4">Image</th>
//                 <th>Name</th>
//                 <th>Category</th>
//                 <th>Price</th>
//                 <th>Stock</th>
//                 <th className="text-end pe-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map(product => (
//                 <tr key={product._id}>
//                   <td className="ps-4"><img src={product.image} className="rounded-2" width="50" height="50" alt="" style={{objectFit: 'cover'}} /></td>
//                   <td className="fw-bold">{product.name}</td>
//                   <td>
//                     <span className="badge bg-secondary">{product.category}</span>
//                     <br/>
//                     <small className="text-muted text-uppercase" style={{fontSize: '0.65rem'}}>
//                         Section: {product.parentCategory || "None"}
//                     </small>
//                   </td>
//                   <td className="fw-bold">₹{product.price}</td>
//                   <td>{product.stock} units</td>
//                   <td className="text-end pe-4">
//                     <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEdit(product)}>EDIT</button>
//                     <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product._id)}>DELETE</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content border-0 rounded-4 shadow-lg">
//               <div className="modal-header border-0">
//                 <h5 className="fw-black">{editingProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}</h5>
//                 <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="small fw-bold mb-1">SNEAKER NAME</label>
//                     <input type="text" className="form-control" placeholder="Sneaker Name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} required />
//                   </div>
//                   <div className="row mb-3">
//                     <div className="col">
//                         <label className="small fw-bold mb-1">PRICE (₹)</label>
//                         <input type="number" className="form-control" placeholder="Price" value={formData.price} onChange={(e)=>setFormData({...formData, price: e.target.value})} required />
//                     </div>
//                     <div className="col">
//                         <label className="small fw-bold mb-1">STOCK</label>
//                         <input type="number" className="form-control" placeholder="Stock" value={formData.stock} onChange={(e)=>setFormData({...formData, stock: e.target.value})} required />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="small fw-bold mb-1">SELECT CATEGORY</label>
//                     <select 
//                         className="form-select" 
//                         value={formData.category} 
//                         onChange={(e) => setFormData({...formData, category: e.target.value})} 
//                         required
//                     >
//                         <option value="">-- Choose Category --</option>
//                         {dbCategories.map(cat => (
//                         <option key={cat._id} value={cat.name}>
//                             {cat.name} {cat.parentCategory !== "None" ? `(${cat.parentCategory})` : ""}
//                         </option>
//                         ))}
//                     </select>
//                   </div>

//                   <div className="mb-2">
//                     <label className="small fw-bold mb-1">IMAGE URL</label>
//                     <input type="text" className="form-control" placeholder="https://..." value={formData.image} onChange={(e)=>setFormData({...formData, image: e.target.value})} />
//                   </div>
//                 </div>
//                 <div className="modal-footer border-0">
//                   <button type="submit" className="btn btn-warning w-100 fw-bold py-2 shadow-sm">
//                     {editingProduct ? 'UPDATE VAULT' : 'SAVE TO VAULT'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminProducts;


import React, { useState, useEffect } from 'react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [dbCategories, setDbCategories] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ૧. સર્ચ સ્ટેટ ઉમેર્યું

  // શરૂઆતી સ્ટેટ
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    category: '', 
    image: '', 
    stock: '',
    parentCategory: 'None' 
  });

  const fetchData = async () => {
    try {
      const prodRes = await fetch('http://localhost:5000/api/products');
      const prodData = await prodRes.json();
      setProducts(prodData);

      const catRes = await fetch('http://localhost:5000/api/categories');
      const catData = await catRes.json();
      setDbCategories(catData);
      
      if (catData.length > 0 && !formData.category) {
        setFormData(prev => ({ ...prev, category: catData[0].name }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ૨. ફિલ્ટર લોજિક: નામ અથવા કેટેગરી મુજબ સર્ચ
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEdit = (product) => {
    setEditingProduct(product);
    setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        image: product.image,
        parentCategory: product.parentCategory || 'None'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCatObj = dbCategories.find(c => c.name === formData.category);
    const pCat = selectedCatObj ? selectedCatObj.parentCategory : "None";

    const dataToSave = {
      ...formData,
      parentCategory: pCat 
    };

    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct 
        ? `http://localhost:5000/api/products/${editingProduct._id}` 
        : `http://localhost:5000/api/products`;

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave) 
      });

      const result = await response.json();
      
      if (response.ok) {
        if (editingProduct) {
          setProducts(products.map(p => p._id === editingProduct._id ? result : p));
          alert("Product Updated Successfully!");
        } else {
          setProducts([...products, result]);
          alert("Product Added Successfully!");
        }
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({ name: '', price: '', category: '', image: '', stock: '', parentCategory: 'None' });
      }
    } catch (err) {
      alert("Error saving product.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  return (
    <div className="admin-container p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-black italic">VAULT INVENTORY</h2>
        <button className="btn btn-dark rounded-pill px-4 fw-bold" onClick={() => {
          setEditingProduct(null); 
          setFormData({ name: '', price: '', category: dbCategories[0]?.name || '', image: '', stock: '', parentCategory: 'None' }); 
          setIsModalOpen(true);
        }}>
          + ADD NEW PRODUCT
        </button>
      </div>

      {/* ૩. સર્ચ બાર ઉમેર્યો */}
      <div className="mb-4">
        <div className="input-group shadow-sm rounded-pill overflow-hidden border bg-white" style={{ maxWidth: '400px' }}>
          <span className="input-group-text bg-white border-0 ps-3">🔍</span>
          <input 
            type="text" 
            className="form-control border-0 py-2 shadow-none" 
            placeholder="Search by name or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th className="ps-4">Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* ૪. હવે products ની જગ્યાએ filteredProducts વાપરો */}
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product._id}>
                    <td className="ps-4"><img src={product.image} className="rounded-2" width="50" height="50" alt="" style={{objectFit: 'cover'}} /></td>
                    <td className="fw-bold">{product.name}</td>
                    <td>
                      <span className="badge bg-secondary">{product.category}</span>
                      <br/>
                      <small className="text-muted text-uppercase" style={{fontSize: '0.65rem'}}>
                          Section: {product.parentCategory || "None"}
                      </small>
                    </td>
                    <td className="fw-bold">₹{product.price}</td>
                    <td>{product.stock} units</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEdit(product)}>EDIT</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product._id)}>DELETE</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted italic">No inventory found for "{searchTerm}"</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal remains the same */}
      {isModalOpen && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-header border-0">
                <h5 className="fw-black">{editingProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}</h5>
                <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="small fw-bold mb-1">SNEAKER NAME</label>
                    <input type="text" className="form-control" placeholder="Sneaker Name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                        <label className="small fw-bold mb-1">PRICE (₹)</label>
                        <input type="number" className="form-control" placeholder="Price" value={formData.price} onChange={(e)=>setFormData({...formData, price: e.target.value})} required />
                    </div>
                    <div className="col">
                        <label className="small fw-bold mb-1">STOCK</label>
                        <input type="number" className="form-control" placeholder="Stock" value={formData.stock} onChange={(e)=>setFormData({...formData, stock: e.target.value})} required />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="small fw-bold mb-1">SELECT CATEGORY</label>
                    <select 
                        className="form-select" 
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})} 
                        required
                    >
                        <option value="">-- Choose Category --</option>
                        {dbCategories.map(cat => (
                        <option key={cat._id} value={cat.name}>
                            {cat.name} {cat.parentCategory !== "None" ? `(${cat.parentCategory})` : ""}
                        </option>
                        ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="small fw-bold mb-1">IMAGE URL</label>
                    <input type="text" className="form-control" placeholder="https://..." value={formData.image} onChange={(e)=>setFormData({...formData, image: e.target.value})} />
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="submit" className="btn btn-warning w-100 fw-bold py-2 shadow-sm">
                    {editingProduct ? 'UPDATE VAULT' : 'SAVE TO VAULT'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;