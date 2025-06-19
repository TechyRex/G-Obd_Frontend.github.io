import React, { Component } from 'react';
import Breadcrumb from './breadCrumb';
import '../../stylings/styles.css';
import { useAppContext } from './AppContext';
import Cookies from "js-cookie";

// Helper function to validate JSON response
const validateJsonResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Expected JSON but received:', text.substring(0, 200));
    throw new Error('Server returned non-JSON response (possibly HTML error page)');
  }
  
  return response.json();
};

class ResponsiveHeader extends Component {
  state = {
    sidebarVisible: true,
    openUp: false,
    username: "",
    nameKey: "",
    messages: [],
    unseenMessages: 0,
    siteUsers: [],
    gobdUsers: [],
    diagnoses: [],
  };

  componentDidMount() {
    this.fetchData();
    this.fetchMessages();
    this.fetchDiagnoses();
  }

  toggleSidebarClass = () => {
    this.setState(prevState => ({ openUp: !prevState.openUp }));
  };

  logout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logoutadmin`, {
        method: "GET",
        credentials: "include"
      });
      const res = await validateJsonResponse(response);
      if (res.status === "success") window.location.href = "/login";
    } catch (error) {
      console.error('Error logging out:', error);
      // Fallback - redirect to login anyway
      window.location.href = "/login";
    }
  };

  formatName = (str) => str.slice(0, 2);

  fetchData = async () => {
    try {
      console.log('Fetching admin data from:', `${import.meta.env.VITE_API_URL}/verifyAdmin`);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/verifyAdmin`, {
        method: "GET",
        credentials: "include"
      });

      const adminData = await validateJsonResponse(response);
      const isInvalidSession = !adminData || adminData.message === "Please log in again.";

      this.setState({ username: adminData?.username || "Admin" });

      if (isInvalidSession) {
        console.warn('Invalid session, redirecting to login might be needed');
        return;
      }

      const usersData = await this.fetchAllUsersData();
      const gobdArr = usersData && usersData.message !== "no users"
        ? usersData.filter(user => user.seen !== "SEEN")
        : [];

      this.setState({
        gobdUsers: gobdArr,
        nameKey: this.formatName(this.state.username),
      });

    } catch (error) {
      console.error('Error fetching data:', error);
      // Optionally redirect to login or show user-friendly error
      if (error.message.includes('non-JSON response')) {
        console.warn('API might be down or returning error pages');
      }
    }
  };

  fetchDiagnoses = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/verifyAdmin`, {
        method: "GET",
        credentials: "include"
      });

      const adminData = await validateJsonResponse(response);
      const isInvalidSession = !adminData || adminData.message === "Please log in again.";

      this.setState({ username: adminData?.username || "Admin" });

      if (isInvalidSession) return;

      const allDiagnoses = await this.fetchAllDiagnoses();
      const unseenDiagnosesArr = allDiagnoses && allDiagnoses.message !== "no car_issues"
        ? allDiagnoses.filter(issue => issue.seen !== "SEEN")
        : [];

      this.setState({
        diagnoses: unseenDiagnosesArr,
        nameKey: this.formatName(this.state.username),
      });

    } catch (error) {
      console.error('Error fetching diagnoses:', error);
    }
  };

  fetchMessages = async () => {
    try {
      console.log('Fetching messages from:', `${import.meta.env.VITE_API_URL_2}/fetchAllMessages`);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL_2}/fetchAllMessages`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await validateJsonResponse(response);
      const separatedData = separateByMyId(data.result);

      const unseenMessages = [];
      separatedData.forEach(group =>
        group.forEach(msg => {
          if (msg.myId !== "admin" && msg.seen_by_admin !== "SEEN") {
            unseenMessages.push(msg);
          }
        })
      );

      this.setState({ unseenMessages: separateByMyId(unseenMessages).length });

      // Fetch site users
      const allSiteUsers = await this.fetchAllSiteUsers();
      const unseenArrUsers = allSiteUsers.filter(user => user.seen !== "SEEN");
      this.setState({ siteUsers: unseenArrUsers });

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  fetchAllDiagnoses = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getAllDiagnostics`, {
        method: "GET",
        credentials: "include"
      });
      return await validateJsonResponse(response);
    } catch (error) {
      console.error('Error fetching diagnoses:', error);
      return { message: "no car_issues" }; // Return fallback instead of empty array
    }
  };

  fetchAllUsersData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getAllUsers`, {
        method: "GET",
        credentials: "include"
      });
      return await validateJsonResponse(response);
    } catch (error) {
      console.error('Error fetching users data:', error);
      return { message: "no users" }; // Return fallback instead of empty array
    }
  };

  fetchAllSiteUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_2}/users`, {
        method: "GET",
        credentials: "include"
      });
      return await validateJsonResponse(response);
    } catch (error) {
      console.error('Error fetching site users:', error);
      return []; // Return empty array as fallback
    }
  };

  render() {
    const { sidebarVisible, openUp, nameKey, username, gobdUsers, siteUsers, diagnoses, unseenMessages } = this.state;

    return (
      <header className="header">
        <div className="res">
          <div className="open" onClick={this.toggleSidebarClass}>
            <i className="bi bi-layout-text-sidebar"></i>
          </div>
          <div className="header-search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-right">
            <div className="notification-icon">
              <i className="bi bi-bell"></i>
            </div>
            <div className="admin-data">
              <div className="left">{nameKey.toUpperCase()}</div>
              <div className="right">
                <span className="name">{username}</span>
                <span>Admin</span>
              </div>
            </div>
          </div>
        </div>

        {sidebarVisible && (
          <div className={`sideBar ${openUp ? 'openUp' : ''}`}>
            <div className="header-logo">
              <img 
                src="/ASORO_NEW_LOGO-1.png" 
                alt="Logo" 
                style={{ height: '95px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
  
            <ul>
              <li><a href="/dashboard"><i className="bi bi-speedometer2"></i> Dashboard</a></li>
              <li><a href="/mechanics"><i className="bi bi-tools"></i> Mechanics</a></li>
              <li><a href="/individual"><i className="bi bi-person"></i> Individual</a></li>
              
              <li><a href="/settings"><i className="bi bi-gear"></i> Settings</a></li>
              <li className="messages">
                <a href="/messages">
                  <i className="bi bi-chat-dots"></i> Messages
                </a>
                {unseenMessages > 0 && <span>{unseenMessages}</span>}
              </li>
              <li><a href="/support"><i className="bi bi-headset"></i> Support</a></li>
            </ul>
            <div className="header-search">
              <input type="text" placeholder="Search..." />
            </div>
            <div className="logout" onClick={this.logout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </div>
            <div className="close" onClick={this.toggleSidebarClass}>
              <i className="bi bi-x-lg"></i>
            </div>
          </div>
        )}
      </header>
    );
  }
}

// Util to group messages by unique user pair
function separateByMyId(arr) {
  const result = {};

  arr.forEach(item => {
    const key = [item.myId, item.otherId].sort().join('-');
    if (!result[key]) result[key] = [];
    result[key].push(item);
  });

  return Object.values(result);
}

// Wrapper to inject context
const DashboardWithContext = () => {
  const { fetchData, data, loginStatus } = useAppContext();
  return <ResponsiveHeader fetchData={fetchData} data={data} loginStatus={loginStatus} />;
};

export default DashboardWithContext;