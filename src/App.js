import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Container, Row, Col, Navbar, Nav, Jumbotron, Button, Table, Form, FormControl, InputGroup, Alert} from 'react-bootstrap';
import { PageComponent} from './components/pagination';
import axios from 'axios';


function App() {
  let [isLoading, setLoadingState] = useState(true);
  const [recruiters, setRecruiters] = useState({});
  let [error, setError] = useState("");
  let [search, setSearch] = useState('');

  async function fetchRecruiters(){
    await fetch("https://cpt-backend-nodejs.herokuapp.com/cpt/recruiters",{method: "GET", mode: 'no-cors',headers: {
      'Access-Control-Allow-Origin':'*','content-type':'application/json'
    }}).then(response => response.json())
    .then(jsondata =>  {
        console.log(jsondata);
        setRecruiters(jsondata); 
        setLoadingState(isLoading = true);
      })
      .catch(err => setError(error = err.message));
    // try {
    //   const response = await axios.get('https://cpt-backend-nodejs.herokuapp.com/cpt/recruiters',{ crossdomain: true });
    //   console.log(response);
    // } catch (err) {
    //   console.error(error);
    //   setError(error = err.message)
    // }

    

  }

  useEffect(() => {
    fetchRecruiters();
  });
  
  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#">
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        US CPT Recruiters Only
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav.Link className="text-white" href="#home">
          add new recruiter
        </Nav.Link>
      </Navbar.Collapse>
  </Navbar>
  <Container fluid>
    <Row>&nbsp;</Row>
     <Row>
        <Col>
        <Jumbotron fluid>
        <Container>
          <h1>Welcome!</h1>
          <p>
            I created this page to collect in one place all the firms in the US that employs students under the <b>Curriculum Practical Training (CPT)</b> F-1 Visa. Obviously, this is not exhaustive and the list is subject to change from time to time.  
          </p>
          <p>If you know any firm or a recruiting firm that is not on this list, you can be of help to ther community of foreign students on CPT by adding a new recruiter. </p>
          <p>
            <Button variant="dark">Add CPT Recruiter</Button>
          </p>
          </Container>
        </Jumbotron>
        </Col>
     </Row>
      {  !isLoading && <Container>
      <Row className="justify-content-md-center">
        <Col sm={7}>
        <InputGroup className="mb-3">
        <FormControl
          placeholder="search for recruiters "
          aria-label="search for recruiters "
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="secondary">Search</Button>
          </InputGroup.Append>
        </InputGroup>
          {/* <Form inline className="justify-content-end mb-sm-2">
            <FormControl fluid type="text" placeholder="Search for recruiters" className="  mr-sm-2" />
            <Button type="submit">Search</Button>
          </Form> */}
        </Col>
        {/* <Col sm={5}>
          <PageComponent active={0} total={0} />
        </Col> */}
      </Row>
     <Row>
       <Col>
        <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Recruiter</th>
                <th>Contact</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              </tbody>
        </Table>
       </Col>
     </Row>
     </Container>
      }
      {
        error && <Row><Col><Alert variant="danger">{error}</Alert></Col></Row>
      }

    </Container>
</>
    
  );
}

export default App;
