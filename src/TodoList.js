import React from 'react';
import './TodoList.js';

const todoList= [

    {
      title: 'Study and Complete CTD Assignments',
      id: '1',
      
    },
    {
      title: 'Go Grocery Shopping',
      id: '2',
       
    },
    
    {
      title: 'Dance',
      id: '3',
    },
  
    {
      title: 'Go Running',
      id: '4',

    },  
  
  ]

function TodoList (){
    return (
        <div>
          <h1>Let's do this</h1>  
          <ul style ={{listStyleType: 'none'}}>
        {todoList.map (function (item){
          return <li key= {item.id}>
            <span> {item.title}</span>
            </li>;
        })}
      </ul>
     
        </div>
    )
}



export default TodoList;