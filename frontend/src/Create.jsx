import axios from "axios";
import { useEffect } from "react";

function Create({ setlistOfTask, editId, setEditId, editTask, setEditTask }) {
  const GetData = () => {
    axios.get("https://mern-todolist-backend.vercel.app/get")
      .then(res => setlistOfTask(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    GetData();
  }, []);

  const handleSubmit = () => {
    if (!editTask) return;

    // update
    if (editId) {
      axios.put(`https://mern-todolist-backend.vercel.app/update/${editId}`, { task: editTask })
        .then(res => {
          setlistOfTask(prev =>
            prev.map(todo => (todo._id === editId ? res.data : todo))
          );
          setEditId(null);
          setEditTask("");
        });
    }
    // add
    else {
      axios.post("https://mern-todolist-backend.vercel.app/add", { task: editTask })
        .then(() => {
          setEditTask("");
          GetData();
        });
    }
  };

  return (
    <div className="Create_form">
      <input
        type="text"
        placeholder="Add your task"
        value={editTask}
        onChange={(e) => setEditTask(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {editId ? "Save" : "Add"}
      </button>
    </div>
  );
}

export default Create;
