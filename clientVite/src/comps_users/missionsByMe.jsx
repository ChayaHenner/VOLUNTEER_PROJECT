import React, { useState, useEffect, useContext } from 'react'
import { tokenExpireAlert, SERVER_URL, apiRequest, apiRequestGet } from '../serverConnect/api';
import Cookies from 'js-cookie';
import { AddressIcon, CalenderIcon, TimeIcon } from './Icons';
import PostMission from './postMission';
import { InterestedMenu } from './interestedMenu';
import EditMission from './editMission'
const MissionsByMe = () => {
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
        <>
            <button className='bg-purple-500 text-white px-4 py-2 rounded-md mt-4 z-5  absolute right-0 top-100' onClick={createMission}>new mission</button>
            <div >
                {showCreateNewMission && <PostMission setShowCreateNewMission={setShowCreateNewMission} />}
                {missions.length > 0 ? (
                    <div className='align-center justify-center flex flex-wrap -mx-4'>
                        {showEditMission && (
                            <EditMission mission={selectedMission} onClose={closeEditMission} />
                        )}
                        {missions.map((mission) => (
                            <div key={mission._id} className="bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4 m-4">
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
                                <div className="">
                                    {mission.taken && <div className="w-1/2 border border-purple-500 text-purple-500 px-4 py-2 rounded-md mt-4 flex align-center justify-center">
                                        taken</div>}

                                    {mission.interested.length == 0 && <div>no one interested</div >}

                                    {((mission.interested.length > 0) && !mission.taken) && (<InterestedMenu getMissions={getMissions} interested={mission.interested} mission={mission._id} />)}

                                    <div className="flex justify-end">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                                            onClick={() => deleteMission(mission._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                                        onClick={() => openEditMission(mission)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>You have not created any missions.</div>
                )}
            </div>
        </>
    );

    // return (
    //     <div>
    //         {missions.length > 0 ? (<div>
    //             {missions.map((mission) => {
    //                 return (

    //                     <div key={mission._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
    //                         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{mission.title}</h5>
    //                         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{mission.description}</p>
    //                         <div className="">
    //                             <div className="text-sm text-gray-500">Interested:</div>
    //                             {
    //                                 mission.interested && mission.interested.map((user, index) => (
    //                                     < div key={index} >
    //                                         <Link className='w-1/2' to={`/view-user/${user._id}`}>
    //                                             <p className="text-sm text-gray-500">{user.full_name}</p>
    //                                         </Link>

    //                                     </div>
    //                                 ))
    //                             }

    //                             <ChooseVolunteer interested={mission.interested} mission={mission._id}/> 
    //                         </div>
    //                     </div>
    //                 );
    //             })}
    //         </div>) :
    //             <div>You have not created any missions.</div>
    //         }
    //     </div >
    // )
}

export default MissionsByMe