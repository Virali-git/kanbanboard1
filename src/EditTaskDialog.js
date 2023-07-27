import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EditTaskDialog = ({ open, onClose, taskName, onTaskNameChange, onSave }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task Name</DialogTitle>
      <DialogContent>
        <TextField
          label="Task Name"
          value={taskName}
          onChange={(e) => onTaskNameChange(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
