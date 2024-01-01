import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { SERVER_URL, apiRequest } from '../serverConnect/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/context';


const Login = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const { user, setUser } = useContext(AppContext);

  const nav = useNavigate()
  const onSubmitLogin = async (data) => {
    console.log(data);
    let url = SERVER_URL + "/users/login"
    try {
      let resp = await apiRequest(url, "POST", data)
      console.log(resp.data.user)
      setUser(resp.data.user)
      console.log("token new", resp.data.token);
      Cookies.set('token', resp.data.token, { expires: 1 }); // expires in 1 day
      // console.log(user.role);
      // if (user.role == "admin") {
      //   nav("/ViewUser-Admin")
      // }
      // else {
      //   nav("/")
      // }
      // }
      //  nav("/")
      console.log("token new", resp.data.token);
      Cookies.set('token', resp.data.token, { expires: 1 }); // expires in 1 day
      Cookies.set('user', JSON.stringify(resp.data.user), { expires: 1 }); // expires in 1 day
      nav("/")
    }
    catch (err) {
      console.log("ERROR ", err);
      console.log(err.response.data.code);
      let msg = err.response.data.msg;
      alert(msg);
      if (err.response.data.code == 4) {
        nav("/sign-up")
      }
    }
  }

  return (
    <div>
      <div className='flex'>
        <div className="w-1/2 ">
          <img src="https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1703703745303?alt=media&token=329b8609-d1e6-47d1-9259-799e40f1f605" alt="" className="" />
        </div>
        <div className="border-l w-1/2 flex items-center justify-center">

          <form onSubmit={handleSubmit(onSubmitLogin)} className="w-full max-w-lg p-6 rounded-md">
            <h1 className="font-medium text-2xl text-slate-900 px-4 pb-4">Log In</h1>
            <div className="w-full md:w-1/2 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Email
              </label>
              <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="invalid:text-pink-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" />
              {errors.email && <div className="text-red-500 text-xs italic italic">Email is required and must be a valid email address</div>}
            </div>

            <div className="w-full md:w-1/2 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Password
              </label>
              <input {...register('password', { required: true, minLength: 6 })} className="invalid:text-purple-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="password" />
              {errors.password && errors.password.type === 'required' && <div className="text-red-500 text-xs italic italic">Password is required</div>}
              {errors.password && errors.password.type === 'minLength' && <div className="text-red-500 text-xs italic italic">Password must be at least 6 characters long</div>}
            </div>

            <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4">
              Log in
            </button>
            <div className="mb-4">
              <a href="/forgot-password" className="text-sm text-purple-500">Forgot Password?</a>
            </div>

          </form>
        </div>
      </div>
    </div >
  )
}

export default Login