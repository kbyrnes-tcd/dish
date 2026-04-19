document.addEventListener("DOMContentLoaded", () => {
    const reviewDishName = document.getElementById("reviewDishName");
    const starButtons = document.querySelectorAll(".starBtn");
    const uploadPhotosBtn = document.getElementById("uploadPhotosBtn");
    const reviewPhotosInput = document.getElementById("reviewPhotos");
    const photoPreviewContainer = document.getElementById("photoPreviewContainer");
    const postReviewBtn = document.getElementById("postReviewBtn");
    const reviewNote = document.getElementById("reviewNote");

    let selectedRating = 0;
    let currentDish = null;

    function updateStarDisplay(rating) {
        starButtons.forEach((button) => {
            const starValue = Number(button.dataset.rating);
            button.classList.toggle("active", starValue <= rating);
        });
    }

    starButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedRating = Number(button.dataset.rating);
            updateStarDisplay(selectedRating);
        });
    });

    uploadPhotosBtn.addEventListener("click", () => {
        reviewPhotosInput.click();
    });

    reviewPhotosInput.addEventListener("change", () => {
        photoPreviewContainer.innerHTML = "";

        const files = Array.from(reviewPhotosInput.files || []);

        files.forEach((file) => {
            const imageUrl = URL.createObjectURL(file);
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = "Selected review photo";
            img.className = "photoPreviewItem";
            photoPreviewContainer.appendChild(img);
        });
    });

    async function loadCurrentDish() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/user-dishes/current", {
            credentials: "include"
        });

        console.log("status:", response.status);

        if (response.status === 401) {
            window.location.href = "login.html";
            return;
        }

        if (response.status === 404) {
            reviewDishName.textContent = "your dish";
            return;
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to load dish.");
        }

        const currentDish = await response.json();
        console.log("dish:", currentDish);

        reviewDishName.textContent = currentDish.dish_name + "?";

        } catch (error) {
            console.error("Review page load error:", error);
            reviewDishName.textContent = "your dish";
        }
    }

    postReviewBtn.addEventListener("click", async () => {
        const note = reviewNote.value.trim();

        console.log({
            selectedRating,
            note,
            currentDish,
            photos: reviewPhotosInput.files
        });

        if (!selectedRating) {
            alert("Please choose a star rating.");
            return;
        }

        alert("Front-end review form is ready. Backend hookup comes next.");
    });

    loadCurrentDish();
});