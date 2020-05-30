import React from 'react';
import Contribution from '../../components-no-duplication/Contribution/Contribution';
import {connect} from 'react-redux';
import LazyLoadingEventCreator from '../../components-no-duplication/LazyLoadingEventCreator/LazyLoadingEventCreator';
import {getSubscribtionFeedAction} from '../../store/actions/ContentAction/ContentAction';
import {mapDispatchToPropsFeed, mapStateToPropsFeed, useFeed} from "./Feed";

const SubscriptionFeed = (props) => {
    const {
        contents,
        openPromotePostModal,
        openReactToPostModal,
        openShowPictureModal,
        deleteContribution,
        editContribution,
        myInfo,
    } = props;

    const {observer, handleOpenContent} = useFeed(props);

    return (
        <div style={{width: '100%'}}>
            {(contents && contents.length > 0) ? (
                contents.map((content) => {
                    return (
                        <Contribution
                            onClick={handleOpenContent}
                            key={content._id}
                            content={content}
                            openPromotePostModal={openPromotePostModal}
                            openReactToPostModal={openReactToPostModal}
                            openShowPictureModal={openShowPictureModal}
                            deleteContribution={(contentId) =>
                                deleteContribution(contentId, myInfo)
                            }
                            editContribution={(contentId) =>
                                editContribution(contentId, myInfo)
                            }
                            myUserId={myInfo.userId}
                        />
                    );
                })
            ) : (
                <div style={{color: '#9281ff', textAlign: 'center'}}>
                    please start subscribing to people to see their contributions here
                </div>
            )}
            {contents && contents.length > 0 &&
            <div style={{width: '100%', height: '20px'}}>
                <LazyLoadingEventCreator observer={observer}/>
            </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    const stateProps = mapStateToPropsFeed(state);

    return {
        ...stateProps,
        contents: state.contentReducer.subscriptionContent,
    };
};

const mapDispatchToProps = (dispatch) => {
    const dispatchProps = mapDispatchToPropsFeed(dispatch);

    return {
        ...dispatchProps,
        getContents: (page, limit) =>
            dispatch(getSubscribtionFeedAction(page, limit)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionFeed);
