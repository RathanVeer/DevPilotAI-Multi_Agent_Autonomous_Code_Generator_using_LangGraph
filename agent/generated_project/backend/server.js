// backend/server.js

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In‑memory task store
let tasks = [];
let nextId = 1;

// CRUD API
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { text } = req.body;
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Task text is required' });
  }
  const task = { id: nextId++, text: text.trim(), completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { completed } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed flag must be boolean' });
  }
  task.completed = completed;
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const [removed] = tasks.splice(index, 1);
  res.json(removed);
});

// Serve static frontend files
const staticPath = path.join(__dirname, '..', 'frontend', 'build');
app.use(express.static(staticPath));

// Fallback for SPA routing – serve index.html for any non‑API request
app.get('*', (req, res) => {
  // If the request starts with /api, let it fall through (should be 404)
  if (req.path.startsWith('/api')) {
    return res.status(404).send('Not found');
  }
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
