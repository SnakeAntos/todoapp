const knex = require("../db/db.js");

const TaskModel = {
  create(taskData) {
    return knex("task")
      .insert({
        title: taskData.title,
        priority_id: taskData.priority_id,
        user_id: taskData.user_id, 
      })
      .returning("*");
  },

  // Seleccionar todas las tareas para un usuario dado (user_id = 1)
  selectAllForUser(user_id) {
    return knex("task").where("user_id", user_id).select();
  },

  // Seleccionar todas las tareas completadas para un usuario dado
  selectCompletedForUser(userId) {
    return knex("task")
      .where("user_id", userId)
      .where("is_completed", true)
      .select();
  },

  // Seleccionar todas las tareas incompletas para un usuario dado
  selectIncompleteForUser(userId) {
    return knex("task")
      .where("user_id", userId)
      .where("is_completed", false)
      .select();
  },

  // Actualizar el estado de completado de una tarea
  updateTaskCompletion(taskId, completed) {
    return knex("task")
      .where("id_task", taskId)
      .update({
        is_completed: completed,
      })
      .returning("*");
  },
  deleteTaskById(taskId){
    return knex("task")
    .where('id_task', taskId)
    .del();    
  }

  
};

module.exports = TaskModel;
