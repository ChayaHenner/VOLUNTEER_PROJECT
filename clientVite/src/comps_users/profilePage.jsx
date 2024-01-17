import React, { useState, useEffect, useContext } from 'react'
import { tokenExpireAlert, SERVER_URL, apiRequest, apiRequestGet } from '../serverConnect/api';
import Cookies from 'js-cookie';
import { AppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import Review from './review';
import Post from './post';
import StarIcon from './starIcon'
import CreatePost from './createPost';
import MyMission from './myMission';
import Loading from '../comps_main/loading';
import { PlusIcon } from './Icons';
import EditImg from './editImg';
const ProfilePage = () => {
    const { user, setUser } = useContext(AppContext);
    const nav = useNavigate()
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [showEditImage, setShowEditImage] = useState(false);
    const [loading, setLoding] = useState(true);

    const openCreatePost = () => {
        setShowCreatePost(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when the popup is open
    };

    const closeCreatePost = () => {
        setShowCreatePost(false);
        document.body.style.overflow = ''; // Re-enable scrolling when the popup is closed
    };

    const getUser = async () => {
        let url = SERVER_URL + "/users/myInfo"
        try {
            let resp = await apiRequestGet(url, "GET")
            setUser(resp.data)
            console.log("user shld be", resp.data);
            setLoding(false);
        }
        catch (err) {
            console.log("ERROR ", err);
            tokenExpireAlert(err)

        }

    }
   
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Assuming getUser is an asynchronous function
                await getUser();
                console.log("User:", user);
              
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        // Call the fetchUser function
        fetchUser();

        // The dependency array should include any variables that are being used inside the effect
        // In this case, if `getUser` is a dependency or any variable inside `getUser`, include it in the dependency array
    }, []);

    return (
        <div>
            {!loading ? (
                <div>
                    <div className="w-full lg:w-4/12 px-4 mx-auto">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                            <div className="px-6">
                                <div className=" flex flex-wrap justify-center">
                                    <div className=" w-full px-4 flex justify-center relative">
                                        {/* Place the button directly inside the container */}
                                        <button
                                            onClick={() => { setShowEditImage(true) }}
                                            className="absolute bottom-4 right-20 bg-white rounded-full p-2 shadow-md z-10"
                                        >
                                            <PlusIcon />
                                        </button>
                                        {showEditImage && <EditImg setShowEditImage={setShowEditImage} />}
                                        <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-xl">
                                            <img src={user.img_url} alt={user.full_name} className="w-full h-full object-cover" />
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
                                        {user.address.name}
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
                                    <button
                                        className=' bg-purple-500 text-white px-4 py-2 rounded-md mt-4 z-5  ' onClick={() => setShowCreatePost(true)} // Set state to true to show the CreatePost component
                                    >  add Post</button>

                                    <div><div className=''>
                                        {
                                            user.posts && user.posts.slice().reverse().map((post, index) => (
                                                <div key={index}>
                                                    <Post post={post} profile={user.img_url} getUser={getUser} />
                                                </div>
                                            ))
                                        }
                                    </div></div>
                                    <div><div className=''>
                                        {
                                            user.reviews && user.reviews.map((review, index) => (
                                                <div key={index}>{

                                                    console.log(review)
                                                }
                                                    <Review review={review} />
                                                </div>
                                            ))
                                        }
                                    </div></div>
                                    <div> <div className=''>
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
                            <button
                                className=' bg-purple-500 text-white px-4 py-2 rounded-md mt-4 z-5  absolute right-0 top-200' onClick={() => { nav("/edit-profile") }}>edit</button>

                           

                            {showCreatePost && (
                                <CreatePost setShowCreatePost={setShowCreatePost} getUser={getUser} />)}
                        </div>

                    </div>


                </div>

            ) : (
                <Loading text={"loading profile..."} />
            )
            }
        </div >
       
    );


}

export default ProfilePage