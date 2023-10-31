import "./App.css";
import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';



function App() {
  
  
  
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [filterOption, setFilterOption] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const storedUser = localStorage.getItem("user");
  const userToken = localStorage.getItem("token");
  const [taskCreationFlag, setTaskCreationFlag] = useState(false);
  const navigate = useNavigate();

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  const handleLogout = () =>{
    localStorage.clear();
    setUser(null);    
    navigate('/');
  }

  const filteredTasks = tasks.filter((task) => {
    if (Array.isArray(tasks)) {
      // Verifica si 'tasks' es un array antes de usar 'filter'
      if (filterOption === "COMP") {
        return task.is_completed;
      } else if (filterOption === "INC") {
        return !task.is_completed;
      } else {
        return true; // Mostrar todas las tareas si no hay filtro
      }
    } else {
      return [];
    }
  });

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  
  useEffect(() => {
    // Obtener la información del usuario del almacenamiento local (si está almacenada)
    const storedUser = localStorage.getItem("user");
    // Comprobar si 'storedUser' tiene un valor antes de continuar
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error al analizar el usuario JSON:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Verificar si 'user' tiene un valor antes de realizar la solicitud 'fetch'

    console.log("user", user);
    console.log("stored", storedUser);
    console.log("token", userToken);

    if (user) {
      // Realizar la solicitud GET a tu endpoint de tareas aquí
      fetch(`http://localhost:3001/allTasksForUser`, {
        headers: {
          authorization: ` ${userToken}`, // Incluye el token de autenticación
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Actualizar el estado de 'tasks' con los datos recibidos
          console.log("data del get", data);
          setTasks(data);
        })
        .catch((error) => {
          console.error("Error al obtener las tareas:", error);
        });
    }
  }, [user, taskCreationFlag]);

  const addTask = (title, priority) => {
    const newTask = { title: title, priority_id: priority };
    fetch("http://localhost:3001/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${userToken}`,
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((createdTask) => {
        setTasks([...tasks, createdTask]);
        setTaskCreationFlag(!taskCreationFlag);
      })
      .catch((error) => {
        console.error("Error al crear la tarea:", error);
      });
  };

  const deleteTask = (taskId) => {
    // Realiza una solicitud DELETE al endpoint de eliminación de tareas
    fetch(`http://localhost:3001/deletetask`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId: taskId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo eliminar la tarea");
        }
        return response.json();
      })
      .then(() => {
        // Actualiza el estado de 'tasks' después de eliminar la tarea
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        setTaskCreationFlag(!taskCreationFlag);
      })
      .catch((error) => {
        console.error("Error al eliminar la tarea:", error);
      });
  };

  return (
    <>
      <div
        className={`app-general_container ${
          isDarkTheme ? "dark_theme" : "light_theme"
        }`}
      >
        <div className="app-container_inner">
          <Header
            userMail={user ? user.email : "usermail"}
            userNick={user ? user.nick_name : "nick"}
            addTask={addTask}
            theme={isDarkTheme}
            toggleTheme={toggleTheme}
            logout={handleLogout}
          />
          <Main
            handleFilterChange={handleFilterChange}
            tasks={filteredTasks}
            theme={isDarkTheme}
            deleteTask={deleteTask}
          />
          <Footer theme={isDarkTheme} />
        </div>
      </div>
    </>
  );
}
export default App;
