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

    console.log("xpTextEl:", xpTextEl);
    console.log("levelTextEl:", levelTextEl);
    console.log("xpBarEl:", xpBarEl);
    console.log("Rendering XP:", {
        totalXp: safeXp,
        level: safeLevel,
        xpIntoLevel,
        progressPercent
    });

    if (xpTextEl) {
        xpTextEl.textContent = `XP: ${safeXp} total • ${xpIntoLevel}/${xpPerLevel}`;
    }

    if (levelTextEl) {
        levelTextEl.textContent = `Level ${safeLevel}`;
    }

    if (xpBarEl) {
        xpBarEl.style.width = `${progressPercent}%`;
    }
}

async function loadProfile() {
    try {
        const response = await fetch("/api/auth/me", {
            credentials: "include"
        });

        const data = await response.json();
        console.log("Profile API response:", data);

        if (response.status === 401) {
            window.location.href = "login.html";
            return;
        }

        if (!response.ok) {
            throw new Error(data.message || "Failed to load profile.");
        }

        const user = data.user;

        if (usernameEl) {
            usernameEl.textContent = user.username;
        }

        if (emailEl) {
            emailEl.textContent = user.email;
        }

        if (avatarLetterEl) {
            avatarLetterEl.textContent = user.username.charAt(0).toUpperCase();
        }

        renderXp(user.xp, user.level);

    } catch (error) {
        console.error("Profile load error:", error);
    }
}

if (logoutBtn) {
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
}

loadProfile();