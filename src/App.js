import React, { Component } from 'react';
import styles from './App.scss';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem, Container, Row, Col } from 'react-bootstrap';
import Sidebar from './sidebar'
import WorkSpaces from './workspaces';
import WorkSpaceInfo from './workspace-info';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {


    return (
      <div className="App">
        <Container fluid>
          <Row>
            <Col md={3} className='pr-0'>
              <Sidebar />
              <WorkSpaces />
            </Col>
            <Col md={9} className='pl-0'>
              <WorkSpaceInfo />
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default App;
