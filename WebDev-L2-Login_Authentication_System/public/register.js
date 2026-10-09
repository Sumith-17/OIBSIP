const registerForm = document.getElementById("register-form")

const usernameInput = document.getElementById("username")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const confirmPasswordInput = document.getElementById("confirm-password")

registerForm.addEventListener("submit",async function(event)
{
    event.preventDefault();
    const userData = {
        username : usernameInput.value.trim(),
        email : emailInput.value.trim(),
        password : passwordInput.value,
        confirmPassword : confirmPasswordInput.value
    }
     
    try{
        const response = await fetch("/api/register",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(userData)
        })
        const result = await response.json()
        if(!response.ok)
        {
            alert(result.message);
            return;
        }
        alert(result.message)
        window.location.href = "./login.html"
    }
    catch(error)
    {
        Console.log("Registration reuqest failed:",error)
        alert("Unable to connect to the server. Please try again.")
    }

    

})