
import React, { useEffect, useState } from 'react';
import { apiRequestGet, apiRequest, SERVER_URL, apiRequestNoBody } from '../serverConnect/api';
import { Link } from 'react-router-dom';


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
      console.error('Error taking task:', error);
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
      />
      {missions.map((mission) => {
        const userArray = mission.user_creator.split(',');
        const id = userArray[0];
        const name = userArray[1];

        return (
          <div key={mission._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{mission.title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{mission.description}</p>
            <div className="flex">
              <Link className='w-1/2' to={`/view-user/${id}`}>
                <p className="text-sm text-gray-500">{`Created by: ${name}`}</p>
              </Link>

              <button
                onClick={() => handleTakeTask(mission._id)}
                className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md m-2"
              >
                Take Task
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ViewMissions;
