document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("currentDishContainer");

    const savedDish = localStorage.getItem("currentDish");

    if (!savedDish) {
        container.innerHTML = "<p>No dish selected yet.</p>";
        return;
    }

    const dish = JSON.parse(savedDish);

    container.innerHTML = `
        <div class="dishCard currentDishCard">
            <div class="dishCardTop">
                <p class="dishRestaurant">${dish.restaurant_name}</p>
                <p>${dish.dish_name}</p>
                <p>${dish.restaurant_location}</p>
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
    `;
});