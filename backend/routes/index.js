const express = require("express");

const userRouter = require("./users");
const taskRouter = require("./tasks");
const router = express.Router();

router.use("/user",userRouter);
router.use("/task",taskRouter)
module.exports = router;