const headerAvatarLetter = document.getElementById("headerAvatarLetter");

const notificationsToggle = document.getElementById("notificationsToggle");
const privacyToggle = document.getElementById("privacyToggle");
const motionToggle = document.getElementById("motionToggle");
const themeSelect = document.getElementById("themeSelect");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const settingsMessage = document.getElementById("settingsMessage");

const SETTINGS_KEY = "dishSettings";

function setSettingsMessage(text, type) {
    if (!settingsMessage) return;
    settingsMessage.textContent = text;
    settingsMessage.className = `profileMessage ${type}`;
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

        if (headerAvatarLetter) {
            headerAvatarLetter.textContent =
                (user.username?.charAt(0) || "?").toUpperCase();
        }
    } catch (error) {
        console.error("Load current user error:", error);
    }
}

/* ----------------- settings helpers ------------------ */

function getSavedSettings() {
    const saved = localStorage.getItem(SETTINGS_KEY);

    if (!saved) {
        return {
            notifications: true,
            privacy: false,
            reducedMotion: false,
            theme: "light"
        };
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        console.error("Settings parse error:", error);
        return {
            notifications: true,
            privacy: false,
            reducedMotion: false,
            theme: "light"
        };
    }
}

function applyTheme(theme) {
    const app = document.querySelector(".app");
    if (!app) return;

    if (theme === "dark") {
        document.body.style.backgroundColor = "#1f1f1f";
        app.style.backgroundColor = "#2b2b2b";
        app.style.color = "#ffffff";
    } else {
        document.body.style.backgroundColor = "#cccccc";
        app.style.backgroundColor = "#F7F7FB";
        app.style.color = "";
    }
}

function applyReducedMotion(enabled) {
    document.documentElement.style.scrollBehavior = enabled ? "auto" : "smooth";
}

function loadSettings() {
    if (!notificationsToggle || !privacyToggle || !motionToggle || !themeSelect) return;

    const settings = getSavedSettings();

    notificationsToggle.checked = settings.notifications;
    privacyToggle.checked = settings.privacy;
    motionToggle.checked = settings.reducedMotion;
    themeSelect.value = settings.theme;

    applyTheme(settings.theme);
    applyReducedMotion(settings.reducedMotion);
}

/* ----------------- save settings ------------------ */

if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener("click", () => {
        const settings = {
            notifications: notificationsToggle ? notificationsToggle.checked : true,
            privacy: privacyToggle ? privacyToggle.checked : false,
            reducedMotion: motionToggle ? motionToggle.checked : false,
            theme: themeSelect ? themeSelect.value : "light"
        };

        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

        applyTheme(settings.theme);
        applyReducedMotion(settings.reducedMotion);

        setSettingsMessage("Settings saved successfully.", "successMessage");
    });
}

/* ----------------- init ------------------ */

loadCurrentUser();
loadSettings();