import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const token = localStorage.getItem('token');
    const [isLoading , setIsLoading] = useState(false)
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const fetchTasks = async () => {
        try {

            setIsLoading(true);
            const response = await axiosInstance.get('/tasks');
            setTasks(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async () => {
        try {
            setIsLoading(true);
            await axiosInstance.post('/tasks', { title, description });
            setTitle('');
            setDescription('');
            setIsLoading(false);
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const editTask = async () => {
        try {
            setIsLoading(true);
            await axiosInstance.put(`/tasks/${currentTaskId}`, { title, description });
            setTitle('');
            setDescription('');
            setIsEditing(false);
            setCurrentTaskId(null);
            setIsLoading(false);
            fetchTasks();
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {setIsLoading(true);
            await axiosInstance.delete(`/tasks/${id}`);
            setIsLoading(false);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const startEditing = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setCurrentTaskId(task._id);
        setIsEditing(true);
    };

    const updateTaskStatus = async (id, status) => {
        try {
            setIsLoading(true);
            await axiosInstance.put(`/tasks/${id}`, { status });
            setIsLoading(false);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };
    if(isLoading)
    {

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            <span className="text-gray-800 dark:text-gray-100 font-semibold text-lg">
                Loading
                <span className="animate-[bounce_1s_infinite]">.</span>
                <span className="animate-[bounce_1s_infinite_0.2s]">.</span>
                <span className="animate-[bounce_1s_infinite_0.4s]">.</span>
            </span>
        </div>
        )
    }
    return (
        <div className="container mx-auto p-4 md:max-w-2xl pt-24 min-h-screen bg-gray-200">
            {/* <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1> */}
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    className="flex-1 border rounded p-2"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    className="flex-1 border rounded p-2"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {isEditing ? (
                    <button
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                        onClick={editTask}
                    >
                        Update
                    </button>
                ) : (
                    <button
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                        onClick={addTask}
                    >
                        Add
                    </button>
                )}
            </div>
            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        className={`p-4 border rounded-md flex flex-col sm:flex-row items-center justify-between ${
                            task.status === 'completed' ? 'bg-green-200 line-through' : 'bg-white'
                        }`}
                    >
                        <div className="flex-1">
                            <h3 className="font-semibold">{task.title}</h3>
                            <p className="text-gray-600">{task.description}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-1"
                                    checked={task.status === 'completed'}
                                    onChange={() => {
                                        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
                                        updateTaskStatus(task._id, newStatus);
                                    }}
                                />
                                {task.status === 'completed' ? 'Completed' : 'Pending'}
                            </label>
                            <button
                                className="bg-gray-600 text-white p-2 rounded hover:bg-yellow-600 transition"
                                onClick={() => startEditing(task)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                                onClick={() => deleteTask(task._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
