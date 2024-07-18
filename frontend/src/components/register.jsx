import React, { useState } from "react";
import img1 from '../images/img2.avif';
import "./app.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/register', { name, email, username, password })
            .then(result => {
                console.log('Response:', result.data); // Log the response data
                navigate('/login');
            })
            .catch(err => {
                console.error('Error:', err); // Log any errors
                alert('Registration failed. Please try again.');
            });
    };

    return (
        <div className="container">
            <div className="form-container">
                <div className="box">
                    <img src={img1} alt="" />
                </div>
                <div className="box text">
                    <h2>Create an account</h2>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="inp">
                                <label>Name</label>
                                <input type="text" name="name" placeholder="Enter your Name" required onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="inp">
                                <label>Email</label>
                                <input type="email" name="email" placeholder="Enter your Email" required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="inp">
                                <label>Username</label>
                                <input type="text" name="username" placeholder="Enter your Username" required onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="inp">
                                <label>Password</label>
                                <input type="password" name="password" placeholder="Enter your Password" required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="btn">
                                <button>Register</button>
                            </div>
                            <div className="inp">
                                <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
