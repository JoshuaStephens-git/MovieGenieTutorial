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

    const movieCards = document.querySelectorAll('.movie-card');
    if (movieCards.length > 0) {
        const moviesToSave = Array.from(movieCards).map(card => {
            return {
                id: card.dataset.movieId,
                title: card.dataset.movieTitle,
                releaseDate: card.dataset.movieReleaseDate,
                // Convert rating back to a number
                rating: parseFloat(card.dataset.movieRating)
            };
        });
        saveMoviesToHistory(moviesToSave);
    }

    const showMoreGenresBtn = document.getElementById('show-more-genres');
    if (showMoreGenresBtn) {
        showMoreGenresBtn.addEventListener('click', function() {
            const genreContainer = this.closest('.movie-selection-container');

            genreContainer.classList.toggle('show-all');

            if (genreContainer.classList.contains('show-all')) {
                this.innerHTML = 'Show Less <span class="arrow">↑</span>';
            } else {
                this.innerHTML = 'Show More <span class="arrow">↓</span>';
            }
        });
    }

    const summaryButtons = document.querySelectorAll('.show-summary-btn');
    summaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const overviewContainer = this.closest('.movie-card').querySelector('.overview-container');

            if (overviewContainer && overviewContainer.classList.contains('overview-container')) {
                overviewContainer.classList.toggle('show-all');

                if (overviewContainer.classList.contains('show-all')) {
                    this.innerHTML = 'Hide Summary';
                } else {
                    this.innerHTML = 'Show Summary';
                }
            }
        });
    });
});