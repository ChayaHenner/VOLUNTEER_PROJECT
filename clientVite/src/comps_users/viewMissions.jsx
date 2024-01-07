import React, { useEffect, useState } from 'react';
import { tokenExpireAlert, apiRequestGet, apiRequest, SERVER_URL, apiRequestNoBody } from '../serverConnect/api';
import { Link } from 'react-router-dom';
import { AddressIcon, ArrowDownIcon, CalenderIcon, SearchIcon, TimeIcon } from './Icons';
import {useAutoAlert} from '../comps_main/alertUtil'


// Import the new DateFilter component
import DateFilter from './dateFilter'; // Update the path based on your project structure
import MyMission from './myMission';

const ViewMissions = () => {
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
  const changeFilter = () => {
    if (showDateFilter)
      setShowDateFilter(false)
    else setShowDateFilter(true)
  }

  return (
    <div className='p-6 relative container  border '>
      <div className='flex justify-center'>
        {/* {<DateFilter updateMissions={updateMissions} />} */}
        {showDateFilter && <DateFilter updateMissions={updateMissions} />}

        {<button title='Filter' onClick={() => { changeFilter() }} className='absolute top-0 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-md'>
          <ArrowDownIcon />
        </button>}
      </div>
      <div className="flex justify-end absolute top-0 right-0 ">
        <div className="p-4 flex items-center">
          <SearchIcon />
          <input
            type="text"
            placeholder="search missions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-purple-500 rounded p-2 ml-2"
          />
        </div>
      </div>
      <AutoAlert />

      <div className='align-center justify-center flex flex-wrap '>
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
