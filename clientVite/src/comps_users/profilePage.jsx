import React, { useState, useEffect, useContext } from 'react'
import { SERVER_URL, apiRequest, apiRequestGet } from '../serverConnect/api';
import Cookies from 'js-cookie';
import { AppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import Review from './review';
import Post from './post';
import StarIcon from './starIcon'
import CreatePost from './createPost';
import MyMission from './myMission';
const ProfilePage = () => {
    const { user, setUser } = useContext(AppContext);
    const nav = useNavigate()
    const [showCreatePost, setShowCreatePost] = useState(false);

    const openCreatePost = () => {
        setShowCreatePost(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when the popup is open
    };

    const closeCreatePost = () => {
        setShowCreatePost(false);
        document.body.style.overflow = ''; // Re-enable scrolling when the popup is closed
    };

    const user_now = JSON.parse(Cookies.get('user'));
    const getUser = async () => {
        let url = SERVER_URL + "/users/myInfo"
        try {
            let resp = await apiRequestGet(url, "GET")
            setUser(resp.data)
            console.log(resp);
        }
        catch (err) {
            console.log("ERROR ", err);
        }

    }

    useEffect(() => {
        getUser()
        setUser(user_now);
    }, []);
    return (
        <div>
            {user ? (
                <div>
                    <div className="w-full lg:w-4/12 px-4 mx-auto">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full px-4 flex justify-center">
                                        <div className="flex justify-center ">
                                            {/* <img alt={user.img_url} src={user.img_url} className="shadow-xl rounded-full  align-middle border-none  -m-16 -ml-20 lg:-ml-16 max-w-150-px " /> */}
                                            <div className="flex justify-center items-center h-64 w-64 border border-gray-300 rounded-full">
                                                <img src={user.img_url} alt="{user.img_alt}" class="max-h-full max-w-full rounded-full" />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-full px-4 text-center mt-20">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                {user.posts && <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    {user.posts.length}
                                                </span>}
                                                <span className="text-sm text-blueGray-400">Posts</span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                {user.missions && <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    {user.missions.length}
                                                </span>}
                                                <span className="text-sm text-blueGray-400">Missions</span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                {user.reviews && <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    {user.reviews.length}
                                                </span>}
                                                <span className="text-sm text-blueGray-400">Reviews</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        {user.full_name}         </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        {user.email}
                                    </div>
                                    <div className="flex justify-center items-center h-full">
                                        <StarIcon rating={user.rating > 0 ? user.rating : 0} />
                                    </div>

                                    <div className="mb-2 text-blueGray-600 mt-10">
                                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                        {user.phone}        </div>
                                    <div className="mb-2 text-blueGray-600">
                                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                        {user.address}
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                {user.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div>posts: <div className=''>
                                        {
                                            user.posts && user.posts.map((post, index) => (
                                                <div key={index}>
                                                    <Post post={post} profile={user.img_url} />
                                                </div>
                                            ))
                                        }
                                    </div></div>
                                    <div>reviews:<div className=''>
                                        {
                                            user.reviews && user.reviews.map((review, index) => (
                                                <div key={index}>
                                                    <Review review={review} />
                                                </div>
                                            ))
                                        }
                                    </div></div>
                                    <div>missions: <div className=''>
                                        {
                                            user.missions && user.missions.map((mission, index) => (
                                                <div className=" border m-2" key={index}>
                                                    <MyMission mission={mission} />
                                                </div>
                                            ))
                                        }
                                    </div></div>

                                </div>
                            </div>
                            <button className='bg-green-500 text-white px-4 py-2 rounded-md mt-4' onClick={() => { nav("/edit-profile") }}>edit</button>
                            <button
                                className='bg-green-500 text-white px-4 py-2 rounded-md mt-4'
                                onClick={() => setShowCreatePost(true)} // Set state to true to show the CreatePost component
                            >
                                add Post
                            </button>
                            {showCreatePost && (
                                <div className="fixed top-0 left-0 w-full h-full bg-purple-500 bg-opacity-50 backdrop-blur-lg flex justify-center items-center">
                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                        <button className="absolute top-2 right-2 text-gray-600 text-7xl" onClick={closeCreatePost}>
                                            x
                                        </button>
                                        <CreatePost closeCreatePost={closeCreatePost} />
                                    </div>
                                </div>
                            )}


                        </div>

                    </div>


                </div>

            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

}

export default ProfilePage