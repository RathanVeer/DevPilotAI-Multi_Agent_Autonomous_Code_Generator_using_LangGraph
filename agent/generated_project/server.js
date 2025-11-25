// server.js

// Main Express server for serving front‑end assets, handling contact form submissions,
// and providing a simple tasks API.

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();

// Enable CORS for all routes
app.use(cors());

// Set EJS as the templating engine and define the views directory.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory.
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL‑encoded bodies (as sent by HTML forms) for the contact form.
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies for the tasks API.
app.use(express.json());

// Helper functions for tasks storage
const TASKS_FILE = path.join(__dirname, 'tasks.json');

/**
 * Reads the tasks JSON file. If the file does not exist or is invalid, returns an empty array.
 * @returns {Promise<Array>} Array of task objects.
 */
async function readTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If file not found or JSON parse error, start with empty list
    return [];
  }
}

/**
 * Writes the provided tasks array to the JSON file atomically.
 * @param {Array} tasks - Array of task objects to persist.
 */
async function writeTasks(tasks) {
  const data = JSON.stringify(tasks, null, 2);
  await fs.writeFile(TASKS_FILE, data, 'utf8');
}

// ---------------------------------------------------------------------------
// Front‑end routes
// ---------------------------------------------------------------------------

// Route: GET '/' – serve the main HTML page.
app.get('/', (req, res) => {
  // The index.html file is expected to live in the "public" folder.
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route: POST '/contact' – handle form submissions.
app.post('/contact', (req, res) => {
  const { name, email } = req.body;

  // Basic validation – both fields must be present and non‑empty.
  if (!name || !email) {
    // Respond with a 400 Bad Request if validation fails.
    return res.status(400).send('Both name and email are required');
  }

  // Render the thank‑you view, passing the submitted data.
  res.render('thankyou', { name, email });
});

// ---------------------------------------------------------------------------
// Tasks API routes
// ---------------------------------------------------------------------------

// GET /api/tasks – return all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
});

// POST /api/tasks – add a new task
app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Task title is required' });
  }

  const tasks = await readTasks();
  const newTask = {
    id: Date.now().toString(),
    title,
    completed: false,
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id – toggle completed status of a task
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const tasks = await readTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  // Toggle the completed flag (or allow explicit value via body)
  if (typeof req.body.completed === 'boolean') {
    task.completed = req.body.completed;
  } else {
    task.completed = !task.completed;
  }
  await writeTasks(tasks);
  res.json(task);
});

// DELETE /api/tasks/:id – remove a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  let tasks = await readTasks();
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' });
  }
  await writeTasks(tasks);
  res.status(204).send();
});

// ---------------------------------------------------------------------------
// Server start (only when this file is run directly)
// ---------------------------------------------------------------------------

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
