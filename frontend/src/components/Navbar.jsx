import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const Navbar = () => {
  const navigate = useNavigate();
  // Assume simple auth state for demo
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 60px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
        zIndex: 1000
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/logo.png" alt="AcxiomConsulting Logo" style={{ height: '40px', objectFit: 'contain' }} />
      </Link>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <button className="btn-secondary" style={{ padding: '8px 16px' }} onClick={() => alert('Chart Link Clicked')}>CHART</button>
        {!user ? (
          <>
            <Link to="/login" className="btn-secondary" style={{ padding: '8px 16px' }}>Login</Link>
            <Link to="/signup" className="btn-primary" style={{ padding: '8px 16px' }}>Sign Up</Link>
          </>
        ) : (
          <>
            <Link to={`/${user.role.toLowerCase()}`} style={{ fontWeight: '500' }}>Dashboard</Link>
            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px 16px' }}>Logout</button>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
