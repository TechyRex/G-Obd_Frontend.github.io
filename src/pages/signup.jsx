import React, { useState } from 'react';
import '../stylings/styles.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loader from './tools/loader';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  // Replace with your own signup logic
  const handleSignup = async (signupData) => {
    setLoading(true);
    try {
      // TODO: Implement your signup logic
      // Example:
      // const response = await yourAuthService.signup(signupData);
      
      // Simulating successful signup
      setTimeout(() => {
        setLoading(false);
        toast.success('Signup successful!', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
        
        // Navigate after success
        setTimeout(() => {
          navigate('/verification');
        }, 1000);
        
        return true;
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error('Signup failed. Please try again.', {
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
    
    // Basic validation
    if (!username || !email || !password || !phoneNumber) {
      toast.error('Please fill all fields', { position: 'top-right' });
      return;
    }

    const signupData = { 
      username, 
      email, 
      password, 
      phoneNumber,
      code: generateRandomString(13) // Generate verification code
    };

    await handleSignup(signupData);
  };

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      
      <div className="signup-container">
        <div className="inner">
          <h2>Admin Signup</h2>
          {errorMessage && <div className="error">{errorMessage}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input 
                type="text" 
                name="username" 
                value={username} 
                onChange={handleChange} 
                required 
              />
            </div>
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
            <div className="form-group">
              <label>Phone Number:</label>
              <input 
                type="tel" 
                name="phoneNumber" 
                value={phoneNumber} 
                onChange={handleChange} 
                required 
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <span><a href="/login">Login</a> to your account</span>
        </div>
      </div>
    </>
  );
};

export default Signup;