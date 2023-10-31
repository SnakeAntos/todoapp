import "./index.css";

function FilterBTN({isDarkTheme, btnText, onClick, isActive}) {
  const activeClass = btnText === isActive ? "filterbtn-active" : "";
  return (
    <>
      <button
        className={`filterBTN-btn ${
          isDarkTheme ? "filter_btn_dark" : "filter_btn_light"
        } ${activeClass}`}
        onClick={onClick}
      >
        {btnText}
      </button>
    </>
  );
}
export default FilterBTN;
