import React from "react";

const TodoListItem = ({ todo, onRemoveTodo }) => (
  <li>
    {todo.fields.Title}&nbsp;&nbsp;
    <button type="button" onClick={() => onRemoveTodo(todo.id)}>
      Remove
    </button>
  </li>
);

export default TodoListItem;
