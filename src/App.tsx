import { useState, useEffect } from "react";
import "./App.css";

type CalcOperation = "add" | "subtract" | "multiply" | "divide";

export default function App() {
  const [text, setText] = useState("");
  const [addHovered, setAddHovered] = useState(false);
  const [clearHovered, setClearHovered] = useState(false);
  const [todos, setTodos] = useState<any[]>([]);
  const [now, setNow] = useState(new Date());

  // Calculator state
  const [calcA, setCalcA] = useState("");
  const [calcB, setCalcB] = useState("");
  const [calcResult, setCalcResult] = useState<number | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);
  const [calcLoading, setCalcLoading] = useState(false);

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

  async function calcOperation(operation: CalcOperation) {
    const a = parseInt(calcA, 10);
    const b = parseInt(calcB, 10);
    if (isNaN(a) || isNaN(b)) {
      setCalcError("Both inputs must be whole numbers.");
      setCalcResult(null);
      return;
    }
    setCalcLoading(true);
    setCalcError(null);
    setCalcResult(null);
    try {
      const res = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a, b, operation }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCalcError(data.error ?? "Something went wrong.");
      } else {
        setCalcResult(data.result);
      }
    } catch {
      setCalcError("Could not reach the calculator server.");
    } finally {
      setCalcLoading(false);
    }
  }

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

      {/* Calculator */}
      <div style={{ marginTop: "32px", borderTop: "1px solid #eee", paddingTop: "24px" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px", color: "#111" }}>
          Calculator
        </h2>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <input
            type="number"
            value={calcA}
            onChange={(e) => setCalcA(e.target.value)}
            placeholder="A"
            style={{
              flex: 1,
              padding: "8px 12px",
              fontSize: "0.95rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              outline: "none",
            }}
          />
          <input
            type="number"
            value={calcB}
            onChange={(e) => setCalcB(e.target.value)}
            placeholder="B"
            style={{
              flex: 1,
              padding: "8px 12px",
              fontSize: "0.95rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              outline: "none",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {(
            [
              { op: "add", label: "+" },
              { op: "subtract", label: "−" },
              { op: "multiply", label: "×" },
              { op: "divide", label: "÷" },
            ] as { op: CalcOperation; label: string }[]
          ).map(({ op, label }) => (
            <button
              key={op}
              type="button"
              disabled={calcLoading}
              onClick={() => calcOperation(op)}
              style={{
                flex: 1,
                minWidth: "56px",
                padding: "10px 0",
                fontSize: "1.1rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #6366f1, #818cf8)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: calcLoading ? "not-allowed" : "pointer",
                opacity: calcLoading ? 0.6 : 1,
                transition: "opacity 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {calcResult !== null && (
          <div
            style={{
              marginTop: "12px",
              padding: "10px 14px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#15803d",
            }}
          >
            = {calcResult}
          </div>
        )}
        {calcError && (
          <div
            style={{
              marginTop: "12px",
              padding: "10px 14px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              fontSize: "0.9rem",
              color: "#dc2626",
            }}
          >
            {calcError}
          </div>
        )}
      </div>
    </div>
  );
}
