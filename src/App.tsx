import { useState } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [addHovered, setAddHovered] = useState(false);
  const [clearHovered, setClearHovered] = useState(false);
  const [deleteHoveredId, setDeleteHoveredId] = useState<number | null>(null);
  const [todos, setTodos] = useState<any[]>([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const clockTime = now.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const clockDate = now.toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  function addTodo() {
    if (!text.trim()) return;
    const now = new Date();
    const createdAt = now.toLocaleString("en-US", {
      timeZone: "America/New_York",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }) + " EST";
    const item = {
      id: Date.now(),
      text,
      completed: false,
      createdAt,
    };
    setTodos((prev) => [...prev, item]);
    setText("");
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="input-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button
          type="button"
          onClick={addTodo}
          onMouseEnter={() => setAddHovered(true)}
          onMouseLeave={() => setAddHovered(false)}
          style={{
            background: addHovered
              ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
              : "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 20px",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: "pointer",
            boxShadow: addHovered
              ? "0 4px 14px rgba(99,102,241,0.6)"
              : "0 2px 8px rgba(99,102,241,0.35)",
            transform: addHovered ? "translateY(-1px)" : "translateY(0)",
            transition: "all 0.2s ease",
          }}
        >
          + Add
        </button>
        <button
          type="button"
          onClick={() => setText("")}
          onMouseEnter={() => setClearHovered(true)}
          onMouseLeave={() => setClearHovered(false)}
          style={{
            background: clearHovered
              ? "linear-gradient(135deg, #b91c1c, #dc2626)"
              : "linear-gradient(135deg, #ef4444, #f87171)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 20px",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: "pointer",
            boxShadow: clearHovered
              ? "0 4px 14px rgba(239,68,68,0.6)"
              : "0 2px 8px rgba(239,68,68,0.35)",
            transform: clearHovered ? "translateY(-1px)" : "translateY(0)",
            transition: "all 0.2s ease",
            marginLeft: "8px",
          }}
        >
          Clear
        </button>
      </div>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              {todo.text}
            </label>
            <span className="timestamp">{todo.createdAt}</span>
            <button type="button" className="delete-btn" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p className="remaining">{remaining} remaining</p>
    </div>
  );
}
