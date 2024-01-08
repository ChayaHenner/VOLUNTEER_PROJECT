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
import { DeleteIcon, EditIcon, PlusIcon } from './Icons';
import EditImg from './editImg';
const NewProfile = () => {
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
                // Update state or perform other actions with the user data
                // setUser(user);
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
                    <div class="h-screen relative overflow-y-scroll bg-white">
                        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 lg:gap-8">
                            <div class="post p-5 lg:p-1 rounded-md">
                                <div class="lg:absolute lg:top-7 lg:left-14 lg:w-3/12 md:fixed md:w-5/12">
                                    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full mb-4">
                                        <div class="relative">
                                            <img src={user.img_url} style={{ filter: 'blur(1px)' }} alt="Banner Profile" class="w-full rounded-t-lg h-20 bg-blur" />
                                            <img src={user.img_url}    alt="Profile Picture" class="absolute bottom-0 left-2/4 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white" />
                                            <div className="absolute bottom-0  transform -translate-x-1/2 translate-y-1/2 left-2/4 w-full px-4 flex justify-center">
                                                <button
                                                    onClick={() => { setShowEditImage(true) }}
                                                    className="absolute bottom-4 right-20 bg-white rounded-full p-2 shadow-md z-10" ><PlusIcon /></button>
                                                {showEditImage && <EditImg setShowEditImage={setShowEditImage} />}
                                            </div>
                                        </div>
                                        <div class="flex items-center mt-4">
                                            <h2 class="text-xl font-bold text-gray-800">{user.full_name}</h2>
                                        </div>
                                        <div className="flex justify-center items-center h-full m-3">
                                            <StarIcon rating={user.rating > 0 ? user.rating : 0} />
                                        </div>

                                        <p class="text-gray-700 mt-2">{user.address.name} | {user.email} | {user.phone} </p>
                                        <p class="text-gray-700 mt-2">{user.description}  </p>
                                    </div>
                                    <button
                                        className=' bg-purple-500 text-white px-4 py-2 rounded-md mt-4 z-5  ' onClick={() => setShowCreatePost(true)} // Set state to true to show the CreatePost component
                                    >  add Post</button>
                                    <div className=''>
                                        {
                                            user.missions && user.missions.map((mission, index) => (
                                                <div className=" border m-2" key={index}>
                                                    <MyMission mission={mission} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className=''>
                                        {
                                            user.reviews && user.reviews.map((review, index) => (
                                                <div key={index}>{

                                                    console.log(review)
                                                }
                                                    <Review review={review} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {/* <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                                        <form>
                                            <div class="mb-6">
                                                <label for="postContent" class="block text-gray-700 text-sm font-bold mb-2">Post Content:</label>
                                                <textarea id="postContent" name="postContent" rows="4" class="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
                    sm:leading-5 resize-none focus:outline-none focus:border-blue-500" placeholder="What's on your mind?"></textarea>
                                            </div>
                                            <div class="mb-6">
                                                <label for="fileAttachment" class="block text-gray-700 text-sm font-bold mb-2">Attach File:</label>
                                                <div class="relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-blue-500 transition duration-150 ease-in-out">
                                                    <input type="file" id="fileAttachment" name="fileAttachment" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                    <div class="flex items-center">
                                                        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                        </svg>
                                                        <span class="ml-2 text-sm text-gray-600">Choose a file</span>
                                                    </div>
                                                    <span class="text-sm text-gray-500">Max file size: 5MB</span>
                                                </div>
                                            </div>
                                            <div class="flex items-center justify-between">
                                                <button type="submit" class="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"> Post <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
                                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                    <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                                                </svg>
                                                </button>
                                                <span class="text-gray-500 text-sm">Max 280 characters</span>
                                            </div>
                                        </form>
                                    </div> */}
                                </div>
                            </div>
                            <div class="lg:col-span-2 p-4 bg-white mt-3" id="posted">
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {
                                        user.posts && user.posts.slice().reverse().map((post, index) => (
                                            <div key={index}>

                                                <Post post={post} profile={user.img_url} getUser={getUser} />
                                            </div>
                                        ))
                                    }



                                </div>
                                <button
                                    className=' bg-purple-500 text-white px-4 py-2 rounded-md mt-4 z-5  absolute right-0 top-200' onClick={() => { nav("/edit-profile") }}>edit</button>


                                {showCreatePost && (
                                    <CreatePost setShowCreatePost={setShowCreatePost} getUser={getUser} />)}
                            </div>

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

export default NewProfile