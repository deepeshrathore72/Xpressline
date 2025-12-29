import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import * as actionCreators from '../states/action-creators/index';

const PasswordResetForm = () => {
  const [data, setData] = useState({
    email: '',
    message: '',
  });
  const token = useSelector((state) => state.reducer.token);
  const dispatch = useDispatch();
  const handleReset = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/reset-password',
        { email: data.email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setData({
        ...data,
        message: response.data.message,
      });

      // Log the token value before dispatching the action
      const receivedToken = await response.data.token;
      dispatch(actionCreators.updateToken(receivedToken));
      console.log(receivedToken);
      // console.log('Before dispatch in PasswordResetForm:', token);
    } catch (error) {
      setData({
        ...data,
        message: error.response.data.message,
      });
      console.error('Error:', error.message);
    }
  };
  const handleEmailChange = (e) => {
    setData({
      ...data,
      email: e.target.value,
    });
  };

  useEffect(() => {
    // Log the token value in PasswordResetForm component
    console.log('In PasswordResetForm:', token);
  }
  , [token]);
  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={data.email}
        onChange={handleEmailChange}
      />
      <button onClick={handleReset}>Reset Password</button>
      {data.message && <p>{data.message}</p>}
    </div>
  );
};

export default PasswordResetForm;
