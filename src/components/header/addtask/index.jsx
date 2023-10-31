import "./index.css";
import React, { useState } from "react";

function Addtask({ addTask, theme }) {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState(1);

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      addTask(taskText, priority);
      setTaskText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  return (
    <>
      <div className="addtask-container">
        <div className="addtask-inner_container">
          <input
            className="addtask-input"
            type="text"
            value={taskText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          ></input>
          <button onClick={handleAddTask} className="addtask-button">
            <span className="addtask-button__text">ADD</span>
            <span className="addtask-button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="currentColor"
                height="24"
                fill="none"
                class="svg"
              >
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div>
        <div className={`addtask-select_container`}>
          <div className={`addtask-radio-input ${theme? 'addtask-radio_input_dark' : "addtask-radio_input_light"}`}>
            <label>
              <input
                value={1}
                name="value-radio"
                id="1"
                type="radio"
                onChange={handlePriorityChange}
              />
              <span>baja</span>
            </label>
            <label>
              <input
                value={2}
                name="value-radio"
                id="value-2"
                type="radio"
                onChange={handlePriorityChange}
              />
              <span>media</span>
            </label>
            <label>
              <input
                value={3}
                name="value-radio"
                id="value-3"
                type="radio"
                onChange={handlePriorityChange}
              />
              <span>alta</span>
            </label>
            <span class="selection"></span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Addtask;
