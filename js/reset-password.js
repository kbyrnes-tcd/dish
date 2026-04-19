const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const resetPasswordBtn = document.getElementById("resetPasswordBtn");
const resetPasswordForm = document.getElementById("resetPasswordForm");

const newPasswordMessage = document.getElementById("newPasswordMessage");
const confirmPasswordMessage = document.getElementById("confirmPasswordMessage");
const resetPasswordMessage = document.getElementById("resetPasswordMessage");

const resetToken = new URLSearchParams(window.location.search).get("token");

function clearMainMessage() {
    resetPasswordMessage.textContent = "";
    resetPasswordMessage.className = "";
}

[newPassword, confirmPassword].forEach(input => {
    input.addEventListener("input", clearMainMessage);
});

function validatePassword() {
    const passwordValue = newPassword.value.trim();
    newPasswordMessage.textContent = "";

    if (!passwordValue) {
        newPasswordMessage.textContent = "Password is required.";
        return false;
    }

    if (passwordValue.length < 6) {
        newPasswordMessage.textContent = "Password must be at least 6 characters long.";
        return false;
    }

    return true;
}

function validateConfirmPassword() {
    const passwordValue = newPassword.value.trim();
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

    return true;
}

newPassword.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);

if (!resetToken) {
    resetPasswordMessage.textContent = "Reset link is missing or invalid.";
    resetPasswordMessage.className = "error";
    resetPasswordBtn.disabled = true;
}

resetPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    clearMainMessage();

    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (!resetToken || !isPasswordValid || !isConfirmPasswordValid) {
        resetPasswordMessage.textContent = "Please fix the errors above.";
        resetPasswordMessage.className = "error";
        return;
    }

    const passwordValue = newPassword.value.trim();
    resetPasswordBtn.disabled = true;
    resetPasswordBtn.textContent = "Resetting...";

    try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                token: resetToken,
                password: passwordValue
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not reset password.");
        }

        resetPasswordMessage.textContent = "Password updated. Redirecting to login...";
        resetPasswordMessage.className = "success";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    } catch (error) {
        console.error("Reset password error:", error);
        resetPasswordMessage.textContent = error.message;
        resetPasswordMessage.className = "error";
    } finally {
        resetPasswordBtn.disabled = false;
        resetPasswordBtn.textContent = "Reset password";
    }
});
