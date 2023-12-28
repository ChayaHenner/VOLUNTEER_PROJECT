// דוגמא של דף "שכחתי סיסמה" (ForgotPassword.jsx)
import React from 'react';
import { useForm } from 'react-hook-form';
import { SERVER_URL, apiRequest } from '../serverConnect/api';


const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmitForgotPassword = async (data) => {
    // let url = SERVER_URL + "/forgot-password"
    console.log(data);
    try {
      // let response = await apiRequest(url, "POST", data)
      const response = await fetch(`${SERVER_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Password reset email sent successfully.');
        alert("A password reset email has been sent \n Check your email")
      } else {
        const errorData = await response.json();
        console.error('Failed to send password reset email:', errorData.message);
        alert("Email does not exist")
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };


  return (
    <div>
      <div>Forgot Password</div>
      <form onSubmit={handleSubmit(onSubmitForgotPassword)} className="mt-3">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          {errors.email && <div className="text-red-500 text-xs">Email is required and must be a valid email address</div>}
        </div>
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4">
          Send Password Reset Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
