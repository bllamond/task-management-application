// const express = require('express');
// const Task = require('../models/Task');
// const router = express.Router();

// router.post('/tasks', async (req, res) => {
//     try {
//         const { title, description } = req.body;
//         const task = new Task({ title, description });
//         await task.save();
//         res.status(201).json(task);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// router.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find();
//         res.status(200).json(tasks);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.get('/tasks/:id', async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.id);
//         if (!task) return res.status(404).json({ message: 'Task not found' });
//         res.status(200).json(task);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.put('/tasks/:id', async (req, res) => {
//     try {
//         const { title, description, status } = req.body;
//         const task = await Task.findByIdAndUpdate(
//             req.params.id,
//             { title, description, status },
//             { new: true }
//         );
//         if (!task) return res.status(404).json({ message: 'Task not found' });
//         res.status(200).json(task);
//     } catch (error) {
//         if (error.name === 'ValidationError') {
//             res.status(400).json({ error: error.message });
//         } else {
//             res.status(500).json({ message: error.message });
//         }
//     }
// });

// router.delete('/tasks/:id', async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id);
//         if (!task) return res.status(404).json({ message: 'Task not found' });
//         res.status(200).json({ message: 'Task deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// module.exports = router;
// taskRoutes.js
const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth'); // Import the authentication middleware
const router = express.Router();

// Create a new task (authenticated)
router.post('/tasks', auth, async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ 
            title, 
            description, 
            user: req.user.userId // Associate the task with the authenticated user's ID
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all tasks for the logged-in user (authenticated)
router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId }); // Find tasks linked to the authenticated user
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single task by ID (authenticated)
router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.userId }); // Find the task by ID and user
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a task (authenticated)
router.put('/tasks/:id', auth, async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId }, // Ensure the task belongs to the authenticated user
            { title, description, status, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

// Delete a task (authenticated)
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId }); // Ensure the task belongs to the authenticated user
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
