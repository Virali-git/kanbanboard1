// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//     </div>
//   );
// }

// export default App;



import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './taskSlice';
import KanbanBoard from './kanbanboard';
import './App.css';

const store = configureStore({
  reducer: taskSlice,
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <KanbanBoard />
      </div>
    </Provider>
  );
}

export default App;
