import React, { useEffect, useState } from 'react';
import { apiRequestGet, SERVER_URL } from '../serverConnect/api';
import { Link } from 'react-router-dom';

const ViewMissions = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
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

  return (
    <div>
      <h2>Missions</h2>
      {missions.map((mission) => {
        const userArray = mission.user_creator.split(',');
        const id = userArray[0];
        const name = userArray[1];

        return (
          <div key={mission._id} className="border p-4 mb-4">
            <h3 className="text-xl font-semibold mb-2">{mission.title}</h3>
            <p className="text-gray-600 mb-2">{mission.description}</p>
            <div className="flex justify-between items-center">
              <Link to={`/view-user/${id}`}>
                <p className="text-sm text-gray-500">{`Created by: ${name}`}</p>
              </Link>
              <button
                onClick={() => handleTaskTake(mission._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Take Task
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewMissions;
