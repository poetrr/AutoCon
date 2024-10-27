import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './style.module.css';  // Updated to CSS Modules

function LoginRegister() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Switch between login and register views
    const SwitchContent = (type) => {
        const content = document.getElementById('content');
        if (type === 'register') {
            content.classList.add(styles.active);
        } else {
            content.classList.remove(styles.active);
        }
    };

    // Register user function
    const register = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8081/register", {
            username,
            email_id: email,
            password
        })
        .then(res => {
            if (res.status === 201) {
                navigate("/Dashboard");
            }
        })
        .catch(err => {
            if (err.response && err.response.status === 400) {
                alert("Registration failed: Please fill all required fields.");
            } else if (err.response && err.response.status === 409) {
                alert("Username or email already exists. Please login.");
            }
        });
    };

    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8081/login", {
            email_id: email,
            password
        })
        .then(res => {
            if (res.status === 200) {
                navigate("/Dashboard");
            }
        })
        .catch(err => {
            if (err.response && err.response.status === 401) {
                alert("Invalid email or password.");
            }
        });
    };

    return (
        <div className={styles.body}>
            <div className={`${styles.content} d-flex`} id='content'>
                <div className='col-md-6 d-flex justify-content-center'>
                    <form onSubmit={register}>
                        <div className={`${styles['header-text']} mb-4`}>
                            <h1>Create Account</h1>
                        </div>
                        <div className='input-group mb-3'>
                            <input 
                                type='text' 
                                placeholder='Name' 
                                className='form-control form-control-lg bg-light fs-6' 
                                onChange={e => setUserName(e.target.value)}
                            />
                        </div>
                        <div className='input-group mb-3'>
                            <input 
                                type='email' 
                                placeholder='Email' 
                                className='form-control form-control-lg bg-light fs-6' 
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='input-group mb-3'>
                            <input 
                                type='password' 
                                placeholder='Password' 
                                className='form-control form-control-lg bg-light fs-6' 
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='input-group mb-3 justify-content-center'>
                            <button className='btn border-white text-white w-50 fs-6'>Register</button>
                        </div>
                    </form>
                </div>
                <div className={`${styles['right-box']} col-md-6`}>
                    <form onSubmit={login}>
                        <div className={`${styles['header-text']} mb-4`}>
                            <h1>Login</h1>
                        </div>
                        <div className='input-group mb-3'>
                            <input 
                                type='email' 
                                placeholder='Email' 
                                className='form-control form-control-lg bg-light fs-6' 
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='input-group mb-3'>
                            <input 
                                type='password' 
                                placeholder='Password' 
                                className='form-control form-control-lg bg-light fs-6' 
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='input-group mb-5 d-flex justify-content-between'>
                            <div className='forgot'>
                                <small><a href='#'>Forgot Password?</a></small>
                            </div>
                        </div>
                        <div className='input-group mb-3 justify-content-center'>
                            <button className='btn border-white text-white w-50 fs-6'>Login</button>
                        </div>
                    </form>
                </div>
                <div className={styles['switch-content']}>
                    <div className={styles['switch']}>
                        <div className={`${styles['switch-panel']} ${styles['switch-left']}`}>
                            <h1>Hello, Again</h1>
                            <p>We are happy to see you back</p>
                            <button className={`hidden btn text-white w-50 fs-6`} onClick={() => SwitchContent('login')} id="login">Login</button>
                        </div>
                        <div className={`${styles['switch-panel']} ${styles['switch-right']}`}>
                            <h1>Welcome</h1>
                            <p>Join our Unique Platform, Explore a new Experience</p>
                            <button className={`hidden btn text-white w-50 fs-6`} onClick={() => SwitchContent('register')} id="register">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginRegister;
