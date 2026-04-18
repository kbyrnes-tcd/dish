const resetEmail = document.getElementById("resetEmail");
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");

const resetEmailMessage = document.getElementById("resetEmailMessage");
const forgotPasswordMessage = document.getElementById("forgotPasswordMessage");

function clearMainMessage() {
    forgotPasswordMessage.textContent = "";
    forgotPasswordMessage.className = "";
}

resetEmail.addEventListener("input", clearMainMessage);

function validateEmail() {
    const emailValue = resetEmail.value.trim();
    resetEmailMessage.textContent = "";

    if (!emailValue) {
        resetEmailMessage.textContent = "Email is required.";
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        resetEmailMessage.textContent = "Please enter a valid email address.";
        return false;
    }

    return true;
}

resetEmail.addEventListener("blur", validateEmail);

forgotPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    clearMainMessage();

    if (!validateEmail()) {
        forgotPasswordMessage.textContent = "Please fix the errors above.";
        forgotPasswordMessage.className = "error";
        return;
    }

    const emailValue = resetEmail.value.trim().toLowerCase();
    forgotPasswordBtn.disabled = true;
    forgotPasswordBtn.textContent = "Sending...";

    try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: emailValue
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not create reset link.");
        }

        forgotPasswordMessage.textContent = "Reset link ready. Redirecting...";
        forgotPasswordMessage.className = "success";

        setTimeout(() => {
            window.location.href = data.resetLink;
        }, 1000);

    } catch (error) {
        console.error("Forgot password error:", error);
        forgotPasswordMessage.textContent = error.message;
        forgotPasswordMessage.className = "error";
    } finally {
        forgotPasswordBtn.disabled = false;
        forgotPasswordBtn.textContent = "Send reset link";
    }
});
