import React from "react";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

const TodoListItem = ({ todo, onRemoveTodo }) => (
  < div className = {style.containerTwo}>
  <li className = {style.ListItem}>
    {todo.fields.Title}&nbsp;&nbsp;
    <button  type="button" onClick={() => onRemoveTodo(todo.id)}>
      Remove
    </button>
  </li>
  </div>
);

TodoListItem.propType={
  todo:PropTypes.string
}

export default TodoListItem;