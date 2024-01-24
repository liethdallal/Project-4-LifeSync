const express = require('express')
const router = express.Router()
const toDoController = require('../controllers/todocontroller')

router.post('/todo-form', toDoController.postTask)

router.post('/remove/:taskId', toDoController.deleteTask)

router.post('/edit/:taskId', toDoController.updateTask)

router.get('/editform/:taskId', toDoController.displayEditToDoForm)

router.get('/todo-form', toDoController.displayToDoForm)

router.get('/todo-scheduler', toDoController.displayToDoPage)

module.exports = router