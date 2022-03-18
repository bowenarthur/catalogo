const { gql } = require("apollo-server");
const mutation = gql`
  type Mutation {
    createMovie(movie: MovieInput): Movie
    updateMovie(id: String, movie: MovieInput): Movie
    deleteMovie(id: String): Movie
  }
  input MovieInput {
    name: String
    year: Int
    duration: Int
    coverUrl: String
    category: [String]
    characters: [CharacterInput]
  }
  input CharacterInput {
    name: String
    performer: String
  }
`;
module.exports = mutation;
