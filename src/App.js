import React from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import style from "./components/TodoListItem.module.css"
import {FaRunning} from 'react-icons/fa';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import shoe from './components/shoe.svg';
import Pride_Run from './components/Pride_Run.JPG';
import Queens_Race from './components/Queens_Race.JPG';
import Womens_half from './components/Womens_half.jpeg';
import Brooklyn_half from './components/Brooklyn_half.JPG';




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
    setIsLoading(true);
    
    function sortObjects(objectA, objectB){
      if (objectA.fields.Title < objectB.fields.Title){
        return -1;
      }
      if( objectA.fields.Title === objectB.fields.Title){
        return 0;
      }
  
      return 1;
     }
      
       
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
        setTodoList(result.records.sort(sortObjects));
        setIsLoading(false);
      });

  },[]);

  

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
      <h1> <FaRunning/> Run Girl Run </h1>
     

      <hr />

      <BrowserRouter>
      
       
          
          <nav className = {style.nav} class={style.grid} id={style.sticky}>
        
          
            <ul>
            <li > <a href="/"> Home</a></li><br></br>
              <li ><a href="#Run">Completed</a></li> 
            </ul>
            <br></br>
            
            <Link className={style.font} to="/">
              {" "} Upcoming </Link> <br></br>
            <Link className={style.font}to="/new"> New </Link>
          </nav>


<section  class = {style.grid} id ={style.welcome}>
  
  <div class ={style.welcomeText}>
    <h2> I Run Like a Girl, Try To Keep Up!</h2>
    <p class={style.leading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
    ex ea commodo consequat. </p>
  
  </div>

  <div class={style.welcomeImg}>
  <img src={shoe} alt="pic of shoe print"></img>
  </div>

</section>

<div class= {style.container}>

<h3 class={style.Runlist}>Runs</h3>
          <Routes>
            <Route path="/new" element={<AddTodoForm onAddTodo={addTodo} />} />      
           <Route  path="/" element= {""} />      
          </Routes>
                
        </div>
       
      </BrowserRouter>
      {isLoading ? 
(
  <p> Loading ...</p>):(
    <TodoList todoList={todoList} onRemoveTodo={removeTodo} />)}
   
    <section  id= {style.Run}>
  <h3 id="Run"> Some of My 2022 Runs</h3>
  <div class = {style.projects}>
  <a href =" ">
    <img class= {style.image}src={Queens_Race} alt="Queens Run"></img>
    <h4> Queens Race 10k </h4>
    </a>
    <a href =" ">
    <img class= {style.image}src={Womens_half} alt="Womens Half Marathon"></img>
    <h4> Shape Womens Half Marathon </h4>
  </a>
  <a href =" ">
    <img class= {style.image} src={Pride_Run} alt="Pride Run"></img>
    <h4> Pride Run 5k</h4>
  </a>
  <a href =" ">
    <img class= {style.image} src={Brooklyn_half} alt="Brooklyn Half Marathon"></img>
    <h4> Brooklyn Half Marathon </h4>
  </a>
</div>

</section>

<footer>
  
    <p class={style.copyright}> Copyright 2022 Run Girl Run</p>

</footer>

    </React.Fragment>
  );
}

export default TodoContainer;
