import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import style from "./TodoListItem.module.css"
import {FaClipboardCheck} from 'react-icons/fa';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


/*
const base = new Airtable({ apiKey: "keyTNFIV8BcL0cHj3" }).base(
  `appNW455ddtN8Yg64`
);
const table = base(`todo`);

const getRecords = async()=>{
  const records = await table.select().firstPage();
  console.log(records);
};
getRecords();
const createRecord = async(fields)=>{
  const createdRecord = await table.create(fields);
  console.log(createdRecord);

}
createRecord({
  Title: "Help"
});
*/
/*Side-Effects to stores the todoList from the browser's local storage and 
retrieve it after browser refreshes. 

Function is to save the todoList. It's getting the todolist that is saved 
in the local storage and turning it into a string or if there is no item currently in 
the todolist it's returning the initial state
(what is currently saved in the local storage even if it's an empty [] string)
and returning that list*/

/* Custom-hook keeps  component's state in synch with local browser's storage
to clear the list set useSemiPersistentStae to an empty string []*/

function App() {
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
    const getData = async () => {
      const response = await fetch(
        `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/todo`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setTodoList(json.records);
      setIsLoading(false);
    };
    getData();
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
    return setTodoList([...todoList, ...json.records]);
  };
 
  /*removes todoList item*/

  const removeTodo = (id) => {
    const newList = todoList.filter((item) => item.id !== id);
    setTodoList(newList);
  };

  

  return (
    /*fragment wrapps sibling elements into a single top-level
    element*/

    <React.Fragment>
      <h1> <FaClipboardCheck/> To-Do List </h1>

      <hr />

      <BrowserRouter>
        <div class = {style.container}>
          <nav class = {style.nav}>
            <Link class={style.font} to="/">
              {" "}
              To-do List <br></br>
            </Link>
            <Link class={style.font}to="/new"> Add new Items</Link>
          </nav>
          <Routes>
            <Route path="/new" element={<AddTodoForm onAddTodo={addTodo} />} />

            <Route
              index
              exact
              path="/"
              element={
                <TodoList  todoList={todoList} onRemoveTodo={removeTodo} />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
