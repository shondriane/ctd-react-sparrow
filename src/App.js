import { LITERAL_TYPES } from '@babel/types';
import { list } from 'postcss';
import React from 'react';

const List= [

  {
    title: 'Study',
    where: 'Road to React Book',
    when: 'At 6:30 am EVD',
    why: 'Complete CTD assignments',
  },
  {
    title: 'Go Shopping',
    where: 'Trader Joes',
    when: 'At 9:00am on Saturday',
    why: 'Restock fridge and pantry for Whole 30 menu',  
  },
  
  {
    title: 'Dance',
    where: 'Salsa Salsa',
    when: 'At 4:30pm  Ev Saturday',
    why: 'Social learning',
  },

  {
    title: 'Go Running',
    where: 'Central Park',
    when: 'At 6:00 pm EVD',
    why: 'Train for Marathon',
  },
  
  {
    title: 'Dinner and Music',
    where: 'in Brooklyn',
    when: 'At 9:00 pm on Saturday',
    why: 'Meet up with T Xrs',
  },
 
  

  

]

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1> Todo List</h1>
      <hr />
      <ul style ={{listStyleType: 'none'}}>
        {List.map (function (item){
          return <li key= {item.why}>
            <span> {item.title}</span>
            <span> {item.when}</span>
            <span> {item.where}</span>
            </li>;
        })}
      </ul>
    </div>
  );
}

export default App;
