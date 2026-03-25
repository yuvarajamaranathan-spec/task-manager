// app.js — This is the entry point of your web application

const express = require('express');   // Import the Express library
const app = express();                // Create the app
const PORT = 3000;                    // Port number (like a VTAM port on mainframe)

// This line allows the app to read JSON data from incoming requests
app.use(express.json());

// --- ROUTES ---
// A "route" is like a CICS transaction — when a specific request comes in,
// run a specific piece of code.

// Route 1: Health Check — used later by AWS to confirm app is running
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'App is running!' });
});

// Route 2: Get all tasks
app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

// Route 3: Create a new task
app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    done: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Route 4: Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.json({ message: 'Task deleted successfully' });
});
// Route 5: Update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.title = req.body.title || task.title;
  task.done = req.body.done !== undefined ? req.body.done : task.done;

  res.json(task);
});
// --- IN-MEMORY DATA (like a working storage section in COBOL) ---
let tasks = [
  { id: 1, title: 'Learn Node.js', done: false },
  { id: 2, title: 'Deploy to AWS', done: false }
];

// --- START THE SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});