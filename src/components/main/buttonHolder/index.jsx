import { useState } from "react";
import FilterBTN from "./filterBtn";
import "./index.css";

function ButtonHolder({ isDarkTheme, handleFilterChange }) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    handleFilterChange(filter);
  };
  return (
    <>
      <div className="buttonholder-container">
        <div className="buttonholder-container_inner">
          <p
            className={`buttonholder-text ${
              isDarkTheme ? "buttonholder-text_dark" : "buttonholder-text_light"
            }`}
          >
            SHOW:
          </p>
          <div className="buttonholder-btn_container">
            <FilterBTN
              isDarkTheme={isDarkTheme}
              btnText="ALL"
              onClick={() => handleFilterClick("ALL")}
              isActive={activeFilter}
            />
            <FilterBTN
              isDarkTheme={isDarkTheme}
              btnText="COMP"
              onClick={() => handleFilterClick("COMP")}
              isActive={activeFilter}
            />
            <FilterBTN
              isDarkTheme={isDarkTheme}
              btnText="INC"
              onClick={() => handleFilterClick("INC")}
              isActive={activeFilter}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ButtonHolder;
