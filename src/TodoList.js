import React from "react";
import TodoListItem from "./TodoListItem";


/* Creation of the todolist and mapping it through an array*/
function TodoList({todoList,onRemoveTodo}) {
  console.log({todoList});
  return (
  
    <ul>
      {todoList.map((todo) => {
        return <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />;
      })}
    </ul>
  );
}

export default TodoList;
