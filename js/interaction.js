//-------------------------- dropdown logic ----------------------------//

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdownToggle');
    const label = dropdown.querySelector('.dropdownLabel');
    const selectAll = dropdown.querySelector('.selectAll');
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:not(.selectAll)');
    const defaultText = label.textContent;

    function getAllLabel(defaultText) {
        if (defaultText === 'Select Cuisine(s)') return 'All cuisines';
        if (defaultText === 'Select Location(s)') return 'All locations';
        if (defaultText === 'Select Price Range') return 'All price ranges';
        if (defaultText === 'Select Course Type') return 'All course types';
        return 'All selected';
    }

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();

        dropdowns.forEach(d => {
            if (d !== dropdown) d.classList.remove('open');
        });

        dropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    function updateLabel() {
        const selected = [...checkboxes].filter(cb => cb.checked);
        const allLabel = getAllLabel(defaultText);

        if (selected.length === 0) {
            label.textContent = defaultText;
            selectAll.checked = false;
            selectAll.indeterminate = false;

        } else if (selected.length === checkboxes.length) {
            label.textContent = allLabel;
            selectAll.checked = true;
            selectAll.indeterminate = false;

        } else if (selected.length <= 2) {
            label.textContent = selected
                .map(cb => cb.parentElement.textContent.trim())
                .join(', ');
            selectAll.checked = false;
            selectAll.indeterminate = true;

        } else {
            label.textContent = `${selected.length} selected`;
            selectAll.checked = false;
            selectAll.indeterminate = true;
        }
    }

    selectAll.addEventListener('change', () => {
        checkboxes.forEach(cb => {
            cb.checked = selectAll.checked;
        });
        selectAll.indeterminate = false;
        updateLabel();
    });

    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            updateLabel();
        });
    });

    selectAll.checked = false;
    selectAll.indeterminate = false;
    checkboxes.forEach(cb => {
        cb.checked = false;
    });
    updateLabel();
});


//---------------------- get dish button logic ------------------------//

const getDishBtn = document.getElementById("getDishBtn");

getDishBtn.addEventListener("click", async () => {
    function getSelectedValues(dropdownId) {
        const checkboxes = document.querySelectorAll(
            `#${dropdownId} input[type="checkbox"]:not(.selectAll)`
        );

        const selected = [...checkboxes]
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        if (selected.length === checkboxes.length) {
            return [];
        }

        return selected;
    }

    const cuisines = getSelectedValues("cuisineDropdown");
    const locations = getSelectedValues("locationDropdown");
    const prices = getSelectedValues("priceDropdown");
    const courses = getSelectedValues("courseDropdown");

    console.log("Selected filters:", {
        cuisines,
        locations,
        prices,
        courses
    });

    const requestBody = {
        cuisine: cuisines[0] || null,
        location: locations[0] || null,
        price_range: prices[0] || null,
        course_type: courses[0] || null
    };

    console.log("Request body:", requestBody);

    try {
        console.log("About to fetch recommendation...");

        const response = await fetch("http://127.0.0.1:8000/api/dishes/recommend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(requestBody)
        });

        console.log("Response status:", response.status);

        const text = await response.text();
        console.log("Raw response text:", text);

        let data = null;

        try {
            data = text ? JSON.parse(text) : null;
        } catch (parseError) {
            console.error("JSON parse error:", parseError);
            throw new Error("Server returned an invalid response");
        }

        if (!response.ok) {
            throw new Error(data?.message || data?.error || "No dishes found");
        }

        console.log("Recommended dish:", data);

        const saveResponse = await fetch("http://127.0.0.1:8000/api/user-dishes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                dish_id: data.dish_id
            })
        });

        const saveData = await saveResponse.json();
        console.log("Save dish response:", saveData);

        if (!saveResponse.ok) {
            throw new Error(saveData?.message || "Failed to save dish.");
        }

        // localStorage.setItem("currentDish", JSON.stringify(data));

        //redirect
        window.location.href = "my-dishes.html";

    } catch (err) {
        console.error("Fetch error:", err);
        displayError(err.message || "Network error");
    }
});


//------------------------ display result ---------------------------//

function displayDish(dish) {
    const resultDiv = document.getElementById("dishResult");

    resultDiv.innerHTML = `
        <div class="card mt-3 p-3">
            <h2>${dish.dish_name}</h2>
            <p><strong>Restaurant:</strong> ${dish.restaurant_name}</p>
            <p><strong>Location:</strong> ${dish.restaurant_location}</p>
            <p><strong>Price:</strong> ${dish.restaurant_price}</p>
            <p><strong>Course:</strong> ${dish.course_type}</p>
        </div>
    `;
}

function displayError(message) {
    const resultDiv = document.getElementById("dishResult");

    resultDiv.innerHTML = `
        <p style="color:red;">${message}</p>
    `;
}