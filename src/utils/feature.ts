export const saveTodos = (todos:TodoItemType[])=>{
    localStorage.setItem("myTodos",JSON.stringify(todos))
}

export const getTodos = ():TodoItemType[] =>{
    const todos = localStorage.getItem("myTodos");
    return todos ? JSON.parse(todos):[]
}