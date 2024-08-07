import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './app.css';

function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8082/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
        <div>
            <h1 className='head'>Admin Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Last Login</th>
                        <th>Last Logout</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</td>
                            <td>{user.lastLogout ? new Date(user.lastLogout).toLocaleString() : 'Never'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;
