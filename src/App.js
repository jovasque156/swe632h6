import './App.css';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {Routes, Route, Link} from 'react-router-dom';
import {Home} from './views/home';
import {Search} from './views/search';
import {Risk} from './views/risk';


function App() {
  return (
    <>
      <Container fluid className="ms-auto">
        <Navbar bg="primary" variant='dark' expand="lg" fixed='top'>
          <Container fluid className="ms-auto">
            <Navbar.Brand as={Link} to='/'>Student Dropout</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to='/search'>Search</Nav.Link>
                <Nav.Link as={Link} to='/risk'>About Risk</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>

      <Container style={{paddingTop: "60px", paddingLeft: '0px', paddingRight: '0px'}} fluid='lg'>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/search' element={<Search/>}/>
          <Route exact path='/risk' element={<Risk/>}/>
        </Routes>
      </Container>
      
      <Container fluid fixed='bottom' bg='primary' className='pt-5 pb-0 pl-0 pr-0'>
        <footer className="bg-light text-center">
            <Container className='p-4 pb-4'>
            © 2022 Copyright.
            </Container>
        </footer>
      </Container>
      </>
  );
}

export default App;
