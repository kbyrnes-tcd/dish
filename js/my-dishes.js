document.addEventListener("DOMContentLoaded", () => {
    const currentContainer = document.getElementById("currentDishContainer");
    const pastContainer = document.getElementById("pastDishesContainer");
    const returnLink = document.getElementById("returnLinkContainer");

    function getXpValue(price) {
        if (price === "€") return 50;
        if (price === "€€") return 100;
        if (price === "€€€") return 150;
        return 0;
    }

    function getCuisineImage(cuisine) {
        const cuisineMap = {
            Italian: "assets/image-food-placeholder.jpg",
            Japanese: "assets/image-food-placeholder.jpg",
            Mexican: "assets/image-food-placeholder.jpg",
            Indian: "assets/image-food-placeholder.jpg",
            Chinese: "assets/image-food-placeholder.jpg",
            Thai: "assets/image-food-placeholder.jpg",
            Irish: "assets/image-food-placeholder.jpg",
            French: "assets/image-food-placeholder.jpg",
            Greek: "assets/image-food-placeholder.jpg",
            American: "assets/image-food-placeholder.jpg"
        };

        return cuisineMap[cuisine] || "assets/image-food-placeholder.jpg";
    }

    function renderCurrentDish(dish) {
        const xpValue = getXpValue(dish.restaurant_price);
        const imageUrl = getCuisineImage(dish.restaurant_cuisine);

        currentContainer.innerHTML = `
            <div class="featuredDishCard">
                <div class="featuredDishImage" style="background-image: url('${imageUrl}')">
                    <div class="xpTag">+ ${xpValue} XP</div>
                </div>

                <div class="featuredDishContent">
                    <p class="featuredDishMeta">
                        ${dish.restaurant_cuisine} - ${dish.restaurant_price}
                    </p>

                    <h2 class="featuredDishName">${dish.dish_name}</h2>

                    <div class="featuredDishRestaurantBlock">
                        <p class="featuredDishRestaurant">${dish.restaurant_name}</p>
                        <p class="featuredDishAddress">
                            ${dish.restaurant_address || dish.restaurant_location}
                        </p>
                    </div>

                    <button class="triedItBtn" data-user-dish-id="${dish.user_dish_id}">
                        Tried it!
                    </button>
                </div>
            </div>
        `;
    }

    function renderPastDishes(dishes) {
        if (!dishes || dishes.length === 0) {
            pastContainer.innerHTML = `<p>No past dishes yet.</p>`;
            return;
        }

        pastContainer.innerHTML = dishes.map(dish => `
            <div class="dishCard pastDishCard">
                <div class="dishCardTop">
                    <p class="dishRestaurant">${dish.restaurant_name}</p>
                    <p>${dish.dish_name}</p>
                    <p>${dish.restaurant_address || dish.restaurant_location}</p>
                </div>

                <div class="dishDivider"></div>

                <div class="dishMeta">
                    <div class="dishMetaItem">
                        <p class="dishMetaLabel">Cuisine Type</p>
                        <p>${dish.restaurant_cuisine}</p>
                    </div>

                    <div class="dishMetaItem">
                        <p class="dishMetaLabel">Location</p>
                        <p>${dish.restaurant_location}</p>
                    </div>

                    <div class="dishMetaItem">
                        <p class="dishMetaLabel">Price Range</p>
                        <p>${dish.restaurant_price}</p>
                    </div>
                </div>
            </div>
        `).join("");
    }

    async function loadMyDishes() {
        try {
            returnLink.hidden = true;

            const currentResponse = await fetch("http://127.0.0.1:8000/api/user-dishes/current", {
                credentials: "include"
            });

            if (currentResponse.status === 401) {
                window.location.href = "login.html";
                return;
            }

            if (currentResponse.status === 404) {
                currentContainer.innerHTML = `<p>No current dish yet.</p>`;
                returnLink.hidden = true;
            } else if (!currentResponse.ok) {
                const errorData = await currentResponse.json();
                throw new Error(errorData.message || "Failed to load current dish.");
            } else {
                const currentDish = await currentResponse.json();
                renderCurrentDish(currentDish);
                returnLink.hidden = false;
            }

            const historyResponse = await fetch("http://127.0.0.1:8000/api/user-dishes/history", {
                credentials: "include"
            });

            if (!historyResponse.ok) {
                const errorData = await historyResponse.json();
                throw new Error(errorData.message || "Failed to load dish history.");
            }

            const historyDishes = await historyResponse.json();
            renderPastDishes(historyDishes);

        } catch (error) {
            console.error("My dishes load error:", error);
            currentContainer.innerHTML = `<p>Unable to load your dishes right now.</p>`;
            pastContainer.innerHTML = "";
        }
    }

    document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("triedItBtn")) return;

    const userDishId = e.target.dataset.userDishId;
    window.location.href = `review.html?userDishId=${userDishId}`;
});

    loadMyDishes();
});