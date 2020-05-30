import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';

function SideBar() {
  return (
    <Col className="side-bar pt-3" md={2}>
      <div className="flex-column">
        <Logo />
        <div className="mt-5">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/journal" className="nav-link">
            Explore
          </Link>
          <Link to="/notification" className="nav-link">
            Notifications
          </Link>
        </div>
      </div>
    </Col>
  );
}

export default SideBar;
