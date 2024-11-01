import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "./utils/feature";

export default function App() {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());
  const [title, setTitle] = useState<TodoItemType["title"]>("");

  // did this by myself
  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.filter((i) => i.id !== id);
    setTodos(newTodos);
  };

  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.isCompleted = !i.isCompleted;
      return i;
    });
    setTodos(newTodos);
  };

  const editHandler = (id: TodoItemType["id"], newTitle: string): void => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.title = newTitle;
      return i;
    });
    setTodos(newTodos);
  };

  const submitHandler = () => {
    const newTodo = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>

      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((i) => (
          <TodoItem
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            editHandler={editHandler}
            key={i.id}
            todo={i}
          />
        ))}
      </Stack>

      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label="New Task"
        onKeyDown={(e) => {
          if (e.key === "Enter" && title.length > 0) submitHandler();
        }}
      />

      <Button
        onClick={submitHandler}
        sx={{ margin: "1rem 0" }}
        fullWidth
        variant="contained"
      >
        ADD
      </Button>
    </Container>
  );
}
