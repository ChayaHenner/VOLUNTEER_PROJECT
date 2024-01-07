import React from 'react';

const Alert = ({ text, onConfirm }) => {
    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md mt-4">
            <div className="bg-white p-8 rounded shadow-md">
                <div className="text-lg mb-4">{text}</div>
                <button
                    onClick={onConfirm}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default Alert;
