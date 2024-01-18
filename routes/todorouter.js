const express = require('express');
const router = express.Router();
const toDoController = require('../controllers/todocontroller')

router.post('/todo-form', toDoController.postTask);


router.post('/remove/:taskId', toDoController.deleteTask)



router.get('/todo-scheduler', toDoController.displayToDoPage)


router.get('/todo-form', toDoController.displayToDoForm)

module.exports = router;