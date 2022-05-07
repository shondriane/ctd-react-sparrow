
import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

/*Side-Effects to stores the todoList from the browser's local storage and 
retrieve it after browser refreshes. 

Function is to save the todoList. It's getting the todolist that is saved 
in the local storage and turning it into a string or if there is no item currently in 
the todolist it's returning the initial state
(what is currently saved in the local storage even if it's an empty [] string)
and returning that list*/

const useSemiPersistentState = (initialState) => {
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);
  console.log(useSemiPersistentState);
  return [todoList, setTodoList];
};

function App() {
  /* Custom-hook keeps  component's state in synch with local browser's storage
to clear the list set useSemiPersistentStae to an empty string []*/
  const [todoList, setTodoList] = useSemiPersistentState("savedTodoList");
  
  /* Adds the new todo List item to the existing list */
  const addTodo = (newTodo) => {
    console.log([...todoList, newTodo]);
    /*localStorage.setItem('todoList',[...todoList,newTodo]);*/
    return setTodoList([...todoList, newTodo]);
    
  };
  /*removes todoList item*/

  const removeTodo = (id)=>{
    const newList = todoList.filter (
    (item)=>item.id !== id
    );
    setTodoList(newList);
  };
  return (
    /*fragment wrapps sibling elements into a single top-level
    element*/
    <React.Fragment>
      <h1> Todo List</h1>
      <hr />

      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo ={removeTodo} />
    </React.Fragment>
  );
}

export default App;
