import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
      <h2 style={{ margin: 0 }}>ADMIN PORTAL</h2>
      <button className="btn-secondary" style={{ padding: '8px 20px' }} onClick={() => { localStorage.removeItem('user'); navigate('/login'); }}>LogOut</button>
    </div>
  );
};

const MainAdmin = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '800px', textAlign: 'center', border: '1px solid #ddd' }}>
        <h2>Maintenance Menu (Admin access only)</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', width: '100%', maxWidth: '800px' }}>
        <button className="btn-primary" style={{ padding: '20px' }} onClick={() => navigate('/admin/memberships')}>Add/Update Memberships</button>
        <button className="btn-primary" style={{ padding: '20px' }} onClick={() => navigate('/admin/user-vendor')}>Add/Update User/Vendor</button>
        <button className="btn-primary" style={{ padding: '20px' }} onClick={() => navigate('/admin/users')}>Users Management</button>
        <button className="btn-primary" style={{ padding: '20px' }} onClick={() => navigate('/admin/vendors')}>Vendor Management</button>
      </div>
    </div>
  );
};

const AddMembershipPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ vendorName: '', duration: '6 months' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Membership added for ${formData.vendorName} for ${formData.duration}`);
    navigate('/admin/memberships');
  };

  return (
    <div className="page-container" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px', border: '1px solid #ddd' }}>
        <h2>Add Membership</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          <input className="input-field" placeholder="Vendor Name" value={formData.vendorName} onChange={e => setFormData({...formData, vendorName: e.target.value})} required />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Duration (Mandatory):</p>
            {['6 months', '1 year', '2 years'].map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="radio" name="duration" value={opt} checked={formData.duration === opt} onChange={e => setFormData({...formData, duration: e.target.value})} />
                {opt}
              </label>
            ))}
          </div>
          <button type="submit" className="btn-primary">Add Membership</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/admin/memberships')}>Back</button>
        </form>
      </div>
    </div>
  );
};

const UpdateMembershipPage = () => {
  const navigate = useNavigate();
  const [membershipNum, setMembershipNum] = useState('');
  const [action, setAction] = useState('6 months extension');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Membership ${membershipNum} updated with action: ${action}`);
    navigate('/admin/memberships');
  };

  return (
    <div className="page-container" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px', border: '1px solid #ddd' }}>
        <h2>Update Membership</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          <input className="input-field" placeholder="Membership Number (Mandatory)" value={membershipNum} onChange={e => setMembershipNum(e.target.value)} required />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Action:</p>
            {['6 months extension', '1 year extension', 'cancel membership'].map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input type="radio" name="action" value={opt} checked={action === opt} onChange={e => setAction(e.target.value)} />
                {opt}
              </label>
            ))}
          </div>
          <button type="submit" className="btn-primary">Update Membership</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/admin/memberships')}>Back</button>
        </form>
      </div>
    </div>
  );
};

const MembershipMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '600px', textAlign: 'center', border: '1px solid #ddd' }}>
        <h2>Membership Management</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
          <button className="btn-primary" style={{ padding: '15px' }} onClick={() => navigate('/admin/add-membership')}>Add Membership for Vendor</button>
          <button className="btn-primary" style={{ padding: '15px' }} onClick={() => navigate('/admin/update-membership')}>Update Membership for Vendor</button>
          <button className="btn-secondary" onClick={() => navigate('/admin')}>Back</button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <AdminHeader />
      <Routes>
        <Route path="/" element={<MainAdmin />} />
        <Route path="/memberships" element={<MembershipMenu />} />
        <Route path="/add-membership" element={<AddMembershipPage />} />
        <Route path="/update-membership" element={<UpdateMembershipPage />} />
        <Route path="/user-vendor" element={<div>Add/Update User/Vendor Page - Placeholder</div>} />
        <Route path="/users" element={<div>Users Management Page - Placeholder</div>} />
        <Route path="/vendors" element={<div>Vendor Management Page - Placeholder</div>} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
