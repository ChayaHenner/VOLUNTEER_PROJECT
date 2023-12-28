import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import ResetPasswordForm from './resetPass';
import { AppContext } from '../../context/context';
import { SERVER_URL, apiRequest } from '../serverConnect/api';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [resetSuccess, setResetSuccess] = useState(false);
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    handleResetPassword();
  }, []);

  const handleResetPassword = async () => {
    console.log("hi");
    let newpass = user.password;
    console.log(newpass);
    console.log(token);
    try {
      const response = await fetch(`${SERVER_URL}/reset-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': token
        },
        body: JSON.stringify({ password: newpass }),
      });

      const data = await response.json();
      console.log(data);
      // אם האיפוס הסיסמה הצליח
      if (data.modifiedCount > 0) {
        setResetSuccess(true);
      }

      // הערה: יש לשנות את הקוד לפי התשובה שאתה מקבל מהשרת
      // setResetSuccess(true);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div>
      {resetSuccess ? (
        <p>Password reset successfully!</p>
      ) : (
        <div>reset</div>
        // <ResetPasswordForm onSubmit={handleResetPassword} />
      )}
    </div>
  );
};

export default ResetPasswordPage;
