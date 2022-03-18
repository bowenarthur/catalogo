const Movie = require("../models/Movie");
const movieResolver = {
  Query: {
    async movies() {
      let movies = await Movie.find({});
      return movies;
    },
    async movie(_, { id }) {
      let movie = Movie.findById(id);
      return movie;
    },
  },
  Mutation: {
    async createMovie(_, { movie }) {
      let movieCreated = await Movie.create(movie);
      return movieCreated;
    },
    async updateMovie(_, { id, movie }) {
      let movieUpdated = await Movie.findByIdAndUpdate(id, movie);
      return movieUpdated;
    },
    async deleteMovie(_, { id }) {
      let movieDeleted = await Movie.findByIdAndRemove(id);
      return movieDeleted;
    },
  },
};
module.exports = movieResolver;
