import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// connect mongodb
mongoose.connect("mongodb://localhost:27017/todoDB")
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err));

// todo-schema
const todoSchema = new mongoose.Schema({
  task: String
});
const Todo = mongoose.model("Todo", todoSchema);

// create
app.post("/add", async (req,res)=>{
  try{
    const newTodo = await Todo.create({task: req.body.task});
    res.json(newTodo);
  } catch(err){ res.status(500).json(err); }
});

// read
app.get("/get", async (req,res)=>{
  try{
    const todos = await Todo.find();
    res.json(todos);
  } catch(err){ res.status(500).json(err); }
});

// delete
app.delete("/delete/:id", async (req,res)=>{
  try{
    await Todo.findByIdAndDelete(req.params.id);
    res.json({message:"Deleted"});
  } catch(err){ res.status(500).json(err); }
});

// update
app.put("/update/:id", async (req,res)=>{
  try{
    const updated = await Todo.findByIdAndUpdate(req.params.id,{task:req.body.task},{new:true});
    res.json(updated);
  } catch(err){ res.status(500).json(err); }
});

app.listen(5000, ()=>
  console.log(`Server running on port 5000`));


