import React, { useEffect, useState } from 'react';
import ResponsiveHeader from './tools/responsiveHeader';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './tools/AppContext';
import Loader from './tools/loader';

export default function ChatUsers() {
    const navigate = useNavigate();
    const { data, setData } = useAppContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Replace this with your own data fetching logic
    const fetchData = async () => {
        setLoading(true);
        try {
            // TODO: Implement your own data fetching logic here
            // Example:
            // const usersData = await yourBackendService.getChatUsers();
            // setUsers(usersData);
            
            // For now using empty array to show the UI structure
            setUsers([]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                <div className="containerIndividuals">
                    <div className="section1">
                        <div className="head">
                            <h2>Key metrics</h2>
                        </div>
                        <div className="metrics">
                            {/* Add metrics here if needed */}
                        </div>
                    </div>
                    <div className="tableSection">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Date registered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length > 0 ? (
                                    users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                    .map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{formatDate(item.created_at)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} style={{ textAlign: 'center' }}>
                                            No users available
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
}

function formatDate(input) {
    if (!input) return '';
    
    // Create a new Date object using the input string
    const date = new Date(input);

    // Get individual date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Format the date as "Day, Month Date, Year - HH:MM:SS"
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}