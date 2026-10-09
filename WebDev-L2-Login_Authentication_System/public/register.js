const registerForm = document.getElementById("register-form")

const usernameInput = document.getElementById("username")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const confirmPasswordInput = document.getElementById("confirm-password")

registerForm.addEventListener("submit",function(event)
{
    event.preventDefault();

    const username = usernameInput.value.trim()
    const email = emailInput.value.trim()
    const password = passwordInput.value
    const confirmPassword = confirmPasswordInput.value;

    if(password !== confirmPassword)
    {
        alert("Passwords do not match");
        return;
    }

    alert("Registration form validation succesful!")

})