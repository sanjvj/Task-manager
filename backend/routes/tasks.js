const express = require("express");
const router = express.Router();
const zod = require("zod");
const { Task } = require("../db");  // Correct import of Task model
const authMiddleware = require("../middleware");

const taskSchema = zod.object({
    title: zod.string(),
    description: zod.string()
});

router.get("/alltask", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId }, 'title description');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching tasks", error: error.message });
    }
});

router.post("/newtask", authMiddleware, async (req, res) => {
    const body = req.body;
    const { success } = taskSchema.safeParse(body);
    if (!success) {
        return res.status(400).json({ msg: "Invalid inputs" });
    }

    try {
        const newTask = await Task.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.userId
        });
        const taskId = newTask._id;

        res.json({ msg: "New task created successfully", taskId: taskId });
    } catch (error) {
        res.status(500).json({ msg: "Error creating new task", error: error.message });
    }
});

router.put('/update/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ _id: id, userId: req.userId });

        if (!task) {
            return res.status(404).send({ msg: 'Task not found' });
        }

        // Toggle the done status
        task.done = !task.done;

        const updatedTask = await task.save();

        res.status(200).send({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send({ message: 'Error updating task', error });
    }
});

router.delete('/delete/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.userId });
        if (!deletedTask) {
            return res.status(404).send({ msg: 'Task not found' });
        }
        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting task', error });
    }
});

module.exports = router;
