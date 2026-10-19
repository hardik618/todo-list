/*
1. Get HTML elements
        ↓
2. Load existing tasks
        ↓
3. Render existing tasks
        ↓
4. Listen for Add button
        ↓
5. Create new task
        ↓
6. Save task
        ↓
7. Define helper functions
*/
// Firstly grab all the elements
document.addEventListener('DOMContentLoaded',()=>{ // once the page is reloaded then only i want to grab my input and ID
const todoIndput = document.getElementById("todo-input")
const addTaskButton = document.getElementById("add-task-btn")
const toDoList = document.getElementById("todo-list")

// now we also need to store this task maybe in array
let tasks = JSON.parse(localStorage.getItem("tasks"))|| [] // parse will convert into original data structure

tasks.forEach((task)=>renderTask(task))

addTaskButton.addEventListener('click',()=>{
    // if somebody clicks on Button firstly grab todoInput means which user is typing
    const taskText = todoIndput.value.trim() // stored task entered by the user in taskTest
    if(taskText==="") return;
    // now if task is there we dont want to just add the task but want to add unique ID to it, we also want to add property to it which is true and false
    // Becuase based on true/false property we will strike through line CSS or not

    // now we will make seperate object for perticular task
    // for every task we will make an object
    const newTask = {
        id: Date.now(), // gives unique ID
        text: taskText,
        completed: false
    }
    // now we will push this newtask into the task array
    tasks.push(newTask)
    saveTasks()
    renderTask(newTask)
    // now we will clean our input so that new task can be add
    todoIndput.value=""
    console.log(tasks);
})
// now we want to read from local storage
function renderTask(task){
        const li = document.createElement('li')
        li.setAttribute('data-id',task.id)
        if(task.completed) li.classList.add("completed")
        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>`
        li.addEventListener('click',(e)=>{
                if(e.target.tagName === 'BUTTON') return;
                task.completed = !task.completed
                li.classList.toggle('completed')
                saveTasks()
        });
        li.querySelector('button').addEventListener('click',(e)=>{
                e.stopPropagation() // prevent toggle from firing
                tasks = tasks.filter(t=>t.id!==task.id)
                li.remove()
                saveTasks()
        })
        toDoList.appendChild(li)
}  // Take one task object and display it on the webpage.

// now we will move these tasks from array to local storage
// so we will create a seperate method which will add things to our local storage
function saveTasks(){
    // whole idea is to push this tasks array to our local storage
    // local storage gives us API
    // for adding to local storage we have keyword itself
    localStorage.setItem("tasks",JSON.stringify(tasks)) // this take input in (key,value) pair and value should be in string 
    // now in browser we can see in application section it is storing the tasks we are writing in kry value pair
    // therefore JSON.stringifying the array
}
})