const express = require('express');
const router = express.Router();
const Todo = require('../models/todomodel');
const User = require('../models/usermodel');
const { json } = require('body-parser');
const mongoose = require('../connections/connection')



router.post('/todo-form', async (req, res) => {
    try {
      const { task, due } = req.body;
      
      const addedBy = req.user._id;
  
      const newTodo = new Todo({ task, due, addedBy });
      const savedTodo = await newTodo.save();
  

      const user = await User.findById(addedBy);
      user.lists.toDo.push(savedTodo);
      await user.save();
  
      res.redirect('todo-scheduler');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });




  router.post('/remove/:taskId', async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const taskId = req.params.taskId;


  
      const taskToRemove = await Todo.findById(taskId);
  
      if (!taskToRemove) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      await Todo.findByIdAndDelete(taskId);
  
      res.redirect('/todo-scheduler');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });











  router.get('/todo-scheduler', async (req, res) => {
    try {
      const todos = await Todo.find();


      const currentUser = req.user;


    console.log(currentUser);
      res.render('todo', { todos, currentUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/todo-form', (req, res) => (
    res.render('todoform')
  ))

  module.exports = router;