const { gql } = require("apollo-server");
const types = gql`
  type Movie {
    id: ID!
    name: String!
    year: Int
    duration: Int
    coverUrl: String
    category: [String]
    characters: [Character]
  }
  type Character {
    name: String!
    performer: String!
  }
`;
module.exports = types;
