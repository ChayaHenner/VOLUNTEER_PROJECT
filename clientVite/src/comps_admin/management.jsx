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
                setUserList(response.data);
            } catch (error) {
                tokenExpireAlert(error);
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
            tokenExpireAlert(error);
            console.error('Error deleting report:', error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-8">Report List</h2>

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Reporter</th>
                        <th className="py-2 px-4 border-b">Reportee</th>
                        <th className="py-2 px-4 border-b">Message</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((report) => (
                        <tr key={report._id}>
                            <td className="py-2 px-4 border-b">{report.id_reporter[0].full_name}</td>
                            <td className="py-2 px-4 border-b">{report.id_reportee[0].full_name}</td>
                            <td className="py-2 px-4 border-b">{report.Message}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    className="text-red-500"
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
