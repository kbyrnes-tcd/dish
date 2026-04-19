const profileForm = document.getElementById("profileForm");
const passwordForm = document.getElementById("passwordForm");
const deleteAccountBtn = document.getElementById("deleteAccountBtn");

const profileUsernameInput = document.getElementById("profileUsernameInput");
const profileEmailInput = document.getElementById("profileEmailInput");

const avatarInput = document.getElementById("avatarInput");
const avatarPreview = document.getElementById("avatarPreview");
const avatarPreviewLetter = document.getElementById("avatarPreviewLetter");

const profileMessage = document.getElementById("profileMessage");
const passwordMessage = document.getElementById("passwordMessage");
const deleteMessage = document.getElementById("deleteMessage");

function setMessage(element, text, type) {
    element.textContent = text;
    element.className = type;
}

async function loadProfileData() {
    try {
        const response = await fetch("http://127.0.0.1:8000/user/profile", {
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not load profile");
        }

        profileUsernameInput.value = data.user.username;
        profileEmailInput.value = data.user.email;

        avatarPreviewLetter.textContent = data.user.username.charAt(0).toUpperCase();
    } catch (error) {
        console.error("Load profile error:", error);
        window.location.href = "login.html";
    }
}

if (avatarInput) {
    avatarInput.addEventListener("change", () => {
        const file = avatarInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            avatarPreview.innerHTML = `<img src="${e.target.result}" alt="Avatar preview">`;
        };
        reader.readAsDataURL(file);
    });
}

profileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    setMessage(profileMessage, "", "");

    const usernameValue = profileUsernameInput.value.trim();
    const emailValue = profileEmailInput.value.trim();

    if (!usernameValue || !emailValue) {
        setMessage(profileMessage, "Username and email are required.", "errorMessage");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/user/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username: usernameValue,
                email: emailValue
            })
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(profileMessage, data.message || "Could not update profile.", "errorMessage");
            return;
        }

        setMessage(profileMessage, data.message || "Profile updated successfully.", "successMessage");

        if (usernameValue) {
            avatarPreviewLetter.textContent = usernameValue.charAt(0).toUpperCase();
        }
    } catch (error) {
        console.error("Profile update error:", error);
        setMessage(profileMessage, "Something went wrong.", "errorMessage");
    }
});

passwordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    setMessage(passwordMessage, "", "");

    const currentPassword = document.getElementById("currentPassword").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
        setMessage(passwordMessage, "All password fields are required.", "errorMessage");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/user/password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                currentPassword,
                newPassword,
                confirmPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(passwordMessage, data.message || "Could not update password.", "errorMessage");
            return;
        }

        setMessage(passwordMessage, data.message || "Password updated successfully.", "successMessage");
        passwordForm.reset();
    } catch (error) {
        console.error("Password update error:", error);
        setMessage(passwordMessage, "Something went wrong.", "errorMessage");
    }
});

deleteAccountBtn.addEventListener("click", async () => {
    const confirmed = confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (!confirmed) return;

    setMessage(deleteMessage, "", "");

    try {
        const response = await fetch("http://127.0.0.1:8000/user", {
            method: "DELETE",
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(deleteMessage, data.message || "Could not delete account.", "errorMessage");
            return;
        }

        window.location.href = "welcome.html";
    } catch (error) {
        console.error("Delete account error:", error);
        setMessage(deleteMessage, "Something went wrong.", "errorMessage");
    }
});

loadProfileData();