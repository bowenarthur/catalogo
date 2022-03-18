import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Details from "./Details";

const Movie = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card onClick={handleShow}>
        <Card.Img variant="top" src={props.movie.coverUrl} />
        <Card.Body>
          <Card.Text>{props.movie.name}</Card.Text>
        </Card.Body>
      </Card>

      {show ? (
        <Details id={props.movie.id} show={show} handleClose={handleClose} />
      ) : (
        ""
      )}
    </>
  );
};

export default Movie;
