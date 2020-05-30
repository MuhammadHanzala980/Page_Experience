import React from "react";
import moment from "moment";
import s from "./Work.module.css";
import { getImageFullUrl } from "../../Utils/utils";

const Work = ({content, openPromotePostModal, openReactToPostModal}) => {
  const shares = 3;
  const showPromotePost = (content) => {
    openPromotePostModal(content);
  };

  const showReactPost = (content) => {
    openReactToPostModal(content);
  };  


    const hours = moment(content.dateOfCreation).fromNow();
    const name = `${content.user.firstname} ${content.user.lastname}`;
    return (
      <div
        className={s.contributions}
      >
        <div className={s.contribution}>
          <div className={s.header}>
            <img
              alt="as"
              src={getImageFullUrl(content.user.profilePhoto)}
              className={s.avatar}
            />

            <div>
              <h1 className={s.heading}>{name}</h1>
              <p className={s.ago}>{hours}</p>
            </div>
          </div>

          <div className={s.desc}>
            <p className={s.fullDesc}>
              {content.contentDescription}
            </p>
            <div className={s.footer}>
              <div className={s.stats}>
                {/* <span className={s.views}>{views}</span> */}
                <span className={s.shares}>{shares}</span>
              </div>

              <div className={s.actions}>
                <span className={s.action} onClick={() => showPromotePost(content)}>
                  Promote
                </span>
                <span className={s.action} onClick={() => showReactPost(content)}>
                  React{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
  
      </div>
    );
  }


export default Work;
