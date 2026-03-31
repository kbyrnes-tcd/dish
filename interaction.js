//-------------------------- dropdown logic ----------------------------//

//note -fix issue: select ALL dropdowns 
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {

    const toggle = dropdown.querySelector('.dropdownToggle');
    const menu = dropdown.querySelector('.dropdownMenu');
    const label = dropdown.querySelector('.dropdownLabel');
    const selectAll = dropdown.querySelector('.selectAll');
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:not(.selectAll)');
    const defaultText = label.textContent;


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

        if (selected.length === checkboxes.length) {
            //all selected
            label.textContent = defaultText;
            selectAll.checked = true;

        } else if (selected.length === 0) {
            //none selected
            label.textContent = defaultText;
            selectAll.checked = false;

        } else if (selected.length <= 2) {
            //1–2: show names
            label.textContent = selected
                .map(cb => cb.parentElement.textContent.trim())
                .join(', ');
            selectAll.checked = false;

        } else {
            //more than 3: show count
            label.textContent = `${selected.length} selected`;
            selectAll.checked = false;
        }
    }

    // ---------------------- select all logic ------------------------ //

    selectAll.addEventListener('change', () => {
        checkboxes.forEach(cb => cb.checked = selectAll.checked);
        updateLabel(); // 🆕 update label
    });


    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            selectAll.checked = [...checkboxes].every(c => c.checked);
            updateLabel(); // 🆕 update label
        });
    });

});




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