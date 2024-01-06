import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
    // getting todo list
    const localTodoList = window.localStorage.getItem('todoList');
    // if todo list is not empty
    if (localTodoList) {
      return JSON.parse(localTodoList);
    }
    window.localStorage.setItem('todoList', []);
    return [];
  };

const initialState = {
    filterStatus: 'all',
    todoList : getInitialTodo()
}


const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            state.todoList.push(action.payload);
            const todolist = window.localStorage.getItem('todoList');
            if(todolist){
                const todolistArr = JSON.parse(todolist);
                todolistArr.push({
                    ...action.payload
                })
                window.localStorage.setItem('todoList', JSON.stringify(todolistArr));
            }else{
                window.localStorage.setItem('todoList',JSON.stringify(
                    [
                        {
                            ...action.payload
                        }
                    ]
                ));
            }
        },
        deleteTodo:(state,action)=>{
            const todolist = window.localStorage.getItem('todoList');
            if(todolist){
                const todolistArr = JSON.parse(todolist);
                todolistArr.forEach((todo,index)=>{
                    if(todo.id === action.payload)
                    todolistArr.splice(index,1);

                });
                window.localStorage.setItem('todoList',JSON.stringify(todolistArr));
                state.todoList = todolistArr;
            }

        },
        updateToDo:(state,action)=>{
            const todoListArr = state.todoList;
            todoListArr.forEach((todo) => {
                if (todo.id === action.payload.id) {
                  todo.status = action.payload.status;
                  todo.title = action.payload.title;
                }
              });
              window.localStorage.setItem('todoList',JSON.stringify(todoListArr))
              state.todoList = [...todoListArr];
        },
        filterStatus:(state,action)=>{
            state.filterStatus = action.payload;
        }
        
    }
})

export const { addTodo,deleteTodo,updateToDo,filterStatus} = todoSlice.actions;
export default todoSlice.reducer;