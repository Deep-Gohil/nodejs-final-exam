const Task = require("../models/task.model");

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id; 

        if (!title || !description) {
            return res.status(400).json({ message: "Please fill all the fields", success: false });
        }

        const newTask = await Task.create({ title, description, user: userId });

        return res.status(201).json({ message: "Task created successfully", task: newTask, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Error creating task", error: error.message, success: false });
    }
};


const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        return res.status(200).json({ tasks, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tasks", error: error.message, success: false });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        if (!title && !description) {
            return res.status(400).json({ message: "Please provide either title or description", success: false });
        }
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found", success: false });
        }
        return res.status(200).json({ message: "Task updated successfully", task: updatedTask, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Error updating task", error: error.message, success: false });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found", success: false });
        }
        return res.status(200).json({ message: "Task deleted successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting task", error: error.message, success: false });
    }
}

module.exports = { createTask, getTasks, updateTask, deleteTask };