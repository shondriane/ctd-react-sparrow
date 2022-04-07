import React from 'react';
import TodoList from './TodoList';




function AddTodoForm (props){
    const handleAddTodo = (event)=>{
        event.preventDefault();
       let todoTitle = event.target.title.value;

        console.log(todoTitle);
        props.onAddTodo(todoTitle)
        event.target.reset();
        
        
    }
    return(
        <form onSubmit={handleAddTodo}>
            <label htmlFor ="todoTitle"> Title </label>
            <input type="text" id="todoTitle" name ="title"  ></input>
            <button type = "submit"  > Add</button>
        </form>
    )}

  

export default AddTodoForm;