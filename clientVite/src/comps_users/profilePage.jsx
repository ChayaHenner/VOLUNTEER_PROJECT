import React, { useState, useEffect } from 'react'
import { SERVER_URL, apiRequest ,apiRequestGet } from '../serverConnect/api';
import Cookies from 'js-cookie';

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    
        async function fetchUser(){
            Cookies.set('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhODhjMTQyZjkwMjA4ODRjMzhiZDAiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMzU4MzI4OCwiZXhwIjoxNzAzNTg2ODg4fQ.vIAQ63rYus4f-_oJyPOPsMy_axTTnES0x1WSMz3Nw3k", { expires: 1 }); // expires in 1 day

            let url = SERVER_URL + "/users/myInfo"
            try {
                let resp = await apiRequestGet(url)
                setUser(resp)
              }
              catch (err) {
                console.log("ERROR ",err);
              }
    
        }
        fetchUser()

    return (
        <div>
          <h1>Your Profile</h1>
          {user ? (
            <div>
              <p>Full Name: {user.full_name}</p>
              <p>Email: {user.email}</p>
              <p>Timezone: {user.tz}</p>
              <p>Description: {user.description}</p>
              <p>Phone: {user.phone}</p>
              <p>Address: {user.address}</p>
              <p>Birth Date: {user.birth_date}</p>
              <p>Image URL: {user.img_url}</p>
              <p>Rating: {user.rating}</p>
              <p>Date Created: {user.date_created}</p>
              <p>Gender: {user.gender}</p>
              <p>Fields: {user.fields.join(', ')}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
    
}

export default ProfilePage