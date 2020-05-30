import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Contribution.css";
import PromotePost from "../PromotePost/PromotePost";
import ReactPost from "../ReactPost/ReactPost";
import { getImageFullUrl } from "../../../Utils/utils";
const formatTag = (tag) =>{
  if(tag){
    if(tag.startsWith("#")) return tag;
    else return `#${tag}`;
  }   
}

const Contribution = ({content}) => {
  //const views = 63;
  const shares = 3;
  const [visiblePromotePost, setVisiblePromotePost] = useState(false);
  const [visibleReactPost, setVisibleReactPost] = useState(false);
  
useEffect(()=>{
  if(visiblePromotePost || visibleReactPost){
    document.getElementById("root").style.filter = "blur(3px)";
    document.getElementById("root").classList.add("cover-blur");
  }
  else
  {
    document.getElementById("root").style.filter = "blur(0px)";
    document.getElementById("root").classList.remove("cover-blur");
  }
  if (
    document.getElementsByClassName("PromotePost")[0] &&
    visiblePromotePost
  ) {
    document.body.appendChild(
      document.getElementsByClassName("PromotePost")[0]
    );
  }
  if (
    document.getElementsByClassName("ReactPost")[0] &&
    visibleReactPost
  ) {
    document.body.appendChild(
      document.getElementsByClassName("ReactPost")[0]
    );
  }
})

  const showPromotePost = () => {
    if (!visiblePromotePost) {
      setVisiblePromotePost(true);
    } else {
      document
        .querySelector(".contributions")
        .appendChild(document.getElementsByClassName("PromotePost")[0]);
        setVisiblePromotePost(false);
    }
  };

  const showReactPost = () => {
    if (!visibleReactPost) {
      setVisibleReactPost(true);
    } else {
      document
        .querySelector(".contributions")
        .appendChild(document.getElementsByClassName("ReactPost")[0]);
      setVisibleReactPost(false);
    }
  };  
    const hours = moment(content.dateOfCreation).fromNow();
    const name = content.user.fullname;
    return (
      <div
        style={{ width: "700px", marginLeft: "70px"}}
        className="contributions"
      >
        <div className="contribution">
          <div className="header">
            <img
              alt="as"
              src={getImageFullUrl(content.user.profilePhoto)}
              className={"avatar"}
            />
            <div>
              <h1 className="heading">{name}</h1>
              <p className="ago">{hours}</p>
            </div>
          </div>

          <div className="desc">
            <p className="fullDesc">
              {content.contentDescription}
            </p>
            <p className="tags">{formatTag(content.contentTag)}</p>
            <div className="footer">
              <div className="stats">
                {/* <span className="views">{views}</span> */}
                <span className="shares">{shares}</span>
              </div>

              <div className="actions">
                <span className="action" onClick={showPromotePost}>
                  Promote
                </span>
                <span className="action" onClick={showReactPost}>
                  React{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        {visiblePromotePost && (
          <PromotePost
            cache={showPromotePost}
            contentId={content["_id"]}
            modalPhoto={getImageFullUrl(content.user.profilePhoto)}
            modalUser={name}
            modalHour={hours}
            modalContent={content}
          />
        )}
        {visibleReactPost && (
          <ReactPost
            contentId={content["_id"]}
            cache={showReactPost}
          />
        )}
      </div>
    );
  }


export default Contribution;
