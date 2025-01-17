import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";

export default function Task({ taskIndex, colIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.is_completed) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData("text", JSON.stringify({ taskIndex, prevColIndex: colIndex }));
  }

  return (
    <div>
      <div
        draggable
        onDragStart={handleOnDrag}
        className="task"
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
      >
        <div>
          <p className="task-title heading-M">{task.title}</p>
          <p className="num-of-subtasks text-M">
            {completed} of {subtasks.length} subtasks
          </p>
        </div>
        {
          task.assigned ? (
            <div className="user">
              <img className="avatar" src={`https://ui-avatars.com/api/?name=${task.assigned.username}&background=efeff9&color=00C2FF`} alt={task.assigned.username} />

            </div>
          ) : null
        }
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}
