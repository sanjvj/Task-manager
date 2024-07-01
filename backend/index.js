const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();

const mainRouter = require("./routes/index");

app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'your_secret_key', // Replace with your actual secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using https
}));

app.use("/api/v1", mainRouter);

app.listen(3000, () => {
    console.log("Port listening on 3000");
});
