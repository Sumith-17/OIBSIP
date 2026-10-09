
const logoutButton = document.getElementById("logout-btn")

const usernameElement = document.getElementById("profile-username")
const emailElement = document.getElementById("profile-email")



logoutButton.addEventListener("click", async function () {
    try {
        const response = await fetch("/api/logout", {
            method: "POST",
            credentials: "same-origin"
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "Unable to log out.");
            return;
        }

        window.location.replace("/login.html");

    } catch (error) {
        console.error("Logout request failed:", error);
        alert("Logout failed. Check the browser console.");
    }
});


async function loadProfile() {
    try {
        const response = await fetch("/api/me", {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "Accept": "application/json"
            }
        })

        if (response.status === 401) {
            window.location.replace("/login.html")
            return
        }

        const contentType = response.headers.get("content-type")

        if (!contentType || !contentType.includes("application/json")) {
            const body = await response.text()
            console.error("Expected JSON but received:", body)
            throw new Error("Server returned HTML instead of JSON. Check the /api/me route.")
        }

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message || "Unable to load profile.")
        }

        document.getElementById("profile-username").textContent =
            `Username: ${result.username}`

        document.getElementById("profile-email").textContent =
            `Email: ${result.email}`

    } catch (error) {
        console.error("Profile loading error:", error)
        alert(error.message || "Unable to load your profile.")
    }
}

loadProfile()
