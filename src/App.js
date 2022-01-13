import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import Home from './component/Home'
import Contact from './component/Contact'
import About from './component/About'
import EmployeeDetails from './component/EmployeeDetails'
import EmployeeForm from './component/EmployeeForm'
import {Navbar, Nav, Container}from 'react-bootstrap'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getEmployees } from './actions/employee-action-creators'
//amplify packages
import { Amplify} from 'aws-amplify';
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsEXports from './aws-exports';
Amplify.configure(awsEXports);

function App({getEmployees}) {
  getEmployees();
  return (
    <Authenticator loginMechanisms={['username']  }>
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">{process.env.REACT_APP_APPLICATION_NAME}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link onClick={signOut}>SignOut</Nav.Link>
            <Nav.Link href="#">Welcome {user.username}</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div id="pagecontainer">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
          <Route exact path="/employees/loc/:locId/ecode/:ecode" element={<EmployeeDetails />}></Route>
          <Route exact path="/employees/create" element={<EmployeeForm />}></Route>
        </Routes>
      </div>
    </Router>
    </Authenticator>
  );
}

function mapDispatchToProps(dispatch){
  let actionMap={
    getEmployees
  }
  return bindActionCreators(actionMap, dispatch)
}
export default connect(null,mapDispatchToProps)(App);
