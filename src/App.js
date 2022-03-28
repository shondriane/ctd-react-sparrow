import { LITERAL_TYPES } from '@babel/types';
import { list } from 'postcss';
import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';


function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1> Todo List</h1>
      <hr />
      <AddTodoForm/>
      <TodoList/>
  
     
    </div>
  );
}

export default App;
