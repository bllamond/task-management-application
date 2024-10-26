import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const token = localStorage.getItem('token');

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async () => {
        try {
            await axiosInstance.post('/tasks', { title, description });
            setTitle('');
            setDescription('');
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const editTask = async () => {
        try {
            await axiosInstance.put(`/tasks/${currentTaskId}`, { title, description });
            setTitle('');
            setDescription('');
            setIsEditing(false);
            setCurrentTaskId(null);
            fetchTasks();
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axiosInstance.delete(`/tasks/${id}`);
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
            await axiosInstance.put(`/tasks/${id}`, { status });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

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
                {isEditing ? (
                    <button className="bg-blue-500 text-white p-2" onClick={editTask}>
                        Update Task
                    </button>
                ) : (
                    <button className="bg-green-500 text-white p-2" onClick={addTask}>
                        Add Task
                    </button>
                )}
            </div>
            <ul>
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        className={`border p-2 mb-2 ${task.status === 'completed' ? 'bg-green-100 line-through' : ''}`}
                    >
                        <div>
                            <strong>{task.title}</strong> - {task.description}
                        </div>
                        <div>
                            {task.status === 'pending' && (
                                <button
                                    className="bg-blue-500 text-white p-1 mr-2"
                                    onClick={() => updateTaskStatus(task._id, 'completed')}
                                >
                                    Mark as Completed
                                </button>
                            )}
                            <button
                                className="bg-yellow-500 text-white p-1 mr-2"
                                onClick={() => startEditing(task)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white p-1"
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

export default TaskManager ;
