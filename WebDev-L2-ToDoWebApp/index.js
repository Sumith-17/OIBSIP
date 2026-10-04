const inputEl=document.getElementById("input")

const addTask=document.getElementById("task_btn")

const pendingList=document.getElementById("pending")

const completedList=document.getElementById("completed")
const mainList=document.getElementById("all_list")

const pendingCount=document.getElementById("pending_count")
const completedCount=document.getElementById("completed_count")

const pendingEmpty = document.getElementById("pending_empty")
const completedEmpty = document.getElementById("completed_empty")

addTask.addEventListener("click",()=>{
    
    if(inputEl.value.trim()==="")
    {
        return;
    }
    
    pendingList.innerHTML += ` <div  class="task" >
                    
                     <p>${inputEl.value}</p>
                    <div class="btns">
                         <button  class="complete_btn">Mark As     Completed</button>
                    <button  class="edit_btn">Edit</button>
                    <button  class="delete_btn">Delete</button>
                    </div>
                </div>
    `
    

    inputEl.value=""
    updateTaskCount();
   

})

mainList.addEventListener("click",function(event){
    if(event.target.classList.contains("delete_btn"))
    {
        const task = event.target.closest(".task");

        task.remove();
        updateTaskCount()

    }
    if(event.target.classList.contains("edit_btn")) {

        const task = event.target.closest(".task");
        const taskText = task.querySelector("p");

        if(taskText.contentEditable === "true") {

            taskText.contentEditable = "false";
            event.target.textContent = "Edit";

        } 
        else{

            taskText.contentEditable = "true";
            taskText.focus();
            event.target.textContent = "Save";
        }
    }
    if(event.target.classList.contains("complete_btn"))
    {
        const task=event.target.closest(".task")
        if(task.parentElement === pendingList)
        {
            completedList.appendChild(task);
            event.target.textContent="Mark As Pending"
        }
        else{
            pendingList.appendChild(task)
            event.target.textContent="Mark As Completed"
        }
        updateTaskCount()
    }
})

function updateTaskCount()
{
    const pendingTasks = pendingList.querySelectorAll(".task").length;
    const completedTasks = completedList.querySelectorAll(".task").length;

    pendingCount.textContent = `Pending: ${pendingTasks}`
    completedCount.textContent = `Completed: ${completedTasks}`

    if(pendingTasks===0)
        pendingEmpty.style.display="block"
    else
        pendingEmpty.style.display="none"

    if(completedTasks===0)
        completedEmpty.style.display="block"
    else
        completedEmpty.style.display="none"
}


updateTaskCount()

