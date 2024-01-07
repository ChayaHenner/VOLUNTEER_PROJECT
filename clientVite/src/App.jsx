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
import ForgotPassword from './comps_users/forgotPass'
import ResetPassword from './comps_users/resetPass'
import ResetPasswordPage from './comps_users/ResetPasswordPage'
import ViewMissions from './comps_users/viewMissions'
import Logout from './comps_users/logOut'
import ViewUser from './comps_users/viewUser'
import ViewUserAdmin from './comps_admin/viewUsers'
import StarReview from './comps_users/starReview'
import MissionsByMe from './comps_users/missionsByMe'
import Management from './comps_admin/management'
import Footer from './comps_main/footer';
import QaChat from './comps_main/qaChat'
import EditImg from './comps_users/editImg';
import DeletUser from './comps_users/deletUser'
function App() {

  const [user, setUser] = useState(null) //maybe change
  return (<>
    <AppContext.Provider value={({ user, setUser })}>

      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<HeaderAdmin />} />
          <Route path="/*" element={<HeaderUser />} />
        </Routes>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<h2>Page 404</h2>} />

            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/my-missions" element={<MissionsByMe />} />
            <Route path="/post-mission" element={<PostMission />} />
            <Route path="/my-profile" element={<ProfilePage />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/ViewUser-Admin" element={<ViewUserAdmin />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/star" element={<StarReview />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/resetPass/:token" element={<ResetPasswordPage />} />
            <Route path="/view-user/:id" element={<ViewUser />} />
            <Route path="/view-missions" element={<ViewMissions />} />
            {/* <Route path="/view-missions" element={<h2>h</h2> } /> */}
            <Route path="/logout" element={<Logout />} />
            <Route path="/management" element={<Management />} />
            <Route path="/qachat" element={<QaChat />} />
            <Route path="/edit-img" element={<EditImg />} />
            <Route path="/delet-User" element={<DeletUser />} />

            {/* {adminRoutes()} */}

            {/* <Route path="/admin/post-mission" element={<PostMission />} /> */}
          </Routes>
        </main>
      </BrowserRouter>
      <Footer></Footer>
    </AppContext.Provider>
  </>
  )
}

export default App
