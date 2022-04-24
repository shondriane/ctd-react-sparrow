import React from "react";
import TodoListItem from "./TodoListItem";

 const  todoList = [
  {
    title: "",
    id: "",
  }
]

  
/*const todoList = [
  {
    title: "Study and Complete CTD Assignments",
    id: "1",
  },
  {
    title: "Go Grocery Shopping",
    id: "2",
  },

  {
    title: "Dance",
    id: "3",
  },

  {
    title: "Go Running",
    id: "4",
  },
];
*/
function TodoList({todoList}) {
  console.log({todoList});
  return (
  
    <ul>
      {todoList.map((todo) => {
        return <TodoListItem key={todo.id} todo={todo} />;
        
      })}
    </ul>
  );
}

export default TodoList;
