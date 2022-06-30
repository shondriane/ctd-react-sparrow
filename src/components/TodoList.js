import React from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoListItem.module.css"
import PropTypes from "prop-types";

/* Creation of the todolist and mapping it through an array*/
function TodoList({todoList,onRemoveTodo}) {
  console.log({todoList});
  return (
  
    <ul>
      {todoList.map((todo) => {
        return <TodoListItem className ={style.listItem} key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />;
      })}
    </ul>
  );
}
TodoList.propTypes ={
  todoList: PropTypes.array
 
  
}
export default TodoList;
