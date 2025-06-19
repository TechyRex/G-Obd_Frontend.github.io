import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveHeader from './tools/responsiveHeader';
import { useAppContext } from '../pages/tools/AppContext';
import Loader from './tools/loader';
import '../stylings/styles.scss';

const Settings = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    profilePicture: null
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

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

      // TODO: Implement your own profile data fetching logic
      // Example:
      // const profileData = await yourUserService.getProfile();
      // setProfileData(profileData);
      
      // For now using empty data to show the UI structure
      setProfileData({
        fullName: '',
        email: '',
        profilePicture: null
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({
        ...prev,
        profilePicture: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicturePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveInformation = async () => {
    setLoading(true);
    try {
      // TODO: Implement your save profile logic
      // Example:
      // await yourUserService.updateProfile(profileData);
      console.log('Saving profile information:', profileData);
      
      // Show success message or handle response
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
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
            {/* Settings content goes here when not loading */}
          </div>
        )}
        
        <div className="settings-section">
          <div className="settings-header">
            <h2>Settings</h2>
          </div>
          
          <div className="profile-info-section">
            <h3>Profile Information</h3>
            
            <div className="profile-picture-container">
              <div className="profile-picture">
                {profilePicturePreview ? (
                  <img 
                    src={profilePicturePreview} 
                    alt="Profile" 
                    className="profile-image"
                  />
                ) : (
                  <div className="profile-placeholder">
                    <span className="placeholder-icon"></span>
                  </div>
                )}
              </div>
              
              <button 
                className="upload-btn"
                onClick={handleUploadClick}
              >
                 Upload Photo
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                style={{ display: 'none' }}
              />
            </div>
            
            <div className="form-fields">
              <div className="field-group">
                <label className="field-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name..."
                  className="field-input"
                />
              </div>
              
              <div className="field-group">
                <label className="field-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  placeholder="Email..."
                  className="field-input"
                />
              </div>
              
              <button 
                className="save-info-btn"
                onClick={handleSaveInformation}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Information'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;