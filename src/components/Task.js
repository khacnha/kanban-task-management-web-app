import React from "react";

export default function Task({ task }) {
  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  return (
    <div className="task">
      <p className="task-name">{task.title}</p>
      <p className="num-of-subtasks">
        {completed} of {subtasks.length} subtasks
      </p>
    </div>
  );
}
