// profile logic
const usernameEl = document.getElementById("profileUsername");
const emailEl = document.getElementById("profileEmail");
const avatarLetterEl = document.getElementById("avatarLetter");
const logoutBtn = document.getElementById("logoutBtn");

// load current user
async function loadProfile() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/me", {
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Not logged in");
        }

        const user = data.user;

        usernameEl.textContent = user.username;
        emailEl.textContent = user.email;
        avatarLetterEl.textContent = user.username.charAt(0).toUpperCase();

    } catch (error) {
        console.error("Profile load error:", error);

        // redirect if not logged in
        window.location.href = "login.html";
    }
}

// logout
logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
        await fetch("http://127.0.0.1:8000/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        window.location.href = "welcome.html";

    } catch (error) {
        console.error("Logout error:", error);
    }
});

// run on page load
loadProfile();