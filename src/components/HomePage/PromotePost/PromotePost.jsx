import "./PromotePost.scss";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import CardModal from "../CardModal/CardModal";
import { getImageFullUrl } from "../../../Utils/utils";
import { promotePost } from "../../../store/actions/ContentAction/ContentAction";
const refPromotePost = createRef();

class PromotePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elemHeight: 0,
      MyInfo: null,
      isLoading: false,
      postContent: ""
    };
  }

  componentWillMount() {
    if (this.props.loginUser && this.props.loginUser.success) {
      this.setState({ MyInfo: this.props.loginUser.data });
    } else {
      const data = sessionStorage.getItem("myinfo");
      console.log('user', data);
      this.setState({ MyInfo: JSON.parse(data) });
    }
  }
  componentDidMount() {
    if (refPromotePost.current) {
      this.setState({ elemHeight: refPromotePost.current.clientHeight });
    }
  }
  promoteHandler = () => {
    this.setState({ isLoading: true });
    this.props
      .promotePost(this.props.contentId, this.state.postContent)
      .then(() => {
        this.setState({ isLoading: false, postContent: "" });
        // this.props.hideModal();
      });
  };
  postContentChange = e => {
    this.setState({ postContent: e.target.value });
  };

  render() {
    return (
      <div className="PromotePost">
        <div
          className="modal-promote"
          ref={refPromotePost}
          style={{
            marginTop:
              window.pageYOffset +
              window.innerHeight / 2 -
              this.state.elemHeight / 2 +
              "px"
          }}
        >
          <div className="modal-promote-title">
            <h1>Promote this work</h1>

            <div className="btn-close" onClick={this.props.cache}>
              <div className="btn-close-left"></div>
              <div className="btn-close-right"></div>
            </div>
          </div>
          <div>{this.props.promoteMsg}</div>
          <div className="modal-promote-content">
            <img
              src={getImageFullUrl(this.state.myInfo.profilePhoto)}
              alt="profile"
            />
            <textarea
              className="modal-promote-input"
              placeholder="Share your throughts about this..."
              value={this.state.postContent}
              onChange={this.postContentChange}
            />
          </div>
          <div className="modal-promote-article">
            <CardModal
              photo={this.props.modalPhoto}
              user={this.props.modalUser}
              hour={this.props.modalHour}
              content={this.props.modalContent.contentDescription}
            />
          </div>
          <div className="modal-promote-bottom">
            {this.state.isLoading ? (
              <button
                className="btn-promote"
                onClick={this.promoteHandler}
                disabled
              >
                Promote
              </button>
            ) : (
              <button className="btn-promote" onClick={this.promoteHandler}>
                Promote
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const state = (state, ownProps = {}) => {
  return {
    loginUser: state.loginUser.data,
    promoteMsg: state.contentReducer.promoteMsg
  };
};

const mapDispatchToProps = {
  promotePost
};

export default connect(state, mapDispatchToProps)(PromotePost);
