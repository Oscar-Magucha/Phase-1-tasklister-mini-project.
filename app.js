const filmList = document.getElementById('films');
const filmInfo = document.getElementById('film-info');
const buyTicketButton = document.getElementById('buy-ticket');
const filmDetailsSection = document.getElementById('film-details');

let films = [];  // Array to store the film data

// Fetch all films from the API
function fetchFilms() {
    fetch('/films')
        .then(response => response.json())
        .then(data => {
            films = data;
            renderFilmList(films);
        });
}

// Render the list of films
function renderFilmList(films) {
    filmList.innerHTML = '';  // Clear previous films list
    films.forEach(film => {
        const li = document.createElement('li');
        li.classList.add('film');
        li.innerHTML = `
            <img src="${film.poster}" alt="${film.title}" />
            <h3>${film.title}</h3>
            <p>${film.showtime}</p>
            <button class="delete" onclick="deleteFilm(${film.id})">Delete</button>
        `;
        if (film.tickets_sold >= film.capacity) {
            li.classList.add('sold-out');
            li.querySelector('button').innerText = 'Sold Out';
        } else {
            li.addEventListener('click', () => displayFilmDetails(film));
        }
        filmList.appendChild(li);
    });
}

// Display the selected film's details
function displayFilmDetails(film) {
    filmInfo.innerHTML = `
        <h3>${film.title}</h3>
        <img src="${film.poster}" alt="${film.title}" />
        <p>${film.description}</p>
        <p><strong>Runtime:</strong> ${film.runtime} minutes</p>
        <p><strong>Showtime:</strong> ${film.showtime}</p>
        <p><strong>Tickets Available:</strong> ${film.capacity - film.tickets_sold}</p>
    `;
    buyTicketButton.disabled = film.tickets_sold >= film.capacity;
    buyTicketButton.onclick = () => buyTicket(film);
}

// Handle ticket buying
function buyTicket(film) {
    const updatedTicketsSold = film.tickets_sold + 1;
    fetch(`/films/${film.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tickets_sold: updatedTicketsSold
        })
    })
    .then(response => response.json())
    .then(updatedFilm => {
        renderFilmList(films);  // Re-render films to reflect the update
    });
}

// Delete a film from the server
function deleteFilm(filmId) {
    fetch(`/films/${filmId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        films = films.filter(film => film.id !== filmId);
        renderFilmList(films);
    });
}

// Initialize the app
fetchFilms();
