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
    const [name, setName] = useState("");


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
            // return resp.data.full_name || ''
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
    // useEffect(() => {
    //     const fetchNames = async () => {
    //         const updatedNames = {};
    //         for (const mission of missions) {
    //             if (mission.interested) {
    //                 for (const id of mission.interested) {
    //                     if (!names[id]) {
    //                         const name = await nameById(id);
    //                         updatedNames[id] = name;
    //                     }
    //                 }
    //             }
    //         }
    //         setNames({ ...names, ...updatedNames });
    //     };

    //     fetchNames();
    // }, [missions]); // Ensure this useEffect runs when missions change


    useEffect(() => {
        getMissions()
    }, []);

    return (
        <div>
            {missions.length > 0 ? (<div>
                {missions.map((mission) => {
                    return (

                        <div key={mission._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{mission.title}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{mission.description}</p>
                            <div className="">
                                {/* <Link className='w-1/2' to={`/view-user/${_id}`}>
                                    <p className="text-sm text-gray-500">{`Created by: ${name}`}</p>
                                </Link> */}
                                <div className="text-sm text-gray-500">Interested:</div>
                                {
                                    mission.interested && mission.interested.map((id, index) => (
                                        < div key={index} >
                                            <div>{id}</div>
                                            {/* {
                                                setName(id) ? <div>{name}</div> : <div>waa</div>

                                            } */}
                                            {/* <div>{nameById(id)}</div> */}
                                            {/* <div>{someFunction(id)}</div> */}
                                        </div>
                                    ))
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