const usernameEl = document.getElementById("profileUsername");
const emailEl = document.getElementById("profileEmail");
const avatarContainer = document.getElementById("profileAvatar");
const logoutBtn = document.getElementById("logoutBtn");

const xpTextEl = document.getElementById("profileXpText");
const levelTextEl = document.getElementById("profileLevelText");
const xpBarEl = document.getElementById("profileXpBar");

const levelOverlay = document.getElementById("levelOverlay");
const levelClose = document.getElementById("levelClose");
const continueButton = document.getElementById("continueButton");
const turtle = document.getElementById("turtle");
const popLayer = document.getElementById("popLayer");
const tapHint = document.getElementById("tapHint");
const levelText = document.getElementById("levelText");
const oldLevel = document.getElementById("oldLevel");
const newLevel = document.getElementById("newLevel");
const levelSound = document.getElementById("levelSound");

const XP_PER_LEVEL = 250;

let readyTimer;

const sparkColors = ["#ffd34d", "#FF6128", "#7bc67b", "#5db7de", "#f47aa3"];

function getAvatarLetter(username = "") {
    return (username?.charAt(0) || "?").toUpperCase();
}

function renderDefaultAvatar(username = "") {
    if (!avatarContainer) return;

    avatarContainer.innerHTML = `
        <span class="avatar-letter" id="avatarLetter">${getAvatarLetter(username)}</span>
    `;
}

function renderImageAvatar(avatarUrl, username = "") {
    if (!avatarContainer) return;

    avatarContainer.innerHTML = `
        <img
            src="${avatarUrl}"
            alt="Profile avatar"
            class="profileAvatarImage"
        >
    `;

    const img = avatarContainer.querySelector(".profileAvatarImage");

    if (img) {
        img.addEventListener("error", () => {
            renderDefaultAvatar(username);
        });
    }
}

function getLevelFromXp(xp) {
    return Math.floor((Number(xp) || 0) / XP_PER_LEVEL) + 1;
}

function getXpIntoLevel(xp) {
    return (Number(xp) || 0) % XP_PER_LEVEL;
}

function getProgressPercent(xp) {
    return (getXpIntoLevel(xp) / XP_PER_LEVEL) * 100;
}

function renderXp(userXp, userLevel) {
    const safeXp = Number(userXp) || 0;
    const safeLevel = Number(userLevel) || 1;
    const xpIntoLevel = getXpIntoLevel(safeXp);
    const progressPercent = getProgressPercent(safeXp);

    if (xpTextEl) {
        xpTextEl.textContent = `${xpIntoLevel} / ${XP_PER_LEVEL} XP`;
    }

    if (levelTextEl) {
        levelTextEl.textContent = `Level ${safeLevel}`;
    }

    if (xpBarEl) {
        xpBarEl.style.width = `${progressPercent}%`;
    }
}

function renderXpAtValue(totalXp) {
    const level = getLevelFromXp(totalXp);
    renderXp(totalXp, level);
}

function setXpBarOnly(totalXp) {
    const progressPercent = getProgressPercent(totalXp);

    if (xpBarEl) {
        xpBarEl.style.width = `${progressPercent}%`;
    }
}

function animateXpGain(startXp, endXp, duration = 1400) {
    const startTime = performance.now();
    const startLevel = getLevelFromXp(startXp);
    const endLevel = getLevelFromXp(endXp);

    if (xpTextEl) {
        xpTextEl.textContent = `${getXpIntoLevel(startXp)} / ${XP_PER_LEVEL} XP`;
    }

    if (levelTextEl) {
        levelTextEl.textContent = `Level ${startLevel}`;
    }

    setXpBarOnly(startXp);

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentXp = startXp + (endXp - startXp) * eased;

        setXpBarOnly(currentXp);

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            if (xpTextEl) {
                xpTextEl.textContent = `${getXpIntoLevel(endXp)} / ${XP_PER_LEVEL} XP`;
            }

            if (levelTextEl) {
                levelTextEl.textContent = `Level ${endLevel}`;
            }

            setXpBarOnly(endXp);
        }
    }

    requestAnimationFrame(step);
}

function clearPops() {
    if (popLayer) {
        popLayer.innerHTML = "";
    }
}

function playSound() {
    if (!levelSound) return;
    levelSound.currentTime = 0;
    levelSound.play().catch(() => {});
}

function popSpark() {
    if (!popLayer) return;

    clearPops();

    for (let i = 0; i < 18; i += 1) {
        const item = document.createElement("span");
        const isRibbon = i % 3 === 0;

        item.className = isRibbon ? "ribbonPop" : "sparkPop";
        item.style.setProperty("--x", `${64 + Math.random() * 24}%`);
        item.style.setProperty("--y", `${35 + Math.random() * 20}%`);
        item.style.setProperty("--dx", `${Math.round((Math.random() - 0.5) * 120)}px`);
        item.style.setProperty("--dy", `${Math.round(-28 - Math.random() * 64)}px`);
        item.style.setProperty("--turn", `${Math.round((Math.random() - 0.5) * 80)}deg`);
        item.style.setProperty("--color", sparkColors[Math.floor(Math.random() * sparkColors.length)]);
        popLayer.appendChild(item);
    }
}

function showLevelUp(startLevel, nextLevel) {
    if (!levelOverlay) return;

    clearTimeout(readyTimer);
    clearPops();
    playSound();

    if (levelText) {
        levelText.textContent = `Level ${startLevel} to Level ${nextLevel}`;
    }

    if (oldLevel) {
        oldLevel.textContent = `Level ${startLevel}`;
    }

    if (newLevel) {
        newLevel.textContent = `Level ${nextLevel}`;
    }

    if (tapHint) {
        tapHint.textContent = "Congratulations!";
    }

    levelOverlay.classList.remove("show", "ready");
    void levelOverlay.offsetWidth;
    levelOverlay.classList.add("show");
    levelOverlay.setAttribute("aria-hidden", "false");

    readyTimer = setTimeout(() => {
        levelOverlay.classList.add("ready");

        if (tapHint) {
            tapHint.textContent = "Congratulations!";
        }

        popSpark();
    }, 1850);
}

function closeLevelUp() {
    if (!levelOverlay) return;

    clearTimeout(readyTimer);
    levelOverlay.classList.remove("show", "ready");
    levelOverlay.setAttribute("aria-hidden", "true");
    clearPops();
}

async function loadProfile() {
    try {
        const response = await fetch("/api/auth/me", {
            credentials: "include"
        });

        const data = await response.json();

        if (response.status === 401) {
            window.location.href = "login.html";
            return;
        }

        if (!response.ok) {
            throw new Error(data.message || "Failed to load profile.");
        }

        const user = data.user;
        const currentXp = Number(user.xp) || 0;
        const currentLevel = getLevelFromXp(currentXp);

        if (usernameEl) {
            usernameEl.textContent = user.username;
        }

        if (emailEl) {
            emailEl.textContent = user.email;
        }

        if (user.avatarUrl) {
            renderImageAvatar(user.avatarUrl, user.username || "");
        } else {
            renderDefaultAvatar(user.username || "");
        }

        const params = new URLSearchParams(window.location.search);
        const xpGained = Number(params.get("xpGained")) || 0;

        if (xpGained > 0) {
            const previousXp = Math.max(currentXp - xpGained, 0);
            const previousLevel = getLevelFromXp(previousXp);

            renderXpAtValue(previousXp);

            setTimeout(() => {
                animateXpGain(previousXp, currentXp, 1400);
            }, 150);

            if (currentLevel > previousLevel) {
                setTimeout(() => {
                    showLevelUp(previousLevel, currentLevel);
                }, 1550);
            }

            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        } else {
            renderXp(currentXp, currentLevel);
        }

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

if (levelClose) {
    levelClose.addEventListener("click", closeLevelUp);
}

if (continueButton) {
    continueButton.addEventListener("click", closeLevelUp);
}

loadProfile();