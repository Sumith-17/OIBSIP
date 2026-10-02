const inputEl=document.getElementById("input")

const addTask=document.getElementById("task_btn")

const task=document.getElementById("pending")

addTask.addEventListener("click",()=>{
    console.log(inputEl.value)
    task.innerHTML += ` <div  class="task" id="task">
                    
                     <p>${inputEl.value}</p>
                    <div class="btns">
                         <button  id="complete_btn">Mark As     Completed</button>
                    <button  id="edit_btn">Edit</button>
                    <button  id="delete_btn">Delete</button>
                    </div>
                </div>
    `
})
