import React, { useState, useEffect, useContext } from 'react'
import { SERVER_URL, apiRequest, apiRequestGet } from '../serverConnect/api';
import Cookies from 'js-cookie';
import { AppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Review from './review';
import Post from './post';
import StarIcon from './starIcon'
import CreatePost from './createPost';
import MyMission from './myMission';
import ChooseVolunteer from './chooseVolunteer';

const MissionsByMe = () => {
    const user_now = JSON.parse(Cookies.get('user'));
    const [missions, setMissions] = useState(false);
    const [name, setName] = useState("");


    const [selectedMissionId, setSelectedMissionId] = useState(null);
    const [showChooseVolunteer, setShowChooseVolunteer] = useState(false);

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
            return '';
        }

    }
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
    }, []);

    return (
        <div className='flex'>
            {missions.length > 0 ? (
                <div>
                    {missions.map((mission) => (
                        <div key={mission._id} className=" max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{mission.title}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{mission.description}</p>
                            <div className="">
                                <div className="text-sm text-gray-500">Interested:</div>
                                {mission.interested && mission.interested.map((user, index) => (
                                    <div key={index}>
                                        <Link className='w-1/2' to={`/view-user/${user._id}`}>
                                            <p className="text-sm text-gray-500">{user.full_name}</p>
                                        </Link>
                                    </div>
                                ))}
                                <button onClick={() => handleChooseVolunteer(mission._id)}>Choose Volunteer</button>
                                {selectedMissionId === mission._id && (
                                    <ChooseVolunteer interested={mission.interested} mission={mission._id}
                                        onClose={handleCloseChooseVolunteer}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>You have not created any missions.</div>
            )}
        </div>
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