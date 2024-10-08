import React from 'react';
import { Route, Routes } from "react-router-dom";
import CreateTodo from './pages/CreateTodo';
import DeleteTodo from './pages/DeleteTodo';
import UpdateTodo from './pages/UpdateTodo';
import Home from './pages/Home';

const App = () => {
  return (
    
    <Routes>
      
      <Route path='/todo' element={<Home />} />
      <Route path='/todo/create' element={<CreateTodo />} />
      <Route path='/todo/details/:id' element={<DeleteTodo />} /> 
      <Route path='/todo/update/:id' element={<UpdateTodo />} />  
    </Routes>
  );
}

export default App;
