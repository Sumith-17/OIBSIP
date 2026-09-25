let buttonEl=document.querySelectorAll(".keys button")
const displayEl=document.getElementById("result")
buttonEl.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(button.textContent);
        let value=button.textContent
        if(value==="AC")
        {
            clearAll()
        }
        else if(value==="⌫")
        {
            back()
        }
        else if(value==="=")
        {
            calculate()
        }
        else
        {
            
            displayEl.textContent+=button.textContent
        }
        
    });
});

function clearAll()
{
    displayEl.textContent=""
}
function back()
{
    let text=displayEl.textContent
    displayEl.textContent=text.slice(0,-1)
}
 