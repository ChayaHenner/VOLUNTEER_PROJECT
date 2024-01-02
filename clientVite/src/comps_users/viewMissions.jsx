
import React, { useEffect, useState } from 'react';
import { apiRequestGet, apiRequest, SERVER_URL, apiRequestNoBody } from '../serverConnect/api';
import { Link } from 'react-router-dom';
import { AddressIcon, CalenderIcon, TimeIcon } from './Icons';


// Import the new DateFilter component
import DateFilter from './dateFilter'; // Update the path based on your project structure
import MyMission from './myMission';

const ViewMissions = () => {
  const [missions, setMissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch missions on component mount
    const fetchMissions = async () => {
      try {
        const url = searchQuery ? `${SERVER_URL}/missions/search?s=${searchQuery}` : `${SERVER_URL}/missions`;
        console.log('Fetch URL:', url); // Log the URL for debugging

        // const url = `${SERVER_URL}/missions/`;
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
      // Handle error, e.g., show an error message
      console.error('Error taking task:', error.response.data);
      alert(error.response.data.error)
    }
  };

  // Update missions based on filtered data
  const updateMissions = (filteredMissions) => {
    setMissions(filteredMissions);
  };

  return (
    <div>
      <h2>Missions</h2>

      {/* Add the DateFilter component to handle date and time range filtering */}
      <DateFilter updateMissions={updateMissions} />

      <input
        type="text"
        placeholder="Search missions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 mb-4"
      />                    <div className='align-center justify-center flex flex-wrap -mx-4'>

        {missions.map((mission) => {
          // const userArray = mission.user_creator.split(',');
          // const id = userArray[0];
          // const name = userArray[1];
          console.log(mission);
          return (
            <div key={mission._id} className="max-w-sm p-6 bg-white-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{mission.title}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{mission.description}</p>
              <div>
                <div className="flex items-center mb-3">
                  <AddressIcon className="inline-block w-6 h-6 mr-2" />
                  <p className="mb-0 font-normal text-gray-700 dark:text-gray-400">{mission.address}</p>
                </div>
                <div className="flex items-center mb-3">
                  <CalenderIcon className="inline-block w-6 h-6 mr-2" />
                  <p className="mb-0 font-normal text-gray-700 dark:text-gray-400">{mission.date}</p>
                </div>
                <div className="flex items-center mb-3">
                  <TimeIcon className="inline-block w-6 h-6 mr-2" />
                  <p className="mb-0 font-normal text-gray-700 dark:text-gray-400">{mission.time}</p>
                </div>
              </div>
              <div className="flex">
                <Link className='w-1/2' to={`/view-user/${mission.user_creator._id}`}>
                  <p className="text-sm text-gray-500">{`Created by: ${mission.user_creator.full_name}`}</p>
                </Link>


                <button
                  onClick={() => handleTakeTask(mission._id)}
                  className="w-1/2 hover:bg-purple-500 bg-white-500 border text-purple-500 border-purple-500 hover:text-white px-4 py-2 rounded-md m-2"
                >
                  Take Task
                </button>
              </div>
            </div>
          );
        })}</div>
    </div>
  );
}
export default ViewMissions;
