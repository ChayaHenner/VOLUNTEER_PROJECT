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
            <div className="flex shadow rounded w-full justify-center mb-4">
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
                    className="bg-purple-500 text-white px-4 py-2 rounded-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-filter-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M11.36 20.213l-2.36 .787v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414" />
                        <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M20.2 20.2l1.8 1.8" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default DateFilter;
