import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import HeaderAdmin from './comps_admin/headerAdmin'
import HeaderUser from './comps_users/headerUser'
import Login from './comps_users/login'
import SignUp from './comps_users/signUp'
import MyMissions from './comps_users/myMissions'
import PostMission from './comps_users/postMission'
import Home from './comps_main/home'
import ProfilePage from './comps_users/profilePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<HeaderAdmin />} />
        <Route path="/*" element={<HeaderUser />} />
      </Routes>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/*" element={<h2>Page 404</h2>}/>

        
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/my-missions" element={<MyMissions />} />
        <Route path="/post-mission" element={<PostMission />} />
        <Route path="/my-profile" element={<ProfilePage />} />
        {/* {adminRoutes()} */}
          
        {/* <Route path="/admin/post-mission" element={<PostMission />} /> */}


     
      </Routes>



    </BrowserRouter>
  )
}

export default App
