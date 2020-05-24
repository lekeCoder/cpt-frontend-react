import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Container, Row, Col, Navbar, Nav, Jumbotron, Button, Table, Form, FormControl, InputGroup, Alert} from 'react-bootstrap';
import { PageComponent} from './components/pagination';
import axios from 'axios';

const FETCH_CPT = 'https://cpt-backend-nodejs.herokuapp.com/cpt/recruiters';
const FETCH_SEARCH_CPT = 'https://cpt-backend-nodejs.herokuapp.com/cpt/recruiters';
function App() {
  let [isLoading, setLoadingState] = useState(true);
  let [recruiters, setRecruiters] = useState({});
  let [error, setError] = useState("");
  let [search, setSearch] = useState('');

  async function fetchRecruiters(){
    
    try {
      const query = search.length > 0 ? '/'+search : '';
      const response = await axios.get(FETCH_CPT+query,{ crossorigin: true });
      //console.log(response);
      if(response.status === 200 ){
        console.log(response.data);
        setRecruiters(recruiters = response.data); 
        setLoadingState(isLoading = false);
      }
    } catch (err) {
      console.error(error);
      setError(error = err.message)
    }
  }

  function handleClick(e){
    if(search.length > 2) {
      setLoadingState(true);
    }
  }

  function clearSearch(){
    if(search.length > 2) {
      setLoadingState(true);
      fetchRecruiters();
    }
    if(search.length === 0 & !isLoading){
      fetchRecruiters();
    }
  }

  useEffect(() => {
    console.log('useEffect called')
    let ignore = false;
    clearSearch();
    if(isLoading && !ignore){
      fetchRecruiters();
    }
    return () => { ignore = true; }
  }, [search]);
  
  return (
    <div>
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
          <p>If you know any firm or a recruiting firm that is not on this list, you can be of help to the community of local & foreign students on CPT by adding a new recruiter. </p>
          <p>
            <Button variant="dark">Add CPT Recruiter</Button>
          </p>
          </Container>
        </Jumbotron>
        </Col>
     </Row>
     
      <Row className="justify-content-md-center">
        <Col sm={7}>
        <InputGroup className="mb-3">
        <FormControl
          placeholder="search for recruiters (min. : 3 chars)"
          aria-label="search for recruiters "
          aria-describedby="basic-addon2"
          defaultValue={search} 
          onChange={e => setSearch(e.target.value)} 
        />
        <InputGroup.Append>
          <Button variant="secondary" onClick={e => handleClick(e)}>Search</Button>
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
      {  !isLoading && <Container>
     <Row>
       <Col>
        <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Recruiter</th>
                <th>Contact</th>
                
              </tr>
            </thead>
            <tbody>
            {
              recruiters.data.map((cpt, index) => (
                <tr key={index}>
                <td>{index+1}</td>
                <td>{cpt.fname.toUpperCase()}</td>
                <td><a href={cpt.fweb}>{cpt.fweb}</a></td>
                
              </tr>
              ))
            }
              
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
</div>
    
  );
}

export default App;
