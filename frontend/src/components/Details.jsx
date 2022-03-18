import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { GET_MOVIE, DELETE_MOVIE } from "../resources/gqlConstants";
import FormMovie from "./Form";

const Details = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: props.id },
  });

  const [deleteMovie, { error2 }] = useMutation(DELETE_MOVIE, {
    onCompleted() {
      alert("Filme deletado com sucesso!");
      window.location.reload();
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error getting movie</p>;
  if (error2) return <p>Error deleting </p>;

  const handleDelete = () => {
    if (window.confirm("Você tem certeza que quer deletar o filme?")) {
      deleteMovie({
        variables: { id: data.movie.id },
      });
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.movie.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <b>Duração:</b> {data.movie.duration} minutos
          </p>
          <p>
            <b>Ano de lançamento:</b> {data.movie.year}{" "}
          </p>
          <p>
            <b>Categoria(s):</b> {data.movie.category.join(", ")}
          </p>
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Personagens</th>
                <th>Ator/Atriz</th>
              </tr>
            </thead>
            <tbody>
              {data.movie.characters.map((character) => (
                <tr key={character.name}>
                  <td>{character.name}</td>
                  <td>{character.performer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleShow}>
            Alterar Filme
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Deletar Filme
          </Button>
        </Modal.Footer>
      </Modal>
      {show ? (
        <FormMovie show={show} handleClose={handleClose} movie={data.movie} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Details;
