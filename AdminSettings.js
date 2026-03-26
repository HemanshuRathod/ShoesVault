import React, { useState } from 'react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({ shippingFee: 99, taxRate: 18, maintenance: false });

  const handleUpdate = () => alert("Global Vault Settings Updated!");

  return (
    <div className="animate__animated animate__fadeIn">
      <h2 className="fw-black italic text-uppercase mb-4">⚙️ Site Configuration</h2>
      
      <div className="admin-card p-5 bg-white shadow-lg rounded-5">
        <div className="row g-4">
          <div className="col-md-6">
            <label className="fw-black small uppercase mb-2">Flat Shipping Fee (₹)</label>
            <input type="number" className="form-control form-control-lg border-2" defaultValue={settings.shippingFee} />
          </div>
          <div className="col-md-6">
            <label className="fw-black small uppercase mb-2">GST / Tax Rate (%)</label>
            <input type="number" className="form-control form-control-lg border-2" defaultValue={settings.taxRate} />
          </div>
          <div className="col-12">
            <div className="p-4 bg-light rounded-4 d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-0">Maintenance Mode</h6>
                <small className="text-muted">Turn this on to block user access during updates.</small>
              </div>
              <div className="form-check form-switch fs-4">
                <input className="form-check-input" type="checkbox" checked={settings.maintenance} onChange={() => setSettings({...settings, maintenance: !settings.maintenance})} />
              </div>
            </div>
          </div>
          <div className="col-12 mt-4 text-center">
             <button onClick={handleUpdate} className="btn btn-warning btn-lg px-5 fw-black italic rounded-pill shadow-sm">SAVE CHANGES</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;