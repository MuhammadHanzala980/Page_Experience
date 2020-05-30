import "./ReactPost.scss";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import {
  reactPost,
  getPostReactions
} from "../../../store/actions/ContentAction/ContentAction";
import { getImageFullUrl } from "../../../Utils/utils";

const refPromotePost = createRef();
const refReactImage = createRef();

class ReactPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elemHeight: 0,
      MyInfo: null,
      isLoading: false,
      postContent: "",
      postTags: ""
    };
  }
  componentWillMount() {
    if (this.props.loginUser && this.props.loginUser.success) {
      this.setState({ MyInfo: this.props.loginUser.data });
    } else {
      const data = sessionStorage.getItem("myinfo");
      this.setState({ MyInfo: JSON.parse(data) });
    }
  }

  componentDidMount(prevProps, prevState, snapshot) {
    if (refPromotePost.current) {
      this.setState({ elemHeight: refPromotePost.current.clientHeight });
    }
    console.log("this.props.contentId", this.props.contentId);
    this.props.getPostReactions(this.props.contentId);
  }

  reactHandler = () => {
    this.setState({ isLoading: true });
    console.log("this.props.contentId", this.props.contentId);
    this.props
      .reactPost(
        this.props.contentId,
        this.state.postContent,
        this.state.postTags,
        // refReactImage.current.value
        null
      )
      .then(() => {
        this.setState({ isLoading: false, postContent: "", postTags: "" });
        // refReactImage.current.value = null;
      });
  };
  postContentChange = e => {
    this.setState({ postContent: e.target.value });
  };

  postTagsChange = e => {
    this.setState({ postTags: e.target.value });
  };
  imageContentChange = e => {
    refReactImage.current.click();
  };

  render() {
    return (
      <div className="ReactPost">
        <div
          className="modal-react"
          ref={refPromotePost}
          style={{
            marginTop:
              window.pageYOffset +
              window.innerHeight / 2 -
              this.state.elemHeight / 2 +
              "px"
          }}
        >
          <div className="modal-react-top">
            <h1 className="modal-react-title">React to this work</h1>
            <div className="btn-close" onClick={this.props.cache}>
              <div className="btn-close-left"></div>
              <div className="btn-close-right"></div>
            </div>
          </div>
          {this.props.reactMsg && (
            <div className="modal-react-people">{this.props.reactMsg}</div>
          )}
          {this.props.postReactions && this.props.postReactions.length > 0 && (
            <div className="modal-react-people">
              <div className="modal-group-img">
                {this.props.postReactions.map((item, index) =>
                  index < 2 ? (
                    <img
                      src={getImageFullUrl(item.profilePhoto)}
                      alt="profile"
                    />
                  ) : (
                    ""
                  )
                )}
                {this.props.postReactions.length > 2 && (
                  <>
                    <p>+{this.props.postReactions.length - 2}</p>
                    <span>other people</span>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="modal-react-form">
            <div className="input-form">
              <div className="input-form-item-1">
                <img
                  src={getImageFullUrl(this.state.MyInfo.profilePhoto)}
                  alt="profile"
                />
                <textarea
                  className="input-react"
                  placeholder="Write your thoughts ..."
                  value={this.state.postContent}
                  onChange={this.postContentChange}
                />
              </div>
              <div className="input-form-item-2">
                <input
                  className="input-tags"
                  placeholder="#Tags"
                  value={this.state.postTags}
                  onChange={this.postTagsChange}
                />
                {/* <input type="file" ref={refReactImage} />
                <img
                  style={{ height: "20px", cursor: "pointer" }}
                  src={Attach}
                  alt="attach"
                  onClick={this.imageContentChange}
                /> */}
              </div>
            </div>
          </div>
          <div className="modal-promote-bottom">
            {this.state.isLoading ? (
              <button
                className="btn-promote"
                onClick={this.reactHandler}
                disabled
              >
                Publish
              </button>
            ) : (
              <button className="btn-promote" onClick={this.reactHandler}>
                Publish
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
    reactMsg: state.contentReducer.reactMsg,
    postReactions: state.contentReducer.postReactions
  };
};

const mapDispatchToProps = {
  reactPost,
  getPostReactions
};

export default connect(state, mapDispatchToProps)(ReactPost);
