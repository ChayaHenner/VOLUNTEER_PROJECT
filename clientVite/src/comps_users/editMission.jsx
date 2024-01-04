import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SERVER_URL, apiRequest } from '../serverConnect/api';

const EditMission = ({ mission, onClose, onUpdate }) => {
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        // Set default values for the form based on the mission
        setValue('title', mission.title);
        setValue('description', mission.description);
        setValue('address', mission.address);
        setValue('date', mission.date);
        setValue('time', mission.time);
        // Add more fields as needed

    }, [mission, setValue]);

    const onSubmit = async (data) => {
        try {
            const url = `${SERVER_URL}/missions/${mission._id}`;
            const resp = await apiRequest(url, 'PUT', data);
            onUpdate(resp.data); // Update the parent component with the updated mission data
            onClose(); // Close the popup
        } catch (err) {
            console.error('Error updating mission:', err);
            // Handle the error (e.g., show an error message to the user)
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md w-96">
                <h2 className="text-2xl font-bold mb-4">Edit Mission</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Add form fields for editing mission (e.g., title, description, address, date, time) */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">Title</label>
                        <input {...register('title')} type="text" className="form-input mt-1 block w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">Description</label>
                        <textarea {...register('description')} className="form-textarea mt-1 block w-full" rows="3"></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">Address</label>
                        <input {...register('address')} type="text" className="form-input mt-1 block w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">Date</label>
                        <input {...register('date')} type="date" className="form-input mt-1 block w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">Time</label>
                        <input {...register('time')} type="text" className="form-input mt-1 block w-full" />

                    </div>
                    {/* Add more fields as needed */}
                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                            Save
                        </button>
                        <button type="button" onClick={onClose} className="text-gray-500 ml-2">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMission;
