import React from "react";
import TodoList from "./TodoList";
/* what you type into search bar*/
function AddTodoForm({onAddTodo}) {
  const [todoTitle, setTodoTitle] = React.useState("");
  const handleTitleChange = (event) => {
    let newTodoTitle = event.target.value;
    console.log(newTodoTitle);
    setTodoTitle(newTodoTitle);

  };
  /* when you hit submit*/
  const handleAddTodo = (event) => {
    event.preventDefault();
    
    console.log(todoTitle); 
    onAddTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle('');

  };
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle"> Title </label>
      <input
        type="text"
        value={todoTitle}
        id="todoTitle"
        name="title"
        onChange={handleTitleChange}
      ></input>
      <button type="submit"> Add</button>
    </form>
  );
}

export default AddTodoForm;
