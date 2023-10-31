import Title from './title'
import Addtask from './addtask'
import React from 'react';

function Header  ({toggleTheme, theme, addTask, userMail, logout, userNick}) {

    return(
        <>
           <Title userNick={userNick} userMail={userMail} theme={theme}  toggleTheme={toggleTheme} logout={logout}/>
           <Addtask theme={theme} addTask={addTask}/>
        </>
    )

}

export default Header 