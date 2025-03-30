const express = require("express");
const connectToDatabase = require("./config/db");
const userRouter = require("./routes/user.router");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const taskRouter = require("./routes/task.router");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
    res.render("index", { 
        title: "Welcome!", 
        message: "Hello, Deep! This is your EJS page."
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToDatabase();
});
