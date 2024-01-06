import React, { useState } from 'react'
import TodoModal from './TodoModal'
import { useDispatch, useSelector } from 'react-redux';
import "../style/_appHeader.css"
 import { filterStatus } from '../slices/todoSlice.js';

const AppHeader = () => {

    const[openModal,setOpenModal] = useState(false); 
    const dispatch = useDispatch();
    const filterStatuss = useSelector(state=> state.todo.filterStatus);
    const filterHandler = (e)=>{
          dispatch(filterStatus(e.target.value))
      }
  return (
    <div>
        <div className='containerr'>
            <button className='btn btn-primary' onClick={()=>setOpenModal(true)}>Add Task</button>
            <select className='btn select-btn' value={filterStatuss} onChange={(e)=>filterHandler(e)}>
                <option>all</option>
                <option>Complete</option>
                <option>Incomplete</option>
            </select>
        </div>
        <TodoModal Modaltype='add'  openModal={openModal} setOpenModal={setOpenModal} ></TodoModal>
    </div>
  )
}

export default AppHeader