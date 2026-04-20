document.addEventListener("DOMContentLoaded", () => {
    const feedContainer = document.getElementById("feedContainer");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const filterButtons = document.querySelectorAll(".feedFilterBtn");

    const PAGE_SIZE = 15;

    let offset = 0;
    let isLoading = false;
    let hasMore = true;
    let currentSearch = "";
    let currentSort = "all";

    function escapeHtml(value) {
        if (value === null || value === undefined) return "";
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function getUserInitial(username) {
        if (!username || typeof username !== "string") {
            return "?";
        }

        return username.trim().charAt(0).toUpperCase() || "?";
    }

    function renderPostAvatar(post) {
        const username = escapeHtml(post.username);
        const initial = getUserInitial(post.username);

        if (post.avatarUrl) {
            return `
                <div class="profilePic profileAvatar" aria-label="Profile avatar for ${username}">
                    <img 
                        src="${escapeHtml(post.avatarUrl)}" 
                        alt="Profile avatar for ${username}"
                        class="profileAvatarImage"
                        onerror="this.parentElement.innerHTML='<span class=&quot;profileAvatarLetter&quot;>${initial}</span>'"
                    >
                </div>
            `;
        }

        return `
            <div class="profilePic profileAvatar" aria-label="Default avatar for ${username}">
                <span class="profileAvatarLetter">${initial}</span>
            </div>
        `;
    }


    function renderPhotos(photos) {
        if (!photos || photos.length === 0) {
            return "";
        }

        return `
            <div class="cardImage">
                <div class="imageCarousel">
                    ${photos.map((photoPath) => `
                        <img 
                            src="${photoPath}" 
                            alt="Photo of reviewed dish"
                        >
                    `).join("")}
                </div>
            </div>
        `;
    }

    function renderNotes(note) {
        if (!note || note.trim() === "") {
            return "";
        }

        return `
            <div class="cardNotes">
                <div class="notesHeader">
                    <h2>Notes</h2>
                </div>
                <div class="note">
                    <p>${escapeHtml(note)}</p>
                </div>
            </div>
        `;
    }

    function renderFeedPost(post) {
        return `
            <div class="feedPost">
                <div class="cardProfile">
                    ${renderPostAvatar(post)}

                    <div class="profileText">

                        <p>
                            <span class="username">${escapeHtml(post.username)}</span> ranked a dish
                        </p>
                        <p>
                            from <span class="restaurantName">${escapeHtml(post.restaurant_name)}</span>
                        </p>
                        <p>
                            <span class="cuisine">${escapeHtml(post.restaurant_cuisine)} - </span>
                            <span class="location">${escapeHtml(post.restaurant_location)}</span>
                        </p>
                    </div>
                </div>

                ${renderPhotos(post.photos)}

                <div class="cardRating">
                    <div class="rating">
                        <div class="star">
                            <img src="assets/icon-star.svg" alt="Star icon">
                        </div>
                        <span class="ratingNumber">${escapeHtml(post.review_rating)}</span>
                    </div>

                    <div class="dishInfo">
                        <span class="dishName">${escapeHtml(post.dish_name)}</span>
                    </div>
                </div>

                ${renderNotes(post.dish_review)}
            </div>
        `;
    }

    function renderFeedPosts(posts, replace = false) {
        if (replace) {
            feedContainer.innerHTML = "";
        }

        if (replace && posts.length === 0) {
            feedContainer.innerHTML = `<p>No posts found.</p>`;
            return;
        }

        const html = posts.map(renderFeedPost).join("");
        feedContainer.insertAdjacentHTML("beforeend", html);
    }

    function updateLoadMoreVisibility() {
        loadMoreBtn.style.display = hasMore ? "block" : "none";
    }

    async function loadFeed({ reset = false } = {}) {
        if (isLoading) return;

        isLoading = true;
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = "Loading...";

        if (reset) {
            offset = 0;
            hasMore = true;
        }

        try {
            const params = new URLSearchParams({
                limit: PAGE_SIZE,
                offset,
                search: currentSearch,
                sort: currentSort
            });

            const response = await fetch(`/api/feed?${params.toString()}`, {
                credentials: "include"
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to load feed.");
            }

            const posts = Array.isArray(data.posts) ? data.posts : [];

            if (reset) {
                renderFeedPosts(posts, true);
            } else {
                renderFeedPosts(posts, false);
            }

            offset += posts.length;
            hasMore = Boolean(data.hasMore);
            updateLoadMoreVisibility();
        } catch (error) {
            console.error("Feed load error:", error);

            if (reset) {
                feedContainer.innerHTML = `<p>Unable to load feed right now.</p>`;
            }
        } finally {
            isLoading = false;
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = "Load more";
        }
    }

    loadMoreBtn.addEventListener("click", () => {
        loadFeed();
    });

    searchBtn.addEventListener("click", () => {
        currentSearch = searchInput.value.trim();
        loadFeed({ reset: true });
    });

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            currentSearch = searchInput.value.trim();
            loadFeed({ reset: true });
        }
    });

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            currentSort = button.dataset.filter || "all";
            loadFeed({ reset: true });
        });
    });

    loadFeed({ reset: true });
});