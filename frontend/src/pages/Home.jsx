// frontend/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/todos/');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="container mx-auto p-4">
        
        
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <Link to="/todo/create" className="bg-blue-500 text-white rounded-lg px-4 py-2 mb-4 inline-block">
        Create Todo
      </Link>
      <div className="bg-white shadow-md rounded-lg p-4">
        {todos.length === 0 ? (
          <p>No todos available</p>
        ) : (
          todos.map(todo => (
            <div key={todo._id} className="flex justify-between items-center border-b py-2">
              <span>{todo.title}</span>
              <div>
                <Link to={`/todo/update/${todo._id}`} className="text-yellow-500 mr-2">Update</Link>
                <Link to={`/todo/details/${todo._id}`} className="text-red-500">Delete</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
