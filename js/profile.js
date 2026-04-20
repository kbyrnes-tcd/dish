const usernameEl = document.getElementById("profileUsername");
const emailEl = document.getElementById("profileEmail");
const avatarLetterEl = document.getElementById("avatarLetter");
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

const foods = [
    "Apple.svg",
    "Asparagus.svg",
    "Avocado.svg",
    "Baby Bottle.svg",
    "Bacon.svg",
    "Banana Split.svg",
    "Banana.svg",
    "Bar.svg",
    "Bavarian Beer Mug.svg",
    "Bavarian Pretzel.svg",
    "Bavarian Wheat Beer.svg",
    "Beer Bottle.svg",
    "Beer Can.svg",
    "Beer.svg",
    "Beet.svg",
    "Birthday Cake.svg",
    "Bottle of Water.svg",
    "Bread.svg",
    "Broccoli.svg",
    "Cabbage.svg",
    "Cafe.svg",
    "Carrot.svg",
    "Celery.svg",
    "Cheese.svg",
    "Cherry.svg",
    "Chili Pepper.svg",
    "Cinnamon Roll.svg",
    "Citrus.svg",
    "Cocktail.svg",
    "Coconut Cocktail.svg",
    "Coffee Pot.svg",
    "Coffee to Go.svg",
    "Cookies.svg",
    "Corn.svg",
    "Cotton Candy.svg",
    "Crab.svg",
    "Cucumber.svg",
    "Cup.svg",
    "Cupcake.svg",
    "Dim Sum.svg",
    "Dolmades.svg",
    "Doughnut.svg",
    "Dragon Fruit.svg",
    "Durian.svg",
    "Eggplant.svg",
    "Eggs.svg",
    "Espresso Cup.svg",
    "Fish Food.svg",
    "Food And Wine.svg",
    "French Fries.svg",
    "French Press.svg",
    "Garlic.svg",
    "Grapes.svg",
    "Hamburger.svg",
    "Hazelnut.svg",
    "Honey.svg",
    "Hops.svg",
    "Hot Chocolate.svg",
    "Hot Dog.svg",
    "Ice Cream Cone.svg",
    "Ingredients.svg",
    "Kebab.svg",
    "Kiwi.svg",
    "Kohlrabi.svg",
    "Leek.svg",
    "Lettuce.svg",
    "Macaron.svg",
    "Melon.svg",
    "Milk.svg",
    "Nachos.svg",
    "Natural Food.svg",
    "Noodles.svg",
    "Nut.svg",
    "Octopus.svg",
    "Olive Oil.svg",
    "Olive.svg",
    "Onion.svg",
    "Organic Food.svg",
    "Pancake.svg",
    "Paprika.svg",
    "Pastry Bag.svg",
    "Peach.svg",
    "Peanuts.svg",
    "Pear.svg",
    "Peas.svg",
    "Pepper Shaker.svg",
    "Pie.svg",
    "Pineapple.svg",
    "Pizza.svg",
    "Plum.svg",
    "Pomegranate.svg",
    "Porridge.svg",
    "Potato.svg",
    "Prawn.svg",
    "Pretzel.svg",
    "Quesadilla.svg",
    "Rack of Lamb.svg",
    "Radish.svg",
    "Raspberry.svg",
    "Rice Bowl.svg",
    "Sack of Flour.svg",
    "Salt Shaker.svg",
    "Sauce.svg",
    "Sesame.svg",
    "Spaghetti.svg",
    "Spoon of Sugar.svg",
    "Steak.svg",
    "Strawberry.svg",
    "Sugar Cube.svg",
    "Sugar.svg",
    "Sushi.svg",
    "Sweet Potato.svg",
    "Taco.svg",
    "Tapas.svg",
    "Tea Cup.svg",
    "Tea.svg",
    "Teapot.svg",
    "Thanksgiving.svg",
    "Tin Can.svg",
    "Tomato.svg",
    "Vegan Food.svg",
    "Vegan Symbol.svg",
    "Watermelon.svg",
    "Wine Bottle.svg",
    "Wine Glass.svg",
    "Wrap.svg"
];

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

function animateXpGain(startXp, endXp, duration = 1400) {
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentXp = startXp + (endXp - startXp) * eased;

        renderXpAtValue(currentXp);

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            renderXpAtValue(endXp);
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

function popFood() {
    if (!popLayer) return;

    clearPops();

    for (let i = 0; i < 18; i += 1) {
        const item = document.createElement("span");
        const food = foods[Math.floor(Math.random() * foods.length)];
        const icon = document.createElement("img");

        item.className = "foodPop";
        icon.src = `assets/food-icons/${encodeURIComponent(food)}`;
        icon.alt = "";
        item.appendChild(icon);
        item.style.setProperty("--x", `${66 + Math.random() * 22}%`);
        item.style.setProperty("--y", `${39 + Math.random() * 18}%`);
        item.style.setProperty("--dx", `${Math.round((Math.random() - 0.5) * 76)}px`);
        item.style.setProperty("--dy", `${Math.round(-24 - Math.random() * 38)}px`);
        item.style.setProperty("--turn", `${Math.round((Math.random() - 0.5) * 18)}deg`);
        popLayer.appendChild(item);
    }

    if (tapHint) {
        tapHint.textContent = "Congratulations! Tap the turtle";
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
            tapHint.textContent = "Congratulations! Tap the turtle";
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
        const currentLevel = Number(user.level) || getLevelFromXp(currentXp);

        if (usernameEl) {
            usernameEl.textContent = user.username;
        }

        if (emailEl) {
            emailEl.textContent = user.email;
        }

        if (avatarLetterEl) {
            avatarLetterEl.textContent = user.username.charAt(0).toUpperCase();
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

if (turtle) {
    turtle.addEventListener("click", popFood);
}

if (levelClose) {
    levelClose.addEventListener("click", closeLevelUp);
}

if (continueButton) {
    continueButton.addEventListener("click", closeLevelUp);
}

loadProfile();