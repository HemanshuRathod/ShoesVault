import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ૧. સર્ચ માટે સ્ટેટ

  const fetchAllOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders/admin/all');
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllOrders(); }, []);

  // ૨. ફિલ્ટર લોજિક: ID, ઈમેલ અથવા સ્ટેટસ દ્વારા સર્ચ
  const filteredOrders = orders.filter(o => {
    const sId = `#SV-${o._id.substring(0, 8)}`.toLowerCase();
    const sEmail = (o.user_email || "").toLowerCase();
    const sStatus = o.status.toLowerCase();
    const term = searchTerm.toLowerCase();

    return sId.includes(term) || sEmail.includes(term) || sStatus.includes(term);
  });

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
        alert(`Order status updated to ${newStatus}`);
      }
    } catch (err) {
      alert("Error updating status");
    }
  };

  if (loading) return <div className="p-5 text-center fw-bold italic">Scanning Vault Orders...</div>;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="fw-black italic text-uppercase mb-0">Vault_Order_Control</h2>
        
        {/* ૩. સર્ચ બાર ડિઝાઇન */}
        <div className="input-group shadow-sm rounded-pill overflow-hidden border bg-white" style={{ maxWidth: '350px' }}>
          <span className="input-group-text bg-white border-0 ps-3">🔍</span>
          <input 
            type="text" 
            className="form-control border-0 py-2 shadow-none small" 
            placeholder="Search ID, Email or Status..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 bg-white text-center">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer Email</th>
                <th>Total</th>
                <th>Current Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {/* ૪. હવે orders ને બદલે filteredOrders વાપરો */}
              {filteredOrders.length > 0 ? (
                filteredOrders.map(o => (
                  <tr key={o._id}>
                    <td className="fw-bold text-primary">#SV-{o._id.substring(0, 8).toUpperCase()}</td>
                    <td>{o.user_email || "N/A"}</td>
                    <td className="fw-black">₹{o.total_price}</td>
                    <td>
                      <span className={`badge rounded-pill px-3 py-2 ${
                        o.status === 'PENDING' ? 'bg-warning text-dark' : 
                        o.status === 'SHIPPED' ? 'bg-info text-white' : 
                        o.status === 'DELIVERED' ? 'bg-success text-white' : 
                        o.status === 'CANCELLED' ? 'bg-danger text-white' : 'bg-secondary text-white'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td>
                      <select 
                        className="form-select form-select-sm d-inline-block w-auto rounded-pill shadow-sm"
                        onChange={(e) => updateStatus(o._id, e.target.value)}
                        value={o.status}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PACKING">Packing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted italic">
                    No orders found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;