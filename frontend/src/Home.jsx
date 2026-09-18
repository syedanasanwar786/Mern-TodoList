import axios from "axios";

function Home({ listOfTask, setlistOfTask, editId, setEditId, setEditTask }) {

  const deleteTodo = (id) => {
    if (editId) {
      alert("You cant delete task while editing");
      return;
    }

    axios.delete(`https://mern-todolist-backend.vercel.app/delete/${id}`)
      .then(() => {
        setlistOfTask(prev => prev.filter(todo => todo._id !== id));
      });
  };

  // edit & delete
  return (
    <div>
      {listOfTask.length === 0 ? <h3 style={{ color: "white" }}>No Tasks</h3> :
        listOfTask.map(todo => (
          <div className="todo" key={todo._id}>
            <p style={{ margin: 0, color: "white" }}>{todo.task}</p>

            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={() => {
                setEditId(todo._id);
                setEditTask(todo.task);
              }}>
                Edit
              </button>

              <button onClick={() => deleteTodo(todo._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Home;
