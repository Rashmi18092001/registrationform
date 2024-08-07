import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './app.css';

function UserDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        const email = localStorage.getItem('email'); // Retrieve the email from local storage

        if (!email) {
            console.error('No email found in local storage');
            return;
        }

        axios.post('http://localhost:8082/logout', { email })
            .then(response => {
                console.log(response.data);
                if (response.data.status === "Success") {
                    // Clear local storage and navigate to the login page
                    localStorage.removeItem('email');
                    navigate('/login');
                } else {
                    console.log(response.data.message);
                }
            })
            .catch(err => console.error('Error logging out:', err));
    };

    return (
        <>
            

                <h1 className='head'>User Dashboard</h1>
                <div className="btn-log">
                    <button className='logout' onClick={handleLogout}>Logout</button>
                </div>

        </>
    );
}

export default UserDashboard;
