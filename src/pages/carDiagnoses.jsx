import React, { useEffect, useState } from 'react';
import ResponsiveHeader from './tools/responsiveHeader';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './tools/AppContext';
import Loader from './tools/loader';

export default function CarDiagnoses() {
    const navigate = useNavigate();
    const { data, setData } = useAppContext();
    const [diagnoses, setDiagnoses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Replace this with your own data fetching logic
    const fetchData = async () => {
        setLoading(true);
        try {
            // TODO: Implement your own data fetching logic here
            // Example:
            // const diagnosesData = await yourBackendService.getDiagnoses();
            // setDiagnoses(diagnosesData);
            
            // For now using empty array to show the UI structure
            setDiagnoses([]);
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
                                    <th>Username</th>
                                    <th>User email</th>
                                    <th>User phone</th>
                                    <th>Car make</th>
                                    <th>Car model</th>
                                    <th>Created at</th>
                                    <th style={{ textAlign: "left" }}>Fault code(s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {diagnoses && diagnoses.length > 0 ? (
                                    diagnoses
                                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))  // Sort by 'created_at' descending
                                        .map((item, i) => (
                                            <tr key={i}>
                                                <td>{item.user_name}</td>
                                                <td>{item.user_email}</td>
                                                <td>{item.user_phone}</td>
                                                <td>{item.car_make}</td>
                                                <td>{item.car_model}</td>
                                                <td>{formatDate(item.created_at)}</td>
                                                <td style={{ textAlign: "left" }}>{formatFaultCodes(item.fault_code)}</td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: 'center' }}>
                                            No diagnoses available
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

function formatFaultCodes(input) {
    if (!input) return '';
    
    // Split the input string by both periods (.) and slashes (/)
    let faultCodes = input.split(/[./]+/);

    // Filter out any empty strings or unwanted codes (like "03" in the first example)
    faultCodes = faultCodes.filter(code => code && code.toLowerCase() !== '03');

    // Join the remaining fault codes with a comma
    return faultCodes.join(", ");
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