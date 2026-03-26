import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSearch, FaLayerGroup } from 'react-icons/fa';

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  
  // DESCRIPTION કાઢી નાખ્યું
  const initialFormState = { name: "", parentCategory: "None" };
  const [newCat, setNewCat] = useState(initialFormState);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // ૧. કેટેગરીઝ લોડ કરવા માટે
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ૨. એડિટ મોડ ઓપન કરવા માટે
  const openEditMode = (cat) => {
    setIsEditing(true);
    setIsAdding(true); 
    setCurrentId(cat._id);
    setNewCat({ 
      name: cat.name, 
      parentCategory: cat.parentCategory || "None" 
    });
  };

  // ૩. સેવ (Insert/Update) કરવા માટે
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!newCat.name) return;

    try {
      const url = isEditing 
        ? `http://localhost:5000/api/categories/${currentId}` 
        : 'http://localhost:5000/api/categories';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat) 
      });

      const result = await response.json();

      if (response.ok) {
        if (isEditing) {
          setCategories(categories.map(c => c._id === currentId ? result : c));
          alert("Category Updated Successfully!");
        } else {
          setCategories([...categories, result]);
          alert("Category Added Successfully!");
        }
        
        setNewCat(initialFormState);
        setIsAdding(false);
        setIsEditing(false);
        setCurrentId(null);
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      alert("સર્વર કનેક્શનમાં ભૂલ છે.");
    }
  };

  // ૪. ડિલીટ કરવા માટે
  const deleteCategory = async (id) => {
    if (window.confirm("Delete this category?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/categories/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setCategories(categories.filter(cat => cat._id !== id));
        }
      } catch (error) {
        alert("ડિલીટ કરવામાં ભૂલ આવી.");
      }
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="container">
        
        {/* Header */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-6">
            <h2 className="fw-bold text-dark fst-italic mb-1">
              <FaLayerGroup className="me-2 text-warning" /> STORE CATEGORIES
            </h2>
          </div>
          <div className="col-md-6 text-md-end">
             <div className="d-inline-flex gap-2">
                <div className="input-group shadow-sm rounded-pill overflow-hidden bg-white border">
                  <span className="input-group-text bg-white border-0"><FaSearch className="text-muted" /></span>
                  <input type="text" className="form-control border-0" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <button 
                  className={`btn ${isAdding ? 'btn-danger' : 'btn-dark'} rounded-pill px-4 fw-bold`}
                  onClick={() => {
                    setIsAdding(!isAdding);
                    setIsEditing(false);
                    setNewCat(initialFormState);
                  }}
                >
                  {isAdding ? <FaTimes /> : <><FaPlus className="me-1"/> ADD NEW</>}
                </button>
             </div>
          </div>
        </div>

        {/* Form Section */}
        {isAdding && (
          <div className="card border-0 shadow-sm rounded-4 mb-4 border-start border-4 border-warning">
            <div className="card-body p-4 bg-white rounded-4">
              <h5 className="fw-bold mb-3">{isEditing ? "Update Category" : "New Category Entry"}</h5>
              <form onSubmit={handleSaveCategory} className="row g-3">
                <div className="col-md-5">
                  <label className="small fw-bold mb-1">COMPANY / CAT NAME</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. VKC, Nike" 
                    value={newCat.name} 
                    onChange={(e) => setNewCat({...newCat, name: e.target.value})} 
                    required 
                  />
                </div>
                
                <div className="col-md-5">
                  <label className="small fw-bold mb-1">PARENT CATEGORY</label>
                  <select 
                    className="form-select" 
                    value={newCat.parentCategory} 
                    onChange={(e) => setNewCat({...newCat, parentCategory: e.target.value})}
                  >
                    <option value="None">None (Main)</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>

                <div className="col-md-2 d-flex align-items-end">
                  <button type="submit" className="btn btn-warning w-100 fw-bold">
                    {isEditing ? "UPDATE" : "SAVE"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="ps-4 py-3">NAME</th>
                  <th className="py-3 text-center">PARENT SECTION</th>
                  <th className="py-3 text-end pe-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length > 0 ? filteredCategories.map((cat) => (
                  <tr key={cat._id}>
                    <td className="ps-4 py-3 fw-bold">{cat.name}</td>
                    <td className="text-center">
                        <span className={`badge ${cat.parentCategory === 'None' ? 'bg-secondary' : 'bg-primary'}`}>
                            {cat.parentCategory}
                        </span>
                    </td>
                    <td className="text-end pe-4">
                      <button onClick={() => openEditMode(cat)} className="btn btn-sm btn-outline-dark border-0 me-1"><FaEdit /></button>
                      <button onClick={() => deleteCategory(cat._id)} className="btn btn-sm btn-outline-danger border-0"><FaTrash /></button>
                    </td>
                  </tr>
                )) : (
                    <tr><td colSpan="3" className="text-center py-4">No categories found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;