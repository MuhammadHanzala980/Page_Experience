import React, { Component } from "react";
import styled from "styled-components";

import { NavLink } from "react-router-dom";
import logo from "../../image/pagex-logo.png";

const Nav = styled.div`
  margin: 0 5px;
  width: 15%;
  box-shadow: 1px 0px 2px #e6e6e6;
  border-radius: 15px;
  left: 0;

  h1 {
    margin: 50px 0 0 15px;
    font-size: 22px;
  }

  ul {
    margin: 80px 0 0 25px;
  }

  li {
    font: bold 18px;
    text-align: left;
    margin: 25px 0;

    a:hover {
      color: #899EFF;
    }
  }
`;

class SideNav extends Component {
  render() {
    return (
      <Nav>
        <h1>
          <NavLink to="/home/">
          <img className='logo-image' src={logo} alt="pagexlogo"/>
          </NavLink>
        </h1>
        <ul>
          <li>
            <NavLink activeStyle={{ color: "#899EFF" }} to="/home/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: "#899EFF" }} to="/journals/">
              Journals
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: "#899EFF" }} to="/notifications/">
              Notifications
            </NavLink>
          </li>
        </ul>
      </Nav>
    );
  }
}

export default SideNav;
