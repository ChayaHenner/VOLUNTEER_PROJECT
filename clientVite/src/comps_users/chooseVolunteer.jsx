import React, { useState } from 'react';
import { SERVER_URL, apiRequest } from '../serverConnect/api'; // Import only necessary functions
import { useAutoAlert } from '../comps_main/alertUtil'

const ChooseVolunteer = ({ interested, mission }) => {
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const { showAlert, AutoAlert } = useAutoAlert();

    const handleSelectVolunteer = (volunteer) => {
        setSelectedVolunteer(volunteer);
    };

    const handleAssignVolunteer = async () => {
        if (selectedVolunteer) {
            try {
                const url = `${SERVER_URL}/missions/taken?idMission=${mission}&idUser=${selectedVolunteer._id}`;
                const requestOptions = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' }
                };

                const response = await fetch(url, requestOptions);
                console.log(response);

            } catch (error) {
                console.error('Error assigning volunteer:', error);
            }
        } else {
            showAlert('Please select a volunteer first.');
        }
    };


    return (
        
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-10 backdrop-blur-lg flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <button className="absolute top-2 right-2 text-gray-600 text-7xl">x</button>
                <div>
                <AutoAlert />

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
                    {interested.length > 0 && <button onClick={handleAssignVolunteer}>Assign Volunteer</button>}
                </div>
            </div>
        </div>
    );
};

export default ChooseVolunteer;
