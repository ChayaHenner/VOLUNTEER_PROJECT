import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import HeaderAdmin from './comps_admin/headerAdmin'
import HeaderUser from './comps_users/headerUser'
import Login from './comps_users/login'
import SignUp from './comps_users/signUp'
import MyMission from './comps_users/myMission'
import PostMission from './comps_users/postMission'
import Home from './comps_main/home'
import ProfilePage from './comps_users/profilePage'
import { AppContext } from '../context/context';
import EditProfile from './comps_users/editProfile'
import AddressInput from './comps_users/addressInput'
import ViewMissions from './comps_users/viewMissions'

function App() {
  const [user, setUser] = useState({ full_name: "chayas" }) //maybe change
  return (<>
    <AppContext.Provider value={({ user, setUser })}>

      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<HeaderAdmin />} />
          <Route path="/*" element={<HeaderUser />} />
        </Routes>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<h2>Page 404</h2>} />

          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/my-missions" element={<MyMission />} />
          <Route path="/post-mission" element={<PostMission />} />
          <Route path="/my-profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/view-missions" element={<ViewMissions />} />
          <Route path="/ab" element={<AddressInput/>} />
          {/* {adminRoutes()} */}

          {/* <Route path="/admin/post-mission" element={<PostMission />} /> */}



        </Routes>



      </BrowserRouter>
    </AppContext.Provider>
  </>
  )
}

export default App
