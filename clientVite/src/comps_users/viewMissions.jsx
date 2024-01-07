import React, { useEffect, useState } from 'react';
import { tokenExpireAlert, apiRequestGet, apiRequest, SERVER_URL, apiRequestNoBody } from '../serverConnect/api';
import { Link } from 'react-router-dom';
import { AddressIcon, CalenderIcon, SearchIcon, TimeIcon } from './Icons';
import { useAutoAlert } from '../comps_main/alertUtil'


// Import the new DateFilter component
import DateFilter from './dateFilter'; // Update the path based on your project structure
import MyMission from './myMission';

const ViewMissions = () => {
  const categoryColors = {
    children: 'bg-blue-200',
    kitchen: 'bg-green-200',
    driving: 'bg-yellow-200',
    elderly: 'bg-orange-200',
    cleanup: 'bg-pink-200',
    studies: 'bg-purple-200',
    medical: 'bg-red-200',
    technology: 'bg-indigo-200',
  };
  const [missions, setMissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { showAlert, AutoAlert } = useAutoAlert();
  const [showDateFilter, setShowDateFilter] = useState(false);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const url = searchQuery ? `${SERVER_URL}/missions/search?s=${searchQuery}` : `${SERVER_URL}/missions`;
        const response = await apiRequestGet(url);
        setMissions(response.data);
      } catch (error) {
        tokenExpireAlert(error)
        console.error('Error fetching missions:', error);

      }
    };

    fetchMissions();
  }, [searchQuery]);

  const handleTakeTask = async (missionId) => {
    try {
      const response = await apiRequestNoBody(`${SERVER_URL}/missions/addInterested/${missionId}`, 'PUT');

      if (response.data.success) {
        showAlert('User added to interested list');
      }
    } catch (error) {
      console.error('Error taking task:', error.response.data);
      showAlert(error.response.data.error)
    }
  };

  const updateMissions = (filteredMissions) => {
    setMissions(filteredMissions);
  };

  return (
    <div className=' relative container  border '>
      <div className='flex justify-center'>
        {<DateFilter updateMissions={updateMissions} />}
        {/* {showDateFilter && <DateFilter updateMissions={updateMissions} />}

        {!showDateFilter && <button onClick={() => { setShowDateFilter(true) }}>filter</button>} */}
      </div>
      <div className="flex justify-end absolute top-0 right-0 ">
        <div className="flex items-center">
          <SearchIcon />
          <input
            type="text"
            placeholder="search missions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 ml-2"
          />
        </div>
      </div>
      <AutoAlert />

      <div className='align-center justify-center flex flex-wrap -mx-4'>
        <div className='align-center justify-center flex flex-wrap '>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {missions && missions.map((mission) => {
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
                      <p className="text-gray-700">{new Date(mission.date).toLocaleDateString()}</p>
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
                    <div className="mt-2">
                      <div className="flex">
                        {mission.fields.map((category, index) => (
                          <div key={index} className={`rounded-md px-2 py-1 mr-2 ${categoryColors[category.toLowerCase()] || 'bg-gray-200'}`}>
                            {category}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMissions;
