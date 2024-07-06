const express = require("express");
const router = express.Router();
const zod = require("zod");
const { Task } = require("../db"); // Correct import of Task model
const authMiddleware = require("../middleware");
const { findByIdAndDelete } = require("../db1");

const taskSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
});

router.get("/alltask", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find(
      { userId: req.userId },
      "title description dueDate"
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching tasks", error: error.message });
  }
});

router.get("/pending", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find(
      { userId: req.userId , done:false },
      "title description dueDate"
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching tasks", error: error.message });
  }
});
router.get("/completed", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find(
      { userId: req.userId , done:true },
      "title description dueDate"
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching tasks", error: error.message });
  }
});

router.get("/important", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find(
      { userId: req.userId , important:true },
      "title description dueDate"
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching tasks", error: error.message });
  }
});

router.get("/edit/:id",authMiddleware,async(req,res)=>{
    const task = await Task.findById(req.params.id,"title description dueDate");
    res.json(task);
})

router.put('/edit/:id', authMiddleware, async (req, res) => {
    const { title, description, dueDate } = req.body;
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { title, description, dueDate },
        { new: true } // Return the updated task
      );
      
      // If the task is not found, send a 404 response
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Send the updated task as a JSON response
      res.json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

router.get("/numberoftasks", authMiddleware, async (req, res) => {
  try {
    const totaltask = await Task.countDocuments({ userId: req.userId });
    const completedtask = await Task.countDocuments({
      userId: req.userID,
      done: true,
    });
    res.json({
      totaltask,
      completedtask,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching number of tasks", error: error.message });
  }
});

router.patch('/mark-done/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const updatedTask = await Task.findByIdAndUpdate(id, { done: true });
      res.json(updatedTask);
  } catch (err) {
      console.error('Error marking task as done:', err);
      res.status(500).json({ msg: 'Internal server error' });
  }
});
  

router.post("/newtask", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = taskSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({ msg: "Invalid inputs" });
  }
  const title = req.body.title;
  const description = req.body.description;
  const userId = req.userId;
  const dueDate = req.body.dueDate;
  const done = req.body.done;
  const important = req.body.important;
  if (title && description && userId && dueDate ) {
    try {
      const newTask = await Task.create({
        title,
        description,
        userId,
        dueDate,
        done,
        important
      });
      const taskId = newTask._id;

      res.json({ msg: "New task created successfully", taskId: taskId });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error creating new task", error: error.message });
    }
  }else{
    res.status(411).json({
        msg:"Fill all the inputs"
    })
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
