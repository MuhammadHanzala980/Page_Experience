import React, {useCallback, useEffect} from 'react';
import Contribution from '../../components-no-duplication/Contribution/Contribution';
import {connect} from 'react-redux';
import LazyLoadingEventCreator from '../../components-no-duplication/LazyLoadingEventCreator/LazyLoadingEventCreator';
import {getTrendingContentsAction} from '../../store/actions/ContentAction/ContentAction';
import {mapDispatchToPropsFeed, mapStateToPropsFeed, useFeed} from "./Feed";

const TrendingFeed = (props) => {
    const {
        match,
        contents,
        clearFeed,
        getContents,
        openPromotePostModal,
        openReactToPostModal,
        openShowPictureModal,
        deleteContribution,
        editContribution,
        myInfo,
    } = props;

    useEffect(() => {
        clearFeed();
        },
        [match.params.subject, clearFeed]);

    const getContentsCallback = useCallback((page, limit) => {
        console.log('getContentsCallback');
        console.log(match.params.subject);
        getContents(match.params.subject, page, limit);
    }, [match.params.subject, getContents]);

    const feedProps = {
        ...props,
        getContents: getContentsCallback
    };

    const {observer, handleOpenContent} = useFeed(feedProps);

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
        contents: state.contentReducer.trendingContent,
    };
};

const mapDispatchToProps = (dispatch) => {
    const dispatchProps = mapDispatchToPropsFeed(dispatch);

    return {
        ...dispatchProps,
        getContents: (subject, page, limit) =>
            dispatch(getTrendingContentsAction(subject, page, limit)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TrendingFeed);
