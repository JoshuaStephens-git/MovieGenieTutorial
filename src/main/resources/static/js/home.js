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

    function saveMoviesToHistory(newMovies) {
        const consentCookie = document.cookie.split('; ').find(row => row.startsWith('cookieyes-consent='));
        if (consentCookie && consentCookie.includes('functional:no')) {
            return console.log('User has declined functional cookies. History will not be saved.');
        }

        const MAX_HISTORY_SIZE = 50;
        const history = JSON.parse(localStorage.getItem('movieHistory') || '[]');
        const updatedHistory = [...newMovies, ...history].slice(0, MAX_HISTORY_SIZE);

        localStorage.setItem('movieHistory', JSON.stringify(updatedHistory));
        console.log('Movie history saved to local storage.');
    }

    try {
        const moviesDataElement = document.getElementById('movies-data');
        const moviesFromServer = JSON.parse(moviesDataElement?.textContent || '[]');

        if (moviesFromServer.length > 0) {
            const moviesToSave = moviesFromServer.map(
                ({ id, title, releaseDate, rating }) => ({ id, title, releaseDate, rating })
            );
            saveMoviesToHistory(moviesToSave);
        }
    } catch (e) {
        console.error("Could not parse movie data from server:", e);
    }
});