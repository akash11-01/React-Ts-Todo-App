import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";

type PropsType = {
  todo: TodoItemType;
  deleteHandler: (id:TodoItemType["id"])=>void;
  completeHandler: (id:TodoItemType["id"])=>void;
  editHandler: (id: TodoItemType["id"], newTitle: string) => void;
};

const TodoItem = ({
  todo,
  completeHandler,
  deleteHandler,
  editHandler,
}: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [editVal, setEditVal] = useState<string>(todo.title);

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField
            value={editVal}
            onChange={(e) => setEditVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && editVal !== "") {
                editHandler(todo.id, editVal);
                setEditActive(false);
              }
            }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeHandler(todo.id)}
        />
        <Button onClick={() => setEditActive((prev) => !prev)}>
          <Edit />
        </Button>
        <Button onClick={() => deleteHandler(todo.id)}>
          <Delete />
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
