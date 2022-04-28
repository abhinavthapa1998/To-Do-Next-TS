import React from "react";
import { Todo } from "../model/Model";
import SingleTodo from "./SingleTodo";

interface props {
  Todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<props> = ({ Todos, setTodos }) => {
  return (
    <div className="Todos">
      {Todos?.map((Todo) => (
        <SingleTodo
          Todos={Todos}
          Todo={Todo}
          key={Todo.id}
          setTodos={setTodos}
        />
      ))}
    </div>
  );
};

export default TodoList;
