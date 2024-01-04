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

    const qaPairs = [
        {
            question: "Hello, I'm looking for information about your site. Could you provide details on how your platform works?",
            answer: "Hi! Certainly, we're a platform that connects people interested in volunteering with social projects. Every registered user can create a volunteering request, and others can offer to volunteer. The person who created the request then selects the volunteer of their choice."
        },
        {
            question: "Interesting. How do people volunteer? Is there a specific process to go through?",
            answer: "Yes, the process is simple. After someone creates a volunteering request, other users can see it and offer themselves. From there, the person who created the request chooses the volunteer they prefer."
        },
        {
            question: "I have a few more questions. Do you have information on the general registration process and how one can get started?",
            answer: "Absolutely! Registration is straightforward; you can start here [link to the registration page]. With successful registration, you can create volunteering requests or offer yourself as a volunteer in a friendly and quick manner."
        },
        {
            question: "Looks interesting. Are there examples of projects that have already been done through your site?",
            answer: "Yes, we have many successful projects! For example, volunteering in specific restaurants, assisting the elderly in hospitals, and many other options. Everyone can find a suitable task."
        },
        {
            question: "Great! Is there a way to directly contact volunteers or those requesting help?",
            answer: "Of course! You have a personal profile page as a registered user. There, you can detail the volunteering you've done, receive feedback from others, and connect directly with our community."
        },
        {
            question: "Thank you for the information! I'll check it out a bit more and get back to you.",
            answer: "You're welcome! If you have any further questions, we're here to help. Good luck in your search!"
        },
    ];

    const handleQuestionClick = () => {
        if (!selectedQuestion) return;

        const answer = qaPairs.find(pair => pair.question === selectedQuestion)?.answer ||
            "I'm sorry, I don't have an answer for that.";

        const newConversationItem = {
            question: selectedQuestion,
            answer: answer,
        };

        setConversation((prevConversation) => [...prevConversation, newConversationItem]);
        setSelectedQuestion(null);
    };

    return (
        <div className="fixed bottom-5 right-5 z-10">

                <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md mt-8">
                    <div className="border-t border-b border-gray-300 p-4 h-40 overflow-y-scroll">
                        {conversation.map((item, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-gray-800">ב"א:</span>
                                </div>
                                <p className="text-gray-600 mb-2">{item.question}</p>
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-gray-800">Representative:</span>
                                </div>
                                <p className="text-gray-800 font-semibold">{item.answer}</p>
                            </div>
                        ))}

                        {!selectedQuestion && (
                            <div className="mb-4">
                                <div className="grid grid-cols-1 gap-4">
                                    {qaPairs.map((pair, index) => (
                                        <button
                                            key={index}
                                            className={`py-2 px-4 rounded-md bg-blue-500 text-white`}
                                            onClick={() => setSelectedQuestion(pair.question)}
                                        >
                                            {pair.question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedQuestion && (
                            <div className="mb-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <button
                                        className="py-2 px-4 rounded-md bg-blue-500 text-white"
                                        onClick={handleQuestionClick}
                                    >
                                        Ask Representative
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
};

export default QaChat;
