
const loginForm = document.getElementById("login-form");

const identifierInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const credentials = {
        identifier: identifierInput.value.trim(),
        password: passwordInput.value
    };

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify(credentials)
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

        window.location.href = "/dashboard.html";

    } catch (error) {
        console.error("Login request failed:", error);
        alert("Unable to connect to the server. Please try again.");
    }
});
