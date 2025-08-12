document.addEventListener('DOMContentLoaded', function () {
    // Get the containers and the hidden input fields
    const decadeBtnContainer = document.getElementById('decade-btns');
    const genreBtnContainer = document.getElementById('genre-btns');
    const selectedDecadeInput = document.getElementById('selected-decade');
    const selectedGenreInput = document.getElementById('selected-genre');

    // This function sets the active button based on the hidden input's value
    function setInitialActiveState(container, hiddenInput) {
        const selectedValue = hiddenInput.value;
        const buttons = container.querySelectorAll('.selector-btn');
        buttons.forEach(btn => {
            // If the button's value matches the selected value, make it active
            if (btn.value === selectedValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // This function handles a new selection when a button is clicked
    function handleSelection(event, container, hiddenInput) {
        if (!event.target.matches('.selector-btn')) {
            return;
        }
        hiddenInput.value = event.target.value;
        const buttons = container.querySelectorAll('.selector-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    // --- INITIALIZATION ---
    // This part runs automatically when the page loads
    setInitialActiveState(decadeBtnContainer, selectedDecadeInput);
    setInitialActiveState(genreBtnContainer, selectedGenreInput);

    // --- EVENT LISTENERS ---
    // This part waits for user clicks
    decadeBtnContainer.addEventListener('click', function(event) {
        handleSelection(event, decadeBtnContainer, selectedDecadeInput);
    });

    genreBtnContainer.addEventListener('click', function(event) {
        handleSelection(event, genreBtnContainer, selectedGenreInput);
    });
});