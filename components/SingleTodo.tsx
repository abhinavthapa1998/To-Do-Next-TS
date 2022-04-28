import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { Todo } from "../model/Model";

const SingleTodo: React.FC<{
  Todo: Todo;
  Todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}> = ({ Todo, Todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(Todo.Todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      Todos.map((Todo) => (Todo.id === id ? { ...Todo, Todo: editTodo } : Todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(Todos.filter((Todo) => Todo.id !== id));
    if (Todos.length == 1) {
      localStorage.setItem("List", JSON.stringify([]));
    }
  };

  const handleDone = (id: number) => {
    setTodos(
      Todos.map((Todo) =>
        Todo.id === id ? { ...Todo, isDone: !Todo.isDone } : Todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(Todos));
  }, [Todos]);

  return (
    <form className="todos_single" onSubmit={(e) => handleEdit(e, Todo.id)}>
      {edit ? (
        <>
          <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className="todos_test"
            ref={inputRef}
          />
          <p className="icon scaler" onClick={(e) => handleEdit(e, Todo.id)}>
            <AiOutlineCheck />
          </p>
        </>
      ) : Todo.isDone ? (
        <s className="todos_text">{Todo.Todo}</s>
      ) : (
        <span className="todos_text">{Todo.Todo}</span>
      )}
      <div>
        {!edit && (
          <p
            className="icon scaler"
            onClick={() => {
              if (!edit && !Todo.isDone) {
                setEdit(!edit);
              }
            }}
          >
            <AiOutlineEdit />
          </p>
        )}

        <p className="icon scaler" onClick={() => handleDelete(Todo.id)}>
          <AiOutlineDelete />
        </p>
        {!edit && (
          <p className="icon scaler" onClick={() => handleDone(Todo.id)}>
            <MdDoneAll />
          </p>
        )}
      </div>
    </form>
  );
};

export default SingleTodo;
