import express from "express";
import Todo from "../models/todoModel.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hi there');
});

router.post('/todos', async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({
        message: 'Please send the required fields'
      });
    }

    const newTodo = {
      title: req.body.title,
      completed: req.body.completed || false
    };

    const todo = await Todo.create(newTodo);
    return res.status(201).send(todo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put('/todos/:id', async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({
        message: 'Please send the required fields'
      });
    }

    const { id } = req.params;
    const result = await Todo.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).json({ message: "Todo not found" });
    } else {
      res.json({ message: "Todo updated successfully", todo: result });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Todo not found" });
    }

    return res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).send(todos);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).send({ message: "Todo not found" });
    }
    return res.status(200).send(todo);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
