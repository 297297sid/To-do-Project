import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem';
import "../style/_appHeader.css"
const AppContent = () => {
  const filterStatus = useSelector(state=> state.todo.filterStatus);
    const todoList = useSelector(state=>state.todo.todoList);
    const sortedToDoList = [...todoList];
    sortedToDoList.sort((a,b)=> new Date(b.time) - new Date(a.time));
    const filteredToDoList = sortedToDoList.filter(item =>{
      if(filterStatus === 'all'){
        return true;
      }

      return item.status === filterStatus;
    })

    return (
    <div className='content__wrapper'>
        {filteredToDoList && filteredToDoList.length>0 ? 
        filteredToDoList.map(todo=> <TodoItem key={todo.id} todo={todo}/>)
        : <div className='not_found'>no todo found</div>}
    </div>
  )
}

export default AppContent