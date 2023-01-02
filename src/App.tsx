import "./App.scss";
import { MouseEventHandler, useState } from "react";
import { prev } from "cheerio/lib/api/traversing";

interface Todo {
  content: string | null | undefined;
  completed: boolean;
  id: number;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string | undefined>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNewTodo();
    }
  };
  const handleNewTodo: () => void = () => {
    setTodos((prev) => [
      ...prev,
      { content: inputValue, completed: false, id: todos.length + 1 },
    ]);
    setInputValue("");
  };

  const handleDelete = (id: number) => {
    let newTodos = todos.filter((el) => el.id != id);
    setTodos(newTodos);
  };
  return (
    <div className="App">
      <h1>Todo TSX+SCSS</h1>
      <div className="input-div">
        <input
          onKeyDown={handleKeyDown}
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
        />
        <button onClick={handleNewTodo}>+</button>
      </div>
      {todos.reverse().map((el) => {
        return (
          <div key={el.id} className="todo">
            <p>{el.content}</p>
            <button onClick={() => handleDelete(el.id)}>Completed</button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
