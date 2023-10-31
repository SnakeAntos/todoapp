import "./index.css";
import { useEffect, useState } from "react";

function Task({ text, deleteTask, tasks, theme }) {
  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };
  
  const [priorityVisualClass, setPriorityVisualClass] = useState("")
  const [completed, setCompleted] = useState(tasks.is_completed);
  const priorityDetector = () =>{    
    if(tasks.priority_id === 1){
      setPriorityVisualClass ("task-priorityIndicator_low")
    }
    else if(tasks.priority_id === 2){
      setPriorityVisualClass ("task-priorityIndicator_medium")
    }
    else if(tasks.priority_id === 3){
      setPriorityVisualClass ("task-priorityIndicator_high")
    }
    
  }

  useEffect(() => {
    priorityDetector();
    setCompleted(tasks.is_completed);
  }, [tasks.is_completed, tasks.priority_id]);
  const completedText = completed ? "completada" : "incompleta";
  const handleCompleteTasks = () => {
    if (completed === true) {
      fetch(`http://localhost:3001/changeTaskState`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: tasks.id_task, completed: false }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("No se pudo actualizar estado");
          }
          return response.json();
        })
        .then(() => {
          setCompleted(false);
        })
        .catch((error) => {
          console.error("Error al cambiar el estado de la tarea:", error);
        });
    } else {
      fetch(`http://localhost:3001/changeTaskState`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: tasks.id_task, completed: true }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("No se pudo actualizar estado");
          }
          return response.json();
        })
        .then(() => {
          setCompleted(true);
        })
        .catch((error) => {
          console.error("Error al cambiar el estado de la tarea:", error);
        });
    }
  };

  return (
    <>
      <div className="task-container">
        <div className="task-container_inner">
          <div className={`task-priorty_circle ${priorityVisualClass}`}></div>
          <p
            className={`task-text ${
              theme ? "task-text_dark" : "task-text_light"
            }`}
          >
            {text}
          </p>
          
          <label className="checkbox-container">
            <input onClick={handleCompleteTasks} checked={completed} className="custom-checkbox" type="checkbox" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="task-erase_btn_container">
          <button
            class={`task-delete_btn ${theme ? "task-delete_btn_dark" : ""}`}
            onClick={() => handleDeleteTask(tasks.id_task)}
          >
            <svg
              viewBox="0 0 15 17.5"
              height="17.5"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
            >
              <path
                transform="translate(-2.5 -1.25)"
                d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                id="Fill"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
export default Task;
