const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

function showLoginMessage(text, className) {
    loginMessage.textContent = text;
    loginMessage.className = className;
}

function clearLoginMessage() {
    showLoginMessage("", "");
}

emailInput.addEventListener("input", clearLoginMessage);
passwordInput.addEventListener("input", clearLoginMessage);

loginBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    clearLoginMessage();

    if (!email || !password) {
        showLoginMessage("Email and password are required.", "error");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed.");
        }

        localStorage.setItem("dishUser", JSON.stringify(data.user));

        showLoginMessage("Login successful.", "success");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 700);
    } catch (error) {
        console.error("Login error:", error);
        showLoginMessage(error.message, "error");
    }
});
