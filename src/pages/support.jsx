import React, { useEffect, useState } from 'react';
import ResponsiveHeader from './tools/responsiveHeader';
import Loader from './tools/loader';

const Support = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // TODO: Implement your authentication check
        // Example:
        // const isAuthenticated = await yourAuthService.checkAuth();
        // if (!isAuthenticated) {
        //   // Handle redirect to login
        //   return;
        // }

        // TODO: Implement your support tickets fetching logic
        // Example:
        // const ticketsData = await yourSupportService.getTickets();
        // setTickets(ticketsData);
        
        // For demo purposes - using sample data
        setTickets(Array.from({ length: 10 }).map((_, i) => ({
          id: `TKT-${1000 + i}`,
          subject: `Support Ticket ${i + 1}`,
          client: `Client ${i + 1}`,
          date: new Date().toLocaleDateString(),
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <ResponsiveHeader />
      <div className="container">
        <div className="containerSupport">
          <div className="head">Support</div>
          <div className="tableSection">
            <table>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Subject</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th className='action'>Priority</th>
                  <th className='action'>Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr key={index}>
                    <td>{ticket.id}</td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.client}</td>
                    <td>{ticket.date}</td>
                    <td className='action'>
                      <span className={ticket.priority}>{ticket.priority}</span>
                    </td>
                    <td className='action'>
                      <button className="view-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;