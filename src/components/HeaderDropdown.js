import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
// import darkIcon from "../assets/icon-dark-theme.svg";
// import lightIcon from "../assets/icon-light-theme.svg";
import boardsSlice from "../redux/boardsSlice";
import authSlice from "../redux/authSlice";
// import themeSlice from "../redux/themeSlice";

export default function HeaderDropdown({
  setOpenDropdown,
  setIsBoardModalOpen,
}) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  // const theme = useSelector((state) => state.theme);

  return (
    <div
      className="dropdown-container"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      <div className="dropdown-modal">
        <h3>ALL BOARDS ({boards.length})</h3>
        <div className="dropdown-boards">
          {boards.map((board, index) => {
            return (
              <div
                className={`dropdown-board ${board.isActive ? "board-active" : ""
                  }`}
                key={index}
                onClick={() => {
                  dispatch(boardsSlice.actions.setBoardActive({ index }));
                }}
              >
                <img className="filter-white" src={boardIcon} alt="board" />{" "}
                {board.name}
              </div>
            );
          })}
          <div
            className="dropdown-board dropdown-create-board-btn"
            onClick={() => {
              setIsBoardModalOpen(true);
              setOpenDropdown && setOpenDropdown((state) => !state);
            }}
          >
            <img className="filter-purple" alt="board" src={boardIcon} /> +
            Create New Board
          </div>
        </div>
        <hr className="line" />
        <div
          className="dropdown-board dropdown-create-board-btn"
          onClick={() => {
            if (window.confirm('Are you sure you want to sign out?')) {
              dispatch(authSlice.actions.logout());
            }
          }}
        >
          <svg width={24} fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"></path>
          </svg>
          Logout
        </div>

        {/* <div className="theme-toggle">
          <img src={lightIcon} alt="sun indicating light mode" />
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => dispatch(themeSlice.actions.toggleTheme())}
            />
            <span className="slider round"></span>
          </label>
          <img src={darkIcon} alt="moon indicating dark mode" />
        </div> */}
      </div>
    </div>
  );
}
