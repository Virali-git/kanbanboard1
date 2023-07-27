import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, moveTask } from "../taskSlice";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { v4 as uuidv4 } from "uuid";
import MenuItem from "@mui/material/MenuItem";
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/material";


const CreateTaskContainer = styled(Grid)({
    marginTop: "16px",
  });
  const buttonStyle = {
    gridColumn: "span 2",
    margin: "10px",
  };
const TaskCardForm = ({taskData, setTaskData}) => {
   // const { data, index } = props;
    const dispatch = useDispatch();
   // const allStages = useSelector(stagesSelector);
    const priorityStyle = (priority) => {
        switch (priority) {
            case "low":
                return "success.dark";
            case "medium":
                return "warning.dark";
            default:
                return "error.dark";
        }
    };
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "500px",
        margin: "0 auto",
        // gap: '16px',
        // marginBottom: '16px',
        // '@media (min-width: 600px)': {
        //   gridTemplateColumns: '1fr 1fr',
        //   gap: '32px',
        // },
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
    const handleCreateTask = () => {

        if (taskData.taskName.trim() !== "" && taskData.priority.trim() !== "" ) {
          const newTask = {
            id: uuidv4(),
            name: taskData.taskName,
            state: "backlog",
            priority: taskData.priority,
            deadline: taskData.dueDate
          };
          dispatch(addTask(newTask));
          setTaskData({
            taskName: "",
            priority: "",
            dueDate: null,
          })
        }
      };


    //   <CustomDialog>
    //   <DialogTitle id="alert-dialog-title">Remove Ticket</DialogTitle>
    //   <DialogContent>
    //     <DialogContentText id="alert-dialog-description">
    //       Are you sure you want to delete?
    //     </DialogContentText>
    //   </DialogContent>
    //   <DialogActions>
    //     <Button variant="contained" onClick={deleteHandler} autoFocus>
    //       Yes
    //     </Button>
    //     <Button
    //       variant="outlined"
    //       onClick={() => dispatch(handleDialogClose())}
    //       autoFocus
    //     >
    //       No
    //     </Button>
    //   </DialogActions>
    // </CustomDialog>
    return (
      <>
      
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
      </CreateTaskContainer>
      </>
     
        
    );


};

//   TicketCard.propTypes = {
//     data: PropTypes.object.isRequired,
//   };

export default TaskCardForm