import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your own data fetching implementation
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Implement your authentication check
      // const isAuthenticated = await yourAuthService.checkAuth();
      
      // TODO: Implement your data fetching logic
      // Example:
      // const userData = await yourUserService.getAllUsers();
      // const paymentData = await yourPaymentService.getPayments();
      
      // For demo purposes
      setData({
        users: [],
        payments: [],
        adminData: null
      });
      setLoginStatus(true);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data');
      setLoginStatus(false);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider 
      value={{ 
        data, 
        fetchData, 
        loginStatus, 
        loading, 
        error,
        setLoginStatus // Added for login/logout control
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};