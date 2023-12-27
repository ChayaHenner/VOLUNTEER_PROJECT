import React, { useState, useEffect, useContext } from 'react'
import { SERVER_URL, apiRequest, apiRequestGet } from '../serverConnect/api';
import Cookies from 'js-cookie';
import { AppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import Review from './review';
import CreatePost from './createPost';
const ProfilePage = () => {
    const { user, setUser } = useContext(AppContext);
    const nav = useNavigate()
    const [showCreatePost, setShowCreatePost] = useState(false); // State to manage visibility
    const user_now = JSON.parse(Cookies.get('user'));
    useEffect(() => {
        setUser(user_now);
    }, []);
    return (
        <div>
            <h1>Your Profile</h1>
            {user ? (
                <div>
                    <img src={user.img_url} alt={user.img_url} className="" />
                    <p>{user.full_name}</p>
                    <p>Email: {user.email}</p>
                    <p>Teudat zehut: {user.tz}</p>
                    <p>Description: {user.description}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Address: {user.address}</p>
                    <p>Birth Date: {user.birth_date}</p>
                    <p>Rating: {user.rating}</p>
                    <p>Date Created: {user.date_created}</p>
                    <p>Gender: {user.gender}</p>
                    <p>posts: <div className=''>
                        {
                            user.posts && user.posts.map((post, index) => (
                                <div className=" border m-2" key={index}>
                                    <Review post={post} />
                                </div>
                            ))
                        }
                    </div></p>
                    <p>reviews:<div className=''>
                        {
                            user.reviews && user.reviews.map((review, index) => (
                                <div key={index}>
                                    <Review review={review} />
                                </div>
                            ))
                        }
                    </div></p>
                    <p>missions: <div className=''>
                        {
                            user.misssions && user.missions.map((mission, index) => (
                                <div className=" border m-2" key={index}>
                                    <Review mission={mission} />
                                </div>
                            ))
                        }
                    </div></p>
                    <button className='bg-green-500 text-white px-4 py-2 rounded-md mt-4' onClick={() => { nav("/edit-profile") }}>edit</button>
                    <button
                        className='bg-green-500 text-white px-4 py-2 rounded-md mt-4'
                        onClick={() => setShowCreatePost(true)} // Set state to true to show the CreatePost component
                    >
                        Create Post
                    </button>
                    {showCreatePost && <CreatePost />}


                </div>

            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

}

export default ProfilePage