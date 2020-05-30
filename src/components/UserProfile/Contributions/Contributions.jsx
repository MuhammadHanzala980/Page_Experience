import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { getContributionByUserAction } from "../../../store/actions/ContentAction/ContentAction";
import { getMyInfo } from "../../../store/actions/LoginAction/LoginUserAction";
import s from "./Contributions.module.css";
import { getImageFullUrl } from "../../../Utils/utils";

const Contributions = ({ contents, loadContributes }) => {
  // const dispatch = useDispatch();

  const [userDetail, setuserDetail] = useState(getMyInfo());

  useEffect(() => {
    const loadMyInfo = async () => {
      const info = await getMyInfo();
      loadContributes(0, 100, info);
      setuserDetail(info);
    };
    loadMyInfo();
  }, [loadContributes]);

  if (!contents) return null;

  const dataToRender =
    contents.data && contents.data.length ? contents.data : contents.data.data;

  return (
    <div className={s.contributions}>
      {dataToRender &&
        dataToRender.map(
          (
            { dateOfCreation, contentDescription, views = 0, shares = 0 },
            i
          ) => (
            <div className={s.contribution} key={i}>
              <div className={s.header}>
                <img
                  alt="as"
                  src={getImageFullUrl(userDetail.profilePhoto)}
                  className={s.avatar}
                />

                <div>
                  <p
                    className={s.heading}
                  >{userDetail.fullname}</p>
                  <p className={s.ago}>{moment(dateOfCreation).fromNow()}</p>
                </div>
                <p className={s.options}>...</p>
              </div>

              <div className={s.desc}>
                <p className={s.fullDesc}>{contentDescription}</p>

                <div className={s.footer}>
                  <div className={s.stats}>
                    <span className={s.views}>{views}</span>
                    <span className={s.shares}>{shares}</span>
                  </div>

                  <div className={s.actions}>
                    <span className={s.action}>Promote</span>
                    <span className={s.action}>React </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
    </div>
  );
};

const mapStateToProps = s => ({
  contents: s.contentReducer.data
});

const mapDispatchToProps = dispatch => {
  return {
    loadContributes: (page, limit, MyInfo) =>
      dispatch(getContributionByUserAction(page, limit, MyInfo.userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contributions);
