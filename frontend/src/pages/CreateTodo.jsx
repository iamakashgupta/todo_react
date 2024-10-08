// frontend/src/pages/CreateTodo.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/todos', { title });
    navigate('/todo');
  };

  return (
    <div className="container mx-auto p-4">
        
      <h1 className="text-2xl font-bold mb-4">Create Todo</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
        <input
          type="text"
          placeholder="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
        <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2">
          Create Todo
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
