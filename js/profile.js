// profile logic
const usernameEl = document.getElementById("profileUsername");
const emailEl = document.getElementById("profileEmail");
const avatarLetterEl = document.getElementById("avatarLetter");
const logoutBtn = document.getElementById("logoutBtn");

const xpTextEl = document.getElementById("profileXpText");
const levelTextEl = document.getElementById("profileLevelText");
const xpBarEl = document.getElementById("profileXpBar");

function renderXp(userXp, userLevel) {
    const xpPerLevel = 250;
    const safeXp = Number(userXp) || 0;
    const safeLevel = Number(userLevel) || 1;

    const xpIntoLevel = safeXp % xpPerLevel;
    const progressPercent = (xpIntoLevel / xpPerLevel) * 100;

    xpTextEl.textContent = `XP: ${xpIntoLevel}/${xpPerLevel}`;
    levelTextEl.textContent = `Level ${safeLevel}`;
    xpBarEl.style.width = `${progressPercent}%`;
}

// load current user
async function loadProfile() {
    try {
        const response = await fetch("/api/auth/me", {
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Not logged in");
        }

        const user = data.user;

        usernameEl.textContent = user.username;
        emailEl.textContent = user.email;
        avatarLetterEl.textContent = user.username.charAt(0).toUpperCase();
        renderXp(user.xp, user.level);

    } catch (error) {
        console.error("Profile load error:", error);

        // redirect if not logged in
        window.location.href = "login.html";
    }
}

// logout
logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        window.location.href = "welcome.html";

    } catch (error) {
        console.error("Logout error:", error);
    }
});

// run on page load
loadProfile();