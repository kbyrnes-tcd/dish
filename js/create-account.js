//create account logic

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const createBtn = document.getElementById("createAccountBtn");
const message = document.getElementById("createAccountMessage");

createBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    message.textContent = "";

    if (!usernameValue || !emailValue || !passwordValue || !confirmPasswordValue) {
        message.textContent = "Please fill out all fields.";
        return;
    }

    if (passwordValue !== confirmPasswordValue) {
        message.textContent = "Passwords do not match.";
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameValue,
                email: emailValue,
                password: passwordValue
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to create account.");
        }

        //redirect after successful signup
        message.textContent = "Account Created";
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    } catch (error) {
        console.error("Create account error:", error);
        message.textContent = error.message;
    }
});