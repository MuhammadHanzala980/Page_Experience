import React, { Component } from "react";
import moment from "moment";
import s from "./Work.module.css";
import PromotePost from "../PromotePost/PromotePost";
import ReactPost from "../ReactPost/ReactPost";
import { getImageFullUrl } from "../../../Utils/utils";

export class Work extends Component {
  state = {
    name: "Rubi Kaur",
    ago: "1 hours",
    desc:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip.",
    views: 13,
    shares: 1,
    comments: 10
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.visiblePromotePost || this.state.visibleReactPost) {
      document.getElementById("root").style.filter = "blur(3px)";
      document.getElementById("root").classList.add("cover-blur");
    } else {
      document.getElementById("root").style.filter = "blur(0px)";
      document.getElementById("root").classList.remove("cover-blur");
    }
    if (
      document.getElementsByClassName("PromotePost")[0] &&
      this.state.visiblePromotePost
    ) {
      document.body.appendChild(
        document.getElementsByClassName("PromotePost")[0]
      );
    }
    if (
      document.getElementsByClassName("ReactPost")[0] &&
      this.state.visibleReactPost
    ) {
      document.body.appendChild(
        document.getElementsByClassName("ReactPost")[0]
      );
    }
  }

  showPromotePost = () => {
    if (!this.state.visiblePromotePost) {
      this.setState({ visiblePromotePost: true });
    } else {
      document
        .querySelector("." + s.contributions)
        .appendChild(document.getElementsByClassName("PromotePost")[0]);
      this.setState({ visiblePromotePost: false });
    }
  };

  showReactPost = () => {
    if (!this.state.visibleReactPost) {
      this.setState({ visibleReactPost: true });
    } else {
      document
        .querySelector("." + s.contributions)
        .appendChild(document.getElementsByClassName("ReactPost")[0]);
      this.setState({ visibleReactPost: false });
    }
  };

  render() {
    const hours = moment(this.props.content.dateOfCreation).fromNow();
    const name = `${this.props.content.user.firstname} ${this.props.content.user.lastname}`;
    return (
      <div
        style={{ width: "700px", marginLeft: "70px"}} 
        className={s.contributions}
      >
        <div className={s.contribution}>
          <div className={s.header}>
            <img
              alt="as"
              src={getImageFullUrl(this.props.content.user.profilePhoto)}
              className={s.avatar}
            />

            <div>
              <h1 className={s.heading}>{name}</h1>
              <p className={s.ago}>{hours}</p>
            </div>
          </div>

          <div className={s.desc}>
            <p className={s.fullDesc}>
              {this.props.content.contentDescription}
            </p>
            <div className={s.footer}>
              <div className={s.stats}>
                <span className={s.views}>{this.state.views}</span>
                <span className={s.shares}>{this.state.shares}</span>
              </div>

              <div className={s.actions}>
                <span className={s.action} onClick={this.showPromotePost}>
                  Promote
                </span>
                <span className={s.action} onClick={this.showReactPost}>
                  React{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.state.visiblePromotePost && (
          <PromotePost
            cache={this.showPromotePost}
            contentId={this.props.content["_id"]}
            modalPhoto={getImageFullUrl(this.props.content.user.profilePhoto)}
            modalUser={name}
            modalHour={hours}
            modalContent={this.props.content}
          />
        )}
        {this.state.visibleReactPost && (
          <ReactPost
            contentId={this.props.content["_id"]}
            cache={this.showReactPost}
          />
        )}
      </div>
    );
  }
}

export default Work;
