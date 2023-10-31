import React, { useState } from 'react';
import Login from './login' 
import Register from './register'; 
import "./index.css"
import { MagicMotion } from "react-magic-motion";


function Landing() {
  const [showLogin, setShowLogin] = useState(true);
  

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
  };

  return (
    
    <div className='landing-container'>
       
    {showLogin ? (
      <Login navigateRegister={handleRegisterClick} />
    ) : (
      <Register navigateLogin={handleLoginClick} />
    )}
    
  </div>
  
  );
}

export default Landing;
