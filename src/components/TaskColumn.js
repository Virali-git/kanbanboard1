import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

//import taskReducer from '../taskSlice'
//import taskReducer
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { addTask, moveTask } from "../taskSlice";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Task = styled(Paper)({
  marginBottom: "8px",
  padding: "8px",
  backgroundColor: "white",
  cursor: "move",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
});
const Column = styled(Grid)({
  flex: 1,
  padding: "16px",
  minHeight: 200,
  backgroundColor: "#f0f0f0",
  marginRight: "16px",
});

const TaskColumn = ({ onDropevent, ColumnTitle, tasks, columnState }) => {
  const dispatch = useDispatch();
  const handleDragStart = (event, id) => {
    console.log("@@dragStart",event, id);
    event.dataTransfer.setData("taskId", id);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event, newState) => {
    
  
    const taskId = event.dataTransfer.getData("taskId");
    console.log("@@drop",event, newState, taskId);
    dispatch(moveTask({ id:taskId, newState }));
  };
  return (
    <Column
      item
      onDrop={(event) => handleDrop(event, columnState)}
      onDragOver={handleDragOver}
    >
      <h2>{ColumnTitle}</h2>
      {tasks
        ?.filter((task) => task?.state === columnState)
        .map((task) => (
          <Task
            key={task.id}
            draggable
            onDragStart={(event) => handleDragStart(event, task.id)}
          >
            {task.name}
            {task.priority}
          </Task>
        ))}
    </Column>
  );
};

export default TaskColumn;
