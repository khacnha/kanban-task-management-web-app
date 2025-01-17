import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSubtask } from "../redux/boardsSlice";

export default function Subtask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const subtask = task.subtasks.find((subtask, i) => i === index);
  const checked = subtask.is_completed;

  const onChange = (e) => {
    dispatch(
      editSubtask({ id: subtask.id, payload: {is_completed: !checked}, taskIndex, colIndex })
    );
  };

  return (
    <div className="subtask">
      <input
        className="subtask-checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={`subtask-text text-M ${checked && "checked"}`}>
        {subtask.title}
      </p>
    </div>
  );
}
