// // QaChat.js

// import React, { useState } from 'react';

// const QaChat = () => {
//   const [inputQuestion, setInputQuestion] = useState('');
//   const [conversation, setConversation] = useState([]);

//   const questions = [
//     'What is your website about?',
//     'How can I contact support?',
//     'Tell me about your services.',
//     // Add more questions as needed
//   ];

//   const answers = {
//     'What is your website about?': 'Our website provides information about...',
//     'How can I contact support?': 'You can contact our support team at support@example.com.',
//     'Tell me about your services.': 'We offer a variety of services, including...',
//     // Add more answers as needed
//   };

//   const handleQuestionSubmit = () => {
//     if (inputQuestion.trim() === '') return;

//     const newConversationItem = {
//       user: { name: 'User', profileImage: '/user-profile-image.png' },
//       message: inputQuestion,
//     };

//     setConversation((prevConversation) => [...prevConversation, newConversationItem]);
//     setInputQuestion('');
//     // Simulate robot's response after a short delay
//     setTimeout(() => {
//         const answer = answers[inputQuestion] || "I'm sorry, I don't have an answer for that.";
//         const robotResponse = {
//         user: { name: 'Robot', profileImage: '/robot-profile-image.png' },
//         message: answer,
//       };
//       setConversation((prevConversation) => [...prevConversation, robotResponse]);
//     }, 500);
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md mt-8">
//       <div className="border-t border-b border-gray-300 p-4 h-96 overflow-y-auto">
//         {conversation.map((item, index) => (
//           <div key={index} className="mb-4">
//             <div className="flex items-center space-x-2">
//               <img
//                 src={item.user.profileImage}
//                 alt={item.user.name}
//                 className="h-8 w-8 rounded-full"
//               />
//               <span className="font-bold text-gray-800">{item.user.name}</span>
//             </div>
//             <div className="bg-gray-200 p-4 rounded-md mt-2">
//               <p className="text-gray-700">{item.message}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center space-x-2 mt-4">
//         <img
//           src="/user-profile-image.png" // Replace with the path to the user profile image
//           alt="User"
//           className="h-8 w-8 rounded-full"
//         />
//         <input
//           type="text"
//           className="border border-gray-300 p-2 flex-1 rounded-md"
//           placeholder="Type your question..."
//           value={inputQuestion}
//           onChange={(e) => setInputQuestion(e.target.value)}
//         />
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-md"
//           onClick={handleQuestionSubmit}
//         >
//           Ask
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QaChat;




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

    const handleQuestionClick = () => {
        if (!selectedQuestion) return;

        const answer = answers[selectedQuestion] || "I'm sorry, I don't have an answer for that.";

        const newConversationItem = {
            question: selectedQuestion,
            answer: answer,
        };

        setConversation((prevConversation) => [...prevConversation, newConversationItem]);
        setSelectedQuestion(null);
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

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="questions">
                    Select a question:
                </label>
                <select
                    id="questions"
                    name="questions"
                    className="block w-full bg-gray-200 text-gray-700 border border-purple-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                    value={selectedQuestion || ''}
                    onChange={(e) => setSelectedQuestion(e.target.value)}
                >
                    <option value="" disabled>Select a question</option>
                    {questions.map((question) => (
                        <option key={question} value={question}>
                            {question}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                    onClick={handleQuestionClick}
                    disabled={!selectedQuestion}
                >
                    Ask Question
                </button>
            </div>

            <div className="border-t border-b border-gray-300 p-4 h-40 overflow-y-scroll">
                {conversation.map((item, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex items-center space-x-2">
                            <img
                                src="/user-profile-image.png" // Replace with the path to the user profile image
                                alt="User"
                                className="h-8 w-8 rounded-full"
                            />
                            <span className="font-bold text-gray-800">User</span>
                        </div>
                        <p className="text-gray-600 mb-2">{item.question}</p>
                        <div className="flex items-center space-x-2">
                            <img
                                src="/robot-profile-image.png" // Replace with the path to the robot profile image
                                alt="Robot"
                                className="h-8 w-8 rounded-full"
                            />
                            <span className="font-bold text-gray-800">Robot</span>
                        </div>
                        <p className="text-gray-800 font-semibold">{item.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QaChat;






