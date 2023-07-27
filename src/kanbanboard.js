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

import TaskCardForm from "./components/TaskCardForm";

const KanbanBoardContainer = styled(Grid)({
  display: "flex",
  padding: "16px",
});




const CreateTaskContainer = styled(Grid)({
  marginTop: "16px",
});

const KanbanBoard = () => {
  const tasks = useSelector((state) => state);
  const dispatch = useDispatch();
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
        <TaskCardForm taskData={taskData} setTaskData={setTaskData} />

      </CreateTaskContainer>
    </KanbanBoardContainer>
  );
};

export default KanbanBoard;
