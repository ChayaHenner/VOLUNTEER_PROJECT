import React, { useEffect, useState } from 'react';
import { tokenExpireAlert, apiRequestGet, apiRequest, SERVER_URL, apiRequestNoBody } from '../serverConnect/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


// Import the new DateFilter component
import DateFilter from './dateFilter'; // Update the path based on your project structure

import { AddressIcon, CalenderIcon, SearchIcon, TimeIcon, ArrowDownIcon } from './Icons';
import { useAutoAlert } from '../comps_main/alertUtil';
import DateFilter from './dateFilter';
import MyMission from './myMission';

const ViewMissions = () => {
  const categoryColors = {
    children: 'bg-blue-200',
    kitchen: 'bg-green-200',
    driving: 'bg-yellow-200',
    elderly: 'bg-green-500',
    cleanup: 'bg-pink-200',
    studies: 'bg-purple-200',
    medical: 'bg-red-200',
    technology: 'bg-indigo-200',
  };

  const [missions, setMissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasFilter, setHasFilter] = useState(false);
  const { showAlert, AutoAlert } = useAutoAlert();
  const [showDateFilter, setShowDateFilter] = useState(false);

  const nav = useNavigate()

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    const fetchMissions = async () => {
      let url = ""
      if (hasFilter)
        url = `${SERVER_URL}/missions/byDateTime?startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}&s=${searchQuery}`
      else
        url = searchQuery ? `${SERVER_URL}/missions/search?s=${searchQuery}` : `${SERVER_URL}/missions`;
      try {
        const response = await apiRequestGet(url);
        setMissions(response.data);
      } catch (error) {
        tokenExpireAlert(error);
        console.error('Error fetching missions:', error);
      }

    };
    fetchMissions();
  }, [searchQuery, hasFilter]);

  const handleFilter = async () => {
    try {
      setHasFilter(true)
      const response = await apiRequestGet(`${SERVER_URL}/missions/byDateTime?startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}&s=${searchQuery}`);
      const filteredMissions = response.data; // Assuming your API response contains filtered missions

      updateMissions(filteredMissions);
    } catch (error) {
      console.error('Error filtering missions:', error);
    }
  };

  const handleTakeTask = async (missionId) => {
    try {
      const response = await apiRequestNoBody(`${SERVER_URL}/missions/addInterested/${missionId}`, 'PUT');

      if (response.data.success) {
        showAlert('User added to interested list');
      }
    } catch (error) {
      console.error('Error taking task:', error.response.data);
      showAlert(error.response.data.error);
    }
  };

  const updateMissions = (filteredMissions) => {
    setMissions(filteredMissions);
  };

  const changeFilter = () => {
    if (showDateFilter) {
      setShowDateFilter(false)
      setHasFilter(false)
    }
    else setShowDateFilter(true)
  }

  return (
    <div className='p-6 px-20 relative container border'>
      <div className='flex justify-center'>
        {/* {<DateFilter updateMissions={updateMissions} />} */}
        {/* {showDateFilter && <DateFilter searchQuery={searchQuery} updateMissions={updateMissions} />} */}

        {showDateFilter && <div className="flex  justify-center mb-4">
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
        }

        {<button title='Filter' onClick={() => { changeFilter() }} className='absolute top-0 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-md'>
          <ArrowDownIcon />
        </button>}
      </div>
      <div className="flex justify-end absolute top-0 right-0">
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

      <div className='align-center justify-center flex flex-wrap -mx-4'>
        <div className='align-center justify-center flex flex-wrap'>
          <div className='align-center justify-center flex flex-wrap'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {missions && missions.map((mission) => {
                return (
                  <div key={mission._id} className="bg-white border  border-gray-500 rounded-lg shadow-lg p-6">
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
                        className="hover:bg-purple-500 text-purple-500 bg-white hover:text-white border border-purple-500 px-4 py-2 rounded-md"
                      >
                        Take Task
                      </button>
                    </div>
                    <div className="mt-2">
                      <div className="flex flex-wrap">
                        {mission.fields.map((category, index) => (
                          <div key={index} className={`rounded-md px-2 py-1 m-1 ${categoryColors[category.toLowerCase()] || 'bg-gray-200'}`}>
                            {category}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => nav("/map")}
        className="hover:bg-blue-700 bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-md"
      >
        Look at tasks near you                  </button>
    </div>
  );
}
export default ViewMissions;
