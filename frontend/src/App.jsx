// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async () => {
      try {
          await axios.post('http://localhost:5000/api/tasks', { title, description });
          setTitle('');
          setDescription('');
          fetchTasks();
      } catch (error) {
          console.error('Error adding task:', error);
      }
  };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
           
            <div className="mb-4">
                <input
                    type="text"
                    className="border p-2 mr-2"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    className="border p-2 mr-2"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="bg-green-500 text-white p-2" onClick={addTask}>
            Add Task
        </button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id} className="border p-2 mb-2">
                        <div>
                            <strong>{task.title}</strong> - {task.description}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
