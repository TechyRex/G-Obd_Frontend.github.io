import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveHeader from './tools/responsiveHeader';
import { useAppContext } from '../pages/tools/AppContext';
import Chart from './tools/chart';
import Loader from './tools/loader';
import '../stylings/styles.scss';


const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    users: []
  });
  const [requests, setReuests] = useState([]);
  const [siteUsers, setSiteUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Replace this with your own data fetching logic
  const fetchData = async () => {
    setLoading(true);
    try {
      // TODO: Implement your own authentication check
      // Example:
      // const isAuthenticated = await yourAuthService.checkAuth();
      // if (!isAuthenticated) {
      //   navigate("/login");
      //   return;
      // }

      // TODO: Implement your own data fetching logic
      // Example:
      // const usersData = await yourUserService.getAllUsers();
      // const paymentsData = await yourPaymentService.getPayments();
      // const siteUsersData = await yourChatService.getChatUsers();
      
      // For now using empty arrays to show the UI structure
      setData({ users: [], requests: [], adminData: {} });
      setPayments([]);
      setSiteUsers([]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ResponsiveHeader />
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <div>
            {/* Add any additional content you want to show when data is loaded */}
          </div>
        )}
        <div className="section1">
          <div className="head">
            <h2>Key metrics</h2>
          </div>
          <div className="metrics">
            <div className="value active">
              <div className="title">Total Mechanics Registered</div>
              <span className='num'>{siteUsers?.length || 0}</span>
            </div>
            <div className="value">
              <div className="title">Pending Service Request</div>
              <span className='num'>{data?.users?.length || 0}</span>
            </div>
            <div className="value">
              <div className='title'>Completed Service Request</div>
              <span className='num'>{siteUsers?.length || 0}</span>
            </div>
            <div className="value">
              <div className='title'>Past Orders Completed</div>
              <span className='num'>{siteUsers?.length || 0}</span>
            </div>
          </div>
        </div>


        <div className="section2">
          <div className="chartsCont">
            <Chart />
          </div>
          <div className="individualsCont">
            <table>
              <thead>
                <tr>
                  <th>Mechanic Name</th>
                  <th>Requests Received</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {siteUsers && siteUsers.length > 0 ? (
                  siteUsers.map((item, i) => (
                    <tr key={i}>
                      <td>{item.mechanicname}</td>
                      <td>{item.requestreceived}</td>
                      <td>{item.action}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center' }}>
                      No users available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="section3">
          <table>
            <thead>
            <tr>
                <th>Request ID</th>
                <th>Individual Name</th>
                <th>Individual Address</th>
                <th>No of Request</th>
                <th>Completed Request</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests && requests.length > 0 ? (
                requests.map((item, i) => (
                  <tr key={i}>
                    <td>{item.requestID}</td>
                    <td>{item.individualName}</td>
                    <td>{item.individualAddress}</td>
                    <td>{item.totalRequests}</td>
                    <td>{item.completedRequests}</td>
                    <td>{item.action}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>
                    No requests available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function formatDate(timestamp) {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  
  // Format options
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return date.toLocaleString('en-NG', options);
}