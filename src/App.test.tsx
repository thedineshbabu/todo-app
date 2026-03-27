import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the todo app heading", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /todo app/i })).toBeInTheDocument();
  });

  it("renders the text input with correct placeholder", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("What needs doing?")).toBeInTheDocument();
  });

  it("renders the Add button", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /\+ add/i })).toBeInTheDocument();
  });

  it("renders the Clear button", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("renders the clock time and date elements", () => {
    render(<App />);
    // Clock container children are present (non-empty text content)
    const container = document.querySelector(".clock-container");
    expect(container).toBeInTheDocument();
    expect(document.querySelector(".clock-time")).toBeInTheDocument();
    expect(document.querySelector(".clock-date")).toBeInTheDocument();
  });

  it("shows 0 remaining on initial render", () => {
    render(<App />);
    expect(screen.getByText(/0 remaining/i)).toBeInTheDocument();
  });

  it("adds a todo when Add button is clicked", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");
    fireEvent.change(input, { target: { value: "Buy milk" } });
    fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("clears the input field after adding a todo", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");
    fireEvent.change(input, { target: { value: "Buy milk" } });
    fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));
    expect(input).toHaveValue("");
  });

  it("adds a todo when Enter key is pressed", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");
    fireEvent.change(input, { target: { value: "Press enter todo" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(screen.getByText("Press enter todo")).toBeInTheDocument();
  });

  it("does not add a todo for empty input", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("does not add a todo for whitespace-only input", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("Clear button clears the input field", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");
    fireEvent.change(input, { target: { value: "Some text" } });
    fireEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(input).toHaveValue("");
  });

  it("increments remaining count when todo is added", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");
    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));
    expect(screen.getByText(/1 remaining/i)).toBeInTheDocument();
  });

  it("deletes a todo when Delete button is clicked", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");
    fireEvent.change(input, { target: { value: "Delete me" } });
    fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));

    expect(screen.getByText("Delete me")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
  });

  it("decrements remaining count when todo is deleted", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");
    fireEvent.change(input, { target: { value: "Temp task" } });
    fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));
    expect(screen.getByText(/1 remaining/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(screen.getByText(/0 remaining/i)).toBeInTheDocument();
  });

  it("toggles todo to completed when checkbox is clicked", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");
    fireEvent.change(input, { target: { value: "Toggle me" } });
    fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("decrements remaining count when todo is completed", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");
    fireEvent.change(input, { target: { value: "Complete me" } });
    fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));
    expect(screen.getByText(/1 remaining/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByText(/0 remaining/i)).toBeInTheDocument();
  });

  it("restores remaining count when todo is unchecked", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");
    fireEvent.change(input, { target: { value: "Toggle back" } });
    fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox); // complete
    expect(screen.getByText(/0 remaining/i)).toBeInTheDocument();
    fireEvent.click(checkbox); // uncomplete
    expect(screen.getByText(/1 remaining/i)).toBeInTheDocument();
  });

  it("adds multiple todos and tracks remaining correctly", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");

    ["Task A", "Task B", "Task C"].forEach((label) => {
      fireEvent.change(input, { target: { value: label } });
      fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));
    });

    expect(screen.getByText(/3 remaining/i)).toBeInTheDocument();
    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.getByText("Task B")).toBeInTheDocument();
    expect(screen.getByText("Task C")).toBeInTheDocument();
  });

  it("renders a timestamp for each added todo", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");
    fireEvent.change(input, { target: { value: "Timestamped task" } });
    fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));

    const timestamp = document.querySelector(".timestamp");
    expect(timestamp).toBeInTheDocument();
    expect(timestamp?.textContent).toMatch(/EST/);
  });

  it("renders a Delete button for each todo", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");

    ["Item 1", "Item 2"].forEach((label) => {
      fireEvent.change(input, { target: { value: label } });
      fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));
    });

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    expect(deleteButtons).toHaveLength(2);
  });

  it("only deletes the correct todo when multiple exist", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs doing?");

    ["Keep me", "Remove me"].forEach((label) => {
      fireEvent.change(input, { target: { value: label } });
      fireEvent.click(screen.getByRole("button", { name: /\+ add/i }));
    });

    const items = screen.getAllByRole("listitem");
    const removeItem = items.find((li) => within(li).queryByText("Remove me"));
    fireEvent.click(within(removeItem!).getByRole("button", { name: /delete/i }));

    expect(screen.getByText("Keep me")).toBeInTheDocument();
    expect(screen.queryByText("Remove me")).not.toBeInTheDocument();
  });
});
