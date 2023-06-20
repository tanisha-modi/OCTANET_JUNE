// selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('#filter-todo')


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
document.addEventListener('DOMContentLoaded', getComTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)

// Function 
function addTodo(event){

    // prevent form from submitting 
    event.preventDefault();

    // todoDiv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    
    // checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // append to list
    todoList.appendChild(todoDiv);

    //clear input value 
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    // Delete Todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;

        // animation
        todo.classList.add('fall');
        // todo.remove();

        removeLocalTodos(todo);
        removeComTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    // check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        removeLocalTodos(todo);
        saveCompleteTodos(todo.innerText);
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
                case "unCompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}
// save completed todos
function saveCompleteTodos(todo){
    // hey ..do i already have thing in there ?
    let comTodos;
    if(localStorage.getItem('comTodos') === null){
        comTodos = [];   // if dont have array, make one
    }
    else{
        comTodos = JSON.parse(localStorage.getItem('comTodos'));   // if it already exist, return it and save to todos 
    }
    comTodos.push(todo);  // pushing into the array
    localStorage.setItem('comTodos', JSON.stringify(comTodos));    // saving to localStorage
}

// getting completed todos back after refreshing
function getComTodos(){
    let comTodos;
    if(localStorage.getItem('comTodos') === null){
        comTodos = [];   // if dont have array, make one
    }
    else{
        comTodos = JSON.parse(localStorage.getItem('comTodos'));   // if it already exist, return it and save to todos 
    }
    comTodos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        todoDiv.classList.add('completed');
        
        // create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        
        // checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        
        // trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        
        // append to list
        todoList.appendChild(todoDiv);
    });
}


function saveLocalTodos(todo){
    // hey ..do i already have thing in there ?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];   // if dont have array, make one
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));   // if it already exist, return it and save to todos 
    }
    todos.push(todo);  // pushing into the array
    localStorage.setItem('todos', JSON.stringify(todos));    // saving to localStorage
}

// getting the things back on refreshing
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];   // if dont have array, make one
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));   // if it already exist, return it and save to todos 
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
    
        // create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        
        // checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        
        // trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
        // append to list
        todoList.appendChild(todoDiv);
    });
}

// delete from localStorage 
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];   // if dont have array, make one
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));   // if it already exist, return it and save to todos 
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);   // index pr jaake 2 index htana h
    localStorage.setItem('todos', JSON.stringify(todos));
}

// deleting from completed section
function removeComTodos(com){
    let comTodos;
    if(localStorage.getItem('comTodos') === null){
        comTodos = [];   // if dont have array, make one
    }
    else{
        comTodos = JSON.parse(localStorage.getItem('comTodos'));   // if it already exist, return it and save to todos 
    }
    const comTodoIndex = com.children[0].innerText;
    comTodos.splice(comTodos.indexOf(comTodoIndex), 1);   // index pr jaake 2 index htana h
    localStorage.setItem('comTodos', JSON.stringify(comTodos));
}