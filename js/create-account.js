// create account logic
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const createBtn = document.getElementById("createAccountBtn");

const usernameMessage = document.getElementById("usernameMessage");
const emailMessage = document.getElementById("emailMessage");
const passwordMessage = document.getElementById("passwordMessage");
const confirmPasswordMessage = document.getElementById("confirmPasswordMessage");
const message = document.getElementById("createAccountMessage");

const usernamePattern = /^[A-Za-z0-9_-]+$/;

//clear message if empty
function clearMainMessage() {
    message.textContent = "";
    message.className = "";
}

//clear message when field is being edited
[username, email, password, confirmPassword].forEach(input => {
    input.addEventListener("input", clearMainMessage);
});

//validate username
// function validateUsername() {
//     const usernameValue = username.value.trim();
//     usernameMessage.textContent = "";

//     if (!usernameValue) {
//         usernameMessage.textContent = "Username is required.";
//         return false;
//     }

//     if (!usernamePattern.test(usernameValue)) {
//         usernameMessage.textContent = "Please enter a valid username.";
//         return false;
//     }

//     usernameMessage.textContent = "";
//     return true;
// }

//updated validate username to check if it already exists
async function validateUsername() {
    const usernameValue = username.value.trim();
    usernameMessage.textContent = "";

    if (!usernameValue) {
        usernameMessage.textContent = "Username is required.";
        return false;
    }

    if (!usernamePattern.test(usernameValue)) {
        usernameMessage.textContent = "Please enter a valid username.";
        return false;
    }

    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/auth/check-username?username=${encodeURIComponent(usernameValue)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to check username.");
        }

        if (data.exists) {
            usernameMessage.textContent = "Username already exists.";
            return false;
        }

        usernameMessage.textContent = "Username available.";
        usernameMessage.className = "fieldMessage success";
        return true;

    } catch (error) {
        console.error("Username check error:", error);
        usernameMessage.textContent = "Error checking username.";
        return false;
    }
}

//validate email
function validateEmail() {
    const emailValue = email.value.trim();
    emailMessage.textContent = "";

    if (!emailValue) {
        emailMessage.textContent = "Email is required.";
        return false;
    }

    //built-in email check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        emailMessage.textContent = "Please enter a valid email address.";
        return false;
    }

    emailMessage.textContent = "";
    return true;
}

//validate password
function validatePassword() {
    const passwordValue = password.value.trim();
    passwordMessage.textContent = "";

    if (!passwordValue) {
        passwordMessage.textContent = "Password is required.";
        return false;
    }

    if (passwordValue.length < 6) {
        passwordMessage.textContent = "Password must be at least 6 characters long.";
        return false;
    }

    passwordMessage.textContent = "";
    return true;
}

//validate confirm password
function validateConfirmPassword() {
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
    confirmPasswordMessage.textContent = "";

    if (!confirmPasswordValue) {
        confirmPasswordMessage.textContent = "Please confirm your password.";
        return false;
    }

    if (passwordValue !== confirmPasswordValue) {
        confirmPasswordMessage.textContent = "Passwords do not match.";
        return false;
    }

    confirmPasswordMessage.textContent = "";
    return true;
}

//run validation when user leaves the field
username.addEventListener("blur", validateUsername);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);

//create account submit
createBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    clearMainMessage();

    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
        message.textContent = "Please fix the errors above.";
        message.className = "error";
        return;
    }

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
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

        message.textContent = "Account created successfully. Redirecting...";
        //linked to css
        message.className = "success";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    } catch (error) {
        console.error("Create account error:", error);
        message.textContent = error.message;
        //linked to css
        message.className = "error";
    }
});