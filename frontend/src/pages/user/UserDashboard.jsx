import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const UserHeader = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#fff', borderBottom: '1px solid #ddd', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div style={{ display: 'flex', gap: '15px' }}>
        <button className="btn-secondary" style={{ padding: '8px 20px', backgroundColor: '#fff', border: '1px solid #4caf50', color: '#000', borderRadius: '8px' }} onClick={() => navigate('/user')}>Home</button>
        <button className="btn-secondary" style={{ padding: '8px 20px', backgroundColor: '#fff', border: '1px solid #4caf50', color: '#000', borderRadius: '8px' }} onClick={() => navigate('/user/view-products')}>View Product</button>
        <button className="btn-secondary" style={{ padding: '8px 20px', backgroundColor: '#fff', border: '1px solid #4caf50', color: '#000', borderRadius: '8px' }} onClick={() => navigate('/user/request-item')}>Request Item</button>
        <button className="btn-secondary" style={{ padding: '8px 20px', backgroundColor: '#fff', border: '1px solid #4caf50', color: '#000', borderRadius: '8px' }} onClick={() => navigate('/user/orders')}>Order Status</button>
      </div>
      <button className="btn-secondary" style={{ padding: '8px 20px', backgroundColor: '#fff', border: '1px solid #4caf50', color: '#000', borderRadius: '8px' }} onClick={() => { localStorage.removeItem('user'); navigate('/login'); }}>LogOut</button>
    </div>
  );
};

const MainUser = () => {
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', minHeight: 'calc(100vh - 90px)', backgroundColor: '#fff' }}>
      <div className="card" style={{ width: '100%', maxWidth: '800px', textAlign: 'center', marginBottom: '40px', border: '1px solid #ddd' }}>
        <h2 style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>WELCOME {user.name || 'USER'}</h2>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
        <div style={{ position: 'relative' }}>
          <button className="btn-primary" style={{ width: '180px' }} onClick={() => setShowCategories(!showCategories)}>Vendor</button>
          <AnimatePresence>
            {showCategories && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                style={{ position: 'absolute', top: '100%', left: 0, marginTop: '12px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '12px', padding: '12px', width: '200px', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              >
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                  {['Catering', 'Florist', 'Decoration', 'Lighting'].map(cat => (
                    <li key={cat} style={{ padding: '10px 12px', cursor: 'pointer', borderRadius: '8px', color: '#000' }} 
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        onClick={() => navigate(`/user/vendors/${cat}`)}>
                      * {cat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <Link to="/user/cart"><button className="btn-primary" style={{ width: '180px' }}>Cart</button></Link>
        <Link to="/user/guest-list"><button className="btn-primary" style={{ width: '180px' }}>Guest List</button></Link>
        <Link to="/user/orders"><button className="btn-primary" style={{ width: '180px' }}>Order Status</button></Link>
      </div>
    </div>
  );
};

const VendorListPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user/vendors?category=${category}`, { credentials: 'include' })
      .then(res => res.json()).then(data => setVendors(data));
  }, [category]);

  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#fff', minHeight: 'calc(100vh - 70px)' }}>
      <div className="card" style={{ backgroundColor: '#f1f5f9', color: '#000', textAlign: 'center', marginBottom: '40px', padding: '20px', border: '1px solid #ddd' }}>
        <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>Vendor {category}</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
        {vendors.map(v => (
          <div key={v._id} className="card" style={{ textAlign: 'center', border: '1px solid #ddd' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#4a82f6', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {v.name.charAt(0).toUpperCase()}
            </div>
            <h3 style={{ marginBottom: '10px' }}>{v.name}</h3>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>Specialist in {v.category}</p>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => navigate(`/user/vendor/${v._id}/products`)}>Shop Items</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductsPage = ({ addToCart }) => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user/products/${id}`, { credentials: 'include' })
      .then(res => res.json()).then(data => setProducts(data));
  }, [id]);

  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#fff' }}>
      <h2 style={{ marginBottom: '30px', color: '#000' }}>Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
        {products.map(p => (
          <div key={p._id} className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', border: '1px solid #ddd' }}>
            <div style={{ width: '100%', height: '150px', backgroundColor: '#f1f5f9', borderRadius: '8px', overflow: 'hidden' }}>
              {p.image ? (
                <img src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${p.image}`} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>No Image</div>
              )}
            </div>
            <h4 style={{ color: '#000' }}>{p.name}</h4>
            <p style={{ fontWeight: 'bold', color: '#000' }}>Rs {p.price}/-</p>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AllProductsPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user/all-products`, { credentials: 'include' })
      .then(res => res.json()).then(data => setProducts(data));
  }, []);

  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#fff' }}>
      <h2 style={{ marginBottom: '30px', color: '#000', textAlign: 'center' }}>All Available Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
        {products.map(p => (
          <div key={p._id} className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', border: '1px solid #ddd' }}>
            <div style={{ width: '100%', height: '180px', backgroundColor: '#f1f5f9', borderRadius: '8px', overflow: 'hidden' }}>
              {p.image ? (
                <img src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${p.image}`} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>No Image</div>
              )}
            </div>
            <h4 style={{ color: '#000', margin: 0 }}>{p.name}</h4>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Vendor: {p.vendorId?.name || 'N/A'}</p>
            <p style={{ fontWeight: 'bold', color: '#000', fontSize: '1.2rem', margin: '5px 0' }}>Rs {p.price}/-</p>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const CartPage = ({ cart, updateQuantity, removeFromCart, clearCart }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ padding: '20px', backgroundColor: '#ccc', minHeight: 'calc(100vh - 70px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ backgroundColor: '#a4c2f4', padding: '15px', textAlign: 'center', borderRadius: '4px', border: '1px solid #888' }}>
          <h2 style={{ margin: 0, fontWeight: '400', fontSize: '1.5rem', color: '#000' }}>Shopping Cart</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr', gap: '15px' }}>
          {['Image', 'Name', 'Price', 'Quantity', 'Total Price', 'Action'].map(head => (
            <div key={head} style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '15px', textAlign: 'center', borderRadius: '10px', fontWeight: '500' }}>
              {head}
            </div>
          ))}
        </div>

        {cart.map((item, idx) => (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr', gap: '15px', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#4a82f6', borderRadius: '20px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '10px' }}>
              {item.image ? (
                <img src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${item.image}`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
              ) : <span style={{ color: '#fff' }}>Image</span>}
            </div>
            <div style={{ backgroundColor: '#4a82f6', borderRadius: '20px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textAlign: 'center', padding: '10px' }}>
              {item.name}
            </div>
            <div style={{ backgroundColor: '#4a82f6', borderRadius: '20px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              {item.price}/-
            </div>
            <div style={{ backgroundColor: '#4a82f6', borderRadius: '20px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <select 
                value={item.quantity || 1} 
                onChange={(e) => updateQuantity(idx, parseInt(e.target.value))}
                style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', outline: 'none' }}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n} style={{ color: '#000' }}>{n}</option>)}
              </select>
              <span style={{ marginLeft: '5px', color: '#fff' }}>v</span>
            </div>
            <div style={{ backgroundColor: '#4a82f6', borderRadius: '20px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              {item.price * (item.quantity || 1)}/-
            </div>
            <div style={{ backgroundColor: '#4a82f6', borderRadius: '20px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <button style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem' }} onClick={() => removeFromCart(idx)}>Remove</button>
            </div>
          </div>
        ))}

        <div style={{ backgroundColor: '#4a82f6', padding: '20px 40px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ color: '#fff', fontSize: '1.2rem' }}>Grand Total</div>
          <div style={{ color: '#fff', fontSize: '1.2rem' }}>{total}/-</div>
          <button style={{ backgroundColor: '#fff', color: '#000', border: '1px solid #4caf50', padding: '10px 30px', borderRadius: '10px', cursor: 'pointer' }} onClick={clearCart}>Delete All</button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button style={{ backgroundColor: '#fff', color: '#000', border: '1px solid #4caf50', padding: '15px 100px', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer' }} onClick={() => navigate('/user/checkout')}>Proceed to CheckOut</button>
        </div>

      </div>
    </div>
  );
};

const CheckoutPage = ({ cart, checkout }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  
  const [details, setDetails] = useState({
    name: user.name || '',
    email: user.email || '',
    address: '',
    city: '',
    number: '',
    paymentMethod: 'Cash',
    state: '',
    pinCode: ''
  });

  const handleOrder = (e) => {
    e.preventDefault();
    checkout(details);
  };

  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#ccc', minHeight: 'calc(100vh - 70px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        
        <div style={{ backgroundColor: '#4a82f6', padding: '15px 100px', color: '#fff', borderRadius: '4px', fontSize: '1.2rem' }}>Payment & Checkout</div>
        <div style={{ backgroundColor: '#4a82f6', padding: '15px 60px', color: '#fff', borderRadius: '4px', fontSize: '1.2rem' }}>Total Amount: {totalAmount}/-</div>

        <form onSubmit={handleOrder} style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 80px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <input className="input-field" style={{ backgroundColor: '#4a82f6', color: '#fff', border: 'none', borderRadius: '10px', padding: '15px', textAlign: 'center' }} placeholder="Name" value={details.name} onChange={e => setDetails({...details, name: e.target.value})} required />
            <input className="input-field" style={{ backgroundColor: '#4a82f6', color: '#fff', border: 'none', borderRadius: '10px', padding: '15px', textAlign: 'center' }} placeholder="E-mail" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} required />
            <input className="input-field" style={{ backgroundColor: '#4a82f6', color: '#fff', border: 'none', borderRadius: '10px', padding: '15px', textAlign: 'center' }} placeholder="Address" value={details.address} onChange={e => setDetails({...details, address: e.target.value})} required />
            <input className="input-field" style={{ backgroundColor: '#4a82f6', color: '#fff', border: 'none', borderRadius: '10px', padding: '15px', textAlign: 'center' }} placeholder="City" value={details.city} onChange={e => setDetails({...details, city: e.target.value})} required />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <input className="input-field" style={{ backgroundColor: '#4a82f6', color: '#fff', border: 'none', borderRadius: '10px', padding: '15px', textAlign: 'center' }} placeholder="Number" value={details.number} onChange={e => setDetails({...details, number: e.target.value})} required />
            <div style={{ position: 'relative' }}>
              <select className="input-field" style={{ backgroundColor: '#4a82f6', color: '#fff', border: 'none', borderRadius: '10px', padding: '15px', textAlign: 'center', width: '100%', appearance: 'none' }} value={details.paymentMethod} onChange={e => setDetails({...details, paymentMethod: e.target.value})}>
                <option value="Cash" style={{ color: '#000' }}>Cash</option>
                <option value="UPI" style={{ color: '#000' }}>UPI</option>
              </select>
              <span style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', color: '#fff' }}>v</span>
            </div>
            <input className="input-field" style={{ backgroundColor: '#4a82f6', color: '#fff', border: 'none', borderRadius: '10px', padding: '15px', textAlign: 'center' }} placeholder="State" value={details.state} onChange={e => setDetails({...details, state: e.target.value})} required />
            <input className="input-field" style={{ backgroundColor: '#4a82f6', color: '#fff', border: 'none', borderRadius: '10px', padding: '15px', textAlign: 'center' }} placeholder="Pin Code" value={details.pinCode} onChange={e => setDetails({...details, pinCode: e.target.value})} required />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" style={{ backgroundColor: '#4a82f6', color: '#fff', border: 'none', padding: '15px 80px', borderRadius: '10px', fontSize: '1.2rem', cursor: 'pointer' }}>Order Now</button>
            <button type="button" style={{ backgroundColor: '#fff', color: '#000', border: '1px solid #ff4d4f', padding: '15px 80px', borderRadius: '10px', fontSize: '1.2rem', cursor: 'pointer' }} onClick={() => navigate('/user/cart')}>Cancel</button>
          </div>
        </form>

      </div>
    </div>
  );
};

const GuestListPage = () => {
  const [guests, setGuests] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', relation: '' });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchGuests(); }, []);

  const fetchGuests = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/guests`, { credentials: 'include' });
    if (res.ok) setGuests(await res.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId ? `${import.meta.env.VITE_API_URL}/guests/${editId}` : `${import.meta.env.VITE_API_URL}/guests`;
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(formData)
    });
    if (res.ok) {
      setFormData({ name: '', email: '', relation: '' }); setEditId(null); fetchGuests();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete guest?')) {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/guests/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) fetchGuests();
    }
  };

  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#fff' }}>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', border: '1px solid #ddd' }}>
        <h2>Guest List Management</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', margin: '30px 0' }}>
          <input className="input-field" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input className="input-field" placeholder="Relation" value={formData.relation} onChange={e => setFormData({...formData, relation: e.target.value})} />
          <button type="submit" className="btn-primary">{editId ? 'Update' : 'Add'}</button>
        </form>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {guests.map(g => (
            <div key={g._id} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
              <h4>{g.name}</h4>
              <p style={{ color: '#666' }}>{g.relation}</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
                <button onClick={() => {setFormData(g); setEditId(g._id);}} style={{ cursor: 'pointer', color: '#4a82f6', background: 'none', border: 'none' }}>Update</button>
                <button onClick={() => handleDelete(g._id)} style={{ cursor: 'pointer', color: '#ff4d4f', background: 'none', border: 'none' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <button className="btn-secondary" style={{ marginTop: '40px', width: '100%' }} onClick={() => navigate('/user')}>Back</button>
      </div>
    </div>
  );
};

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.details || {};
  const total = location.state?.total || 0;

  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#ccc', minHeight: 'calc(100vh - 70px)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <p style={{ margin: 0, fontSize: '1.2rem', color: '#444' }}>PopUp</p>
        <h1 style={{ margin: 0, letterSpacing: '2px', fontWeight: '400', color: '#000' }}>THANK YOU</h1>
        <div style={{ backgroundColor: '#4a82f6', padding: '15px 100px', color: '#fff', borderRadius: '4px', fontSize: '1.3rem', marginTop: '20px' }}>
          Total Amount: {total}/-
        </div>
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 40px', marginTop: '40px' }}>
          {Object.entries(orderDetails).filter(([k]) => k !== 'paymentMethod').map(([k, v]) => (
            <div key={k} style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '15px', borderRadius: '15px', textAlign: 'center' }}>{v || k}</div>
          ))}
        </div>
        <div style={{ marginTop: '40px' }}>
          <button style={{ backgroundColor: '#4a82f6', color: '#fff', border: 'none', padding: '15px 80px', borderRadius: '15px', fontSize: '1.1rem', cursor: 'pointer' }} onClick={() => navigate('/user')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

const OrderStatusPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); 
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/orders`, { credentials: 'include' });
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err) { setLoading(false); }
  };

  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#ccc', minHeight: 'calc(100vh - 70px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ backgroundColor: '#4a82f6', padding: '15px', textAlign: 'center', borderRadius: '8px', color: '#fff', marginBottom: '60px', maxWidth: '600px', margin: '20px auto 60px' }}>
          <h2 style={{ margin: 0, fontWeight: '400', fontSize: '1.5rem' }}>Order Status - Check Status</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '15px' }}>
          {['Name', 'E-mail', 'Address', 'Status'].map(head => (
            <div key={head} style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '15px', textAlign: 'center', borderRadius: '10px', fontWeight: '500', fontSize: '1.2rem' }}>
              {head}
            </div>
          ))}
        </div>
        {!loading && orders.length === 0 && (
          <div style={{ backgroundColor: '#4a82f6', padding: '80px', textAlign: 'center', borderRadius: '20px', color: '#fff', fontSize: '1.8rem', marginTop: '20px' }}>no order found</div>
        )}
        {!loading && orders.length > 0 && orders.map((o, idx) => (
          <div key={o._id || idx} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', alignItems: 'center', marginBottom: '15px' }}>
            <div style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '20px 10px', textAlign: 'center', borderRadius: '10px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{o.name || '-'}</div>
            <div style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '20px 10px', textAlign: 'center', borderRadius: '10px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', wordBreak: 'break-all' }}>{o.email || '-'}</div>
            <div style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '20px 10px', textAlign: 'center', borderRadius: '10px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{o.address || '-'}</div>
            <div style={{ backgroundColor: '#4a82f6', color: '#fff', padding: '20px 10px', textAlign: 'center', borderRadius: '10px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{o.status}</div>
          </div>
        ))}
        <button className="btn-secondary" style={{ marginTop: '40px' }} onClick={() => navigate('/user')}>Back</button>
      </div>
    </div>
  );
};

const RequestItemPage = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState('');
  
  const handleRequest = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/requests`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ details })
    });
    if (res.ok) { alert('Request sent!'); navigate('/user'); }
  };

  return (
    <div className="page-container" style={{ padding: '40px', backgroundColor: '#fff' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd' }}>
        <h2>Request Special Item</h2>
        <form onSubmit={handleRequest} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          <textarea className="input-field" style={{ minHeight: '150px', backgroundColor: '#f1f5f9' }} placeholder="Details..." value={details} onChange={(e) => setDetails(e.target.value)} required />
          <button type="submit" className="btn-primary">Send Request</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/user')}>Back</button>
        </form>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item => item._id === product._id ? {...item, quantity: (item.quantity || 1) + 1} : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert('Added to cart!');
  };

  const updateQuantity = (index, qty) => {
    const newCart = [...cart]; newCart[index].quantity = qty; setCart(newCart);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart]; newCart.splice(index, 1); setCart(newCart);
  };

  const clearCart = () => { if (window.confirm('Clear cart?')) setCart([]); };

  const checkout = async (details) => {
    if (cart.length === 0) return;
    const vendorId = cart[0].vendorId; 
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const itemIds = cart.flatMap(item => Array(item.quantity || 1).fill(item._id));

    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/orders`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ vendorId, items: itemIds, totalAmount, ...details })
    });
    if (res.ok) { setCart([]); navigate('/user/success', { state: { details, total: totalAmount } }); }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <UserHeader />
      <Routes>
        <Route path="/" element={<MainUser />} />
        <Route path="/vendors/:category" element={<VendorListPage />} />
        <Route path="/vendor/:id/products" element={<ProductsPage addToCart={addToCart} />} />
        <Route path="/view-products" element={<AllProductsPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} checkout={checkout} />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/orders" element={<OrderStatusPage />} />
        <Route path="/request-item" element={<RequestItemPage />} />
        <Route path="/guest-list" element={<GuestListPage />} />
      </Routes>
    </div>
  );
};

export default UserDashboard;
