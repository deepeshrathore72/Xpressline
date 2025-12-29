import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const UpdatePasswordPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:3001/update-password/${token}`, {
        password: password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to update password');
      console.error(error);
    }
  };

  useEffect(() => {
    // Log the token value in UpdatePasswordPage component
    console.log('Token from URL:', token);
  }, [token]);

  return (
    <div>
      <h2>Update Password</h2>
      <form onSubmit={handleUpdatePassword}>
        <div>
          <label>New Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Update Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdatePasswordPage;
