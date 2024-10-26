import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated

    const handleManageTasks = () => {
        if (isAuthenticated) {
            navigate('/tasks'); // Navigate if authenticated
        } else {
            alert('Please log in to manage your tasks.'); // Alert if not authenticated
            navigate('/login'); // Redirect to login
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to the Task Management Application</h1>
            <p className="text-base md:text-lg mb-4">Manage your tasks efficiently and stay productive!</p>
            <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-semibold">Features implemented:</h2>
                <ul className="list-disc list-inside mt-2">
                    <li>Add, edit, and delete tasks</li>
                    <li>Toggle task status between pending and completed</li>
                    <li>JWT-based authentication for secure user login</li>
                    <li>View tasks specific to your account</li>
                    <li>Responsive Web Design </li>
                </ul>
            </div>
            <button
                onClick={handleManageTasks}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
                Manage your tasks
            </button>
        </div>
    );
};

export default Home;
