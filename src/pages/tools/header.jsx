import React, { Component } from 'react';
import '../../stylings/styles.css';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="header-right">
          <div className="notification-icon">
            <span role="img" aria-label="notifications">🔔</span>
          </div>
          <div className="admin-data">
            <div className="left">AC</div>
            <div className="right"> 
              <span className='name'>Admin Adeola</span>
              <span>Admin</span>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
