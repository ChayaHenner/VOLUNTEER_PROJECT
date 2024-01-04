// QaChat.js

import React, { useState } from 'react';

const QaChat = () => {
    
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [conversation, setConversation] = useState([]);

    const questions = [
        'What is your website about?',
        'How can I contact support?',
        'Tell me about your services.',
        // Add more questions as needed
    ];

    const answers = {
        'What is your website about?': 'Our website provides information about...',
        'How can I contact support?': 'You can contact our support team at support@example.com.',
        'Tell me about your services.': 'We offer a variety of services, including...',
        // Add more answers as needed
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md mt-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <img
                        src="/user-profile-image.png" // Replace with the path to the user profile image
                        alt="User"
                        className="h-8 w-8 rounded-full"
                    />
                    <span className="font-bold text-gray-800">User</span>
                </div>
                <div className="flex items-center space-x-2">
                    <img
                        src="/robot-profile-image.png" // Replace with the path to the robot profile image
                        alt="Robot"
                        className="h-8 w-8 rounded-full"
                    />
                    <span className="font-bold text-gray-800">Robot</span>
                </div>
            </div>

            <div className="border-t border-b border-gray-300 p-4 h-40 overflow-y-hidden">
                {questions.map((question) => (
                    <button
                        key={question}
                        className={`block w-full text-left mb-2 py-2 px-4 rounded-md transition duration-300 ${
                            selectedQuestion === question
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-200'
                            }`}
                        onClick={() => handleQuestionClick(question)}
                    >
                        {question}
                    </button>
                ))}
            </div>

            {selectedQuestion && (
                <div className="mt-4">
                    <div className="flex items-center space-x-2">
                        <img
                            src="/user-profile-image.png" // Replace with the path to the user profile image
                            alt="User"
                            className="h-8 w-8 rounded-full"
                        />
                        <span className="font-bold text-gray-800">User</span>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-md mt-2">
                        <p className="text-gray-700">{selectedQuestion}</p>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                        <img
                            src="/robot-profile-image.png" // Replace with the path to the robot profile image
                            alt="Robot"
                            className="h-8 w-8 rounded-full"
                        />
                        <span className="font-bold text-gray-800">Robot</span>
                    </div>
                    <div className="bg-blue-500 text-white p-4 rounded-md mt-2">
                        <p>{answers[selectedQuestion]}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QaChat;
