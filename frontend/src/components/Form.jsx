import React, { useEffect, useState, useReducer } from "react";
import { useMutation } from "@apollo/client";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CREATE_MOVIE, UPDATE_MOVIE } from "../resources/gqlConstants";

const initialState = {
  id: "",
  name: "",
  year: "",
  duration: "",
  coverUrl: "",
  category: [],
};

const reducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value,
  };
};

const FormMovie = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [characters, setCharacters] = useState([]);
  const [update, setUpdate] = useState(false);

  let characterNameInput, characterPerformerInput;

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const { id, name, year, duration, coverUrl, category } = state;

  useEffect(() => {
    if (props.movie) {
      setUpdate(true);
      dispatch({ field: "id", value: props.movie.id });
      dispatch({ field: "name", value: props.movie.name });
      dispatch({ field: "year", value: props.movie.year });
      dispatch({ field: "duration", value: props.movie.duration });
      dispatch({ field: "coverUrl", value: props.movie.coverUrl });
      dispatch({ field: "category", value: props.movie.category.join(", ") });
      setCharacters(props.movie.characters);
    }
  }, [props.movie]);

  const [createMovie, { loading, error }] = useMutation(CREATE_MOVIE, {
    onCompleted() {
      alert("Filme cadastrado com sucesso!");
      window.location.reload();
    },
  });

  const [updateMovie, { error2 }] = useMutation(UPDATE_MOVIE, {
    onCompleted() {
      alert("Filme atualizado com sucesso!");
      window.location.reload();
    },
  });

  if (loading) return <p>Loading Create...</p>;
  if (error) return <p>Error Create: {error.message}</p>;
  if (error2) return <p>Error Update: {error2.message}</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (update) {
      updateMovie({
        variables: {
          id: id,
          movie: {
            name: name,
            year: +year,
            duration: +duration,
            coverUrl: coverUrl,
            category: category.replace(/\s/g, "").split(","),
            characters: characters,
          },
        },
      });
    } else {
      createMovie({
        variables: {
          movie: {
            name: name,
            year: +year,
            duration: +duration,
            coverUrl: coverUrl,
            category: category.replace(/\s/g, "").split(","),
            characters: characters,
          },
        },
      });
    }
  };

  const addCharacter = () => {
    if (characterNameInput.value && characterPerformerInput.value) {
      setCharacters([
        ...characters,
        {
          name: characterNameInput.value,
          performer: characterPerformerInput.value,
        },
      ]);
      characterNameInput.value = "";
      characterPerformerInput.value = "";
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{update ? "Atualizar" : "Cadastrar"} Filme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <div className="col-10 col-md-5">
                <Form.Group className="mb-2" controlId="name">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="year">
                  <Form.Label>Ano</Form.Label>
                  <Form.Control
                    type="number"
                    name="year"
                    value={year}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="duration">
                  <Form.Label>Duração (min)</Form.Label>
                  <Form.Control
                    type="number"
                    name="duration"
                    value={duration}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="coverUrl">
                  <Form.Label>URL da Capa</Form.Label>
                  <Form.Control
                    type="text"
                    name="coverUrl"
                    value={coverUrl}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="category">
                  <Form.Label>Categoria(s)</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={category}
                    onChange={onChange}
                  />
                  <Form.Text className="text-muted">
                    Divida as categorias por vírgulas.
                  </Form.Text>
                </Form.Group>
              </div>
              <div className="col-10 col-md-5">
                <h5>Adicionar personagens:</h5>
                <Form.Group className="mb-2" controlId="coverUrl">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="characterName"
                    ref={(node) => {
                      characterNameInput = node;
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="coverUrl">
                  <Form.Label>Ator/Atriz</Form.Label>
                  <Form.Control
                    type="text"
                    name="characterPerformer"
                    ref={(node) => {
                      characterPerformerInput = node;
                    }}
                  />
                </Form.Group>
                <Button variant="primary" onClick={addCharacter}>
                  Adicionar
                </Button>

                <table className="table">
                  <thead>
                    <tr>
                      <th>Personagem</th>
                      <th>Ator/Atriz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {characters.map((character) => (
                      <tr key={character.name}>
                        <td>{character.name}</td>
                        <td>{character.performer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button variant="primary" type="submit" className="w-50">
                Enviar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FormMovie;
