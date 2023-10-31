import "./index.css";
function Title({ toggleTheme, theme, logout, userNick }) {
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className="title-container">
        <div className="title-inner_container">
          <div>
            <h1
              className={`title-h1 ${
                theme ? "title-h1_dark" : "title-h1_light"
              }`}
            >
              BIENVENIDO
            </h1>
            <p
              className={`title-h1 ${
                theme ? "title-h1_dark" : "title-h1_light"
              } title-user_p`}
            >
              {userNick}
            </p>
          </div>
          <div className="title-bottom_menu">
            {/* Theme switch */}
            <label class="ui-switch">
              <input type="checkbox" onClick={toggleTheme} />
              <div class="slider">
                <div class="circle"></div>
              </div>
            </label>
             {/* logout btn */}
            <button class="title-logout_Btn" onClick={handleLogout}>
              <div class="title-logout_sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div class="title-logout_text">Logout</div>
            </button>
            {/* <button
              onClick={handleLogout}
              className={`title-exit ${
                theme ? "title-exit_dark" : "title-exit_light"
              }`}
            ></button> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default Title;
