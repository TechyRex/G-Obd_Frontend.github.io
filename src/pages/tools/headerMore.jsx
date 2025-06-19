import React, { Component } from 'react';
import '../../../stylings/styles.css'; // Keep this line for CSS
import Breadcrumb from './breadCrumb'; // Assuming this is your own breadcrumb component

export default class HeaderMore extends Component {
  render() {
    const breadcrumbPath = ['Home', 'RQ-001'];
    const activeIndex = 1;

    return (
      <header className="header">
        <Breadcrumb path={breadcrumbPath} activeIndex={activeIndex} />
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
