// assets/js/storage.js

// Função para buscar os filmes favoritados no Local Storage
export function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
}

// Função para salvar um filme nos favoritos no Local Storage
export function saveToLocalStorage(movie) {
    const favorites = getFavoriteMovies();
    favorites.push(movie);
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
}

// Função para remover um filme dos favoritos no Local Storage
export function removeFromLocalStorage(movieId) {
    const favorites = getFavoriteMovies().filter(movie => movie.id !== movieId);
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
}

// Função para verificar se um filme é favorito
export function isFavorite(movieId) {
    return getFavoriteMovies().some(movie => movie.id === movieId);
}
