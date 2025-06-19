import React, { useState, useEffect, useRef } from 'react';
import Header from './tools/header';
import Sidebar from './tools/sidebar';
import ResponsiveHeader from './tools/responsiveHeader';
import { useNavigate } from 'react-router-dom';
import Loader from './tools/loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState('admin');
  const [otherId, setOtherId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [currCustomer, setcurrCustomer] = useState({});
  const [messagesMain, setMessagesMain] = useState([]);
  const [loading, setLoading] = useState(false);
  const innerContRef = useRef(null);
  const [showImg, setShowImg] = useState(false);
  const [imgValue, setimgValue] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedRawFiles, setSelectedRawFiles] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Initialize component
  useEffect(() => {
    fetchData();
  }, []);

  // Handle file selection visibility
  useEffect(() => {
    if (selectedRawFiles.length > 0) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [selectedRawFiles]);

  // Replace with your own data fetching logic
  const fetchData = async () => {
    setLoading(true);
    try {
      // TODO: Implement your authentication check
      // Example:
      // const isAuthenticated = await yourAuthService.checkAuth();
      // if (!isAuthenticated) {
      //   navigate("/login");
      //   return;
      // }
      
      // TODO: Set user ID from your auth service
      // setUserId(authData.id);
      
      // For demo purposes
      setMessages([]);
      setCustomers([]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Replace with your own message fetching logic
  const fetchMessages = async () => {
    try {
      // TODO: Implement your message fetching logic
      // Example:
      // const messages = await yourMessageService.getAllMessages();
      // setMessages(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Replace with your own message sending logic
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !otherId) {
      toast.error("Please enter a message and select a user", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    try {
      // TODO: Implement your message sending logic
      // Example:
      // await yourMessageService.sendMessage({
      //   message: newMessage,
      //   senderId: userId,
      //   receiverId: otherId
      // });
      
      setNewMessage('');
      // Refresh messages
      await fetchMessages();
      if (innerContRef.current) {
        innerContRef.current.scrollTop = innerContRef.current.scrollHeight;
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // File handling functions
  const handleButtonClick = () => {
    const inputRef = document.createElement('input');
    inputRef.type = 'file';
    inputRef.multiple = true;
    inputRef.addEventListener('change', handleFileChange);
    inputRef.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      toast.error("Maximum 10 files allowed", { position: "top-right" });
      return;
    }
    setSelectedRawFiles(files);
    
    // Process files for preview
    const imageArray = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageArray.push(reader.result);
        if (imageArray.length === files.length) {
          setSelectedFiles(imageArray);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    if (!otherId) {
      toast.error("Please select a user", { position: "top-right" });
      return;
    }
    if (!selectedFiles.length) {
      toast.error("No files selected", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement your file upload logic
      // Example:
      // await yourFileService.uploadFiles({
      //   files: selectedFiles,
      //   senderId: userId,
      //   receiverId: otherId
      // });
      
      toast.success("Files uploaded successfully", { position: "top-right" });
      setSelectedRawFiles([]);
      await fetchMessages();
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error("Error uploading files", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  const handleClearall = () => {
    setSelectedRawFiles([]);
    toast.success('Files cleared', { position: 'top-right' });
  };

  const handleClick = async (id) => {
    setOtherId(id);
    try {
      // TODO: Implement your conversation fetching logic
      // Example:
      // const conversation = await yourMessageService.getConversation(id);
      // setMessagesMain(conversation.messages);
      // setcurrCustomer(conversation.user);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const renderFilePreview = (file) => {
    const isImage = file.type.startsWith('image');
    const isVideo = file.type.startsWith('video');

    if (isImage) {
      const imageUrl = URL.createObjectURL(file);
      return (
        <span className="file img" key={file.name}>
          <img className="img" src={imageUrl} alt="thumbnail" />
        </span>
      );
    }

    if (isVideo) {
      const videoUrl = URL.createObjectURL(file);
      return (
        <span className="file vid" key={file.name}>
          <video className="vid" width="120" height="90" controls>
            <source src={videoUrl} type={file.type} />
          </video>
        </span>
      );
    }

    return null;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const fetchImg = (img) => {
    setShowImg(true);
    setimgValue(img);
  };

  return (
    <div>
      <ResponsiveHeader />
      <div className="container">
        <ToastContainer />
        {loading && <Loader />}
        
        <div className="containerMessages">
          <div className="headerSection">
            <div className="dm active">DM's</div>
            <div className="notifications">Notifications</div>
          </div>
          
          <div className="messageSection">
            <div className="messageList">
              <div className="details" ref={innerContRef}>
                {messages.map((item, i) => (
                  <div 
                    className="indiv" 
                    onClick={() => handleClick(item[0].myId === "admin" ? item[0].otherId : item[0].myId)} 
                    key={i}
                  >
                    <div className="image">
                      <img src="image_asoroauto.webp" alt="" />
                    </div>
                    <div className="other">
                      <div className="name">{customers[i]?.username}</div>
                      <div className="messageDetails">{item[0].message}</div>
                    </div>
                    {/* Unread message count would go here */}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="chatSection">
              <div className="chatCont">
                <div className="messageSection" ref={innerContRef}>
                  {messagesMain.map((item, i) => (
                    item.message.startsWith("http") ? (
                      <div className={item.otherId === "admin" ? "reciever" : "sender"} key={i}>
                        <div className={item.otherId === "admin" ? "recieverInner" : "senderInner"}>
                          <img 
                            src={item.message} 
                            style={{
                              border: "2px solid #ccc",
                              borderRadius: "10px",
                              maxWidth: "50%"
                            }} 
                            alt="Message" 
                            onClick={() => fetchImg(item.message)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className={item.otherId === "admin" ? "reciever" : "sender"} key={i}>
                        <div className={item.otherId === "admin" ? "recieverInner" : "senderInner"}>
                          <div className="message">{item.message}</div>
                        </div>
                      </div>
                    )
                  ))}
                  
                  <div
                    className="image-preview sender"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      visibility: isVisible ? 'visible' : 'hidden',
                      display: isVisible ? 'flex' : 'none',
                    }}
                  >
                    <span className="senderInner2">
                      <div className="files">
                        {selectedRawFiles.map((file) => renderFilePreview(file))}
                      </div>
                      <button className="sendBut" onClick={handleUpload}>Send Files</button>
                      <button className="sendBut" style={{background:"red"}} onClick={handleClearall}>Clear all</button>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="inputSection">
                <i className="bi bi-paperclip" id='file' onClick={handleButtonClick}></i>
                <input 
                  type="text" 
                  onKeyDown={handleKeyDown} 
                  value={newMessage} 
                  id="text" 
                  placeholder='Send a message...' 
                  onChange={(e) => setNewMessage(e.target.value)} 
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
            
            <div className="chatDetails">
              <div className="userIntro">
                <div className="img"><img src="image_asoroauto.webp" alt="" /></div>
                <div className="name">{currCustomer?.username || "Select a user"}</div>
                <div className="role">User</div>
                <div className="number">{currCustomer?.phone || ""}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="biggerPic" style={{display: showImg ? "flex" : "none"}}>
          <div className="biggerPicWrapper" onClick={() => setShowImg(false)}></div>
          <div className="img"><img src={imgValue} alt="" /></div>
        </div>
      </div>
    </div>
  );
};

export default Messages;