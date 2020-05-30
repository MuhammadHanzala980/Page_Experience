import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import NavBar from '../HomePage/NavBar';
import SideBar from '../HomePage/SideBar';

function Layout(props) {
  return (
    <React.Fragment>
      <Row style={{ height: '100%' }}>
        <SideBar />
        <Col md={{ span: 10, offset: 2 }} className="home-page-col">
          <NavBar />
          <Row>
            <Col>
              <Container>{props.children}</Container>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Layout;
