import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { SERVER_URL, apiRequestGet } from '../serverConnect/api';

const ViewUsers = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Fetch missions on component mount
    const fetchUserList = async () => {
      try {
        const url = `${SERVER_URL}/users/usersList`;
        const response = await apiRequestGet(url);
        setUserList(response.data);
      } catch (error) {
        console.error('Error fetching userList:', error);
      }
    };
    fetchUserList();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-8">User List</h2>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Full Name</th>
            <th className="py-2 px-4 border-b">TZ</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Profile Page</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user.full_name}</td>
              <td className="py-2 px-4 border-b">{user.tz}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`/view-user/${user._id}`} className="text-blue-500">Profile Page</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUsers;
