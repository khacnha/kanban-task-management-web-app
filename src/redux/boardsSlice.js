import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { boardsAPI, tasksAPI } from "../core/api";

const initialState = [];
export const getBoards = createAsyncThunk(
  "boards/get",
  async () => {
    const data = await boardsAPI.getAll();
    // add isActive and columns for each items
    const updatedData = data.map(item => ({ ...item, isActive: false }));
    return updatedData
  }
);
export const addBoard = createAsyncThunk(
  "boards/post",
  async (payload) => {
    const data = await boardsAPI.create(payload);
    return data
  }
);
export const editBoard = createAsyncThunk(
  "boards/put",
  async ({ id, payload }) => {
    const data = await boardsAPI.update(id, payload);
    return data
  }
);
export const deleteBoard = createAsyncThunk(
  "boards/delete",
  async ({ id }) => {
    await boardsAPI.delete(id);
    return { id }
  }
);
export const addTask = createAsyncThunk(
  "tasks/post",
  async (payload) => {
    console.log("tasks/post", payload)
    const data = await tasksAPI.create(payload);
    return data
  }
);
export const editTask = createAsyncThunk(
  "tasks/put",
  async ({ id, payload, old_column_id }) => {
    const data = await tasksAPI.update(id, payload);
    return {...data, old_column_id}
  }
);
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async ({ id }) => {
    await tasksAPI.delete(id);
    return { id }
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  extraReducers: {
    [getBoards.fulfilled]: (state, action) => {
      return action.payload;
    },
    [addBoard.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [editBoard.fulfilled]: (state, action) => {
      console.log("state, action", state, action)
      const index = state.findIndex(tutorial => tutorial.id === action.payload.id);
      console.log("state, action", index)
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteBoard.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [addTask.fulfilled]: (state, action) => {
      const board = state.find((board) => board.isActive);
      console.log("addTask, board",board)
      const column = board.columns.find((col) => col.id === action.payload.column_id);
      column.tasks.push(action.payload);
    },
    [editTask.fulfilled]: (state, action) => {
      console.log("state, action", action.payload)
      const {
        id,
        title,
        description,
        subtasks,
        column_id,
        old_column_id,
      } = action.payload;
      const board = state.find((board) => board.isActive);
      console.log("state, board",board)
      const column = board.columns.find((col, index) => col.id === old_column_id);
      console.log("state, column", column)
      const task = column.tasks.find((task, index) => task.id === id);
      console.log("state, task",task)
      task.title = title;
      task.description = description;
      task.subtasks = subtasks;
      task.column_id = column_id;

      if (old_column_id === column_id) return;
      column.tasks = column.tasks.filter((task, index) => task.id !== id);
      const newCol = board.columns.find((col, index) => col.id === column_id);
      newCol.tasks.push(task);
    },
    [deleteTask.fulfilled]: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const updatedColumns = board.columns.map((col) => {
        const updatedTasks = col.tasks.filter((task) => task.id !== payload.id);
        return { ...col, tasks: updatedTasks };
      });
      board.columns = updatedColumns;
    },
  },
  reducers: {
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const board = {
        name: payload.name,
        isActive,
        columns: [],
      };
      board.columns = payload.newColumns;
      state.push(board);
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      board.name = payload.name;
      board.columns = payload.newColumns;
    },
    deleteBoard: (state) => {
      const board = state.find((board) => board.isActive);
      state.splice(state.indexOf(board), 1);
    },
    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },
    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } =
        action.payload;
      const task = { title, description, subtasks, status };
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === newColIndex);
      column.tasks.push(task);
    },
    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === prevColIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);
      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;
      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
      const newCol = board.columns.find((col, index) => index === newColIndex);
      newCol.tasks.push(task);
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      const prevCol = board.columns.find((col, i) => i === prevColIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      board.columns.find((col, i) => i === colIndex).tasks.push(task);
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasks.push(task);
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
    },
  },
});

export default boardsSlice;
