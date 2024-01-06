import React, { useEffect, useState } from 'react'
import '../style/_todoitem.css';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../slices/todoSlice';
import TodoModal from './TodoModal';
import toast from 'react-hot-toast';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";

const TodoItem = ({todo}) => {
  const [updateModalOpen,setUpdateModal] = useState(false);
  const [check,setCheck] = useState(false);
  const dispatch = useDispatch();
  
  const handleDelete = ()=>{
      dispatch(deleteTodo(todo.id));
      toast.success("To Do list Successfuly deleted!")
  }

  const handleUpdate = ()=>{
      setUpdateModal(true);
  }

  useEffect(() => {
    if (todo.status === 'Complete') {
        setCheck(true);
    } else {
        setCheck(false);
    }
  }, [todo.status]);

  return (
    <>
        <div className='item'>
            <div className='todoDetails'>
                <div>
                {
                        check ? <MdCheckBox className='checkbox'/> : <MdCheckBoxOutlineBlank className='checkbox'/>
                }
                </div>


                <div className='texts'>
                    <p className={todo.status==="Complete"?"todoText completed":"todoText"}>{todo.title}</p>
                    <p className='time'>{format(new Date(todo.time),'p, MM/dd/yyyy')}</p>
                </div>
            </div>
            <div className='todoActions'>
                  <div className='icon'
                        onClick={handleDelete}
                        onKeyDown={handleDelete}
                        tabIndex={0}
                  >
                      <MdDelete/>
                  </div>
                  <div className='icon'
                        onClick={handleUpdate}
                        onKeyDown={handleUpdate}
                        tabIndex={0}                  
                  >
                      <MdEdit/>
                  </div>
            </div>
    </div>

    <TodoModal Modaltype='update' openModal={updateModalOpen} setOpenModal={setUpdateModal} todo={todo}></TodoModal>
    </>

  )
}

export default TodoItem