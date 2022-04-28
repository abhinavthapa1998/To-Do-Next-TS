import React, { useRef } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
interface props {
  Todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ Todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Todo"
        value={Todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className="input_box"
      />
      <button type="submit" className="input_submit">
        <AiOutlineFileAdd />
      </button>
    </form>
  );
};

export default InputField;
