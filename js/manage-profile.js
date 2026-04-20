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
    if (!element) return;
    element.textContent = text;
    element.className = type;
}

async function safeJson(response) {
    try {
        return await response.json();
    } catch {
        return {};
    }
}

async function loadProfileData() {
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
            throw new Error(data.message || "Could not load profile.");
        }

        const user = data.user;

        if (profileUsernameInput) {
            profileUsernameInput.value = user.username || "";
        }

        if (profileEmailInput) {
            profileEmailInput.value = user.email || "";
        }

        const existingImg = avatarPreview?.querySelector("img");

        if (!existingImg && avatarPreview) {
            avatarPreview.innerHTML = `<span id="avatarPreviewLetter">${usernameValue.charAt(0).toUpperCase()}</span>`;
        }
    } catch (error) {
        console.error("Load profile error:", error);
        window.location.href = "login.html";
    }
}

if (avatarInput) {
    avatarInput.addEventListener("change", async () => {
        const file = avatarInput.files[0];
        if (!file) return;

        const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

        if (!allowedTypes.includes(file.type)) {
            setMessage(profileMessage, "Please upload a PNG, JPEG, or WEBP image.", "errorMessage");
            avatarInput.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            if (avatarPreview) {
                avatarPreview.innerHTML = `<img src="${e.target.result}" alt="Avatar preview">`;
            }
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const response = await fetch("/api/user/avatar", {
                method: "PUT",
                credentials: "include",
                body: formData
            });

            const data = await safeJson(response);

            if (!response.ok) {
                setMessage(profileMessage, data.message || "Could not update avatar.", "errorMessage");
                return;
            }

            setMessage(profileMessage, data.message || "Avatar updated successfully.", "successMessage");
        } catch (error) {
            console.error("Avatar upload error:", error);
            setMessage(profileMessage, "Something went wrong.", "errorMessage");
        }
    });
}

if (profileForm) {
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
            const response = await fetch("/api/user/profile", {
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

            const data = await safeJson(response);

            if (!response.ok) {
                setMessage(profileMessage, data.message || "Could not update profile.", "errorMessage");
                return;
            }

            setMessage(profileMessage, data.message || "Profile updated successfully.", "successMessage");

            if (avatarPreview) {
                if (user.avatar_path) {
                    avatarPreview.innerHTML = `<img src="${user.avatar_path}" alt="Avatar preview">`;
                } else {
                    avatarPreview.innerHTML = `<span id="avatarPreviewLetter">${(user.username?.charAt(0) || "?").toUpperCase()}</span>`;
                }
            }
        } catch (error) {
            console.error("Profile update error:", error);
            setMessage(profileMessage, "Something went wrong.", "errorMessage");
        }
    });
}

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

        if (newPassword !== confirmPassword) {
            setMessage(passwordMessage, "New passwords do not match.", "errorMessage");
            return;
        }

        if (newPassword.length < 6) {
            setMessage(passwordMessage, "New password must be at least 6 characters long.", "errorMessage");
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

            setMessage(passwordMessage, data.message || "Password updated successfully.", "successMessage");
            passwordForm.reset();
        } catch (error) {
            console.error("Password update error:", error);
            setMessage(passwordMessage, "Something went wrong.", "errorMessage");
        }
    });
}

if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", async () => {
        const confirmed = confirm("Are you sure you want to delete your account? This cannot be undone.");
        if (!confirmed) return;

        setMessage(deleteMessage, "", "");

        try {
            const response = await fetch("/api/user", {
                method: "DELETE",
                credentials: "include"
            });

            const data = await safeJson(response);

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
}

loadProfileData();