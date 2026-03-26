import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Add this import at the top
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ૧. સર્ચ સ્ટેટ ઉમેર્યું

  // 1. FETCH ALL USERS
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: { 'role': 'ADMIN' }
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ૨. ફિલ્ટર લોજિક: યુઝરના નામ અથવા ઈમેલ મુજબ સર્ચ
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 2. TOGGLE ROLE (Promote/Demote)
  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${id}/role`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'role': 'ADMIN' 
        },
        body: JSON.stringify({ role: newRole })
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(u => u._id === id ? { ...u, role: updatedUser.role } : u));
        alert(`User role updated to ${newRole}`);
      }
    } catch (error) {
      alert("Failed to update role");
    }
  };

  // 3. DELETE USER
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
          method: 'DELETE',
          headers: { 'role': 'ADMIN' }
        });

        if (response.ok) {
          setUsers(users.filter(u => u._id !== id));
          alert("User removed from Vault.");
        }
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };

  if (loading) return <div className="text-center p-5 fw-bold italic">Unlocking User Vault...</div>;

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-black italic text-uppercase mb-0">User Management</h2>
        
        {/* ૩. સર્ચ બાર ઉમેર્યો */}
        <div className="input-group shadow-sm rounded-pill overflow-hidden border bg-white" style={{ maxWidth: '350px' }}>
          <span className="input-group-text bg-white border-0 ps-3">🔍</span>
          <input 
            type="text" 
            className="form-control border-0 py-2 shadow-none small" 
            placeholder="Search username or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <table className="table table-hover align-middle mb-0 bg-white">
          <thead className="table-dark">
            <tr className="small text-uppercase tracking-wider">
              <th className="ps-4">ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role Status</th>
              <th>Joined Date</th>
              <th className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* ૪. હવે users ની જગ્યાએ filteredUsers વાપરો */}
            {filteredUsers.length > 0 ? (
              filteredUsers.map(u => (
                <tr key={u._id}>
                  <td className="ps-4 text-muted small">#{u._id.substring(0, 8)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {/* <img 
                        src={u.image || `https://ui-avatars.com/api/?name=${u.username}&background=random`} 
                        className="rounded-circle me-2" 
                        width="30" height="30" alt="" 
                      /> */}
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
                      <span className="fw-bold">{u.username}</span>
                    </div>
                  </td>
                  <td className="small">{u.email || 'N/A'}</td>
                  <td>
                    <span className={`badge rounded-pill px-3 py-2 ${u.role === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="text-muted small">
                      {new Date(u.created_at).toLocaleDateString('en-IN')}
                  </td>
                  <td className="text-end pe-4">
                    <button 
                      onClick={() => toggleRole(u._id, u.role)} 
                      className="btn btn-sm btn-dark rounded-pill px-3 me-2"
                    >
                      Promote/Demote
                    </button>
                    <button 
                      onClick={() => deleteUser(u._id)} 
                      className="btn btn-sm btn-outline-danger rounded-circle"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5 text-muted italic">
                  No users found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;