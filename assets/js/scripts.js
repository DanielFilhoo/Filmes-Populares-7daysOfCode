// assets/js/scripts.js
import { getPopularMovies, searchMovies } from './api.js';
import { getFavoriteMovies, saveToLocalStorage, removeFromLocalStorage, isFavorite } from './storage.js';

// Função para renderizar os filmes na página
function renderMovies(movies) {
    const container = document.getElementById('movies-container');
    container.innerHTML = ''; // Limpa o container antes de renderizar novos filmes

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieImage.alt = movie.title;

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');

        const movieTitle = document.createElement('h2');
        movieTitle.textContent = `${movie.title} (${movie.release_date.split('-')[0]})`;

        const rating = document.createElement('div');
        rating.classList.add('rating');

        const star = document.createElement('span');
        star.classList.add('star');
        star.textContent = '⭐';

        const score = document.createElement('span');
        score.classList.add('score');
        score.textContent = movie.vote_average;

        const favorite = document.createElement('span');
        favorite.classList.add('favorite');
        favorite.textContent = isFavorite(movie.id) ? '❤️ Favorito' : '🤍 Favoritar';
        favorite.addEventListener('click', () => toggleFavorite(movie, favorite));

        rating.append(star, score, favorite);

        const description = document.createElement('p');
        description.textContent = movie.overview;

        movieInfo.append(movieTitle, rating, description);
        movieElement.append(movieImage, movieInfo);
        container.appendChild(movieElement);
    });
}

// Função para lidar com o evento de busca
function handleSearch() {
    const query = document.getElementById('search-input').value;
    if (query) {
        searchMovies(query).then(renderMovies);
    }
}

// Função para alternar o status de favorito de um filme
function toggleFavorite(movie, favoriteElement) {
    if (isFavorite(movie.id)) {
        removeFromLocalStorage(movie.id);
        favoriteElement.textContent = '🤍 Favoritar';
    } else {
        saveToLocalStorage(movie);
        favoriteElement.textContent = '❤️ Favorito';
    }
}

// Função para lidar com a filtragem de filmes favoritos
function handleFavoritesFilter() {
    if (document.getElementById('favorites-checkbox').checked) {
        const favoriteMovies = getFavoriteMovies();
        renderMovies(favoriteMovies);
    } else {
        getPopularMovies().then(renderMovies); // Restaura a lista completa de filmes populares
    }
}

// Adiciona um event listener ao campo de busca para escutar a tecla "Enter"
document.getElementById('search-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

// Adiciona um event listener ao botão de busca para acionar a função de busca
document.getElementById('search-button').addEventListener('click', handleSearch);

// Adiciona um event listener ao checkbox de favoritos para filtrar os filmes favoritos
document.getElementById('favorites-checkbox').addEventListener('change', handleFavoritesFilter);

// Carrega os filmes populares quando a página é carregada
getPopularMovies().then(renderMovies);
