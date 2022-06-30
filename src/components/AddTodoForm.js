import React from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";


/* what you type into search bar*/
function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = React.useState("");
  const handleTitleChange = (event) => {
    let newTodoTitle = event.target.value;
    console.log(newTodoTitle);
    setTodoTitle(newTodoTitle);
  };
  AddTodoForm.propTypes ={
    onAddTodo: PropTypes.func
  }
  /* when you hit submit*/
  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(todoTitle);
    onAddTodo({
      fields: {
        Title: todoTitle,
        id: Date.now(),
      },
    });
    setTodoTitle("");
  };
 

  return (
    <form className ={style.user} onSubmit={handleAddTodo}>
      <InputWithLabel 
        type="text"
        value={todoTitle} 
        id="todoTitle"
        onInputChange={handleTitleChange}
      >
        <strong>Title:</strong>
      </InputWithLabel>
      <button type="submit"> Add</button>
    </form>
  );
}

export default AddTodoForm;
