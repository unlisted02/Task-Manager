const express = require('express');
const app = express();
const port = 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Sample task data
let tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
];

// Get all tasks
app.get('/todos', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/todos', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: req.body.completed || false,
  };
  tasks.push(newTask);
  res.json(newTask);
});

// Update a task
app.put('/todos/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.title = req.body.title || task.title;
    task.completed = req.body.completed || task.completed;
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// Delete a task
app.delete('/todos/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.json({ message: 'Task deleted' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
