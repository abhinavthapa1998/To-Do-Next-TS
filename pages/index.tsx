import type { NextPage } from "next";
import React, { useState } from "react";
import InputField from "../components/InputField";

import { Todo } from "../model/Model";
import TodoList from "../components/TodoList";
const Home: NextPage = () => {
  const [Todo, setTodo] = useState<string>("");
  const [Todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (Todo) {
      setTodos([...Todos, { id: Date.now(), Todo, isDone: false }]);
      setTodo("");
    }
  };

  return (
    <div className="App">
      <h1 className="heading">To-Do List</h1>
      <InputField Todo={Todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList Todos={Todos} setTodos={setTodos} />
    </div>
  );
};

export default Home;
