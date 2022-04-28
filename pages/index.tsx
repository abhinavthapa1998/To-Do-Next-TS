import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { Todo } from "../model/Model";
import TodoList from "../components/TodoList";
import Waves from "../components/Waves";
const Home: NextPage = () => {
  const [Todo, setTodo] = useState<string>("");
  const [Todos, setTodos] = useState<Todo[]>([]);

  // THIS ADDS THE LIST ITEM WHENEVER YOU PASS IT
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // ONLY IF INPUT IS NOT EMPTY IT WILL ADD
    if (Todo) {
      setTodos([...Todos, { id: Date.now(), Todo, isDone: false }]);
      setTodo("");
    }
  };
  const checkStorage = () => {
    //FIRST YOU NEED TO CHECK IF THE LIST EXISTS ON LOCAL STORAGE
    if (localStorage.getItem("List")) {
      //THEN WE NEED TO PROVIDE A FALLBACK STRING OTHERWISE IT WILL THROW ERROR
      var retrievedData = JSON.parse(localStorage.getItem("List") || "Old");
      setTodos(retrievedData);
    }
  };
  useEffect(() => {
    //WE NEED TO CHECK IF THERE WAS ANY LIST USED BEFORE
    checkStorage();
  }, []);
  return (
    <div className="container">
      <div className="App">
        <h1 className="heading">To-Do List</h1>
        <InputField Todo={Todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList Todos={Todos} setTodos={setTodos} />
      </div>
      <div className="waveContainer">
        <Waves />
      </div>
    </div>
  );
};

export default Home;
