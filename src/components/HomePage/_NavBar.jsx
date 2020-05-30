import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, InputGroup } from 'react-bootstrap';
import CreateDropDown from '../dropdown/CreateDropDown';
import ProfileDropDown from '../dropdown/DownProfile';
import { connect } from 'react-redux';
import  { getImageFullUrl } from '../../Utils/utils';
import './homepagestyles.css';

const NavBar = ({ MyInfo }) => {
  const [dropDown, setDropDown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const dropDownHandler = () => {
    setDropDown(!dropDown);
    setProfileDropdown(false);
  };

  const profileDropDownHandler = () => {
    setProfileDropdown(!profileDropdown);
    setDropDown(false);
  };  
  
    return (
      <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{ width: '80%' }}>
            <Form style={{ width: '100%' }} inline>
              <InputGroup className="inputgroup-wrapper">
                <FormControl
                  placeholder="Search"
                  aria-label="search"
                  aria-describedby="basic-addon1"
                  className="search-field"
                />
                <InputGroup.Append>
                  <img
                    className="search-icon"
                    src="./search-icon.png"
                    alt="search"
                  />
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Nav>
          <div>
            <span onClick={dropDownHandler}>
              <img
                width="30px"
                className="mr-1 cursor-pointer"
                src="./add-icon.png"
                alt="add-icon"
              />
            </span>
            <span onClick={profileDropDownHandler}>
              <img
                width="30px"
                className="cursor-pointer"
                src={getImageFullUrl(MyInfo.profilePhoto)}
                alt="user-icon"
              />
            </span>
          </div>
        </Navbar.Collapse>
          {dropDown ? <CreateDropDown close={() => setDropDown(false)} />:null}
          {profileDropdown ? <ProfileDropDown isOpen={profileDropdown} close={() => setProfileDropdown(false)} />:null}
      </Navbar>
    );
}
const mapStateToProps = (state) => {
  return {
    MyInfo: state.myInfo,
  };
};

export default connect(mapStateToProps)(NavBar);

