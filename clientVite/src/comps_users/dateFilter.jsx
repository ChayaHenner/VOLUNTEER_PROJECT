import React, { useState } from 'react';
import { apiRequestGet, SERVER_URL } from '../serverConnect/api'; // Import your API request function

const DateFilter = ({ updateMissions }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleFilter = async () => {
        try {
            const response = await apiRequestGet(`${SERVER_URL}/missions/byDateTime?startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}`);
            const filteredMissions = response.data; // Assuming your API response contains filtered missions

            updateMissions(filteredMissions);
        } catch (error) {
            console.error('Error filtering missions:', error);
        }
    };


    return (
        <div className="flex  justify-center mb-4">
           <div className="flex rounded w-full justify-center mb-4">
            <div className=" rounded-md p-2 mr-4">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded-md p-1 mt-1"
                />
            </div>

            <div className=" rounded-md p-2 mr-4">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded-md p-1 mt-1"
                />
            </div>

            <div className=" rounded-md p-2 mr-4">
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border rounded-md p-1 mt-1"
                />
            </div>

            <div className=" rounded-md p-2 mr-4">
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border rounded-md p-1 mt-1"
                />
            </div>

            <button
                onClick={handleFilter}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Apply Filter
            </button>
            </div>
        </div>
    );
};

export default DateFilter;
