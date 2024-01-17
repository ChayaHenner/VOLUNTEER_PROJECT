import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className=' flex justify-center items-center'>
      <div className="bg-white p-6 rounded-lg">
        {resetSuccess ? (
          <div className="text-center text-2xl font-bold mb-4">Password reset successfully!</div>
        ) : (
          <div className="text-center text-2xl font-bold mb-4">Password not reset</div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
