import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  {
    movies {
      id
      name
      coverUrl
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      id
      name
      year
      duration
      category
      coverUrl
      characters {
        name
        performer
      }
    }
  }
`;

export const CREATE_MOVIE = gql`
  mutation CreateMovie($movie: MovieInput!) {
    createMovie(movie: $movie) {
      name
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($id: String!, $movie: MovieInput!) {
    updateMovie(id: $id, movie: $movie) {
      name
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: String) {
    deleteMovie(id: $id) {
      name
    }
  }
`;
