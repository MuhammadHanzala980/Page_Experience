import React, { useEffect } from "react";
import { connect } from "react-redux";
import classes from "./UserProfile.module.css";
import Contributions from "./Contributions/Contributions";
import { getImageFullUrl } from "../../Utils/utils";


// actions import
import { getMyInfoApi } from "../../store/actions/LoginAction/LoginUserAction";

const UserProfile = ({getMyInfoApi, MyInfo}) => {
  useEffect(() => {
    getMyInfoApi();
  }, [getMyInfoApi]);

  return (
    <div className={classes.home}>
      <div className={classes.mainWrapper}>
        <div className={classes.mainData}>
          {MyInfo && (
            <div className={classes.topInfo}>
              <img
                alt={MyInfo.fullname}
                src={getImageFullUrl(MyInfo.profilePhoto)}
                className={classes.avatar}
              />

              <div className={classes.desc}>
                  <p className={classes.name}>
                  
                    {MyInfo.fullname}
                  </p>
                  <p className={classes.specialization}>
                    {MyInfo.passion && MyInfo.passion.title}
                  </p>
                  <p className={classes.fullText}>
                    {MyInfo.passion && MyInfo.passion.description}
                    Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley.
                  </p>

                <div className={classes.place}>
                    Paris, France 
                </div>
              </div>
            </div>
          )}

          <div className={classes.subSections}>
            <div className={classes.topRow}>
              <div className={classes.sectionsSidebar}>
                  Contributions
              </div>
              
              <div className={classes.content}>
                <Contributions />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  MyInfo: state.loginUser.MyInfo
});

const mapDispatchToProps = {
  getMyInfoApi
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
