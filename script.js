const addButton=document.getElementById('add_button');
const todoInput=document.getElementById('todo-input');
const todoList=document.getElementById('todo-list');

addButton.addEventListener('clcik', addTodo);
todoInput.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        addTodo();
    }
})

function addTodo(){
 const task = todoInput.value.trim();

 if(task === ''){   /* === checks both the data value and data type while == only checks data value */
    alert("Please enter a task.");
    return
 }
 const li= document.createElement('li');
 const span=document.createElement('span');
 console.log(li);
 span.textContent = task;
 span.addEventListener('click', function(){
    li.classList.toggle('completed');
 })

 const deleteButton = document.createElement('button');
 deleteButton.textContent='Delete';
 deleteButton.addEventListener('click', function(){
    todoList.removeChild(li);
 })

 li.appendChild(span);
 li.appendChild(deleteButton);
 todoList.appendChild(li);
 todoInput.value = '';
}