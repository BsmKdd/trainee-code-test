const moviesJson = require('./movies.json');

/**
 * Movie object, contains details about a movie
 * @typedef  {Object}    Movie
 * @property {?string}   description
 * @property {?Array.<string>} subtitle
 * @property {?string}   thumb
 * @property {?string}   title
 * @property {?string}   genre
 */

/** Class that establishes an API over a list of given movies */
class MovieAPI {
  /**
   * 1. Constructor, adds an id and a random rating to every entry
   * @param {Array.<Movie>} movies
   */
  constructor(movies) {
    this.idCount = 0;

    for (const key in movies) {
      movies[key] = {
        id: this.idCount,
        rating: this.generateRating(),
        ...movies[key],
      };
      this.idCount++;
    }

    this.movies = movies;
  }

  /**
   * Helper method, generates a random ranking from 1-5, with 1 decimal
   * @returns {number} Random generated ranking
   */
  generateRating = () => Math.round((Math.random() * (5 - 1) + 1) * 10) / 10;

  /**
   * Returns all movies
   * @returns {Array.<Movie>}
   */
  fetchAllMovies = () => this.movies;

  /**
   * 2. Fetch all movies based on given genre
   * @param {string} genre
   * @returns {Array.<Movie>}
   */
  fetchMoviesByGenre = (genre) =>
    this.movies.filter((movie) => movie.genre === genre);

  /**
   * 3. Delete movie based on given id
   * @param {number} id
   */
  deleteMovieById = (id) => {
    if (!this.movies.find((movie) => movie.id === id)) {
      console.log('Invalid movie id');
      return;
    }

    this.movies = this.movies.filter((movie) => movie.id != id);
  };

  /**
   * 4. Fetch all movies without fetching thumb and subtitles
   * @returns {Array.<Movie>}
   */
  fetchMoviesNoSubThumb = () =>
    this.movies.map(({ subtitle, thumb, ...rest }) => rest);

  /**
   * 5. Fetch all movies, sorted by name
   * @returns {Array.<Movie>}
   */
  fetchMoviesSortedByName = () =>
    this.movies.sort((m1, m2) => (m1.title > m2.title ? 1 : -1));

  /**
   * 6. Fetch top 2 and bot 2 movies, sorted by ranking
   * @returns {Array.<Movie>}
   */
  fetchTopBot2 = () => {
    const sorted = this.movies.sort((m1, m2) =>
      m1.rating > m2.rating ? 1 : -1
    );
    return sorted.slice(-2).concat(sorted.slice(0, 2));
  };

  /**
   * 7. Print the top 3 movies, sorted by ranking
   */
  printTop3 = () => {
    const top3 = this.movies
      .sort((m1, m2) => (m1.rating < m2.rating ? 1 : -1))
      .slice(0, 3);

    console.log(top3);
  };

  /**
   * 8. Print all movies, sorted by ranking, descending order
   */
  printBottomToTopRated = () => {
    const botToTop = this.movies.sort((m1, m2) =>
      m1.rating > m2.rating ? 1 : -1
    );

    console.log(botToTop);
  };

  /**
   * 9. Add a given movie
   * @param {Movie} movie
   */
  addMovie = (movie) => {
    this.movies.push({
      id: this.idCount,
      rating: this.generateRating(),
      ...movie,
    });
    this.idCount++;
  };

  /**
   * 10. Fetch a movie based on a given id
   * @param {number} id
   * @returns {?Movie}
   */
  findMovieById = (id) => {
    const m = this.movies.find((movie) => {
      return movie.id == id;
    });

    if (m) {
      return m;
    }

    console.log('Invalid movie id');
  };

  /**
   * 11. Edit a movie's title based on a given id
   * @param {number} id
   * @param {string} title
   */
  editMovieTitleById = (id, title) => {
    const i = this.movies.findIndex((movie) => movie.id === id);

    if (i === -1) {
      console.log('Invalid movie id');
      return;
    }

    this.movies[i].title = title;
  };
}

const API = new MovieAPI(moviesJson);

console.log(API.findMovieById(15));
