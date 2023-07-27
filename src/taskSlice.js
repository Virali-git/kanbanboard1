import { createSlice } from '@reduxjs/toolkit';

const initialState = [{
  id: 1,
  name: "Excerise",
  state: 'backlog',
  priority: 'high',
  deadline: '',
},
{
  id: 2,
  name: "Bretkfas",
  state: 'backlog',
  priority: 'medium',
  deadline: '',
},

];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    moveTask: (state, action) => {
      const { id, newState } = action.payload;
      const task = state.find((task) => {
        console.log("@@@task", task.id);
        console.log("@@@id", id);
        console.log("@@@newState", newState);
         return task.id == id});
      console.log("@@inside reducer", task);
      if (task) {
        task.state = newState;
      }
    },
  },
});

export const { addTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
