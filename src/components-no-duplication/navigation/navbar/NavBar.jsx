import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import Logo from '../../../components/Logo/Logo';
import CreateDropDown from '../dropdown/CreateDropDown';
import ProfileDropDown from '../dropdown/DownProfile';
import { connect } from 'react-redux';
import  { getImageFullUrl } from '../../../Utils/utils';
import styles from './NavBar.module.scss';
import { logoutUserAction } from '../../../store/actions';
import { 
  openPublishContributionModalAction,
  openPublishWorkModalAction
 }
 from '../../../store/actions/ModalsAction/ModalsAction'
import { Container } from 'react-bootstrap';

const NavBar = ({ myInfo, logoutUser, openPublishContributionModal, openPublishWorkModal }) => {
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
      <Container fixed style={{maxWidth: 950}}>
        <Navbar expand="sm">
        <Logo className="logo-nav" />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
              <form className={styles.searchForm}>
                  <input
                    placeholder="Search..."
                    aria-label="search"
                    aria-describedby="basic-addon1"
                    className="search-field"
                  />
                  <div className={styles.searchIcon}>
                    <img
                      src="/search-icon.png"
                      alt="search"
                    />
                  </div>
              </form>
              <span className={styles.profilePicture} onClick={profileDropDownHandler}>
                <img
                  className="cursor-pointer"
                  src={getImageFullUrl(myInfo.profilePhoto)}
                  alt="user-icon"
                />
              </span>
              <span className={styles.plus} onClick={dropDownHandler}>
                <img
                  className="mr-1 cursor-pointer"
                  src="/add-icon.png"
                  alt="add-icon"
                />
              </span>
          </Navbar.Collapse>
            {dropDown ? <CreateDropDown 
                close={() => setDropDown(false)}
                  openWorkModal={openPublishWorkModal}
                  openContributionModal={openPublishContributionModal}
                />:null}
            {profileDropdown ? <ProfileDropDown logoutUser={logoutUser}  close={() => setProfileDropdown(false)} />:null}
        </Navbar>
      </Container>
    );
}
const mapDispatchToProps = (dispatch, ownProps) => (
  {
    logoutUser: (data) => dispatch(logoutUserAction(data)), 
    openPublishContributionModal: (data) => dispatch(openPublishContributionModalAction(data)), 
    openPublishWorkModal: (data) => dispatch(openPublishWorkModalAction(data)), 
  }
)  
const mapStateToProps = (state) => {
  return {
    myInfo: state.myInfo,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

