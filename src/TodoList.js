import React from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoListItem.module.css"


/* Creation of the todolist and mapping it through an array*/
function TodoList({todoList,onRemoveTodo}) {
  console.log({todoList});
  return (
  
    <ul>
      {todoList.map((todo) => {
        return <TodoListItem class ={style.listItem} key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />;
      })}
    </ul>
  );
}

export default TodoList;
