import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import todoImage from "../image/todo.png"

const TodoList = () => {
  // State variables
  const [tasks, setTasks] = useState([]); // Holds the list of tasks
  const [inputValue, setInputValue] = useState(''); // Holds the value of the input field
  const [filter, setFilter] = useState('all'); // Holds the current filter type
  const [isLoading, setIsLoading] = useState(true); // Indicates whether the data is being loaded
  const [editTaskId, setEditTaskId] = useState(null); // Holds the ID of the task being edited

  // Fetch initial data
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch todos from an API
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      const todos = await response.json();
      setTasks(todos);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching todos:', error);
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Add a new task
  const handleAddTask = async () => {
    if (inputValue.trim() === '') {
      return;
    }

    const newTask = {
      title: inputValue,
      completed: false
    };

    try {
      const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const addedTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setInputValue('');
      toast.success('Task added successfully');
    } catch (error) {
      console.log('Error adding task:', error);
      toast.error('Error adding task');
    }
  };

  // Handle checkbox change for a task
  const handleTaskCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
const handleDeleteTask = async (taskId) => {
  try {
    // Make a DELETE request to the API to remove the task from the database
    const response = await fetch(`http://localhost:5000/todos/${taskId}`, {
      method: 'DELETE',
    });

    // Check if the response was successful
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    // Update the local state to remove the deleted task
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    toast.success('Task deleted successfully');
  } catch (error) {
    console.log('Error deleting task:', error);
    toast.error('Error deleting task');
  }
};


  // Edit a task
  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setInputValue(taskToEdit.title);
  };

  // Update a task
  const handleUpdateTask = async () => {
    if (inputValue.trim() === '' || !editTaskId) {
      return;
    }
  
    // Find the task you're editing to retain its completed status
    const taskToEdit = tasks.find(task => task.id === editTaskId);
  
    if (!taskToEdit) {
      console.log('Task to edit not found');
      return;
    }
  
    const updatedTask = {
      title: inputValue,
      completed: taskToEdit.completed // Retain the current completion status
    };
  
    try {
      // Make sure the URL is properly formatted
      const response = await fetch(`http://localhost:5000/todos/${editTaskId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTask),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
  
      const updatedTaskData = await response.json();
      
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId ? { ...task, title: updatedTaskData.title, completed: updatedTaskData.completed } : task
        )
      );
  
      setInputValue('');
      setEditTaskId(null);
      toast.success('Task updated successfully');
    } catch (error) {
      console.log('Error updating task:', error);
      toast.error('Error updating task');
    }
  };
  

  // Mark all tasks as completed
  const handleCompleteAll = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, completed: true }))
    );
  };

 // Clear completed tasks
const handleClearCompleted = async () => {
  const completedTasks = tasks.filter((task) => task.completed);

  for (const task of completedTasks) {
    try {
      const response = await fetch(`http://localhost:5000/todos/${task.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task with ID: ${task.id}`);
      }
    } catch (error) {
      console.log('Error deleting task:', error);
      toast.error(`Failed to delete task: ${task.title}`);
    }
  }

  setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  toast.success('Completed tasks cleared successfully');
};


  // Handle filter change
  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'uncompleted') {
      return !task.completed;
    }
    return true;
  });

  // Display loading message while data is being fetched
  if (isLoading) {
    return <div>Loading, please wait..</div>;
  }

  // Render the todo list
  return (
    <div className="container">
      <ToastContainer />
      <div className="todo-app">
        <h2>
        <img src={todoImage} alt="todo-image" /> Task List
        </h2>
        <div className="row">
          <i className="fas fa-list-check"></i>
          <input
            type="text"
            className="add-task"
            id="add"
            placeholder="Add your task"
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
          />
          <button id="btn" onClick={editTaskId ? handleUpdateTask : handleAddTask}>
            {editTaskId ? 'Update' : 'Add'}
          </button>
        </div>

        <div className="mid">
          <i className="fas fa-check-double"></i>
          <p id="complete-all" nClick={handleCompleteAll}>
            Complete all tasks
          </p>
          <p id="clear-all" onClick={handleClearCompleted}>
            Delete comp tasks
          </p>
        </div>

        <ul id="list">
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                id={`task-${task.id}`}
                data-id={task.id}
                className="custom-checkbox"
                checked={task.completed}
                onChange={() => handleTaskCheckboxChange(task.id)}
              />
              <label htmlFor={`task-${task.id}`}>{task.title}</label>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                  className="edit"
                  data-id={task.id}
                  onClick={() => handleEditTask(task.id)}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png"
                  className="delete"
                  data-id={task.id}
                  onClick={() => handleDeleteTask(task.id)}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="filters">
          <div className="dropdown">
            <button className="dropbtn">Filter</button>
            <div className="dropdown-content">
              <a href="#" id="all" onClick={() => handleFilterChange('all')}>
                All
              </a>
              <a href="#" id="rem" onClick={() => handleFilterChange('uncompleted')}>
                Uncompleted
              </a>
              <a href="#" id="com" onClick={() => handleFilterChange('completed')}>
                Completed
              </a>
            </div>
          </div>

          <div className="completed-task">
            <p>
              Completed: <span id="c-count">{tasks.filter((task) => task.completed).length}</span>
            </p>
          </div>
          <div className="remaining-task">
            <p>
              <span id="total-tasks">
                Total Tasks: <span id="tasks-counter">{tasks.length}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
