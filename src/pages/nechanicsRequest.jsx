import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveHeader from './tools/responsiveHeader';

const MechanicRequest = () => {
  const [data, setData] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();

  // Replace this with your own data fetching logic
  const fetchData = async () => {
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
      // setData({ users: usersData, payments: paymentsData });
      
      // For now using null to show the UI structure
      setData(null);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ResponsiveHeader />
      <div className="container">
        <div className="containerRequest">
          <div className="head">
            <h2>#Request - 001</h2>
          </div>
          <div className="others">
            <div className="left">
              <table>
                <thead>
                  <tr>
                    <th>Request id</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Customer name</td>
                    <td>val2</td>
                  </tr>
                  <tr>
                    <td>Date requested</td>
                    <td>val2</td>
                  </tr>
                  <tr>
                    <td>Date completed</td>
                    <td>val2</td>
                  </tr>
                </tbody>
              </table>
              <div className="requestSummary">
                <div>Request:</div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam recusandae eius eveniet temporibus magni nemo iste consequuntur consectetur. Suscipit reprehenderit illum molestiae maiores quod asperiores hic amet repellendus recusandae quae?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum veritatis nam omnis iste esse eligendi dolorum iusto ea neque sequi, provident vitae voluptatem! Fugit blanditiis consequuntur tempora minima a exercitationem!
                </p>
              </div>
            </div>
            <div className="right">
              <div className="requestIntro">
                <div className="img"><img src="vite.svg" alt="" /></div>
                <div className="name">name</div>
                <div className="role">role</div>
                <div className="number">number</div>
                <div className="number">star ratings</div>
              </div>
              <div className="requestOther">
                {[...Array(4)].map((_, index) => (
                  <div className="indiv" key={index}>
                    <div className="title">Title</div>
                    <div className="subTitle">subTitle</div>
                  </div>
                ))}
              </div>
              <div className="reviews">
                <div className='revHead'>Reviews</div>
                {[...Array(4)].map((_, index) => (
                  <div className="indiv" key={index}>
                    <div className="review">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sequi aperiam placeat, amet perspiciatis sit. Vitae fugit excepturi maiores eum est. Eius, a! Facilis ut et quaerat, sit ipsum aliquid.</div>
                    <div className="author">- Mark</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicRequest;