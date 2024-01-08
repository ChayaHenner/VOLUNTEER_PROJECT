import React, { useState } from 'react';

const QaChat = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [askedQuestions, setAskedQuestions] = useState(new Set());

    const qaPairs = [
        {
            question: "How does your platform work?",
            answer: "We are a platform that connects people interested in volunteering with social projects. Any registered user can create a volunteer request, and others can offer to volunteer. The person who created the request then selects the volunteer of their choice."
        },
        {
            question: "How do people volunteer?",
            answer: "After someone creates a volunteer request, other users can see it and suggest themselves. From there, the person who created the request selects their preferred volunteer."
        },
        {
            question: " Do you have information about the general registration process and how to get started?",
            answer: "You can start here [link to the registration page]. With a successful registration, you can create volunteer requests or offer yourself as a volunteer in a friendly and fast way."
        },
        {
            question: "Are there examples of projects that have already been done through your website?",
            answer: "We have many successful projects! For example, volunteering at specific restaurants, helping the elderly in hospitals and many other options. Everyone can find a suitable task."
        },
        {
            question: "Is there a way to make direct contact with volunteers or those seeking help?",
            answer: "You have a personal profile page as a registered user. There you can detail the volunteering you did, receive feedback from others and connect directly to our community."
        },
    ];

    const handleQuestionClick = () => {
        if (!selectedQuestion || askedQuestions.has(selectedQuestion)) return;

        const answer = qaPairs.find(pair => pair.question === selectedQuestion)?.answer ||
            "I'm sorry, I don't have an answer for that.";

        const newConversationItem = {
            question: selectedQuestion,
            answer: answer,
        };

        setConversation((prevConversation) => [...prevConversation, newConversationItem]);
        setAskedQuestions((prevAskedQuestions) => new Set(prevAskedQuestions).add(selectedQuestion));
        setSelectedQuestion(null);
    };

    // ... (existing code)

return (
    <div className="fixed bottom-5 right-5 z-10">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md mt-8">
            <div className="border-t border-b border-gray-300 p-4 h-64 overflow-y-scroll">
                {conversation.map((item, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-gray-800">You:</span>
                        </div>
                        <p className="text-gray-600 mb-2">{item.question}</p>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-gray-800">Robot:</span>
                        </div>
                        <p className="text-gray-800 font-semibold">{item.answer}</p>
                    </div>
                ))}

                {!selectedQuestion && (
                    <div className="mb-4">
                        <div className="grid grid-cols-1 gap-4 mr-8">
                            {qaPairs
                                .filter(pair => !askedQuestions.has(pair.question))
                                .map((pair, index) => (
                                    <button
                                        key={index}
                                        className={`py-1 px-2 rounded-md bg-gray-200 hover:bg-gray-300`}
                                        onClick={() => {
                                            setSelectedQuestion(pair.question);
                                            handleQuestionClick(); // Directly call the function
                                        }}
                                    >
                                        {pair.question}
                                    </button>
                                ))}
                        </div>
                    </div>
                )}

                {selectedQuestion && (
                    <div className="mb-4">
                        {/* The button is removed, and handleQuestionClick is called directly */}
                        {handleQuestionClick()}
                    </div>
                )}
            </div>
        </div>
    </div>
);

};

export default QaChat;
