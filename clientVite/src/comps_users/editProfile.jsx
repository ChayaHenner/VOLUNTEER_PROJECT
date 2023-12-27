import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form';
import { fieldsEnum, SERVER_URL, apiRequest } from '../serverConnect/api';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/context';

const EditProfile = () => {
    const { user, setUser } = useContext(AppContext);

    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm();
    const nav = useNavigate()

    const onSubmit = async (data) => {
        data.img_url = ""
        delete data.confirmPassword

        let url = SERVER_URL + `/users/${user._id}`
        try {
            let resp = await apiRequest(url, "PUT", data)
            console.log(resp.data)
            setUser(resp.data)
            Cookies.set('user', JSON.stringify(resp.data), { expires: 1 }); // expires in 1 day
            console.log(resp.data);
            nav("/")
        }
        catch (err) {
            console.log("ERROR ", err);
        }
        console.log(data);
    }
    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                <div className=" gap-4">
                    <h2>Edit your details</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name:
                        </label>
                        <input defaultValue={user.full_name} {...register('full_name', { required: true, minLength: 2 })} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                        {errors.full_name && <div className="text-red-500 text-xs">name must be at least 2 letters long</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Teudat Zehut/ID:
                        </label>
                        <input defaultValue={user.tz} {...register('tz', { required: true, minLength: 2 })} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                        {errors.tz && <div className="text-red-500 text-xs">name must be a legal tz number</div>}
                        {/* add check if legal tz */}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Phone:
                        </label>
                        <input defaultValue={user.phone}{...register('phone', { required: true, pattern: /^[0-9]{10}$/ })} type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                        {errors.phone && <div className="text-red-500 text-xs">Phone is required and must be a valid 10-digit number</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input defaultValue={user.email} {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                        {errors.email && <div className="text-red-500 text-xs">Email is required and must be a valid email address</div>}
                    </div>
                    {/* add api */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Address:</label>
                        <input defaultValue={user.address} {...register('address')} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                        {errors.address && <div className="text-red-500 text-xs">choose valid address</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            description:</label>
                        <input defaultValue={user.description} {...register('description')} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Birth date</label>
                        <input defaultValue={user.birth_date} {...register('birth_date', { required: true })} type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                        {errors.birth_date && <div className="text-red-500 text-xs">bithdate is required and must be a valid email address</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Gender:
                        </label>
                        <div className="mt-1">
                            <label className="inline-flex items-center">
                                <input {...register('gender', { required: true })} type="radio" value="male" className="form-radio h-4 w-4 text-indigo-600" />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input {...register('gender', { required: true })} type="radio" value="female" className="form-radio h-4 w-4 text-indigo-600" />
                                <span className="ml-2">Female</span>
                            </label>
                        </div>
                        {errors.gender && <div className="text-red-500 text-xs">Gender is required</div>}
                    </div>


                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Profile Image:
                        </label>
                        <input  {...register('img_url')} type="file" accept="image/*" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password:
                    </label>
                    <input {...register('password', { required: true, minLength: 6 })} type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    {errors.password && errors.password.type === 'required' && <div className="text-red-500 text-xs">Password is required</div>}
                    {errors.password && errors.password.type === 'minLength' && <div className="text-red-500 text-xs">Password must be at least 6 characters long</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password:
                    </label>
                    <input {...register('confirmPassword', {
                        validate: {
                            matchesPreviousPassword: (value) => {
                                const password = getValues('password');
                                return password === value || 'passwords dont match';
                            },
                        },
                    })} type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    {errors.confirmPassword && <div className="text-red-500 text-xs">{errors.confirmPassword.message}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Interests:
                    </label>
                    <div className="mt-1">
                        {fieldsEnum.map((field) => (
                            <label key={field} className="inline-flex items-center mr-4">
                                <input
                                    type="checkbox"
                                    value={field}
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
            </form>
        </div>
    );
};



export default EditProfile