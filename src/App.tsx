import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [addHovered, setAddHovered] = useState(false);
  const [clearHovered, setClearHovered] = useState(false);
const [todos, setTodos] = useState<any[]>([]);
  const [now, setNow] = useState(new Date());

  // Countdown state
  const [cdMinutes, setCdMinutes] = useState("5");
  const [cdSeconds, setCdSeconds] = useState("00");
  const [cdRemaining, setCdRemaining] = useState<number | null>(null);
  const [cdRunning, setCdRunning] = useState(false);
  const [cdFinished, setCdFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!cdRunning) return;
    if (cdRemaining === 0) {
      setCdRunning(false);
      setCdFinished(true);
      return;
    }
    const tick = setInterval(() => {
      setCdRemaining((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(tick);
  }, [cdRunning, cdRemaining]);

  function startCountdown() {
    const mins = parseInt(cdMinutes, 10) || 0;
    const secs = parseInt(cdSeconds, 10) || 0;
    const total = mins * 60 + secs;
    if (total <= 0) return;
    setCdRemaining(total);
    setCdFinished(false);
    setCdRunning(true);
  }

  function pauseResumeCountdown() {
    setCdRunning((r) => !r);
  }

  function resetCountdown() {
    setCdRunning(false);
    setCdRemaining(null);
    setCdFinished(false);
  }

  const cdDisplayMins = cdRemaining !== null ? Math.floor(cdRemaining / 60) : parseInt(cdMinutes, 10) || 0;
  const cdDisplaySecs = cdRemaining !== null ? cdRemaining % 60 : parseInt(cdSeconds, 10) || 0;
  const cdTotal = (parseInt(cdMinutes, 10) || 0) * 60 + (parseInt(cdSeconds, 10) || 0);
  const cdProgress = cdRemaining !== null && cdTotal > 0 ? cdRemaining / cdTotal : 1;

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
      <div style={{ textAlign: "center", marginBottom: "16px", color: "#6366f1" }}>
        <div style={{ fontSize: "1.8rem", fontWeight: 700, letterSpacing: "0.05em" }}>{clockTime}</div>
        <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>{clockDate}</div>
      </div>
      {/* Countdown Section */}
      <div style={{
        background: cdFinished ? "linear-gradient(135deg, #fef2f2, #fee2e2)" : "linear-gradient(135deg, #f0fdf4, #dcfce7)",
        borderRadius: "14px",
        padding: "20px 24px",
        marginBottom: "20px",
        transition: "background 0.4s ease",
      }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", marginBottom: "14px" }}>
          Countdown Timer
        </div>

        {/* Big timer display */}
        <div style={{
          textAlign: "center",
          fontSize: "3.5rem",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: cdFinished ? "#b91c1c" : cdRunning ? "#15803d" : "#374151",
          lineHeight: 1,
          marginBottom: "4px",
          fontVariantNumeric: "tabular-nums",
          transition: "color 0.3s ease",
        }}>
          {String(cdDisplayMins).padStart(2, "0")}:{String(cdDisplaySecs).padStart(2, "0")}
        </div>

        {/* Status label */}
        <div style={{ textAlign: "center", fontSize: "0.78rem", fontWeight: 600, color: cdFinished ? "#ef4444" : cdRunning ? "#16a34a" : "#9ca3af", marginBottom: "14px", minHeight: "1.2em" }}>
          {cdFinished ? "Time's up!" : cdRunning ? "Running…" : cdRemaining !== null ? "Paused" : "Set a duration below"}
        </div>

        {/* Progress bar */}
        <div style={{ background: "#e5e7eb", borderRadius: "99px", height: "6px", marginBottom: "16px", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            borderRadius: "99px",
            width: `${cdProgress * 100}%`,
            background: cdFinished ? "#ef4444" : "linear-gradient(90deg, #22c55e, #16a34a)",
            transition: "width 1s linear, background 0.3s ease",
          }} />
        </div>

        {/* Input row — only shown when not running */}
        {cdRemaining === null && (
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "14px", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>Min</label>
              <input
                type="number"
                min="0"
                max="99"
                value={cdMinutes}
                onChange={(e) => setCdMinutes(e.target.value)}
                style={{
                  width: "64px", textAlign: "center", fontSize: "1.3rem", fontWeight: 700,
                  border: "none", borderBottom: "2px solid #d1d5db", background: "transparent",
                  outline: "none", color: "#1f2937", padding: "2px 0",
                }}
              />
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#9ca3af", paddingTop: "16px" }}>:</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>Sec</label>
              <input
                type="number"
                min="0"
                max="59"
                value={cdSeconds}
                onChange={(e) => setCdSeconds(e.target.value)}
                style={{
                  width: "64px", textAlign: "center", fontSize: "1.3rem", fontWeight: 700,
                  border: "none", borderBottom: "2px solid #d1d5db", background: "transparent",
                  outline: "none", color: "#1f2937", padding: "2px 0",
                }}
              />
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          {cdRemaining === null ? (
            <button
              type="button"
              onClick={startCountdown}
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "#fff", border: "none", borderRadius: "8px",
                padding: "8px 24px", fontWeight: 600, fontSize: "0.9rem",
                cursor: "pointer", boxShadow: "0 2px 8px rgba(34,197,94,0.35)",
              }}
            >
              ▶ Start
            </button>
          ) : (
            <button
              type="button"
              onClick={pauseResumeCountdown}
              style={{
                background: cdRunning
                  ? "linear-gradient(135deg, #f59e0b, #d97706)"
                  : "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "#fff", border: "none", borderRadius: "8px",
                padding: "8px 24px", fontWeight: 600, fontSize: "0.9rem",
                cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              {cdRunning ? "⏸ Pause" : "▶ Resume"}
            </button>
          )}
          {cdRemaining !== null && (
            <button
              type="button"
              onClick={resetCountdown}
              style={{
                background: "linear-gradient(135deg, #6b7280, #4b5563)",
                color: "#fff", border: "none", borderRadius: "8px",
                padding: "8px 20px", fontWeight: 600, fontSize: "0.9rem",
                cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              ↺ Reset
            </button>
          )}
        </div>
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
  );
}
