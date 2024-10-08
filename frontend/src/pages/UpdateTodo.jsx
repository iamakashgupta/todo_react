// frontend/src/pages/UpdateTodo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTodo = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState({ title: '', completed: false });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await axios.get(`http://localhost:3000/todos/${id}`);
      setTodo(response.data);
    };
    fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/todos/${id}`, todo);
    navigate('/todo');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Todo</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <input
          type="text"
          placeholder="Todo Title"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          required
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 shadow-md hover:bg-blue-700 transition duration-200 ease-in-out">
          Update Todo
        </button>
      </form>
    </div>
  );
}

export default UpdateTodo;
