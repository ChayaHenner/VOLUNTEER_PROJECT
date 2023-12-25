import React from 'react'
import { useForm } from 'react-hook-form';
import {TOKEN_NAME , SERVER_URL, apiRequest } from '../serverConnect/api';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const onSubmitLogin = async (data) => {
    console.log(data);
    let url = SERVER_URL + "/users/login"
    try {
      console.log("token");
      let resp = await apiRequest(url, "POST", data)
      console.log("token");
      console.log(resp.data.token);
      // localStorage.setItem(TOKEN_NAME, resp.data.token);
    }
    catch (err) {
      console.log("ERROR ", err);
    }

  }

  return (<div className="">
    <div>Login</div>
    <form onSubmit={handleSubmit(onSubmitLogin)} className="mt-3">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        {errors.email && <div className="text-red-500 text-xs">Email is required and must be a valid email address</div>}
      </div>
      <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input {...register('password', { required: true, minLength: 6 })} type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          {errors.password && errors.password.type === 'required' && <div className="text-red-500 text-xs">Password is required</div>}
          {errors.password && errors.password.type === 'minLength' && <div className="text-red-500 text-xs">Password must be at least 6 characters long</div>}
        </div>
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4">
          Save
        </button>

    </form>
  </div>
  )
}

export default Login