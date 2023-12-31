import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tokenExpireAlert, SERVER_URL, apiRequestGet, apiRequestNoBody } from '../serverConnect/api';
import { EditIcon, ProfileIcon } from '../comps_users/Icons';

const ViewUsers = () => {
  const [userList, setUserList] = useState([]);
  const fetchUserList = async () => {
    try {
      const url = `${SERVER_URL}/users/usersList`;
      const response = await apiRequestGet(url);
      console.log(response);
      setUserList(response.data);
    } catch (error) {
      tokenExpireAlert(error)
      console.error('Error fetching userList:', error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleEditRole = async (userId, userRole) => {
    userRole = userRole == "admin" ? "user" : "admin";
    try {
      const url = `${SERVER_URL}/users/role/${userId}/${userRole}`;
      const response = await apiRequestNoBody(url, "PUT");
      // setUserList(response.data);
    } catch (error) {
      console.error('Error fetching userList:', error);
    }
    console.log('Edit role for user with ID:', userId);
    fetchUserList();

  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-8">User List</h2>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Full Name</th>
            <th className="py-2 px-4 border-b">TZ</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user.full_name}</td>
              <td className="py-2 px-4 border-b">{user.tz}</td>
              <td className="py-2 px-4 border-b">{user.role}
                <button
                  onClick={() => handleEditRole(user._id, user.role)}
                  className="text-green-500"
                >
                  <EditIcon />                </button></td>
              <td className="py-2 px-4 border-b">
                <Link to={`/view-user/${user._id}`} className="text-blue-500 mr-2">
                  <ProfileIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
