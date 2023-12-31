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

const MissionsByMe = () => {
    const user_now = JSON.parse(Cookies.get('user'));
    const [missions, setMissions] = useState(false);

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
            console.log(resp.data.full_name);
            return resp.data.full_name
        }
        catch (err) {
            console.log("ERROR ", err);
            return '';
        }

    }
    useEffect(() => {
        getMissions()
    }, []);

    return (
        <div>
            {missions.length > 0 ? (<div>
                {missions.map((mission) => {
                    const userArray = mission.user_creator.split(',');
                    const id = userArray[0];
                    const name = userArray[1];

                    return (

                        <div key={mission._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{mission.title}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{mission.description}</p>
                            <div className="">
                                <Link className='w-1/2' to={`/view-user/${id}`}>
                                    <p className="text-sm text-gray-500">{`Created by: ${name}`}</p>
                                </Link>
                                <div className="text-sm text-gray-500">Interested:</div>
                                {/* {
                                    mission.interested && mission.interested.map((user, index) => (
                                        // const userNamePromise = nameById(user)
                                            < div key = { index } >
                                                <div>{userNamePromise}</div>
                                        </div>
                            ))
                                } */}

                            {
                                    mission.interested && mission.interested.map((user, index) => {
                                        const userNamePromise = nameById(user); // Get the Promise for user's name
                                        return (
                                            <div key={index}>
                                                <div>
                                                    {
                                                        userNamePromise.then(userName => 
                                                        console.log(userName))
                                                        // <div>{userName}</div>)
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })
                                }

                        </div>
                        </div>
            );
                })}
        </div>) :
    <div>You have not created any missions.</div>
}
        </div >
    )
}

export default MissionsByMe