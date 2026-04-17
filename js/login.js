// login logic

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

const emailMessage = document.getElementById("emailMessage");
const passwordMessage = document.getElementById("passwordMessage");
const loginMessage = document.getElementById("loginMessage");

// clear main login message
function clearMainMessage() {
    loginMessage.textContent = "";
    loginMessage.className = "";
}

// clear main message when fields are edited
[email, password].forEach(input => {
    input.addEventListener("input", clearMainMessage);
});

// validate email
function validateEmail() {
    const emailValue = email.value.trim();
    emailMessage.textContent = "";

    if (!emailValue) {
        emailMessage.textContent = "Email is required.";
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        emailMessage.textContent = "Please enter a valid email address.";
        return false;
    }

    emailMessage.textContent = "";
    return true;
}

// validate password
function validatePassword() {
    const passwordValue = password.value.trim();
    passwordMessage.textContent = "";

    if (!passwordValue) {
        passwordMessage.textContent = "Password is required.";
        return false;
    }

    passwordMessage.textContent = "";
    return true;
}

// run validation when user leaves field
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);

// login submit
loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    clearMainMessage();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
        loginMessage.textContent = "Please fix the errors above.";
        loginMessage.className = "error";
        return;
    }

    const emailValue = email.value.trim().toLowerCase();
    const passwordValue = password.value.trim();

    try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed.");
        }

        loginMessage.textContent = "Login successful. Redirecting...";
        loginMessage.className = "success";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    } catch (error) {
        console.error("Login error:", error);
        loginMessage.textContent = error.message;
        loginMessage.className = "error";
    }
});