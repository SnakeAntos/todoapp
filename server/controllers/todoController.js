const TaskModel = require('../models/taskModel');
const bodyParser = require("body-parser");

exports.createTask = async (req, res) => {
  try {
    const { title, priority_id } = req.body; // Suponiendo que los datos vienen en el cuerpo de la solicitud
    const user_id = req.user.id_user
    // Llama a la función create del modelo para crear la tarea
    const createdTask = await TaskModel.create({
      title: title,
      priority_id: priority_id,
      user_id: user_id,
    });
   
    // Envía una respuesta con la tarea creada en formato JSON
    res.status(201).json(createdTask);
  } catch (error) {
    // Maneja los errores
    console.error(error);
    res.status(500).json({ error: "No se pudo crear la tarea" });
  }
};
// Controlador para obtener todas las tareas para un usuario dado
exports.getAllTasksForUser = async (req, res) => {
  try {
    const id_user = req.user.id_user; 
    // Llama a la función selectAllForUser del modelo para obtener todas las tareas para el usuario
    const tasks = await TaskModel.selectAllForUser(id_user);

    // Envía una respuesta con las tareas en formato JSON
    console.log("tareas", tasks)
    res.status(200).json(tasks);
  } catch (error) {
    // Maneja los errores
    console.error(error);
    res.status(500).json({ error: "No se pudieron obtener las tareas" });
  }
};

// Controlador para obtener todas las tareas completadas para un usuario dado
exports.getCompletedTasksForUser = async (req, res) => {
  try {
    const userId = req.params.id; // Supongamos que el usuario tiene un ID de 1

    // Llama a la función selectCompletedForUser del modelo para obtener las tareas completadas para el usuario
    const completedTasks = await TaskModel.selectCompletedForUser(userId);
    
    // Envía una respuesta con las tareas completadas en formato JSON
    res.status(200).json(completedTasks);
  } catch (error) {
    // Maneja los errores
    console.error(error);
    res
      .status(500)
      .json({ error: "No se pudieron obtener las tareas completadas" });
  }
};

// Controlador para obtener todas las tareas incompletas para un usuario dado
exports.getIncompleteTasksForUser = async (req, res) => {
  try {
    const userId = 1; // Supongamos que el usuario tiene un ID de 1

    // Llama a la función selectIncompleteForUser del modelo para obtener las tareas incompletas para el usuario
    const incompleteTasks = await TaskModel.selectIncompleteForUser(userId);

    // Envía una respuesta con las tareas incompletas en formato JSON
    res.status(200).json(incompleteTasks);
  } catch (error) {
    // Maneja los errores
    console.error(error);
    res
      .status(500)
      .json({ error: "No se pudieron obtener las tareas incompletas" });
  }
};

exports.checkUncheckTask = async (req,res) =>{
  try{
    const taskId = req.body.taskId;
    const completed = req.body.completed;
    const updatedTask = await TaskModel.updateTaskCompletion(taskId, completed)
    console.log(updatedTask)
    res.status(200).json(updatedTask);
  }
  catch(error){console.error(error); res.status(500).json({error: "No se pudo cambiar el estado de la tarea"})}
}

exports.deleteTaskById = async (req,res) =>{
  try{
    const taskId = req.body.taskId;
    await TaskModel.deleteTaskById(taskId);
    res.status(200).json({message: 'Tarea eliminada con exito'})    

  }
  catch(error){console.error(error); res.status(500).json({error: 'No se pudo borrar la tarea'})}
}


