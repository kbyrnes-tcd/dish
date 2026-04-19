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
    let selectedFiles = [];

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

    function syncFileInput() {
        const dataTransfer = new DataTransfer();

        selectedFiles.forEach((file) => {
            dataTransfer.items.add(file);
        });

        reviewPhotosInput.files = dataTransfer.files;
    }

    function renderPhotoPreviews() {
        photoPreviewContainer.innerHTML = "";

        selectedFiles.forEach((file, index) => {
            const imageUrl = URL.createObjectURL(file);

            const wrapper = document.createElement("div");
            wrapper.className = "photoPreviewWrapper";

            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = "Selected review photo";
            img.className = "photoPreviewItem";

            const removeBtn = document.createElement("button");
            removeBtn.type = "button";
            removeBtn.className = "photoRemoveBtn";
            removeBtn.innerHTML = "&times;";
            removeBtn.setAttribute("aria-label", "Remove photo");

            removeBtn.addEventListener("click", () => {
                selectedFiles.splice(index, 1);
                syncFileInput();
                renderPhotoPreviews();
            });

            wrapper.appendChild(img);
            wrapper.appendChild(removeBtn);
            photoPreviewContainer.appendChild(wrapper);
        });
    }

    reviewPhotosInput.addEventListener("change", () => {
        const newFiles = Array.from(reviewPhotosInput.files || []);
        selectedFiles = [...selectedFiles, ...newFiles];

        syncFileInput();
        renderPhotoPreviews();
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
                reviewDishName.textContent = "your dish?";
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to load dish.");
            }

            currentDish = await response.json();
            console.log("dish:", currentDish);

            reviewDishName.textContent = currentDish.dish_name + "?";
        } catch (error) {
            console.error("Review page load error:", error);
            reviewDishName.textContent = "your dish?";
        }
    }

    postReviewBtn.addEventListener("click", async () => {
        const note = reviewNote.value.trim();

        if (!selectedRating) {
            alert("Please choose a star rating.");
            return;
        }

        if (!currentDish) {
            alert("No active dish found.");
            return;
        }

        postReviewBtn.disabled = true;
        postReviewBtn.textContent = "Posting...";

        try {
            const formData = new FormData();
            formData.append("dish_id", currentDish.dish_id);
            formData.append("user_dish_id", currentDish.user_dish_id);
            formData.append("review_rating", selectedRating);
            formData.append("dish_review", note);

            selectedFiles.forEach((file) => {
                formData.append("photos", file);
            });

            const response = await fetch("http://127.0.0.1:8000/api/reviews", {
                method: "POST",
                credentials: "include",
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to post review.");
            }

            alert("Review posted successfully.");
            window.location.href = "my-dishes.html";
        } catch (error) {
            console.error("Post review error:", error);
            alert(error.message);
            postReviewBtn.disabled = false;
            postReviewBtn.textContent = "Post review";
        }
    });

    loadCurrentDish();
});