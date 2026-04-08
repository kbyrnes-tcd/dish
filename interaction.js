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

    //-------------------------- toggle open/close ----------------------------//
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();

        dropdowns.forEach(d => {
            if (d !== dropdown) d.classList.remove('open');
        });

        dropdown.classList.toggle('open');
    });

    //-------------------------- outside click close ----------------------------//
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    //----------------------- dropdown label logic -----------------------//
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

    //---------------------- select all logic ------------------------//
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

    // make sure each dropdown starts empty
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

        return [...checkboxes]
            .filter(cb => cb.checked)
            .map(cb => cb.value);
    }

    //get selected values
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

    try {
        const response = await fetch("http://localhost:8000/api/dishes/recommend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cuisine: cuisines[0], //send first selected WILL NEED TO UPDATE
                location: locations[0],
                price_range: prices[0],
                course_type: courses[0]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "No dishes found");
        }

        displayDish(data);

    } catch (err) {
        console.error(err);
        displayError(err.message);
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














//-------------------- ARCHIVE --------------------//

// //-------------------------- dropdown logic ----------------------------//

// const dropdown = document.querySelector('.dropdown');
// const toggle = document.querySelector('.dropdownToggle');
// const menu = document.querySelector('.dropdownMenu');
// const label = document.querySelector('.dropdownLabel');
// const selectAll = document.getElementById('selectAll');
// const checkboxes = menu.querySelectorAll('input[type="checkbox"]:not(#selectAll)');

// //toggle open/close
// toggle.addEventListener('click', (e) => {
//     e.stopPropagation(); // prevent triggering document click
//     dropdown.classList.toggle('open');
// });

// //outside click close
// document.addEventListener('click', (e) => {
//     if (!dropdown.contains(e.target)) {
//         dropdown.classList.remove('open');
//     }
// });


// //----------------------- dropdown label logic -----------------------//

// function updateLabel() {
//     const selected = [...checkboxes].filter(cb => cb.checked);

//     if (selected.length === checkboxes.length) {
//         //all selected
//         label.textContent = "All Cuisines";
//         selectAll.checked = true;

//     } else if (selected.length === 0) {
//         //none selected
//         label.textContent = "Select Cuisines";
//         selectAll.checked = false;

//     } else if (selected.length <= 2) {
//         //1–2: show names
//         label.textContent = selected
//             .map(cb => cb.parentElement.textContent.trim())
//             .join(', ');
//         selectAll.checked = false;

//     } else {
//         //more than 3: show count
//         label.textContent = `${selected.length} selected`;
//         selectAll.checked = false;
//     }
// }

// //---------------------- select all logic ------------------------//

// selectAll.addEventListener('change', () => {
//     checkboxes.forEach(cb => cb.checked = selectAll.checked);
//     updateLabel();
// });

// checkboxes.forEach(cb => {
//     cb.addEventListener('change', () => {
//         selectAll.checked = [...checkboxes].every(c => c.checked);
//         updateLabel();
//     });
// });