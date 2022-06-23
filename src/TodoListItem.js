import React from "react";
import style from "./TodoListItem.module.css";

const TodoListItem = ({ todo, onRemoveTodo }) => (
  < div class = {style.containerTwo}>
  <li class = {style.ListItem}>
    {todo.fields.Title}&nbsp;&nbsp;
    <button  type="button" onClick={() => onRemoveTodo(todo.id)}>
      Remove
    </button>
  </li>
  </div>
);

export default TodoListItem;
