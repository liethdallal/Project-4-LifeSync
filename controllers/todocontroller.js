const Todo = require('../models/todomodel');
const User = require('../models/usermodel');



async function postTask(req, res) {
    try {
      const { task, due } = req.body; 
      const addedBy = req.user._id;
  
      const newTodo = new Todo({ task, due, addedBy });
      const savedTodo = await newTodo.save();
  

      const user = await User.findById(addedBy);
      user.lists.toDo.push(savedTodo);
      await user.save();
  
      res.redirect('/todos/todo-scheduler');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };




  async function deleteTask(req, res) {
    try {

  
      const taskId = req.params.taskId;

      const userTasks = req.user.lists.toDo;

      const taskIndex = userTasks.findIndex(task => task._id === taskId);

      
  
      await Todo.findByIdAndDelete(taskId);

      userTasks.splice(taskIndex, 1);

      await req.user.save();
  

      res.redirect('/todos/todo-scheduler');

      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



  async function displayToDoPage(req, res) {
    try {
      const todos = await Todo.find();


      const currentUser = req.user;


      res.render('todo', { todos, currentUser });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


function displayToDoForm(req, res){
  res.render('todoform')
}


module.exports = {postTask, deleteTask, displayToDoPage, displayToDoForm};