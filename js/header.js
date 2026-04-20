const avatarContainer = document.getElementById("headerAvatar");

function getAvatarLetter(username = "") {
    return (username?.charAt(0) || "?").toUpperCase();
}

function renderDefaultAvatar(username = "") {
    if (!avatarContainer) return;

    avatarContainer.innerHTML = `
        <span class="headerAvatarLetter" id="headerAvatarLetter">
            ${getAvatarLetter(username)}
        </span>
    `;
}

function renderImageAvatar(avatarUrl, username = "") {
    if (!avatarContainer) return;

    avatarContainer.innerHTML = `
        <img
            src="${avatarUrl}"
            alt="Profile avatar"
            class="headerAvatarImage"
        >
    `;

    const img = avatarContainer.querySelector(".headerAvatarImage");

    if (img) {
        img.addEventListener("error", () => {
            renderDefaultAvatar(username);
        });
    }
}

async function loadHeaderAvatar() {
    try {
        const response = await fetch("/api/auth/me", {
            credentials: "include"
        });

        if (!response.ok) {
            renderDefaultAvatar("?");
            return;
        }

        const data = await response.json();
        const user = data.user || {};

        if (user.avatarUrl) {
            renderImageAvatar(user.avatarUrl, user.username || "");
        } else {
            renderDefaultAvatar(user.username || "");
        }
    } catch (error) {
        console.error("Header avatar error:", error);
        renderDefaultAvatar("?");
    }
}

if (avatarContainer) {
    avatarContainer.addEventListener("click", () => {
        window.location.href = "profile.html";
    });
}

loadHeaderAvatar();