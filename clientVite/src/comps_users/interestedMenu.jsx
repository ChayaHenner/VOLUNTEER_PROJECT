import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, ProfileIcon } from './Icons';
import { tokenExpireAlert, SERVER_URL, apiRequest, apiRequestGet } from '../serverConnect/api';

export const InterestedMenu = ({ getMissions,interested, mission }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleChoose = async () => {
        if (selectedUser) {
            try {
                const url = `${SERVER_URL}/missions/taken?idMission=${mission}&idUser=${selectedUser._id}`;
                const requestOptions = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' }
                };

                const response = await fetch(url, requestOptions);
                console.log(response);
                console.log('Chosen user:', selectedUser.full_name);
                alert('Assigned volunteer')
                getMissions()

            } catch (error) {
                console.error('Error assigning volunteer:', error);
            }

        } else {
            alert(' Please select a volunteer first.');
        }
    };

    return (
        <div className="relative">
            <button
                type="button"
                className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                aria-haspopup="listbox"
                aria-expanded={showDropdown ? 'true' : 'false'}
                aria-labelledby="listbox-label"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <span className="flex items-center">
                    <span className="ml-3 block truncate">{selectedUser ? selectedUser.full_name : 'Select a user'}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                            fillRule="evenodd"
                            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </button>

            {showDropdown && (
                <ul
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5  sm:text-sm"
                    tabIndex="-1"
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-option-3"
                >
                    {interested && interested.map((user, index) => (
                        <li key={index} className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id={`listbox-option-${index}`} role="option">
                            <div className="flex items-center">
                                <img
                                    src={user.img_url}
                                    alt=""
                                    className="h-5 w-5 flex-shrink-0 rounded-full"
                                />
                                <span className="font-normal ml-3 block truncate">{user.full_name}</span>
                                <Link className="w-1/2" to={`/view-user/${user._id}`}>
                                    <ProfileIcon />
                                </Link>
                                <button
                                    className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4 focus:outline-none"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setShowDropdown(false);
                                    }}
                                >
                                    <CheckIcon />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <button className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-md" onClick={handleChoose}>
                Choose
            </button>
        </div>
    );
};
