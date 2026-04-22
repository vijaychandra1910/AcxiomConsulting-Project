import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MainVendor = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', minHeight: 'calc(100vh - 90px)', backgroundColor: '#fff' }}>
      <div className="card" style={{ width: '100%', maxWidth: '800px', textAlign: 'center', marginBottom: '40px', border: '1px solid #ddd' }}>
        <h2 style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>WELCOME {user.name || 'VENDOR'}</h2>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
        <button className="btn-primary" style={{ width: '180px' }} onClick={() => navigate('/vendor/your-item')}>Your Item</button>
        <button className="btn-primary" style={{ width: '180px' }} onClick={() => navigate('/vendor/add-new-item')}>Add New Item</button>
        <button className="btn-primary" style={{ width: '180px' }} onClick={() => navigate('/vendor/transaction')}>Transaction</button>
      </div>

      <button className="btn-secondary" style={{ width: '150px' }} onClick={() => { localStorage.removeItem('user'); navigate('/login'); }}>LogOut</button>
    </div>
  );
};

const YourItemMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', backgroundColor: '#fff' }}>
      <div className="card" style={{ width: '600px', textAlign: 'center', border: '1px solid #ddd' }}>
        <h2 style={{ marginBottom: '40px' }}>Your Item</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button className="btn-primary" style={{ padding: '20px 40px' }} onClick={() => navigate('/vendor/insert')}>Insert</button>
          <button className="btn-primary" style={{ padding: '20px 40px' }} onClick={() => navigate('/vendor/delete')}>Delete</button>
        </div>
        <button className="btn-secondary" style={{ marginTop: '40px', width: '100%' }} onClick={() => navigate('/vendor')}>Back</button>
      </div>
    </div>
  );
};

const AddNewItemMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', backgroundColor: '#fff' }}>
      <div className="card" style={{ width: '600px', textAlign: 'center', border: '1px solid #ddd' }}>
        <h2 style={{ marginBottom: '40px' }}>Add New Item Menu</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <button className="btn-primary" style={{ padding: '15px' }} onClick={() => navigate('/vendor/product-status')}>Product Status</button>
          <button className="btn-primary" style={{ padding: '15px' }} onClick={() => navigate('/vendor/request-item')}>Request Item</button>
          <button className="btn-primary" style={{ padding: '15px' }} onClick={() => navigate('/vendor/view-product')}>View Product</button>
        </div>
        <button className="btn-secondary" style={{ marginTop: '40px', width: '100%' }} onClick={() => navigate('/vendor')}>Back</button>
      </div>
    </div>
  );
};

const TransactionMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', backgroundColor: '#fff' }}>
      <div className="card" style={{ width: '600px', textAlign: 'center', border: '1px solid #ddd' }}>
        <h2 style={{ marginBottom: '40px' }}>Transaction</h2>
        <button className="btn-primary" style={{ width: '100%', padding: '15px' }} onClick={() => navigate('/vendor/user-request')}>User Request</button>
        <button className="btn-secondary" style={{ marginTop: '40px', width: '100%' }} onClick={() => navigate('/vendor')}>Back</button>
      </div>
    </div>
  );
};

const Notification = ({ message, visible, onClose }) => (
  <AnimatePresence>
    {visible && (
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 50 }}
        style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#000', color: '#fff', padding: '15px 30px', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 9999, border: '1px solid #fff', textAlign: 'center', minWidth: '250px' }}
      >
        <p style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>{message}</p>
        <button onClick={onClose} style={{ position: 'absolute', top: '5px', right: '10px', backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
      </motion.div>
    )}
  </AnimatePresence>
);

const InsertProductPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', price: '' });
  const [imageFile, setImageFile] = useState(null);
  const [notif, setNotif] = useState({ show: false, msg: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    if (imageFile) data.append('image', imageFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/vendor/products`, {
        method: 'POST', credentials: 'include', body: data
      });
      if (res.ok) { 
        setNotif({ show: true, msg: 'Product added successfully!' });
        setFormData({ name: '', price: '' }); setImageFile(null);
        setTimeout(() => setNotif({ show: false, msg: '' }), 3000);
      }
    } catch (err) { alert('Error'); }
  };

  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#fff' }}>
      <Notification visible={notif.show} message={notif.msg} onClose={() => setNotif({ show: false, msg: '' })} />
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto', border: '1px solid #ddd' }}>
        <h2>Insert Item</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          <input type="text" placeholder="Name" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input type="number" placeholder="Price" className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
          <input type="file" onChange={e => setImageFile(e.target.files[0])} />
          <button type="submit" className="btn-primary">Add Product</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/vendor/your-item')}>Back</button>
        </form>
      </div>
    </div>
  );
};

const DeleteProductPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vendor/products`, { credentials: 'include' })
      .then(res => res.json()).then(data => setProducts(data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this?')) {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/vendor/products/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) setProducts(products.filter(p => p._id !== id));
    }
  };

  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#fff' }}>
      <div className="card" style={{ border: '1px solid #ddd' }}>
        <h2>Delete Item</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {products.map(p => (
            <div key={p._id} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
              <h4>{p.name}</h4>
              <button className="btn-secondary" style={{ marginTop: '10px' }} onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          ))}
        </div>
        <button className="btn-secondary" style={{ marginTop: '40px' }} onClick={() => navigate('/vendor/your-item')}>Back</button>
      </div>
    </div>
  );
};

const ViewProductPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vendor/products`, { credentials: 'include' })
      .then(res => res.json()).then(data => setProducts(data));
  }, []);
  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#fff' }}>
      <div className="card" style={{ border: '1px solid #ddd' }}>
        <h2>View Product</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {products.map(p => (
            <div key={p._id} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ height: '100px', backgroundColor: '#f1f5f9', marginBottom: '10px' }}>
                {p.image && <img src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${p.image}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <h4>{p.name}</h4>
              <p>Rs {p.price}/-</p>
            </div>
          ))}
        </div>
        <button className="btn-secondary" style={{ marginTop: '40px' }} onClick={() => navigate('/vendor/add-new-item')}>Back</button>
      </div>
    </div>
  );
};

const ProductStatusPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vendor/orders`, { credentials: 'include' })
      .then(res => res.json()).then(data => setOrders(data));
  }, []);

  const updateStatus = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/vendor/orders/${selectedOrder._id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
      setSelectedOrder(null);
      const updated = await fetch(`${import.meta.env.VITE_API_URL}/vendor/orders`, { credentials: 'include' }).then(r => r.json());
      setOrders(updated);
    }
  };

  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#ccc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ backgroundColor: '#4a82f6', padding: '15px', textAlign: 'center', borderRadius: '8px', color: '#fff', marginBottom: '20px', maxWidth: '600px', margin: '0 auto 20px' }}>
          <h2 style={{ margin: 0 }}>Product Status</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '15px' }}>
          {['Name', 'E-Mail', 'Address', 'Status', 'Update', 'Delete'].map(h => <div key={h} style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '15px', textAlign: 'center', borderRadius: '10px' }}>{h}</div>)}
          {orders.map(o => (
            <React.Fragment key={o._id}>
              <div style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>{o.name || '-'}</div>
              <div style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>{o.email || '-'}</div>
              <div style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>{o.address || '-'}</div>
              <div style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>{o.status}</div>
              <div style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '15px', borderRadius: '10px', textAlign: 'center' }}><button onClick={() => {setSelectedOrder(o); setNewStatus(o.status);}} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Update</button></div>
              <div style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>Delete</div>
            </React.Fragment>
          ))}
        </div>
        <button className="btn-secondary" style={{ marginTop: '40px' }} onClick={() => navigate('/vendor/add-new-item')}>Back</button>
      </div>
      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: '#4a82f6', padding: '40px', borderRadius: '40px', width: '500px', textAlign: 'center' }}>
            <h2 style={{ color: '#fff' }}>Update Status</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', margin: '30px 0' }}>
              {['Recieved', 'Ready for Shipping', 'Out For Delivery'].map(s => (
                <label key={s} style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
                  <input type="radio" value={s} checked={newStatus === s} onChange={e => setNewStatus(e.target.value)} />
                  {s}
                </label>
              ))}
            </div>
            <button className="btn-primary" style={{ backgroundColor: '#fff', color: '#000' }} onClick={updateStatus}>Update</button>
            <button className="btn-secondary" style={{ marginLeft: '10px' }} onClick={() => setSelectedOrder(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

const RequestItemPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#fff' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd' }}>
        <h2>Request Item</h2>
        <p style={{ marginTop: '20px' }}>Feature to request items from Admin...</p>
        <button className="btn-secondary" style={{ marginTop: '40px' }} onClick={() => navigate('/vendor/add-new-item')}>Back</button>
      </div>
    </div>
  );
};

const UserRequestPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#fff' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd' }}>
        <h2>User Request</h2>
        <p style={{ marginTop: '20px' }}>Manage requests from users here...</p>
        <button className="btn-secondary" style={{ marginTop: '40px' }} onClick={() => navigate('/vendor/transaction')}>Back</button>
      </div>
    </div>
  );
};

const VendorDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<MainVendor />} />
      <Route path="/your-item" element={<YourItemMenu />} />
      <Route path="/insert" element={<InsertProductPage />} />
      <Route path="/delete" element={<DeleteProductPage />} />
      <Route path="/add-new-item" element={<AddNewItemMenu />} />
      <Route path="/product-status" element={<ProductStatusPage />} />
      <Route path="/request-item" element={<RequestItemPage />} />
      <Route path="/view-product" element={<ViewProductPage />} />
      <Route path="/transaction" element={<TransactionMenu />} />
      <Route path="/user-request" element={<UserRequestPage />} />
    </Routes>
  );
};

export default VendorDashboard;
