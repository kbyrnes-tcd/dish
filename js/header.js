// header avatar logic
const avatarLetterEl = document.getElementById("headerAvatarLetter");
const avatarContainer = document.getElementById("headerAvatar");

async function loadHeaderAvatar() {
    try {
        const response = await fetch("/api/auth/me", {
            credentials: "include"
        });

        if (!response.ok) {
            if (avatarContainer) avatarContainer.style.display = "none";
            return;
        }

        const data = await response.json();
        const user = data.user;

        if (avatarLetterEl && user?.username) {
            avatarLetterEl.textContent = user.username.charAt(0).toUpperCase();
        }

    } catch (error) {
        console.error("Header avatar error:", error);
    }
}

if (avatarContainer) {
    avatarContainer.addEventListener("click", () => {
        window.location.href = "profile.html";
    });
}

loadHeaderAvatar();