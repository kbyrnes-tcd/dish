const notificationsToggle = document.getElementById("notificationsToggle");
const privacyToggle = document.getElementById("privacyToggle");
const motionToggle = document.getElementById("motionToggle");
const themeSelect = document.getElementById("themeSelect");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const settingsMessage = document.getElementById("settingsMessage");

const SETTINGS_KEY = "dishSettings";

function setSettingsMessage(text, type) {
    settingsMessage.textContent = text;
    settingsMessage.className = type;
}

function getSavedSettings() {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : {
        notifications: true,
        privacy: false,
        reducedMotion: false,
        theme: "Default"
    };
}

function applyTheme(theme) {
    document.body.style.backgroundColor = "#ccc";
    document.querySelector(".app").style.background = "#F7F7FB";
}

function applyReducedMotion(enabled) {
    if (enabled) {
        document.documentElement.style.scrollBehavior = "auto";
    } else {
        document.documentElement.style.scrollBehavior = "smooth";
    }
}

function loadSettings() {
    const settings = getSavedSettings();

    notificationsToggle.checked = settings.notifications;
    privacyToggle.checked = settings.privacy;
    motionToggle.checked = settings.reducedMotion;
    themeSelect.value = settings.theme;

    applyTheme(settings.theme);
    applyReducedMotion(settings.reducedMotion);
}

saveSettingsBtn.addEventListener("click", () => {
    const settings = {
        notifications: notificationsToggle.checked,
        privacy: privacyToggle.checked,
        reducedMotion: motionToggle.checked,
        theme: themeSelect.value
    };

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

    applyTheme(settings.theme);
    applyReducedMotion(settings.reducedMotion);

    setSettingsMessage("Settings saved successfully.", "successMessage");
});

loadSettings();