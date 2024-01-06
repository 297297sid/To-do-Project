import React, { useEffect, useState } from 'react'
import "../style/_todoModal.css"
import {useDispatch} from 'react-redux'
import { addTodo, updateToDo } from '../slices/todoSlice';
import { nanoid } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { MdOutlineClose } from 'react-icons/md';

const TodoModal = ({Modaltype,openModal,setOpenModal,todo}) => {
        const [title, setTitle] = useState('');
        const [status, setStatus] = useState('Incomplete');
        const dispatch = useDispatch();

        useEffect(() => {
            if (Modaltype === 'update' && todo) {
            setTitle(todo.title);
            setStatus(todo.status);
            } else {
            setTitle('');
            setStatus('Incomplete');
            }
        }, [Modaltype, todo, openModal]);

        function submitHandle(e){
                e.preventDefault();

                if(title === ''){
                    toast.error("Please provide Title");
                    return;
                }

                if(Modaltype === 'add'){
                    dispatch(addTodo({
                    id:nanoid(),
                        title,
                        status,
                        time: format(new Date(), 'p, MM/dd/yyyy'),
                    }))
                    toast.success("To do list Added");
                    setTitle();
                }

                if(Modaltype === 'update'){
                    if(todo.title !== title || todo.status !== status){
                        dispatch(updateToDo({
                            ...todo,
                            title,
                            status
                        }))
                    }else{
                        toast.error("Values are not changed");
                    }

                }
                setOpenModal(false);

                
            }

    return (
    <>
        {
            openModal &&
            <div className='wrapper'>
            <div className='container'>
                <div className='closeButton'
                onClick={()=>setOpenModal(false)}
                onKeyDown={()=>setOpenModal(false)}
                >
                <MdOutlineClose/>
                </div>
            <form className='form' onSubmit={(e)=>submitHandle(e)}>
                <label htmlFor="title">Title</label>
                <input id="title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                <label htmlFor="status">Status</label>
                <select id="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option>Complete</option>
                    <option>Incomplete</option>
                </select>
                <button className='btn btn-primary' type='submit'> {Modaltype === 'update'? 'Update ' : 'Add ' }Task</button>
                <button className='btn btn-secondary' onClick={()=>setOpenModal(false)}>Cancel</button>
            </form>
            </div>
    
        </div>
        }
    </>

  )
}

export default TodoModal