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
            console.log('User has declined functional cookies. History will not be saved.');
            return;
        }
        const historyJSON = localStorage.getItem('movieHistory');
        let history = historyJSON ? JSON.parse(historyJSON) : [];
        history.unshift(...newMovies);
        const MAX_HISTORY_SIZE = 50;
        if (history.length > MAX_HISTORY_SIZE) {
            history = history.slice(0, MAX_HISTORY_SIZE);
        }
        localStorage.setItem('movieHistory', JSON.stringify(history));
        console.log('Movie history saved to local storage.');
    }

    const moviesDataElement = document.getElementById('movies-data');
    if (moviesDataElement) {
        try {
            const moviesFromServer = JSON.parse(moviesDataElement.textContent);
            if (moviesFromServer && moviesFromServer.length > 0) {
                const moviesToSave = moviesFromServer.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    releaseDate: movie.releaseDate,
                    rating: movie.rating
                }));
                saveMoviesToHistory(moviesToSave);
            }
        } catch (e) {
            console.error("Could not parse movie data from server:", e);
        }
    }
});