import { useState } from "react";
import Create from "./Create";
import Home from "./Home";

function App() {
  const [listOfTask, setlistOfTask] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  return (
    <div className="Home">
      <h1>Todo App</h1>

      <Create
        setlistOfTask={setlistOfTask}
        editId={editId}
        setEditId={setEditId}
        editTask={editTask}
        setEditTask={setEditTask}
      />

      <Home
        listOfTask={listOfTask}
        setlistOfTask={setlistOfTask}
        editId={editId}
        setEditId={setEditId}
        editTask={editTask}
        setEditTask={setEditTask}
      />
    </div>
  );
}

export default App;



