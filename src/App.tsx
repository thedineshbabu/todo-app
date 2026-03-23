import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<any[]>([]);

  function addTodo() {
    const item = {
      id: Date.now(),
      text,
      completed: false,
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
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
        />
        <button type="button" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo: any) => (
          <li>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              {todo.text}
            </label>
            <button type="button" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p>{remaining} remaining</p>
    </div>
  );
}
