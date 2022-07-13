import React from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import style from "./components/TodoListItem.module.css"
import {FaClipboardCheck} from 'react-icons/fa';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


/*Side-Effects to stores the todoList from the browser's local storage and 
retrieve it after browser refreshes. 

Function is to save the todoList. It's getting the todolist that is saved 
in the local storage and turning it into a string or if there is no item currently in 
the todolist it's returning the initial state
(what is currently saved in the local storage even if it's an empty [] string)
and returning that list*/

/* Custom-hook keeps  component's state in synch with local browser's storage
to clear the list set useSemiPersistentStae to an empty string []*/


  
function TodoContainer(todo) {
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem("savedTodoList"))
  );
  const [isLoading, setIsLoading] = React.useState(true);

  /* Saves TodoList into Local Storage */
  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  console.log(todoList);


  
  

  /*gets data from airtable*/
  React.useEffect(() => {
    setIsLoading(false);

    function sortObjects(objectA,objectB){
      if (objectA.Title < objectB.Title){
        return -1;
      }
      if( objectA.Title === objectB.Title){
        return 0;
      }
      return 1;
      };
   fetch(
        `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/todo`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then ((response) => response.json())
      .then((result)=>{
       
        setTodoList(result.records).sort(sortObjects);
         
         
        setIsLoading(true);
      });
    
     
  }, []);

  /*adds new todo list item to the existing list*/

  const addTodo = async (newTodo) => {
    console.log([...todoList, newTodo]);
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/todo`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          records: [
            {
              fields: {
                Title: newTodo.fields.Title,
              },
            },
          ],
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    return setTodoList([...todoList, ...json.records])
      
    
  };

  
  /*removes todoList item*/

  const removeTodo =  (id) => {
    const newList = todoList.filter((item) => item.id !== id);
    fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/todo/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      },
      method: "DELETE"
    })
    
    
    setTodoList(newList);
  };



  

  return (
    /*fragment wrapps sibling elements into a single top-level
    element*/

    <React.Fragment>
      <h1> <FaClipboardCheck/> To-Do List </h1>
     

      <hr />

      <BrowserRouter>
      
        <div className = {style.container}>
          
          <nav className = {style.nav}>
            <Link className={style.font} to="/">
              {" "}
              Current TodoList <br></br>
            </Link>
            <Link className={style.font}to="/new"> Add new items</Link>
          </nav>

          <Routes>
            <Route path="/new" element={<AddTodoForm onAddTodo={addTodo} />} />
           <Route path="/" element= {""} /> 
          </Routes>
         
          
        </div>
       
      </BrowserRouter>
      {isLoading ? 
(
  <p> Loading ...</p>):(
    <TodoList todoList={todoList} onRemoveTodo={removeTodo} />)}
    </React.Fragment>
  );
}

export default TodoContainer;
