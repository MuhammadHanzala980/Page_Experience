import React, {useEffect, useCallback} from 'react';
import Contribution from '../../components-no-duplication/Contribution/Contribution';
import {
    openPromotePostModalAction,
    openReactToPostModalAction,
    openShowPictureModalAction
} from "../../store/actions/ModalsAction/ModalsAction";
import {deleteContributionAction, editContributionAction} from "../../store/actions";
import {connect} from "react-redux";
import './ContentPage.css';
import {useHistory, useParams } from "react-router-dom";
import {getPostReactionsAction, getReactionsListAction} from "../../store/actions/ContentAction/ContentAction";
import { gotoContentPageAction } from "../../store/actions/ContentPageAction";
import {getImageFullUrl} from "../../Utils/utils";
import {Container} from '@material-ui/core'

const ContentPage = ( {
  id2content,
  reactions,
  needReload,
  postReactions,
  getReactionsList,
  getPostReactions,
  gotoContentPage,
  openPromotePostModal,
  openReactToPostModal,
  openShowPictureModal,
  deleteContribution,
  editContribution,
  myInfo
}) => {

    const { contentId } = useParams();

    let content = id2content[contentId];

    const loadPage = useCallback(
        () => {
            if (content) {
                getReactionsList(content._id, 0, 1000);
                getPostReactions(content._id, 0, 1000);
            }
        },
        [content, getReactionsList, getPostReactions]
    );

    useEffect(() => {
        loadPage(content);
    }, [loadPage, content, needReload]);

    useEffect(() => {
        if (needReload) {
            console.log('NEED RELOAD');
            loadPage(content);
        }
    }, [loadPage, content, needReload]);

    const setTagFilter = () => {

    };

    if (postReactions) {
        console.log('POST REACTIONS');
        console.log(postReactions);
    }

    const history = useHistory();

    const handleBack = () => {
        history.goBack();
    };

    const handleOpenContent = (content) => {
        history.replace(
            history.location.pathname,
            {
                back: true,
                contentId: content._id
            });
        gotoContentPage(history, content);
    };

    console.log("REACTIONS");
    console.log(reactions);

    if (content) {
        return (
            <Container fixed style={{maxWidth: 700}}>
                <div className="back-head" onClick={handleBack}>⟵ Back</div>
                <Contribution
                    key={content._id}
                    content={content}
                    openPromotePostModal={openPromotePostModal}
                    openReactToPostModal={openReactToPostModal}
                    openShowPictureModal={openShowPictureModal}
                    deleteContribution={(contentId) => deleteContribution(contentId, myInfo)}
                    editContribution={(contentId) => editContribution(contentId, myInfo)}
                    myUserId={myInfo.userId}
                    setTagFilter={setTagFilter}
                />

                <br/>
                {postReactions && postReactions.length > 0 && (
                    <div className="react-people">
                        <b>Reactions:</b>
                        {postReactions.map((item, index) =>
                            index < 2 ? (
                                <img
                                    src={getImageFullUrl(item.profilePhoto)}
                                    alt="profile"
                                />
                            ) : (
                                ""
                            )
                        )}
                        {postReactions.length > 2 && (
                            <>
                                <p>+{postReactions.length - 2}</p>
                                <span>other people</span>
                            </>
                        )}
                    </div>
                )}
                <br/>

                {reactions && reactions.length > 0 ?
                    (
                        reactions.map((item)=>(
                            <Contribution
                                onClick={handleOpenContent}
                                key={item._id}
                                content={item}
                                openPromotePostModal={openPromotePostModal}
                                openReactToPostModal={openReactToPostModal}
                                openShowPictureModal={openShowPictureModal}
                                deleteContribution={(contentId) => deleteContribution(contentId, myInfo)}
                                editContribution={(contentId) => editContribution(contentId, myInfo)}
                                myUserId={myInfo.userId}
                                setTagFilter={setTagFilter}
                            />
                        ))
                    ) : (
                        <b>The are no reactions yet. Be the first.</b>
                    )
                }
            </Container>
        );
    } else {
        return <div>Loading...</div>
    }
};

const mapStateToProps  = (state) => {
    return {
        id2content: state.contentPage.id2content,
        reactions: state.contentPage.reactions,
        needReload: state.contentPage.needReload,
        loginUser: state.loginUser.data,
        myInfo: state.myInfo,
        postReactions: state.contentReducer.postReactions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openPromotePostModal: (data) => {
            dispatch(openPromotePostModalAction(data));
        },
        openReactToPostModal: (data) => {
            dispatch(openReactToPostModalAction(data));
        },
        openShowPictureModal: (data) => {
            dispatch(openShowPictureModalAction(data));
        },
        gotoContentPage: (history, content) => {
            dispatch(gotoContentPageAction(history, content));
        },
        deleteContribution: (contentId, myInfo) =>
            dispatch(deleteContributionAction(contentId, myInfo)),
        editContribution: (contentId, myInfo) =>
            dispatch(editContributionAction(contentId, myInfo)),
        getReactionsList: (contentId, page, limit) =>
            dispatch(getReactionsListAction(contentId, page, limit)),
        getPostReactions: (contentId, page, limit) =>
            dispatch(getPostReactionsAction(contentId, page, limit))
    };

};

export default connect(mapStateToProps , mapDispatchToProps)(ContentPage);
