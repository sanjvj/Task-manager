const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://sanjay3012:Sanjaysurya07@cluster0.pvif7.mongodb.net/task").then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});




const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    done : {
        type : Boolean,
        default : false
    }
})


const Task = mongoose.model("tasks",taskSchema)
module.exports = Task;