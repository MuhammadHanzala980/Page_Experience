import React, { Component } from 'react';
import styled from 'styled-components';
import defaultImageBackgroundUpload from './../../image/icone/imageBackground.svg';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { PublishWorkAction } from '../../store/actions/ContentAction/ContentAction';

const Wrapper = styled.div`
  position: absolute;
  z-index: 213;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .modal-react {
    width: 80%;
    max-width: 700px;
    background: #fff;
    z-index: 13;
    position: absolute;
    top: 50vh;
    left: 50%;
    transform: translateX(-50%)  translateY(-50%); 
    //margin: 50% auto auto auto ;
    box-shadow: 0px 3px 30px #00000029;
    border-radius: 20px;
    color: #000;
  }

  .modal-react-top {
    width: 95%;
    padding: 15px;
    border-bottom: 1px solid #00000026;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-react-title {
   font-size: 25px;
    font-weight: bold;
  }

  .btn-close {
    display: block;
    text-align: center;
    line-height: 20px;
    width: 25px;
    height: 25px;
    border-radius: 25px;
    font-size: 15px;
    color: white;
    background-color: #707070;
    position: relative;
    cursor: pointer;
    .btn-close-left, .btn-close-right {
      width: 15px;
      height: 1px;
      background-color: white;
      position: absolute;
      top: 12px;
      left: 5px;
    }
    .btn-close-left {
      transform: rotate(-45deg);
    }
    .btn-close-right {
      transform: rotate(45deg);
    }
    &:hover {
      background-color: #59DEFF;
    }
  }

  .custom-file-upload img {
    display: block;
    width: 40px;
    height: 40px;
  }

  p {
    padding: 1px;
    height: 36px;
    line-height: 36px;
    margin: 0 5px;
    color: #8c8787;
    text-align: center;
  }

  .modal-react-people {
    padding: 15px;
  }

  .modal-group-img {
    display: flex;
  }

  .input-react {
    border: none;
    width: 250px;
    height: 27px;
    background: #f1f1f1;
    border-radius: 3px;
    margin-top: 10px;
    appearance: none;
    position: relative;
  }
  
  ul.input-react {
   width: 217px;
       padding-left: 0px;
   font-size: 17px;
   list-style-type: none;
   height: 27px;
   margin: 0;

   li {
    background: #f1f1f1;
    height: 27px;
    padding-left: 5px;
    display: none;
   }
    li:first-child {
      display: block;
   }
  }
  
  .open-list {
    li {
      display: block !important;
    }
  }
  
  .select-wrapper {
    display: flex;
    margin-top: 15px;
    position: relative;
  }
  
  .select-arrow {
    position: absolute;
    right: 0;
    bottom: 5px;
    height: 27px;
    width: 27px;  
    background-color: #FFFFFF;
    box-shadow: 0px 3px 6px #0000001A;
    border: 0.5px solid #70707036;
  }
  
  .rotate-arrow {
    &:after {
      transform: rotate(90deg)
    }
  }
  
  .modal-promote-bottom {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }

  .btn-promote {
    width: 100px;
    height: 31px;
    border: none;
    background: #000000;
    color: #fff;
    box-shadow: 0px 3px 2px #00000029;
    font-size: 13px;
    border-radius: 21px;
    cursor: pointer;
  }
  .item {
    margin-left: 10px;
  }
  .drop-box {
    display: flex;
    justify-content: center;
    border: 1px dashed grey;
    margin: 50px 50px 10px 50px;
    padding: 50px;
    background: #f2f2f2;

  }
  .input-fields label {
    display: inline-block;
    width: 140px;
    text-align: right;
  }​
`;

class PublishWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      title: '',
      description: '',
      author: '',
      MyInfo: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePublishWork = this.handlePublishWork.bind(this);
  }

  componentDidMount() {
    if (this.props.loginUser && this.props.loginUser.success) {
      this.setState({ MyInfo: this.props.loginUser.data });
    } else {
      const data = sessionStorage.getItem('myinfo');
      this.setState({ MyInfo: JSON.parse(data) });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('aaaaa', nextProps);
    if (nextProps.publishWork && nextProps.publishWork.success) {
      // nextProps.close();
      nextProps.publishWork.success = false;
      return { success: true };
    } else {
      return null;
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (target.type === 'file') {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          photo: target.files[0],
          photoPreview: e.target.result,
        });
      };
      reader.readAsDataURL(target.files[0]);
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  handlePublishWork() {
    const { photo, title, description, author, MyInfo } = this.state;
    if (!title) {
      alert("Please type 'Title'");
      return;
    }

    if (!description) {
      alert("Please type 'Description'");
      return;
    }
    if (!author) {
      alert("Please type 'Author'");
      return;
    }
    // if (!photo) {
    //   alert("Please select 'File'");
    //   return;
    // }

    const data = {
      userId: MyInfo.userId,
      title: title,
      author: author,
      description: description,
      photo: photo,
    };
    this.props.onPublishWorkAction(data, MyInfo.token).then(() => {
      this.props.close();
    });
  }

  openSelect = (event) => {
    if (!this.state.listOpened) {
      event.currentTarget.classList.add('rotate-arrow');
      event.currentTarget.lastChild.classList.add('open-list');
      this.setState({ listOpened: true });
    } else {
      event.currentTarget.classList.remove('rotate-arrow');
      event.currentTarget.lastChild.classList.remove('open-list');
      this.setState({ listOpened: false });
    }
  };

  render() {
    return (
      <Wrapper className="PublishWork">
        <div className="modal-react">
          <div className="modal-react-top">
            <h1 className="modal-react-title">Publish a work</h1>
            <div className="btn-close" onClick={this.props.close}>
              X
            </div>
          </div>
          <div className="modal-react-form">
            <div className="drop-box">
              <input
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
                name="photo"
                onChange={this.handleChange}
              />
              <div>
                <label htmlFor="file-upload" className="custom-file-upload">
                  <img
                    style={{ position: 'relative', left: '45%' }}
                    src={defaultImageBackgroundUpload}
                    alt="upload-icon"
                  />
                  <p>Drag and Drop a header picture here.</p>
                  <p>Only JPG,PNG and GIF files are allowed.</p>
                </label>
              </div>
            </div>
            <div
              className="input-fields"
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingLeft: 50,
                paddingRight: 50,
              }}
            >
              <div>
                <span style={{ display: 'block' }}>
                  <label style={{ fontWeight: 'bold', marginRight: '15px' }}>
                    Title
                  </label>
                  <input
                    name="title"
                    onChange={this.handleChange}
                    className="input-react"
                  />
                </span>
                <span style={{ verticalAlign: 'middle' }}>
                  <label style={{ fontWeight: 'bold', marginRight: '15px' }}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    onChange={this.handleChange}
                    style={{ height: '100px', verticalAlign: 'middle' }}
                    className="input-react"
                  />
                </span>
                <span>
                  <label style={{ fontWeight: 'bold', marginRight: '15px' }}>
                    Author
                  </label>
                  <input
                    name="author"
                    onChange={this.handleChange}
                    className="input-react"
                  />
                </span>
                <span style={{ position: 'relative' }}>
                  <div className="select-wrapper" onClick={this.openSelect}>
                    <label style={{ fontWeight: 'bold', marginRight: '15px' }}>
                      Work Type
                    </label>
                    <div className="select-arrow"></div>
                    <ul className="input-react">
                      <li></li>
                      <li>Painting</li>
                      <li>Photography</li>
                      <li>Writing</li>
                    </ul>
                  </div>
                </span>
              </div>
              <div style={{ width: 190, height: 190 }}>
                {this.state.photo && (
                  <img
                    src={this.state.photoPreview}
                    alt="Preview"
                    style={{ width: 190 }}
                  />
                )}
                {!this.state.photo && <p> </p>}
              </div>
            </div>
          </div>
          <div className="modal-promote-bottom">
            <button
              onClick={() => this.handlePublishWork()}
              className="btn-promote"
            >
              Publish
            </button>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const state = (state, ownProps = {}) => {
  return {
    publishWork: state.contentReducer.data,
    location: state.location,
    loginUser: state.loginUser.data,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: (location) => {
      dispatch(push(location));
    },
    onPublishWorkAction: (data, token) =>
      dispatch(PublishWorkAction(data, token)),
  };
};

export default connect(state, mapDispatchToProps)(PublishWork);
