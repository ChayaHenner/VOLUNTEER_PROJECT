import React, { useState, useEffect, useContext } from 'react'
import { tokenExpireAlert, SERVER_URL, apiRequest, apiRequestGet } from '../serverConnect/api';
import Cookies from 'js-cookie';
import { AddressIcon, CalenderIcon, TimeIcon, DeleteIcon, EditIcon } from './Icons';
import PostMission from './postMission';
import { InterestedMenu } from './interestedMenu';
import EditMission from './editMission'
const MissionsByMe = () => {
    const categoryColors = {
        children: 'bg-blue-200',
        kitchen: 'bg-green-200',
        driving: 'bg-green-500',
        elderly: 'bg-yellow-200',
        cleanup: 'bg-pink-200',
        studies: 'bg-purple-200',
        medical: 'bg-red-200',
        technology: 'bg-indigo-200',
    };
    const user_now = JSON.parse(Cookies.get('user'));
    const [missions, setMissions] = useState(false);
    const [name, setName] = useState("");

    const [selectedMission, setSelectedMission] = useState(null);

    const [selectedMissionId, setSelectedMissionId] = useState(null);
    const [showCreateNewMission, setShowCreateNewMission] = useState(false);
    const [showChooseVolunteer, setShowChooseVolunteer] = useState(false);
    const [showEditMission, setShowEditMission] = useState(false); // State to control the visibility of the EditMission component

    const handleChooseVolunteer = (missionId) => {
        setSelectedMissionId(missionId);
        setShowChooseVolunteer(true);
    };

    const handleCloseChooseVolunteer = () => {
        setSelectedMissionId(null);
        setShowChooseVolunteer(false);
    };

    const getMissions = async () => {
        let url = SERVER_URL + "/missions/createdByMe"
        try {
            let resp = await apiRequestGet(url)
            console.log(resp.data);
            setMissions(resp.data)
        }
        catch (err) {
            console.log("ERROR ", err);
            tokenExpireAlert(err)
        }

    }
    const nameById = async (id) => {
        let url = SERVER_URL + `/users/infoById/${id}`
        try {
            let resp = await apiRequestGet(url)
            setName(resp.data)
        }
        catch (err) {
            console.log("ERROR ", err);
            tokenExpireAlert(err)

            return '';
        }

    }
    const openEditMission = (mission) => {
        setSelectedMission(mission);
        setShowEditMission(true);
    };

    const closeEditMission = () => {
        setSelectedMission(null);
        setShowEditMission(false);
        getMissions(); // Refetch missions after editing
    };
    const deleteMission = async (missionId) => {
        let url = SERVER_URL + `/missions/${missionId}`;
        try {
            await apiRequest(url, 'DELETE');
            getMissions(); // Refetch missions after deletion
        } catch (err) {
            console.log('ERROR ', err);
            tokenExpireAlert(err);
        }
    };
    const someFunction = async (id) => {
        let resolvedName = await nameById(id);
        nameById(id).then((result) => {
            resolvedName = result;
        });

        console.log(resolvedName); // This will log the resolved string
        return resolvedName;
    };

    useEffect(() => {
        getMissions()
    }, [showCreateNewMission]);
    const createMission = () => {
        setShowCreateNewMission(!showCreateNewMission);

    }

    return (
        <div>
            <button className='bg-purple-500 text-white p-2 rounded-md  z-5  absolute right-0 top-100' onClick={createMission}>post mission</button>
            <div >
                {showCreateNewMission && <PostMission setShowCreateNewMission={setShowCreateNewMission} />}
                {missions.length > 0 ? (
                    <div className='align-center justify-center flex flex-wrap -mx-4'>
                        {showEditMission && (
                            <EditMission mission={selectedMission} onClose={closeEditMission} />
                        )}
                        {missions.map((mission) => (
                            <div style={{ backgroundColor: mission.taken ? '#CCCCCC' : '#FFFFFF' }}
                                key={mission._id} className=" relative bg-white border border-gray-400 rounded-lg shadow-sm  dark:border-gray-700 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4 m-4">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{mission.title}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{mission.description}</p>
                                <div>
                                    <div className="flex items-center mb-3">
                                        <AddressIcon className="inline-block w-6 h-6 mr-2" />
                                        <p className="mb-0 font-normal text-gray-700 dark:text-gray-400">{mission.address.name}</p>
                                    </div>
                                    <div className="flex items-center mb-3">
                                        <CalenderIcon className="inline-block w-6 h-6 mr-2" />
                                        <p className="text-gray-700">{new Date(mission.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center mb-3">
                                        <TimeIcon className="inline-block w-6 h-6 mr-2" />
                                        <p className="mb-0 font-normal text-gray-700 dark:text-gray-400">{mission.time}</p>
                                    </div>
                                </div>
                                <div className="">
                                    {mission.taken && <div className='w-full  text-gray-500 px-4 py-2 rounded-md mt-4 flex items-center justify-center text-sm font-semibold'>
                                        TAKEN
                                    </div>}

                                    {mission.interested.length == 0 && <div>available</div >}

                                    {((mission.interested.length > 0) && !mission.taken) && (<InterestedMenu getMissions={getMissions} interested={mission.interested} mission={mission._id} />)}

                                    {!mission.taken && <div className="absolute top-0 right-0 flex justify-end">
                                        <button
                                            className="text-purple-500 p-2 rounded-md mt-2"
                                            onClick={() => deleteMission(mission._id)}
                                        >
                                            <DeleteIcon />
                                        </button>
                                        <button
                                            className="text-purple-500 p-2 rounded-md mt-2"
                                            onClick={() => openEditMission(mission)}
                                        >
                                            <EditIcon />
                                        </button>
                                    </div>}
                                    <div className="mt-2">
                                        <div className="flex">
                                            {mission.fields.map((category, index) => (
                                                <div key={index} className={`rounded-md px-2 py-1 mr-2 ${categoryColors[category] || 'bg-gray-200'}`}>
                                                    {category}
                                                </div>
                                            ))}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>You have not created any missions.</div>
                )}
            </div >
        </div>
    );



}

export default MissionsByMe