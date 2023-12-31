import React, { useState } from 'react';
import { SERVER_URL, apiRequest } from '../serverConnect/api'; // Import only necessary functions

const ChooseVolunteer = ({ interested, mission }) => {
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);

    const handleSelectVolunteer = (volunteer) => {
        setSelectedVolunteer(volunteer);
    };

    const handleAssignVolunteer = async () => {
        if (selectedVolunteer) {
            try {
                const url = `${SERVER_URL}/mission/taken?idMission=${mission}&&idUser=${selectedVolunteer._id}`;
                console.log(url)
                const resp = await apiRequest(url, 'PUT');
                console.log(resp.data);
                alert(`Assigned ${selectedVolunteer.full_name} to the mission!`);
            } catch (err) {
                console.log('ERROR:', err);
                alert('Failed to assign the volunteer. Please try again.');
            }
        } else {
            alert('Please select a volunteer first.');
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-10 backdrop-blur-lg flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <button className="absolute top-2 right-2 text-gray-600 text-7xl">x</button>
                <div>
                    <h2>Choose a Volunteer</h2>
                    <div>
                        {interested.map((volunteer) => (
                            <div key={volunteer._id}>
                                <input
                                    type="radio"
                                    id={volunteer._id}
                                    value={volunteer._id}
                                    checked={selectedVolunteer ? selectedVolunteer._id === volunteer._id : false}
                                    onChange={() => handleSelectVolunteer(volunteer)}
                                />
                                <label htmlFor={volunteer._id}>{volunteer.full_name}</label>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleAssignVolunteer}>Assign Volunteer</button>
                </div>
            </div>
        </div>
    );
};

export default ChooseVolunteer;
