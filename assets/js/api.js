// assets/js/api.js
import { API_KEY, API_URL } from './config.js';

// Função assíncrona para buscar os filmes populares
export async function getPopularMovies() {
    try {
        const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Erro ao buscar filmes populares:', error);
        return [];
    }
}

// Função assíncrona para buscar filmes específicos com base na pesquisa do usuário
export async function searchMovies(query) {
    try {
        const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}&page=1`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        return [];
    }
}
