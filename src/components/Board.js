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

const leaderboard = [
  {
    rank: "1st",
    name: "John",
    avatar: "https://i.pravatar.cc/150?img=1",
    totalTasks: 20,
    totalCompleted: 15,
    successRate: 100
  },
  {
    rank: "2nd",
    name: "Jane",
    avatar: "https://i.pravatar.cc/150?img=2",
    totalTasks: 10,
    totalCompleted: 8,
    successRate: 100
  },
  {
    rank: "3rd",
    name: "Bob",
    avatar: "https://i.pravatar.cc/150?img=3",
    totalTasks: 15,
    totalCompleted: 12,
    successRate: 90
  },
  {
    rank: "4th",
    name: "Bob",
    avatar: "https://i.pravatar.cc/150?img=4",
    totalTasks: 15,
    totalCompleted: 12,
    successRate: 80
  },
  {
    rank: "5th",
    name: "Bob",
    avatar: "https://i.pravatar.cc/150?img=5",
    totalTasks: 15,
    totalCompleted: 12,
    successRate: 70
  },
  {
    rank: "6th",
    name: "Bob",
    avatar: "https://i.pravatar.cc/150?img=6",
    totalTasks: 15,
    totalCompleted: 12,
    successRate: 70
  },
  {
    rank: "7th",
    name: "Bob",
    avatar: "https://i.pravatar.cc/150?img=7",
    totalTasks: 15,
    totalCompleted: 12,
    successRate: 70
  },
  {
    rank: "8th",
    name: "Bob",
    avatar: "https://i.pravatar.cc/150?img=8",
    totalTasks: 15,
    totalCompleted: 12,
    successRate: 70
  },
  {
    rank: "9th",
    name: "Bob",
    avatar: "https://i.pravatar.cc/150?img=9",
    totalTasks: 15,
    totalCompleted: 12,
    successRate: 70
  },
  {
    rank: "10th",
    name: "Bob",
    avatar: "https://i.pravatar.cc/150?img=10",
    totalTasks: 15,
    totalCompleted: 12,
    successRate: 70
  },
];

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
          <LeaderBoard data={leaderboard} />
        </div>
      </Tabs>

      {isBoardModalOpen && <AddEditBoardModal type="edit" setIsBoardModalOpen={setIsBoardModalOpen} />}
    </div>
  );
}
