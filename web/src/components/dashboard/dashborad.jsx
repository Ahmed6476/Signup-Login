import * as React from 'react';
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
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from "../../core"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Formik, Field, Form, useFormik } from "formik";
import { IconContext } from 'react-icons';



function Home() {

  let history = useHistory()

  const [todo, settodo] = useState([])

  useEffect(() => {

    const Title = localStorage.getItem('title')
    console.log(Title);
    axios.get(`${baseUrl}/api/v1/posts`, {
      title: Title
    })
      .then((res) => {
        let data = res.data
        settodo(data);
        console.log(todo);
      })
      .catch((err) => {
        console.log(err.message);
      })

    return () => {
      console.log("cleanup")
    };
  }, []);


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
    return () => {
      console.log('Data Removed')
    }
  }, [])




  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: onSubmitFunction
  });




  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);



  function onSubmitFunction(values) {
    console.log("values: ", values)
    axios.post(`${baseUrl}/api/v1/create`, {
      title: values.title,
      description: values.description
    })
      .then((response) => {
        console.log(response.data);
        const title = values.title;
        localStorage.setItem('title', title)

      }).catch((error) => {
        console.log(error);
      })
  }


  return (


    <div>

      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose style={{ color: 'white', marginLeft: '220px' }} />
              </Link>
            </li>
            {info.map((item, index) => {
              return (
                <li key={index} className='style'>

                  {/* {item.icon} */}
                  <span style={{ color: 'white', fontSize: '20px' }}>Name: <br /> {item.name}</span>
                  <br /><br />
                  <span style={{ color: 'white', fontSize: '20px' }}>Email:<br /> {item.email}</span>
                  <br /><br />
                  <span style={{ color: 'white', fontSize: '20px' }}><Button variant="outlined" onClick={() => { history.push("/signup") }}>Back to Signup</Button></span>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>


      <br />
      <br />
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            color="primary"
            id="outlined-basic"
            label="Title"
            variant="outlined"

            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}

            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <TextField
            fullWidth
            color="primary"
            id="outlined-basic"
            label="Description"
            variant="outlined"

            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}

            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <Button fullWidth variant="contained" color="primary" type="submit">Insert Button</Button>
        </Stack>

      </form>
      {
        // todo.map((eachData) => {
        //   return (
        //   <div style={{ margin: "2rem" }}>
        //     <Card sx={{ minWidth: 275 }}>
        //       <CardContent>
        //         <Typography variant="h4" component="div">
        //           {eachData.title}
        //         </Typography>
        //         <Typography variant="h6" component="div">
        //           {eachData.description}
        //         </Typography>
        //       </CardContent>
        //     </Card>
        //   </div>)


        // })
      }


    </div>



  )






}

export default Home;
