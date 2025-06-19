// individualEdit.jsx
import React, { useState } from 'react';
import ResponsiveHeader from './tools/responsiveHeader';
import '../stylings/styles.scss';

const IndividualEdit = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    documents: '',
    verified: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // You can send this to your API or backend here
  };

  return (
    <div>
      <ResponsiveHeader />
      <div className="container">
        <div className="section1">
          <div className="head">
            <h2>Edit</h2>
          </div>
          <form onSubmit={handleSubmit} className="form-wrapper">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </div>

            <div className="form-group">
              <label>Documents</label>
              <input
                type="text"
                name="documents"
                value={formData.documents}
                onChange={handleChange}
                placeholder="Enter documents info"
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="verified"
                  checked={formData.verified}
                  onChange={handleChange}
                /> Verified
              </label>
            </div>

            <button type="submit" className="submit-btn">Save Information</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndividualEdit;