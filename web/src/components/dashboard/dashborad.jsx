import './dashboard.css'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from "../../core"
import * as FaIcons from 'react-icons/fa';

import { IconContext } from 'react-icons';



function Home() {

  let history = useHistory()
  const [info, setinfo] = useState([]);
  useEffect(() => {
    const Email = localStorage.getItem('email')
    console.log(Email);
    axios.post(`${baseUrl}/api/v1/profile`, {
      email: Email
    })
      .then((res) => {
        let info = res.data
        setinfo(info)
        console.log(info)
      })
      .catch((err) => {
        console.log(err.message);
      })
      return()=>{
        console.log('Data Removed')
      }
  }, [])
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);


  return (


    <div>
      {/* <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => { history.push("/dashboard") }}>Profile</Nav.Link>
              <Nav.Link onClick={() => { history.push("/login") }}>Login</Nav.Link>
              <Nav.Link onClick={() => { history.push("/") }}>Signup</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
            <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              {/* <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link> */}
            </li>
            {info.map((item, index) => {
              return (
                <li key={index} className = 'style'>
                  
                    {/* {item.icon} */}
                    <span style={{color:'white', fontSize:'20px'}}>Name: <br/> {item.name}</span>
                    <br/><br/>
                    <span style={{color:'white', fontSize:'20px'}}>Email:<br/> {item.email}</span>
                    <br/><br/>
                    <span style={{color:'white', fontSize:'20px'}}><Button variant="outlined" onClick={() => { history.push("/signup") }}>Back to Signup</Button></span>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>


      {/* <h1>home</h1> */}
    </div>
  )






}

export default Home;
