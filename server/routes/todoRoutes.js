const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const bodyParser = require("body-parser");
const createTaskValidator = require('../validators/taskValidator');
const authTokenValidator = require('../authMid/jwtAuth')


router.get('/');
router.post('/create', authTokenValidator, createTaskValidator.createTaskValidation, todoController.createTask);
router.put('/changeTaskState', todoController.checkUncheckTask);
router.get('/allTasksForUser', authTokenValidator, todoController.getAllTasksForUser);
router.get('/completedTasksForUser/:id', todoController.getCompletedTasksForUser);
router.delete('/deletetask', todoController.deleteTaskById);

 

module.exports = router;