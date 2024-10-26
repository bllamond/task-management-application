import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskManager from './components/TaskManager';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [showSignup, setShowSignup] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <div>
            {!isAuthenticated ? (
                showSignup ? (
                    <Signup />
                ) : (
                    <Login onLogin={() => setIsAuthenticated(true)} />
                )
            ) : (
                <div>
                    <TaskManager onLogout={handleLogout} />
                </div>
            )}
            {!isAuthenticated && (
                <div className="text-center">
                    <button
                        onClick={() => setShowSignup(!showSignup)}
                        className="text-blue-500 hover:underline"
                    >
                        {showSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;
