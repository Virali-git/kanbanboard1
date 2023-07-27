import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, moveTask } from "./taskSlice";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TaskColumn from "./components/TaskColumn";
import { v4 as uuidv4 } from "uuid";
import MenuItem from "@mui/material/MenuItem";
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/material";
import TaskCardForm from "./components/TaskCardForm";

const KanbanBoardContainer = styled(Grid)({
  display: "flex",
  padding: "16px",
});

const Column = styled(Grid)({
  flex: 1,
  padding: "16px",
  minHeight: 200,
  backgroundColor: "#f0f0f0",
  marginRight: "16px",
});

const Task = styled(Paper)({
  marginBottom: "8px",
  padding: "8px",
  backgroundColor: "white",
  cursor: "move",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
});

const CreateTaskContainer = styled(Grid)({
  marginTop: "16px",
});

const KanbanBoard = () => {
  const tasks = useSelector((state) => state);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [taskData, setTaskData] = useState({
    taskName: "",
    priority: "low",
    dueDate: null,
  });

  console.log("@@yeh ho raha hi",taskData);
  console.log("@@tasks",tasks);
  const handleCreateTask = () => {

    if (taskData.taskName.trim() !== "" && taskData.priority.trim() !== "" ) {
      const newTask = {
        id: uuidv4(),
        name: taskData.taskName,
        state: "backlog",
        priority: taskData.priority,
        deadline: taskData.dueDate,
      };
      dispatch(addTask(newTask));
      setTaskData({
        taskName: "",
        priority: "",
        dueDate: null,
      })
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDateChange = (date) => {
    setTaskData((prevData) => ({
      ...prevData,
      dueDate: date,
    }));
  };
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
   // height: "100vh",
    width: "500px",
    margin: "0 auto",
    // gap: '16px',
    // marginBottom: '16px',
    // '@media (min-width: 600px)': {
    //   gridTemplateColumns: '1fr 1fr',
    //   gap: '32px',
    // },
  };
  const buttonStyle = {
    gridColumn: "span 2",
    margin: "10px",
  };
  return (
    <KanbanBoardContainer container>
      <TaskColumn
        ColumnTitle={"Backlog"}
        tasks={tasks}
        columnState={"backlog"}
      />
      <TaskColumn ColumnTitle={"TodoTest"} tasks={tasks} columnState={"todo"} />
      <TaskColumn
        ColumnTitle={"Ongoing"}
        tasks={tasks}
        columnState={"ongoing"}
      />
      <TaskColumn ColumnTitle={"Done"} tasks={tasks} columnState={"done"} />
      <CreateTaskContainer item xs={12}>
        <div style={containerStyle}>
          <TextField
            label="Task Name"
            name="taskName"
            value={taskData.taskName}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            sx={{ padding: "10px" }}
          />
          <TextField
            select
            label="Priority"
            name="priority"
            value={taskData.priority}
            onChange={handleInputChange}
            fullWidth
            sx={{ padding: "10px" }}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={taskData.dueDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            color="primary"
            style={buttonStyle}
            onClick={handleCreateTask}
          >
            Create Task
          </Button>
        </div>
        <TaskCardForm taskData={taskData} setTaskData={setTaskData} />

      </CreateTaskContainer>
    </KanbanBoardContainer>
  );
};

export default KanbanBoard;
