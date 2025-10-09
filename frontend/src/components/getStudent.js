import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentCreator = () => {
    // State to hold the message received from the backend
    const [creationMessage, setCreationMessage] = useState('Attempting to create student...');
    
    // State to handle loading status
    const [loading, setLoading] = useState(true);
    
    // State for error handling
    const [error, setError] = useState(null);

    // The endpoint matches your Express route
    const API_ENDPOINT = 'http://localhost:5000/students/get-student'; 

    useEffect(() => {
        const getStudent = async () => {
            try {
                // PRACTICAL STEP: Use axios.get to call the Express route
                const response = await axios.get(API_ENDPOINT);
                
                // Set the message received from the backend: 
                // { message: "Student created: u123, John Doe, john@example.com" }
                setCreationMessage(response.data.message);
                
            } catch (err) {
                console.error('API Error:', err);
                // Provide a user-friendly error message
                setError('Failed to reach the server or create student. Check the backend status.');
            } finally {
                setLoading(false);
            }
        };

        getStudent();
    }, []); // Empty dependency array means it runs once on component mount

    // --- Render Logic ---
    
    if (loading) {
        return <div>Processing student creation request...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #daff75ff', backgroundColor:'rgba(10, 82, 10, 1)'}}>
            <h2 style={{border: '2px solid rgba(255, 57, 156, 1)'}}>User Factory Test Result</h2>
            <p style={{border:'2px solid rgba(255, 57, 156, 1)'}}>✅ **Success:** {creationMessage}</p>
            <small>
                (The backend used the UserFactory to create a Student instance 
                and returned this message.)
            </small>
        </div>
    );
};

export default StudentCreator;