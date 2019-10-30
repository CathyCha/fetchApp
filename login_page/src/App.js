import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Button,Carousel, Form, NavDropdown, Navbar, Image,FormControl,Container,Jumbotron} from 'react-bootstrap'
function App() {
  return (
    <div className="App">
    <Container>
    <Navbar bg="seagreen" variant="dark">
    <Navbar.Brand href="#home">
    <img className="NavBrand" src="fetch.png" alt=""></img>
    </Navbar.Brand>
    <Nav className="navlinks">
      <Nav.Link href="#home"><strong className="navtext">Home</strong></Nav.Link>
      <Nav.Link href="#features"><strong className="navtext">Features</strong></Nav.Link>
      <Nav.Link href="#pricing"><strong className="navtext">Pricing</strong></Nav.Link>
      <Nav.Link href="#login"><strong className="navtext">Login</strong></Nav.Link>
      <Nav.Link href="#login"><strong className="navtext">Join!</strong></Nav.Link>
    </Nav>
    </Navbar>
    </Container>
    <Container>
    <Jumbotron className="jumbo">
    <div  id="jumboimg">
    <Image src="jumbotronImg.png" fluid></Image>
    </div>
    <div id="buttonPosition">
    <Button className="buttonjumbo" variant="primary">Learn more</Button></div>
    </Jumbotron>
    </Container>
      <Carousel>
    <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=First slide&bg=373940"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Second slide&bg=282c34"
      alt="Second slide"
    />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
    </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default App;
