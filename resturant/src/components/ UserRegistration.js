import React, { useState } from 'react';
import axios from '../axios';  // Import the axios instance

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegistration = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/user/register/`, formData);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            console.log('Registration successful:', response.data);
            // Handle successful registration (redirect, show message, etc.)
        } catch (error) {
            console.error('Registration failed:', error.response.data);
            // Handle registration failure (show error message, etc.)
        }
    };

    return (
        <div>
            <h2>User Registration</h2>
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
            <button onClick={handleRegistration}>Register</button>
        </div>
    );
};

export default UserRegistration;