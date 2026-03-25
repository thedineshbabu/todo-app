import { useState, useEffect } from "react";
import "./App.css";
import Calculator from "./components/Calculator";

export default function App() {
  const [text, setText] = useState("");
  const [addHovered, setAddHovered] = useState(false);
  const [clearHovered, setClearHovered] = useState(false);
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
    <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", maxWidth: "900px", margin: "40px auto", padding: "0 16px" }}>
      {/* Main todo panel */}
      <div className="container" style={{ flex: 1, margin: 0 }}>
      <h1>Todo App</h1>
      <div style={{ textAlign: "center", marginBottom: "16px", color: "#6366f1" }}>
        <div style={{ fontSize: "1.8rem", fontWeight: 700, letterSpacing: "0.05em" }}>{clockTime}</div>
        <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>{clockDate}</div>
      </div>
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
              ? "linear-gradient(135deg, #15803d, #16a34a)"
              : "linear-gradient(135deg, #22c55e, #16a34a)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 20px",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: "pointer",
            boxShadow: addHovered
              ? "0 4px 14px rgba(34,197,94,0.6)"
              : "0 2px 8px rgba(34,197,94,0.35)",
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

      {/* Sidebar */}
      <div style={{ width: "240px", flexShrink: 0 }}>
        <Calculator />
      </div>
    </div>
  );
}
