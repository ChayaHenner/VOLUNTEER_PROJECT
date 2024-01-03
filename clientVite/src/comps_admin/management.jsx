import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tokenExpireAlert, SERVER_URL, apiRequestGet, apiRequestNoBody } from '../serverConnect/api';

const Management = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        // Fetch missions on component mount
        const fetchUserList = async () => {
            try {
                const url = `${SERVER_URL}/report`;
                const response = await apiRequestGet(url);
                // console.log(response.data);
                setUserList(response.data);
            } catch (error) {
                tokenExpireAlert(error)
                console.error('Error fetching userList:', error);
            }
        };
        fetchUserList();
    }, []);

    const handleDelete = async (id) => {
        try {
            const url = `${SERVER_URL}/users/block/${id}`;
            await apiRequestNoBody(url, "PUT");
            fetchUserList();
        } catch (error) {
            tokenExpireAlert(error)
            console.error('Error deleting report:', error);
        }
    };

    return (
        // <></>
        <div className="container mx-auto mt-8">
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border p-2">Reporter</th>
                        <th className="border p-2">Reportee</th>
                        <th className="border p-2">Message</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                {
                    console.log(userList)
                }
                <tbody>
                    {userList.map((report) => (
                        <tr key={report._id} className='hover:bg-gray-100 border-b border-gray-200 py-10'>
                            <td className="px-4 py-2 bg-gray-200">{report.id_reporter[0].full_name}</td>
                            <td className="border p-2">{report.id_reportee[0].full_name}</td>
                            <td className="border p-2">{report.Message}</td>
                            <td className="border p-2">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleDelete(report.id_reportee[0]._id)}
                                >
                                    Block

                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Management;
