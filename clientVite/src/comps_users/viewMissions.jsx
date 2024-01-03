import React, { useEffect, useState } from 'react';
import { apiRequestGet, apiRequest, SERVER_URL, apiRequestNoBody } from '../serverConnect/api';
import { Link } from 'react-router-dom';
import { AddressIcon, CalenderIcon, TimeIcon } from './Icons';
import DateFilter from './dateFilter';

const ViewMissions = () => {
  const [missions, setMissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const url = searchQuery ? `${SERVER_URL}/missions/search?s=${searchQuery}` : `${SERVER_URL}/missions`;
        const response = await apiRequestGet(url);
        setMissions(response.data);
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };

    fetchMissions();
  }, [searchQuery]);

  const handleTakeTask = async (missionId) => {
    try {
      const response = await apiRequestNoBody(`${SERVER_URL}/missions/addInterested/${missionId}`, 'PUT');

      if (response.data.success) {
        alert('User added to interested list');
      }
    } catch (error) {
      console.error('Error taking task:', error.response.data);
      alert(error.response.data.error)
    }
  };

  const updateMissions = (filteredMissions) => {
    setMissions(filteredMissions);
  };

  return (
    <div className="mx-4 my-8">
      <h2 className="text-3xl font-bold mb-4">Missions</h2>
      <DateFilter updateMissions={updateMissions} />
      <div className="flex-grow" />
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search missions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2"
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {missions.map((mission) => {
          return (
            <div key={mission._id} className="bg-white border border-gray-200 rounded-lg shadow p-6">
              <h5 className="text-xl font-bold mb-2">{mission.title}</h5>
              <p className="text-gray-700 mb-3">{mission.description}</p>
              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <AddressIcon className="w-4 h-4 mr-2" />
                  <p className="text-gray-700">{mission.address}</p>
                </div>
                <div className="flex items-center mb-2">
                  <CalenderIcon className="w-4 h-4 mr-2" />
                  <p className="text-gray-700">{mission.date}</p>
                </div>
                <div className="flex items-center">
                  <TimeIcon className="w-4 h-4 mr-2" />
                  <p className="text-gray-700">{mission.time}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <Link to={`/view-user/${mission.user_creator._id}`}>
                  <p className="text-sm text-gray-500">{`Created by: ${mission.user_creator.full_name}`}</p>
                </Link>
                <button
                  onClick={() => handleTakeTask(mission._id)}
                  className="hover:bg-blue-700 bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-md"
                >
                  Take Task
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewMissions;
