const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth'); 
const router = express.Router();

router.post('/tasks', auth, async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(title , 'titlte');
        const task = new Task({
            title,
            description,
            user: req.user.userId, 
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/tasks', auth, async (req, res) => {
    try {
        
        const tasks = await Task.find({ user: req.user.userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.userId }); 
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/tasks/:id', auth, async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId }, 
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

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId }); 
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
