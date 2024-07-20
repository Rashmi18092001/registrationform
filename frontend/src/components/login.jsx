import React, { useState } from "react";
import img1 from '../images/img2.avif';
import "./app.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data.status === "Success") {
                    localStorage.setItem('email', email); // Store email in local storage
                    if (result.data.userType === "user") {
                        navigate('/user');
                    } else {
                        navigate('/admin');
                    }
                } else {
                    console.log(result.data.status);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <div className="form-container">
                <div className="box">
                    <img src={img1} alt="" />
                </div>
                <div className="box text">
                    <h2>Login here</h2>
                    <div className="form">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="inp">
                                <label htmlFor="">Email</label>
                                <input type="email" name="email" placeholder="Enter your Email" required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="inp">
                                <label htmlFor="">Password</label>
                                <input type="password" name="password" placeholder="Enter your Password" required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="btn" type="submit">
                                <button>Login</button>
                            </div>
                            <div className="inp">
                                <p>Don't have an account? <NavLink to={"/"}>Register here</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
