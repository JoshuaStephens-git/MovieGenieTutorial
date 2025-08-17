document.addEventListener('DOMContentLoaded', function() {
    const historyList = document.getElementById('history-list');
    const noHistoryMessage = document.getElementById('no-history-message');
    const clearHistoryButton = document.getElementById('clear-history-button');
    const paginationControls = document.getElementById('pagination-controls');

    const moviesPerPage = 10;
    let currentPage = 1;
    let history = [];

    // format release date client side
    function formatReleaseDate(releaseDate) {
        if (!releaseDate || releaseDate === "") {
            return releaseDate || "N/A";
        }
        try {
            const [year, month, day] = releaseDate.split('-');
            return `${month}/${day}/${year}`;
        }
        catch (e) {
            return releaseDate;
        }
    }

    function createMovieListItem(movie) {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <h3>
                <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">${movie.title}</a>
            </h3>
            <p><strong>Release Date:</strong> ${formatReleaseDate(movie.releaseDate)}</p>
            <p><strong>Rating:</strong> ${movie.rating.toFixed(1)}</p>
        `;
        return listItem;
    }


    function renderPage() {
        historyList.innerHTML = '';

        const startIndex = (currentPage - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        const paginatedItems = history.slice(startIndex, endIndex);

        paginatedItems.forEach(movie => {
            const listItem = createMovieListItem(movie);
            historyList.appendChild(listItem);
        });
    }


    function renderPaginationControls() {
        paginationControls.innerHTML = ''; // Clear previous controls
        const totalPages = Math.ceil(history.length / moviesPerPage);
        if (totalPages <= 1) return;

        // Previous Button
        const prevButton = document.createElement('button');
        prevButton.textContent = '← Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            currentPage--;
            renderPage();
            renderPaginationControls();
        });
        paginationControls.appendChild(prevButton);

        // Page Indicator
        const pageIndicator = document.createElement('span');
        pageIndicator.className = 'page-indicator';
        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
        paginationControls.appendChild(pageIndicator);

        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next →';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            currentPage++;
            renderPage();
            renderPaginationControls();
        });
        paginationControls.appendChild(nextButton);
    }


    function updateView() {
        if (history.length > 0) {
            noHistoryMessage.style.display = 'none';
            clearHistoryButton.style.display = 'inline-block';
            renderPage();
            renderPaginationControls();
        } else {
            noHistoryMessage.style.display = 'block';
            clearHistoryButton.style.display = 'none';
            historyList.innerHTML = '';
            paginationControls.innerHTML = '';
        }
    }

    function loadHistory() {
        const historyJSON = localStorage.getItem('movieHistory');
        history = historyJSON ? JSON.parse(historyJSON) : [];
        updateView();
    }


    clearHistoryButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear your entire movie history?')) {
            localStorage.removeItem('movieHistory');
            currentPage = 1; // Reset to first page
            history = []; // Clear the in-memory history
            updateView();
        }
    });

    loadHistory();
});