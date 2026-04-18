document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("currentDishContainer");
    const savedDish = localStorage.getItem("currentDish");

    if (!savedDish) {
        container.innerHTML = "<p>No dish selected yet.</p>";
        return;
    }

    const dish = JSON.parse(savedDish);

    function getXpValue(price) {
        if (price === "€") return 50;
        if (price === "€€") return 100;
        if (price === "€€€") return 150;
        return 0;
    }

    function getCuisineImage(cuisine) {
        // placeholder imgs -- maybe we add when we create more illustrations
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

        return cuisineMap[dish.restaurant_cuisine] || "assets/image-food-placeholder.jpg";
    }

    const xpValue = getXpValue(dish.restaurant_price);
    const imageUrl = getCuisineImage(dish.restaurant_cuisine);

    container.innerHTML = `
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

            <button class="triedItBtn">Tried it!</button>
        </div>
    </div>
`;
});