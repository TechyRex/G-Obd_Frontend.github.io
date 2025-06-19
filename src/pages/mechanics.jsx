import React, { useEffect, useState } from 'react';
import ResponsiveHeader from './tools/responsiveHeader';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './tools/AppContext';
import Loader from './tools/loader';


const Mechanics = () => {
  const navigate = useNavigate();
  const { data, setData } = useAppContext();
  const [users, setUsers] = useState([]);
  const [siteUsers, setSiteUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const sampleUsers = [
        {
          id: 1,
          username: "John Doe",
          car_make: "Toyota",
          car_year: "2020",
          car_model: "Camry",
          engine_type: "V6",
          phone: "+1234567890",
          subscription_status: "Active",
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          username: "Jane Smith",
          car_make: "Honda",
          car_year: "2019",
          car_model: "Civic",
          engine_type: "I4",
          phone: "+0987654321",
          subscription_status: "Inactive",
          created_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 3,
          username: "Mike Johnson",
          car_make: "Ford",
          car_year: "2021",
          car_model: "F-150",
          engine_type: "V8",
          phone: "+1122334455",
          subscription_status: "Active",
          created_at: new Date(Date.now() - 172800000).toISOString()
        }
      ];

      setUsers(sampleUsers);
      setSiteUsers(sampleUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (e, itemId) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const handleAction = (action, item) => {
    setActiveDropdown(null);
    switch (action) {
      case 'chat':
        console.log('Chat with:', item);
        break;
      case 'view':
        navigate(`/mechanicsRequest/${item.id}`);
        break;
      case 'edit':
        navigate(`/mechanicsEdit/${item.id}`);
        break;
      
      case 'delete':
        console.log('Delete:', item);
        break;
      default:
        break;
    }
  };
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
        <div className="containerMechanics">
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
          <div className="tableSection">
            <table>
              <thead>
                <tr>
                  <th>Mechanic ID</th>
                  <th>Mechanic Name</th>
                  <th>Stall Address</th>
                  <th>Requests Received</th>
                  <th>Requests Submitted</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.username}</td>
                      <td>{item.car_make} {item.car_model}</td>
                      <td>5</td>
                      <td>3</td>
                      <td style={{ position: 'relative' }}>
                        <div className="action-menu">
                          <button 
                            className="action-dots"
                            onClick={(e) => toggleDropdown(e, item.id)}
                          >
                            <span className="text-xl cursor-pointer">...</span>
                          </button>
                          {activeDropdown === item.id && (
                            <div className="dropdown-menu">
                              <div className="dropdown-item" onClick={() => handleAction('chat', item)}>Chat</div>
                              <div className="dropdown-item" onClick={() => handleAction('view', item)}>View</div>
                              <div className="dropdown-item" onClick={() => handleAction('edit', item)}>Edit</div>
                              <div className="dropdown-item" onClick={() => handleAction('procurement', item)}>Procurement</div>
                              <div className="dropdown-item delete" onClick={() => handleAction('delete', item)}>Delete</div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center' }}>
                      No mechanics in database
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper component to handle context
const MechanicsWrapper = () => {
  const { data, setData } = useAppContext();
  return <Mechanics data={data} setData={setData} />;
};

export default MechanicsWrapper;

function formatDate(input) {
  if (!input) return '';

  const date = new Date(input);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}
