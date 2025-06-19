import React, { useState } from 'react';
import '../stylings/styles.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // TODO: Implement your verification logic
      // Example:
      // const response = await yourAuthService.verifyCode(code);
      
      // Simulating successful verification
      toast.success('Verification successful!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      setTimeout(() => {
        navigate('/login'); // Redirect after verification
      }, 1000);
      
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Verification failed. Please try again.', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="verification-container">
        <div className="inner">
          <h2>Account Verification</h2>
          {errorMessage && <div className="error">{errorMessage}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Verification Code:</label>
              <input 
                type="text" 
                name="code" 
                value={code} 
                onChange={handleChange} 
                placeholder="Enter your verification code"
                required 
              />
            </div>
            <button type="submit" className="verify-btn">
              Verify Account
            </button>
          </form>
          <div className="help-text">
            Didn't receive a code? <a href="/resend-code">Resend verification code</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;