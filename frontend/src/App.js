import React, { useState } from "react";
import "./App.css";
import Routes from "./routes";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import FormMovie from "./components/Form";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="mb-4">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand href="">Catálogo</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-end"
              >
                <Nav>
                  <Nav.Item>
                    <Button variant="outline-light" onClick={handleShow}>
                      Cadastrar Filme
                    </Button>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div>
          <Routes />
        </div>
        <FormMovie show={show} handleClose={handleClose} />
      </div>
    </ApolloProvider>
  );
}

export default App;
