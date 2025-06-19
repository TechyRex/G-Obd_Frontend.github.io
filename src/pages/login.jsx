import React, { useState } from 'react';
import '../stylings/styles.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loader from './tools/loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Replace this with your own login logic
  const handleLogin = async (loginData) => {
    setLoading(true);
    try {
      // TODO: Implement your own login logic here
      // Example:
      // const response = await yourAuthService.login(loginData);
      
      // Simulating successful login
      setTimeout(() => {
        setLoading(false);
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }, 1000);
      
      return true;
    } catch (error) {
      setLoading(false);
      toast.error('Login failed. Please try again.', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    await handleLogin(loginData);
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* Add any additional content you want to show when data is loaded */}
        </div>
      )}
      <div className="login-container">
        <div className="inner">
          <h2>Admin Login</h2>
          {errorMessage && <div className="error">{errorMessage}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                name="email" 
                value={email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input 
                type="password" 
                name="password" 
                value={password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <button type="submit">Log In</button>
          </form>
          <span><a href="/signup">Signup</a> for an account</span>
        </div>
      </div>
    </>
  );
};

export default Login;