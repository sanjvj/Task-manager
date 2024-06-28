const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://sanjay3012:Sanjaysurya07@cluster0.pvif7.mongodb.net/task").then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },lastName : {
        type : String,
        required : true
    },password : {
        type : String,
        required : true
    }
});

const User = mongoose.model("user",userSchema);
module.exports = User;