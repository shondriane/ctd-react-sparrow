import React, { useEffect } from "react";
import AddTodoForm from "./AddTodoForm";

const InputWithLabel = ({
  children,//generic label for title
  value,
  type = "text",
  id,
  onInputChange,
}) => {
    //function for autofocus
  const inputRef = React.useRef();
  function focusSearch() {
    inputRef.current.focus();
  }
  useEffect(focusSearch);
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

export default InputWithLabel;
