// server.js
const express = require('express');
const { addTask, getTaskById } = require('./taskService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mock database state
let tasks = [
    { id: 1, title: 'Setup GitHub Pipeline', priority: 'High', completed: true },
    { id: 2, title: 'Deploy Web App to Render', priority: 'High', completed: false }
];

// Base Route (Render health check isi se pass hogi)
app.get('/', (req, res) => {
    res.json({ 
        status: "Success",
        message: "Task Service Manager API is successfully running live!",
        student: "Ahmed Faraz (FA23-BSE-008)",
        totalTasks: tasks.length 
    });
});

// API Endpoint to get task by ID
app.get('/tasks/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = getTaskById(tasks, id);
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});