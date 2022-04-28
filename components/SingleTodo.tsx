import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
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
  };

  const handleDone = (id: number) => {
    setTodos(
      Todos.map((Todo) =>
        Todo.id === id ? { ...Todo, isDone: !Todo.isDone } : Todo
      )
    );
  };

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, Todo.id)}>
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos_test"
          ref={inputRef}
        />
      ) : Todo.isDone ? (
        <s className="todos_text">{Todo.Todo}</s>
      ) : (
        <span className="todos_text">{Todo.Todo}</span>
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !Todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(Todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(Todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
