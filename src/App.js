import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import "./App.css";
import bg from "./img/bg.png";
import data from "./data.js";
import { useState } from "react";

function App() {
  let [shoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div
        className="mainBg"
        style={{ backgroundImage: "url(" + bg + ")" }}
      ></div>

      <Container>
        <Row>
          {shoes.map((shoes, i) => {
            return <List data={shoes} key={i} />;
          })}
        </Row>
      </Container>
    </div>
  );
}
function List({ data }) {
  return (
    <Col sm>
      <img src={data.img} width="100%" />
      <h4>{data.title}</h4>
      <p>{data.content}</p>
    </Col>
  );
}

export default App;
