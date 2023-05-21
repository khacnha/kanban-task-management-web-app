import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import "../styles/Board.css";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";
import Tabs from "./Tabs"
import LeaderBoard from "./LeaderBoard/Index"


export default function Board() {
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  return (
    <div
      className={isBigScreen && isSideBarOpen ? "board open-sidebar" : "board"}
    >
      {isBigScreen && (
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      <Tabs>
        <div label="Tasks">
          <div className="tasks">
          {columns.length > 0 ? (
            <>
              {columns.map((col, index) => {
                return <Column key={index} colIndex={index} />;
              })}
              <button
                className="add-task-btn heading-M false add-column-column"
                onClick={() => {
                  setIsBoardModalOpen(true);
                }}
              >
                + New Column
              </button>
            </>
          ) : (
            <EmptyBoard type="edit" />
          )}
          </div>
        </div>
        <div label="LeaderBoard">
          <LeaderBoard id={board.id} />
        </div>
      </Tabs>

      {isBoardModalOpen && <AddEditBoardModal type="edit" setIsBoardModalOpen={setIsBoardModalOpen} />}
    </div>
  );
}
