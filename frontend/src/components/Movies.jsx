import React from "react";
import Movie from "./Movie";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../resources/gqlConstants";

const MoviesList = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <div className="row justify-content-evenly">
        {data.movies.map((movie) => (
          <div key={movie.id} className="col-10 col-md-3 mb-3">
            <Movie movie={movie}></Movie>
          </div>
        ))}
      </div>
    </>
  );
};

export default MoviesList;
