const headerAvatarLetter = document.getElementById("headerAvatarLetter");

const profileDetailsForm = document.getElementById("profileDetailsForm");
const passwordForm = document.getElementById("passwordForm");
const deleteAccountBtn = document.getElementById("deleteAccountBtn");

const profileUsernameInput = document.getElementById("profileUsernameInput");
const profileEmailInput = document.getElementById("profileEmailInput");

const profileDetailsMessage = document.getElementById("profileDetailsMessage");
const passwordMessage = document.getElementById("passwordMessage");
const deleteAccountMessage = document.getElementById("deleteAccountMessage");

function setMessage(element, text, type) {
    if (!element) return;

    element.textContent = text;
    element.className = `profileMessage ${type}`;
}

async function safeJson(response) {
    try {
        return await response.json();
    } catch {
        return {};
    }
}

/* ----------------- load current user ------------------ */

async function loadCurrentUser() {
    try {
        const response = await fetch("/api/auth/me", {
            credentials: "include"
        });

        const data = await safeJson(response);

        if (response.status === 401) {
            window.location.href = "login.html";
            return;
        }

        if (!response.ok) {
            throw new Error(data.message || "Failed to load user.");
        }

        const user = data.user;

        if (profileUsernameInput) {
            profileUsernameInput.value = user.username || "";
        }

        if (profileEmailInput) {
            profileEmailInput.value = user.email || "";
        }

        if (headerAvatarLetter) {
            headerAvatarLetter.textContent =
                (user.username?.charAt(0) || "?").toUpperCase();
        }
    } catch (error) {
        console.error("Load current user error:", error);
    }
}

/* ----------------- update profile ------------------ */

if (profileDetailsForm) {
    profileDetailsForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        setMessage(profileDetailsMessage, "", "");

        const username = profileUsernameInput.value.trim();
        const email = profileEmailInput.value.trim().toLowerCase();

        if (!username || !email) {
            setMessage(profileDetailsMessage, "Username and email are required.", "errorMessage");
            return;
        }

        try {
            const response = await fetch("/api/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ username, email })
            });

            const data = await safeJson(response);

            if (!response.ok) {
                setMessage(profileDetailsMessage, data.message || "Could not update profile.", "errorMessage");
                return;
            }

            if (headerAvatarLetter) {
                headerAvatarLetter.textContent = username.charAt(0).toUpperCase();
            }

            setMessage(profileDetailsMessage, data.message || "Profile updated successfully.", "successMessage");

        } catch (error) {
            console.error("Profile update error:", error);
            setMessage(profileDetailsMessage, "Something went wrong.", "errorMessage");
        }
    });
}

/* ----------------- change password ------------------ */

if (passwordForm) {
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

        if (newPassword.length < 6) {
            setMessage(passwordMessage, "New password must be at least 6 characters long.", "errorMessage");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage(passwordMessage, "New passwords do not match.", "errorMessage");
            return;
        }

        try {
            const response = await fetch("/api/user/password", {
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

            const data = await safeJson(response);

            if (!response.ok) {
                setMessage(passwordMessage, data.message || "Could not update password.", "errorMessage");
                return;
            }

            passwordForm.reset();
            setMessage(passwordMessage, data.message || "Password updated successfully.", "successMessage");

        } catch (error) {
            console.error("Password update error:", error);
            setMessage(passwordMessage, "Something went wrong.", "errorMessage");
        }
    });
}

/* ----------------- delete account ------------------ */

if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This cannot be undone."
        );

        if (!confirmed) return;

        setMessage(deleteAccountMessage, "", "");

        try {
            const response = await fetch("/api/user", {
                method: "DELETE",
                credentials: "include"
            });

            const data = await safeJson(response);

            if (!response.ok) {
                setMessage(deleteAccountMessage, data.message || "Could not delete account.", "errorMessage");
                return;
            }

            window.location.href = "welcome.html";

        } catch (error) {
            console.error("Delete account error:", error);
            setMessage(deleteAccountMessage, "Something went wrong.", "errorMessage");
        }
    });
}

/* ----------------- init ------------------ */

loadCurrentUser();