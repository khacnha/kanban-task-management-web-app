import React from "react";
import { useSelector } from "react-redux";
import "../styles/Board.css";
import AddEditBoardModal from "./AddEditBoardModal";
import AddTaskModal from "./AddTaskModal";
import Column from "./Column";

export default function Board() {
  const modalsState = useSelector((state) => state.openModals);
  const openBoardModal = modalsState.openBoardModal;
  const openTaskModal = modalsState.openTaskModal;

  const boards = useSelector((state) => state.boards);
  const board = boards[0];
  const columns = board.columns;

  return (
    <div className={`board ${board.columns.length > 0 ? '' : "board-empty"}`}>
      {columns.length > 0 ? (
        columns.map((col, index) => {
          return (
            <Column col={col} key={index} />
          );
        })
      ) : (
        <>
          <h3 className="board-empty-text">
            This board is empty. Create a new column to get started.
          </h3>
          <button className="add-column-btn">+ Add New Column</button>
        </>
      )}

      {openBoardModal ? <AddEditBoardModal /> : null}
      {openTaskModal.isOpen ? <AddTaskModal /> : null}
    </div>
  );
}
