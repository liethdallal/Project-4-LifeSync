const Todo = require('../models/todomodel')
const User = require('../models/usermodel')

//creates new task and pushes on users todo list and collections of todos
async function postTask(req, res) {
    try {
      const { task, due } = req.body 
      const addedBy = req.user._id  
      const newTodo = new Todo({ task, due, addedBy })
      const savedTodo = await newTodo.save()
      const user = await User.findById(addedBy)
      user.lists.toDo.push(savedTodo)
      await user.save()
      res.redirect('/todos')

    }  catch (error) {
      res.render('error')
    }
  }

  //updates the current task by grabbing the values of a selcted task 
  async function updateTask(req, res) {
    try {
      const taskId = req.params.taskId
      const { task, due } = req.body
      await Todo.findByIdAndUpdate(taskId, { task, due })
      res.redirect('/todos')

    }  catch (error) {
      res.render('error')
    }
  }

  //deletes a task by its id from users list and colection 
  async function deleteTask(req, res) {
    try {
      const taskId = req.params.taskId
      const userTasks = req.user.lists.toDo
      const taskIndex = userTasks.findIndex(task => task._id === taskId)
      await Todo.findByIdAndDelete(taskId)
      userTasks.splice(taskIndex, 1)
      await req.user.save()
      res.redirect('/todos')

    }  catch (error) {
      res.render('error')
    }
  }


  //displays the todo scheduler page while passing the todos and the user signed in 
  async function displayToDoPage(req, res) {
    try {
      const todos = await Todo.find()
      const currentUser = req.user
      res.render('todo', { todos, currentUser })

    }  catch (error) {
      res.render('error')
    }
  }

  //displays the edit form with the value of a specific taskid 
  async function displayEditToDoForm(req,res){
    try {
      const taskId = req.params.taskId 
      const todo = await Todo.findById(taskId)
      res.render('edittodoform', {todo, taskId})

    }  catch (error) {
      res.render('error')
    }
  }

//displays the ost route for a task and its due date
function displayToDoForm(req, res){
  res.render('todoform')
}


module.exports = {postTask, deleteTask, displayToDoPage, displayToDoForm, displayEditToDoForm, updateTask}