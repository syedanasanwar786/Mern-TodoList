import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Todo Schema
const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Todo API is running successfully",
  });
});

// Create Todo
app.post("/add", async (req, res) => {
  try {
    const { task } = req.body;

    if (!task || !task.trim()) {
      return res.status(400).json({
        message: "Task is required",
      });
    }

    const newTodo = await Todo.create({
      task: task.trim(),
    });

    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Add todo error:", error.message);

    res.status(500).json({
      message: "Failed to add todo",
      error: error.message,
    });
  }
});

// Get All Todos
app.get("/get", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (error) {
    console.error("Get todos error:", error.message);

    res.status(500).json({
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
});

// Update Todo
app.put("/update/:id", async (req, res) => {
  try {
    const { task } = req.body;

    if (!task || !task.trim()) {
      return res.status(400).json({
        message: "Task is required",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        task: task.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Update todo error:", error.message);

    res.status(500).json({
      message: "Failed to update todo",
      error: error.message,
    });
  }
});

// Delete Todo
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error("Delete todo error:", error.message);

    res.status(500).json({
      message: "Failed to delete todo",
      error: error.message,
    });
  }
});

// Connect MongoDB and Start Server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Atlas connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });