import React, { useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form';
import { fieldsEnum, SERVER_URL, apiRequest } from '../serverConnect/api';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/context';
import Loading from '../comps_main/loading'
import AddressInput from './addressInput'
import Cookies from 'js-cookie';

const EditProfile = () => {
    const [address, setAddress] = useState(null);
    const { user, setUser } = useContext(AppContext);
    const [loading, setLoding] = useState(false);


    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const nav = useNavigate()

    // useEffect(() => { })
    // const updateUserFromCookie = () => {
    //     const userCookie = Cookies.get('user');
    //     if (userCookie) {
    //         setUser(JSON.parse(userCookie));
    //     }
    //     console.log("User updated");
    // };

    // updateUserFromCookie()


    const formatDate = (dateString) => {
        if (!dateString) {
            return null;  // Return null if dateString is falsy
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error(`Invalid date string: ${dateString}`);
            return null;  // Return null for invalid dates
        }
        return date.toISOString().split('T')[0];
    };



    const onSubmit = async (data) => {
        setLoding(true)
        // const imageUrl = await uploadImageToStorage(selectedImage);
        // data.img_url = imageUrl;
        // delete data.confirmPassword
        // data.address = selectedAddress;
        data.address = address //new
        let url = SERVER_URL + `/users/${user._id}`
        try {
            let resp = await apiRequest(url, "PUT", data)
            console.log(resp.data)
            nav("/my-profile")

            setUser(resp.data)
            // Cookies.set('token', resp.data.token, { expires: 1 }); // expires in 1 day
            Cookies.set('user', JSON.stringify(resp.data), { expires: 1 }); // expires in 1 day
            console.log(resp.data);
            // setUser(resp.data.user)

        }
        catch (err) {
            console.log("ERROR ", err);
        }

        console.log(data);
    }
    return (
        <div className="container mx-auto">
            {
                loading ? (<Loading text={"updating profile..."} />

                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                        <div className=" gap-4">
                            <h2>Edit your details</h2>
                            <div className='flex'>

                                <div className="mb-4 px-3  w-1/2">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Full Name:
                                    </label>
                                    <input defaultValue={user.full_name} {...register('full_name', { required: true, minLength: 2 })} type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
                                    {errors.full_name && <div className="text-red-500 text-xs italic">name must be at least 2 letters long</div>}
                                </div>

                                <div className="mb-4 px-3  w-1/2">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Email:
                                    </label>
                                    <input defaultValue={user.email} {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type="email" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
                                    {errors.email && <div className="text-red-500 text-xs italic">Email is required and must be a valid email address</div>}
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="mb-4 px-3  w-1/3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Teudat Zehut/ID:
                                    </label>
                                    <input defaultValue={user.tz} {...register('tz', { required: true, minLength: 2 })} type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
                                    {errors.tz && <div className="text-red-500 text-xs italic">name must be a legal tz number</div>}
                                    {/* add check if legal tz */}
                                </div>
                                <div className="mb-4 px-3 w-1/3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Phone:
                                    </label>
                                    <input defaultValue={user.phone}{...register('phone', { required: true, pattern: /^[0-9]{10}$/ })} type="tel" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
                                    {errors.phone && <div className="text-red-500 text-xs italic">Phone is required and must be a valid 10-digit number</div>}
                                </div>


                                {/* add api */}
                                <div className="mb-4 px-3 w-1/3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Address:</label>
                                    <AddressInput setAddress={setAddress} />

                                    {/* <input {...register('address')} type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" /> */}
                                    {errors.address && <div className="text-red-500 text-xs italic">choose valid address</div>}
                                </div>
                            </div>


                            <div className="mb-4 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    description:</label>

                                <input defaultValue={user.description} {...register('description')} type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
                            </div>

                        </div >


                        <div className='flex'>

                            <div className="mb-4 px-3 w-2/3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Birth date</label>
                                <input
                                    defaultValue={formatDate(user.birth_date) || ''}
                                    {...register('birth_date', { required: true })}
                                    type="date"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                />
                                {errors.birth_date && <div className="text-red-500 text-xs italic">bithdate is required and must be a valid email address</div>}
                            </div>

                            <div className="mb-4 px-3 w-1/3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Gender:
                                </label>
                                <div className="mt-1">
                                    <label className="inline-flex items-center">
                                        <input {...register('gender', { required: true })} type="radio" value="male"
                                            defaultChecked={user.gender === 'male'}
                                            className="form-radio h-4 w-4 text-indigo-600" />
                                        <span className="ml-2">Male</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input {...register('gender', { required: true })} type="radio" value="female"
                                            defaultChecked={user.gender === 'female'}
                                            className="form-radio h-4 w-4 text-indigo-600" />
                                        <span className="ml-2">Female</span>
                                    </label>
                                </div>
                                {errors.gender && <div className="text-red-500 text-xs italic">Gender is required</div>}
                            </div>

                        </div>
                        {/* <div className="mb-4 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Profile Image:
                            </label>
                            <input
                                {...register('img_url')}
                                type="file"
                                accept="image/*"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            />
                        </div> */}
                        {/* <div className="mb-4 px-3">
                            <label htmlFor="password" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Password:
                            </label>
                            <input {...register('password', { required: true, minLength: 6 })} type="password" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
                            {errors.password && errors.password.type === 'required' && <div className="text-red-500 text-xs italic">Password is required</div>}
                            {errors.password && errors.password.type === 'minLength' && <div className="text-red-500 text-xs italic">Password must be at least 6 characters long</div>}
                        </div> */}

                        {/* <div className="mb-4 px-3">
                            <label htmlFor="confirmPassword" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Confirm Password:
                            </label>
                            <input {...register('confirmPassword', {
                                validate: {
                                    matchesPreviousPassword: (value) => {
                                        const password = getValues('password');
                                        return password === value || 'passwords dont match';
                                    },
                                },
                            })} type="password" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
                            {errors.confirmPassword && <div className="text-red-500 text-xs italic">{errors.confirmPassword.message}</div>}
                        </div> */}

                        <div className="mb-4 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Interests:
                            </label>
                            <div className="mt-1">
                                {fieldsEnum.map((field) => (
                                    <label key={field} className="inline-flex items-center mr-4">
                                        <input
                                            type="checkbox"
                                            value={field}
                                            defaultChecked={user.fields && user.fields.includes(field)}

                                            className="form-checkbox h-4 w-4 text-indigo-600"
                                            {...register('fields')} // Include selected fields in register
                                        />
                                        <span className="ml-2">{field}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
                            Save
                        </button>

                    </form >
                )
            }
        </div >
    );
};



export default EditProfile
