import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';



import Login from "./components/login/index"
import Signup from "./components/signup/index"
import Dashboard from "./components/dashboard/dashborad"


function App() {

  let history = useHistory();

  return (
    <>
      {/* <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React Login project</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => { history.push("/dashborad") }}>Dashboard</Nav.Link>
              <Nav.Link onClick={() => { history.push("/login") }}>Login</Nav.Link>
              <Nav.Link onClick={() => { history.push("/") }}>Signup</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}


      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/dashboard">
          <Dashboard />
        </Route>

      </Switch>

    </>
  );
}

export default App;