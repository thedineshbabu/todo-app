import { useState, useEffect } from "react";
import "./App.css";
import { colors, spacing, radii, shadows, typography } from "./styles/tokens";

export default function App() {
  const [text, setText] = useState("");
  const [addHovered, setAddHovered] = useState(false);
  const [clearHovered, setClearHovered] = useState(false);
  const [todos, setTodos] = useState<any[]>([]);
  const [newIds, setNewIds] = useState<Set<number>>(new Set());
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
    setNewIds((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setNewIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 400);
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
    <div
      style={{
        maxWidth: "560px",
        margin: `${spacing.xxxl} auto`,
        background: colors.surfaceContainerLowest,
        borderRadius: radii.lg,
        padding: spacing.xxl,
        boxShadow: shadows.card,
        fontFamily: typography.fontFamily,
      }}
    >
      <h1
        style={{
          fontSize: typography.sizeLg,
          fontWeight: typography.weightBold,
          marginBottom: spacing.xl,
          color: colors.primary,
          letterSpacing: "-0.02em",
        }}
      >
        Todo App
      </h1>
      <div className="clock-container">
        <div className="clock-time">{clockTime}</div>
        <div className="clock-date">{clockDate}</div>
      </div>
      <div
        style={{
          display: "flex",
          gap: spacing.sm,
          marginBottom: spacing.xl,
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          style={{
            flex: 1,
            padding: `${spacing.sm} ${spacing.md}`,
            fontSize: typography.sizeBase,
            border: `1px solid ${colors.border}`,
            borderRadius: radii.md,
            outline: "none",
            background: colors.surfaceContainerLowest,
            color: colors.onSurface,
            fontFamily: typography.fontFamily,
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = colors.primaryHover;
            e.currentTarget.style.boxShadow = shadows.inputFocus;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = colors.border;
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <button
          type="button"
          onClick={addTodo}
          onMouseEnter={() => setAddHovered(true)}
          onMouseLeave={() => setAddHovered(false)}
          style={{
            background: addHovered ? colors.primaryHover : colors.primary,
            color: colors.onPrimary,
            border: "none",
            borderRadius: radii.md,
            padding: `${spacing.sm} 20px`,
            fontWeight: typography.weightSemibold,
            fontSize: typography.sizeBase,
            fontFamily: typography.fontFamily,
            cursor: "pointer",
            boxShadow: addHovered ? shadows.buttonHover : shadows.button,
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
            background: clearHovered ? colors.dangerHover : colors.danger,
            color: colors.onDanger,
            border: "none",
            borderRadius: radii.md,
            padding: `${spacing.sm} 20px`,
            fontWeight: typography.weightSemibold,
            fontSize: typography.sizeBase,
            fontFamily: typography.fontFamily,
            cursor: "pointer",
            boxShadow: clearHovered ? shadows.dangerButtonHover : shadows.dangerButton,
            transform: clearHovered ? "translateY(-1px)" : "translateY(0)",
            transition: "all 0.2s ease",
            marginLeft: spacing.sm,
          }}
        >
          Clear
        </button>
      </div>
      <ul>
        {todos.map((todo: any) => (
          <li
            key={todo.id}
            className={[
              todo.completed ? "completed" : "",
              newIds.has(todo.id) ? "todo-enter" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
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
      <p
        className="remaining"
        key={remaining}
        style={{
          marginTop: spacing.lg,
          fontSize: typography.sizeSm,
          color: colors.onSurfaceVariant,
        }}
      >
        {remaining} remaining
      </p>
    </div>
  );
}
