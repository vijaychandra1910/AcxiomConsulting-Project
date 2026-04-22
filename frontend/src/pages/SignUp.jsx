import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Vendor', category: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div style={{ padding: '20px', minHeight: 'calc(100vh - 80px)', backgroundColor: '#fff', color: '#000' }}>
      {/* Top Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button className="btn-secondary" style={{ backgroundColor: '#f1f5f9', color: '#000' }} onClick={() => alert('Chart Link')}>CHART</button>
        <button className="btn-secondary" style={{ backgroundColor: '#f1f5f9', color: '#000' }} onClick={() => navigate(-1)}>BACK</button>
      </div>

      {/* Header Banner */}
      <div style={{ backgroundColor: '#f1f5f9', padding: '15px', textAlign: 'center', marginBottom: '40px', borderRadius: '4px', border: '1px solid #ddd' }}>
        <h2 style={{ letterSpacing: '1px', fontWeight: '600', color: '#000' }}>{formData.role} Registration</h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '400px', backgroundColor: '#fff' }}
        >
          {error && <div style={{ color: 'var(--error)', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '120px', textAlign: 'left', fontWeight: '500', color: '#000' }}>{formData.role} Name</div>
              <input 
                type="text" 
                className="input-field" 
                style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#000', border: '1px solid #ddd' }}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder={`Enter ${formData.role} Name`}
                required 
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '120px', textAlign: 'left', fontWeight: '500', color: '#000' }}>{formData.role} Email</div>
              <input 
                type="email" 
                className="input-field" 
                style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#000', border: '1px solid #ddd' }}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder={`Enter ${formData.role} Email`}
                required 
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '120px', textAlign: 'left', fontWeight: '500', color: '#000' }}>Password</div>
              <input 
                type="password" 
                className="input-field" 
                style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#000', border: '1px solid #ddd' }}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder={`Enter ${formData.role} Password`}
                required 
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '120px', textAlign: 'left', fontWeight: '500', color: '#000' }}>Role</div>
              <select 
                className="input-field" 
                style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#000', border: '1px solid #ddd' }}
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                required
              >
                <option value="User">User</option>
                <option value="Vendor">Vendor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <AnimatePresence>
              {formData.role === 'Vendor' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
                >
                  <div style={{ width: '120px', textAlign: 'left', fontWeight: '500', color: '#000' }}>Category</div>
                  <select 
                    className="input-field" 
                    style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#000', border: '1px solid #ddd' }}
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Catering">Catering</option>
                    <option value="Florist">Florist</option>
                    <option value="Decoration">Decoration</option>
                    <option value="Lighting">Lighting</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button type="submit" className="btn-primary" style={{ width: '200px' }}>{formData.role} Sign Up</button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
