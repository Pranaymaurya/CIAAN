import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          LinkedClone
        </Link>
        
        {isAuthenticated && (
          <nav className="nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to={`/profile/${user?.id}`} className="nav-link">
              Profile
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;