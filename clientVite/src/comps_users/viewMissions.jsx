// import React, { useEffect, useState } from 'react';
// import { apiRequestGet, apiRequest, SERVER_URL, apiRequestNoBody } from '../serverConnect/api';
// import { Link } from 'react-router-dom';

// const ViewMissions = () => {
//   const [missions, setMissions] = useState([]);

//   useEffect(() => {
//     const fetchMissions = async () => {
//       try {
//         const url = `${SERVER_URL}/missions`;
//         const response = await apiRequestGet(url);
//         setMissions(response.data);
//       } catch (error) {
//         console.error('Error fetching missions:', error);
//       }
//     };

//     fetchMissions();
//   }, []);

//   const handleTakeTask = async (missionId) => {
//     try {
//       console.log('dsfsdafs')
//       // Send a request to the backend to add the user to the mission's
//       // http://localhost:3001/missions/addInterested/65895cdc1e88238084d3661e interested array
//       const response = await apiRequestNoBody(`${SERVER_URL}/missions/addInterested/${missionId}`, 'PUT');

//       if (response.data.success) {
//         // Handle success, e.g., show a message or update the UI
//         alert('User added to interested list');
//       }
//     } catch (error) {
//       // Handle error, e.g., show an error message
//       console.error('Error taking task:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Missions</h2>
//       {missions.map((mission) => {
//         const userArray = mission.user_creator.split(',');
//         const id = userArray[0];
//         const name = userArray[1];

//         return (
//           <div key={mission._id} className="border p-4 mb-4">
//             <h3 className="text-xl font-semibold mb-2">{mission.title}</h3>
//             <p className="text-gray-600 mb-2">{mission.description}</p>
//             <div className="flex justify-between items-center">
//               <Link to={`/view-user/${id}`}>
//                 <p className="text-sm text-gray-500">{`Created by: ${name}`}</p>
//               </Link>
//               <button
//                 onClick={() => handleTakeTask(mission._id)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
//               >
//                 Take Task
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ViewMissions;


import React, { useEffect, useState } from 'react';
import { apiRequestGet, apiRequest, SERVER_URL, apiRequestNoBody } from '../serverConnect/api';
import { Link } from 'react-router-dom';

// Import the new DateFilter component
import DateFilter from './dateFilter'; // Update the path based on your project structure

const ViewMissions = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    // Fetch missions on component mount
    const fetchMissions = async () => {
      try {
        const url = `${SERVER_URL}/missions`;
        const response = await apiRequestGet(url);
        setMissions(response.data);
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };

    fetchMissions();
  }, []);

  const handleTakeTask = async (missionId) => {
    try {
      // Send a request to the backend to add the user to the mission's interested array
      const response = await apiRequestNoBody(`${SERVER_URL}/missions/addInterested/${missionId}`, 'PUT');

      if (response.data.success) {
        // Handle success, e.g., show a message or update the UI
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

      {missions.map((mission) => {
        const userArray = mission.user_creator.split(',');
        const id = userArray[0];
        const name = userArray[1];

        return (
          <>
            <div key={mission._id} className="border p-4 mb-4">
              <h3 className="text-xl font-semibold mb-2">{mission.title}</h3>
              <p className="text-gray-600 mb-2">{mission.description}</p>
              <div className="flex justify-between items-center">
                <Link to={`/view-user/${id}`}>
                  <p className="text-sm text-gray-500">{`Created by: ${name}`}</p>
                </Link>
                <button
                  onClick={() => handleTakeTask(mission._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Take Task
                </button>
              </div>
            </div>

            <div key={mission._id} class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {/* <a href="#"> */}
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{mission.title}</h5>
              {/* </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{mission.description}</p>
              <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Take Task

                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a> */}
              <Link to={`/view-user/${id}`}>
                <p className="text-sm text-gray-500">{`Created by: ${name}`}</p>
              </Link>

              <button
                onClick={() => handleTakeTask(mission._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Take Task
              </button>

            </div>
          </>
        );
      })}
    </div>
  );
};

export default ViewMissions;

