import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { addTask, editTask } from "../redux/boardsSlice";
import UserSelect from "../components/UserSelect";

export default function AddEditTaskModal({
  type,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigned_id, setAssignedId] = useState();
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", is_completed: false, id: uuidv4() },
    { title: "", is_completed: false, id: uuidv4() },
  ]);

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setAssignedId(task.assigned_id)
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    if (!assigned_id) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        addTask({
          title,
          description,
          subtasks,
          column_id: columns[newColIndex].id,
          assigned_id: parseInt(assigned_id),
        })
      );
    } else {
      dispatch(
        editTask({
          id: task.id,
          payload: {
            title,
            description,
            subtasks,
            taskIndex,
            column_id: columns[newColIndex].id,
            assigned_id: parseInt(assigned_id),
          },
          old_column_id: columns[prevColIndex].id,
        })
      );
    }
  };

  const assignedUser = (user_id) => {
    console.log("user_id", user_id);
    setAssignedId(user_id)
  }

  return (
    <div
      className={`modal-container ${type === "add" ? "dimmed" : ""}`}
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      <div className="modal">
        <h3>{type === "edit" ? "Edit" : "Add New"} Task</h3>
        <label htmlFor="task-name-input">Task Name</label>
        <div className="input-container">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            placeholder="e.g. Take coffee break"
            className={!isValid && !title.trim() ? "red-border" : ""}
          />
          {!isValid && !title.trim() && (
            <span className="cant-be-empty-span text-L"> Can't be empty</span>
          )}
        </div>

        <label htmlFor="task-name-input">Description</label>
        <div className="description-container">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            placeholder="e.g. It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
          />
        </div>

        <label>Subtasks</label>
        <div className="modal-columns">
          {subtasks.map((subtask, index) => {
            return (
              <div className="modal-column" key={index}>
                <div className="input-container">
                  <input
                    onChange={(e) => {
                      onChangeSubtasks(subtask.id, e.target.value);
                    }}
                    type="text"
                    value={subtask.title}
                    className={
                      !isValid && !subtask.title.trim() ? "red-border" : ""
                    }
                  />
                  {!isValid && !subtask.title.trim() ? (
                    <span className="cant-be-empty-span text-L">
                      {" "}
                      Can't be empty
                    </span>
                  ) : null}
                </div>
                <img
                  src={crossIcon}
                  alt="delete-column-icon"
                  onClick={() => {
                    onDelete(subtask.id);
                  }}
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            setSubtasks((state) => [
              ...state,
              { title: "", is_completed: false, id: uuidv4() },
            ]);
          }}
          className="add-column-btn btn-light"
        >
          + Add New Subtask
        </button>

        <UserSelect valueDefault={assigned_id} onSelected={assignedUser} />
        <div className="input-container">
          {!isValid && !assigned_id && (
            <span className="cant-be-empty-span text-L"> Can't be empty</span>
          )}
        </div>

        <div className="select-column-container">
          <label className="text-M">Current Status</label>
          <select
            className="select-status text-L"
            value={status}
            onChange={onChangeStatus}
          >
            {columns.map((col, index) => (
              <option className="status-options" key={index}>
                {col.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            const isValid = validate();
            if (isValid) {
              onSubmit(type);
              setIsAddTaskModalOpen(false);
              type === "edit" && setIsTaskModalOpen(false);
            }
          }}
          className="create-btn"
        >
          {type === "add" ? "Create Task" : "Update Task"}
        </button>
      </div>
    </div>
  );
}
