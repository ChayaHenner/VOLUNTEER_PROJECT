import React from 'react';
import { useForm } from 'react-hook-form';
import { SERVER_URL, apiRequest } from '../serverConnect/api';
import {useAutoAlert} from '../comps_main/alertUtil'


const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { showAlert, AutoAlert } = useAutoAlert();

  const onSubmitForgotPassword = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`${SERVER_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('Password reset email sent successfully.');
        showAlert("A password reset email has been sent \n Check your email")
      } else {
        const errorData = await response.json();
        console.error('Failed to send password reset email:', errorData.message);
        showAlert("Email does not exist")
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };


  return (
    <div className=' flex justify-center items-center'>
      <div className="bg-white p-6 rounded-lg">
        <div className="text-center text-2xl font-bold mb-4">Reset Password</div>
        <form onSubmit={handleSubmit(onSubmitForgotPassword)} className="mt-3 text-center">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Email:
          </label>
          <AutoAlert />

          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            className="bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white w-full"
          />
          {errors.email && (
            <div className="text-red-500 text-xs">Email is required and must be a valid email address</div>
          )}
          <div className="flex justify-center">
            <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

