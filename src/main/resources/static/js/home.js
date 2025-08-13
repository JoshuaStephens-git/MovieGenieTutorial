document.addEventListener('DOMContentLoaded', function () {

    function updateActiveButton(container, selectedValue) {
        const buttons = container.querySelectorAll('.selector-btn');
        buttons.forEach(btn => {
            if (btn.value === selectedValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // --- INITIALIZATION ---
    // This part reads the value and calls the update function.
    const initialDecade = document.getElementById('selected-decade').value;
    updateActiveButton(document.getElementById('decade-btns'), initialDecade);

    const initialGenre = document.getElementById('selected-genre').value;
    updateActiveButton(document.getElementById('genre-btns'), initialGenre);


    // --- EVENT LISTENERS ---
    // The click handler updates the data and calls the same update function.
    document.getElementById('decade-btns').addEventListener('click', function(event) {
        if (event.target.matches('.selector-btn')) {
            const selectedValue = event.target.value;
            document.getElementById('selected-decade').value = selectedValue;
            updateActiveButton(event.currentTarget, selectedValue);
        }
    });

    document.getElementById('genre-btns').addEventListener('click', function(event) {
        if (event.target.matches('.selector-btn')) {
            const selectedValue = event.target.value;
            document.getElementById('selected-genre').value = selectedValue;
            updateActiveButton(event.currentTarget, selectedValue);
        }
    });
});