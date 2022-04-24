import { LITERAL_TYPES } from "@babel/types";
import { list } from "postcss";
import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";



function App() {
/*const [newTodo, setNewTodo]= React.useState('')*/
  const [todoList, setTodoList]= React.useState([])
  
  const addTodo = (newTodo)=>{
    console.log([...todoList,newTodo]);
    return(
    setTodoList([...todoList,newTodo])
    
    );
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1> Todo List</h1>
      <hr />
      
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList}/>
 
     
      
      
      
    </div>
  );
}

export default App;
