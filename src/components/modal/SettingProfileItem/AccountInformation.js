import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .account-photo {
    width: 158px;
    height: 170px;
    text-align: center;
  }
  .account-photo:hover {
    opacity: 0.5;
    cursor: pointer;
  }

  .top-account-subtitle {
    font-weight: bold;
    text-align: center;
  }

  form {
    width: 50%;
    margin: 0 auto;

    .label-account {
      font-size: 17px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      margin: 25px 0;
    }

    .input-account {
      width: 50%;
      font-size: 17px;
      font-weight: bold;
      border: none;
      border-bottom: 1px solid #70707069;
    }
  }
  .save-changes-btn {
    text-decoration: none;
    color: #fff;
    width: 30%;
    height: 50px;
    background: #111;
    text-align: center;
    border-radius: 5px;
  }
  .d-none {
    display: none;
  }
`;

class AccountInformation extends Component {
  constructor(props) {
    super(props);
    this.onFileUploadProfilePic = this.onFileUploadProfilePic.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.state = {
      name: "admin",
      userName: "admin",
      accountEmail: "admin@localhost.com",
      location: "New York, USA",
      hasValueChanged: false,
      photo: props.photo
    };
  }

  onFileUploadProfilePic(e) {
    if (!e.target.files.length) {
      return;
    }
    const attachment = Array.from(e.target.files)[0];
    this.setState({ photo: attachment, hasValueChanged: true });
    this.loadImage(attachment);
  }

  loadImage(attachment) {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ photo: e.target.result });
    };
    reader.readAsDataURL(attachment);
  }

  handleFormSubmit() {
    // Call endpoint to edit profile
  }
  render() {
    return (
      <Wrapper>
        <div className="top-account">
          <div>
            <label style={{ width: "100%" }} htmlFor="profile-pic">
              <div className="cover-pic-img-box">
                <img
                  className="account-photo"
                  src={this.state.photo}
                  alt="profile"
                />
                <div className="cover-pic-img-content"></div>
              </div>
            </label>
            <input
              className="d-none"
              type="file"
              id="profile-pic"
              name="profile-pic"
              onChange={this.onFileUploadProfilePic}
            />
          </div>
          <p className="top-account-subtitle">Your profile picture</p>
        </div>
        <form>
          <label className="label-account">
            Name{" "}
            <input
              required
              name="name"
              className="input-account"
              type="text"
              value={this.state.name}
              onChange={event => {
                this.setState({
                  name: event.target.value,
                  hasValueChanged: true
                });
              }}
            />
          </label>
          <label className="label-account">
            User Name{" "}
            <input
              required
              name="userName"
              className="input-account"
              type="text"
              value={this.state.userName}
              onChange={event => {
                this.setState({
                  userName: event.target.value,
                  hasValueChanged: true
                });
              }}
            />
          </label>
          <label className="label-account">
            Account Email{" "}
            <input
              required
              name="accountEmail"
              className="input-account"
              type="text"
              value={this.state.accountEmail}
              onChange={event => {
                this.setState({
                  accountEmail: event.target.value,
                  hasValueChanged: true
                });
              }}
            />
          </label>
          <label className="label-account">
            Location{" "}
            <input
              required
              name="location"
              className="input-account"
              type="text"
              value={this.state.location}
              onChange={event => {
                this.setState({
                  location: event.target.value,
                  hasValueChanged: true
                });
              }}
            />
          </label>
          {this.state.hasValueChanged && (
            <div style={{ textAlign: "center" }}>
              <button type="submit" onClick={this.handleFormSubmit} className="save-changes-btn">Save Changes</button>
            </div>
          )}
        </form>
      </Wrapper>
    );
  }
}

export default AccountInformation;
