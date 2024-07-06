const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://sanjay3012:Sanjaysurya07@cluster0.pvif7.mongodb.net/task").then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});


const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dueDate : {type:Date,required:true},
    done: { type: Boolean, default: false },
    important : {type:Boolean }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };