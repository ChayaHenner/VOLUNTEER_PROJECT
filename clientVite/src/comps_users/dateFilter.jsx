import React, { useState } from 'react';
import { apiRequestGet, SERVER_URL } from '../serverConnect/api'; // Import your API request function

const DateFilter = ({ updateMissions }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleFilter = async () => {
        try {
            // Perform API request to filter missions
            const response = await apiRequestGet(`${SERVER_URL}/missions/byDateTime?startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}`);
            const filteredMissions = response.data; // Assuming your API response contains filtered missions

            // Update state or perform any other action with the filtered missions
            updateMissions(filteredMissions);
        } catch (error) {
            console.error('Error filtering missions:', error);
        }
    };

    return (
        <div>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

            <label>Start Time:</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

            <label>End Time:</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

            <button onClick={handleFilter}>Filter</button>
        </div>
    );
};

export default DateFilter;
