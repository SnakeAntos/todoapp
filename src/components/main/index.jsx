import ButtonHolder from "./buttonHolder";
import Task from "./task";
import "./index.css";
import { MagicMotion } from "react-magic-motion";

function Main({ theme, tasks, deleteTask, handleFilterChange }) {
  return (
    <>
      <div className="main-container">
        <div className="main-container_inner">
          <ButtonHolder
            isDarkTheme={theme}
            handleFilterChange={handleFilterChange}
          />
          <div
            className={`main-task_container ${
              theme ? "main-task_container_light" : "main-task_container_dark"
            }`}
          >
            {tasks.map((tasks, index) => (
              <MagicMotion>
                <Task
                  tasks={tasks}
                  key={index}
                  text={tasks.title}
                  completed={tasks.completed}
                  deleteTask={deleteTask}
                  theme={theme}
                />
              </MagicMotion>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;
