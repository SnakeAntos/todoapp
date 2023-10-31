import React from "react";
import "./index.css";
import Modal from "./modal";
import { useState } from "react";
function Footer({ theme }) {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
    console.log(showModal)
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="footer-container">
        <div className="footer-inner_container">
          <button className="footer-learn-more" onClick={handleModalOpen}>
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className={`button-text ${theme? "button_dark" : "button_light"}`}>ABOUT</span>
          </button>
          {showModal && (
            <Modal show={showModal} handleClose={handleModalClose}>
              <p>
                Esta webApp fue realizada utilizando React.js, lo que implica el
                conocimiento de HTML y CSS, así como las funcionalidades otorgadas
                por React y Vite. Además, se creó un backend para la
                administración de usuarios utilizando Express, Postgresql y
                Node.js, aprovechando la capacidad de Node.js para ejecutar el
                servidor y manejar las solicitudes del cliente. Se utilizó Knex
                para facilitar la comunicación entre el backend y la base de
                datos.
              </p>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}

export default Footer;
