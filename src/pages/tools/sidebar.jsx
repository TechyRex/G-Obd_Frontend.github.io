import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../stylings/styles.css';

const Sidebar = ({ visible }) => {
  // Updated navigation items with icons matching the image
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'bi bi-speedometer2' },
    { path: '/mechanics', label: 'Mechanics', icon: 'bi bi-tools' },
    { path: '/individual', label: 'Individual', icon: 'bi bi-person' },
    { path: '/settings', label: 'Settings', icon: 'bi bi-gear' },
    { path: '/messages', label: 'Messages', icon: 'bi bi-chat-dots' },
    { path: '/support', label: 'Support', icon: 'bi bi-headset' },
  ];

  if (!visible) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img 
          src="/ASORO_NEW_LOGO-1.png" 
          alt="Company Logo" 
          className="sidebar-logo"
        />
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <i className={item.icon}></i>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul> 
      </nav>

      <button className="logout-button">
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </button>
    </aside>
  );
};

Sidebar.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Sidebar;