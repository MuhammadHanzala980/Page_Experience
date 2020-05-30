import React, { Component } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import Create from "../../image/icone/add-icon.png";
import Profile from "../../image/icone/user-icon.png";
import IconSearch from "../../image/icone/search-icon.png";

import DownProfile from "../dropdown/DownProfile";
import CreateDropDown from "../dropdown/CreateDropDown"
import SettingProfile from "../modal/SettingProfile";

const Bar = styled.div`
  width: 100%;
  position: fixe;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;

  .bar {
    width: 80%;
    position: relative;

    img {
      position: absolute;
      margin-top: 30px;
      right:  60px;
      top: -3px;
      height: 21px;
    }
  }

  .input-search {
    width: 100%;
    height: 35px;
    border: none;
    border: 1px solid #70707069;
    border-radius: 20px;
    display: block;
    padding: 0 15px;
    margin: 20px;
  }

  .group-icone-search {
    display: flex;
    text-align: left;
    justify-content: center;
    width: 40%;
    
    .item-icone {
      margin: 0 10px;
    }
    img {
      height:40px;
    }
  }

  :active {
    border-radius: 20px;
  }
  .search-container {
    width: 80%;
    margin-left: 80px;
  }
`;

class SearchBar extends Component {
  state = {
    search: "",
    actRedirect: false,
    downProfile: false,
    settingProfile: false,
    openCreatePostDropDown:false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleKeydown = event => {
    if (event.key === "Enter") {
      this.setState({ actRedirect: true });
    }
  };

  handleClick = event => {
    this.setState({ downProfile: !this.state.downProfile });
  };

  handleSettingProfile = () => {
    this.setState({
      settingProfile: !this.state.settingProfile,
      downProfile: false
    });
  };

  render() {
    const afficherDownProfile = this.state.downProfile;
    let dropdownProfile;

    if (afficherDownProfile) {
      dropdownProfile = <DownProfile init={this.handleSettingProfile} />;
    }
    if (this.state.openCreatePostDropDown) {
      dropdownProfile = <CreateDropDown/>
    }

    let settingProfile;

    if (this.state.settingProfile) {
      settingProfile = <SettingProfile close={this.handleSettingProfile} />;
    }

    return (
      <Bar>
        <div className="bar">
          <div className='search-container'>
          <input
            className="input-search"
            type="search"
            placeholder="Search"
            name="search"
            onChange={this.handleChange}
            onKeyPress={this.handleKeydown}
            value={this.state.search}
          />
          <img className="icone-search" src={IconSearch} alt="icone search" />
          </div>
        </div>
        <ul className="group-icone-search">
          <li className="item-icone">
            <span onClick={()=>{this.setState({openCreatePostDropDown:!this.state.openCreatePostDropDown})}}>
              <img src={Create} alt="icone" />
            </span>
          </li>
          <li className="item-icone">
            <span onClick={this.handleClick}>
              <img src={Profile} alt="icone" />
            </span>
          </li>
        </ul>
        {this.state.actRedirect ? (
          <Redirect push to={"/search/" + this.state.search} />
        ) : (
          ""
        )}
        {dropdownProfile}
        {settingProfile}
      </Bar>
    );
  }
}

export default SearchBar;
