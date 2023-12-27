import React, { useState, useEffect ,useContext } from 'react'
import { SERVER_URL, apiRequest, apiRequestGet } from '../serverConnect/api';
import Cookies from 'js-cookie';
import { AppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    // const [user, setUser] = useState({});
    const { user, setUser } = useContext(AppContext);
    const nav = useNavigate()

    return (
        <div>
            <h1>Your Profile</h1>
            {user ? (
                <div>
                    <p>Full Name: {user.full_name}</p>
                    <p>Email: {user.email}</p>
                    <p>Teudat zehut: {user.tz}</p>
                    <p>Description: {user.description}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Address: {user.address}</p>
                    <p>Birth Date: {user.birth_date}</p>
                    <p>Image URL: {user.img_url}</p>
                    <p>Rating: {user.rating}</p>
                    <p>Date Created: {user.date_created}</p>
                    <p>Gender: {user.gender}</p>
                    {/* <p>Fields: {user.fields.join(', ')}</p> */}
                    <button onClick={()=>{nav("/edit-profile")}}>edit</button>
                </div>

            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

}

export default ProfilePage