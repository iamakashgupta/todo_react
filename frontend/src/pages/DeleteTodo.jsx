// frontend/src/pages/DeleteTodo.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteTodo = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todos/${id}`);
        setTodo(response.data);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      alert('Todo deleted successfully');
      navigate('/todo'); // Redirect to the home page after deletion
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCancel = () => {
    navigate('/todo'); // Redirect back to the home page if canceled
  };

  if (!todo) {
    return <div>Loading...</div>; // Display loading state until todo is fetched
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Todo</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="font-semibold text-lg">Are you sure you want to delete this todo?</h2>
        <p className="mt-2">Title: <span className="font-medium">{todo.title}</span></p>
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white rounded-lg px-6 py-3 shadow-md hover:bg-red-700 transition duration-200 ease-in-out"
          >
            Yes, Delete
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-black rounded-lg px-6 py-3 shadow-md hover:bg-gray-400 transition duration-200 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTodo;
