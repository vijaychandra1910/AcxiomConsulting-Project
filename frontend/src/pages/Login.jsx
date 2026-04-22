import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'Admin' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate(`/${data.user.role.toLowerCase()}`);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 100px)' }}>
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '400px' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>{formData.role} Login</h2>
        {error && <div style={{ color: 'var(--error)', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Role</label>
            <select 
              className="input-field" 
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="Admin">Admin</option>
              <option value="Vendor">Vendor</option>
              <option value="User">User</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>{formData.role} Email (User Id)</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder={`Enter ${formData.role} Email`}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>{formData.role} Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder={`Enter ${formData.role} Password`}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => navigate('/')}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>Login</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
