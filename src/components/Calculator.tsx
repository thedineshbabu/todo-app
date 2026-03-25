import { useState } from "react";

type CalcOperation = "add" | "subtract" | "multiply" | "divide";

const OPS: { op: CalcOperation; label: string }[] = [
  { op: "add", label: "+" },
  { op: "subtract", label: "−" },
  { op: "multiply", label: "×" },
  { op: "divide", label: "÷" },
];

export default function Calculator() {
  const [calcA, setCalcA] = useState("");
  const [calcB, setCalcB] = useState("");
  const [calcResult, setCalcResult] = useState<number | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);
  const [calcLoading, setCalcLoading] = useState(false);

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

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          marginBottom: "16px",
          color: "#111",
          letterSpacing: "-0.01em",
        }}
      >
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

      <div style={{ display: "flex", gap: "8px" }}>
        {OPS.map(({ op, label }) => (
          <button
            key={op}
            type="button"
            disabled={calcLoading}
            onClick={() => calcOperation(op)}
            style={{
              flex: 1,
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
  );
}
