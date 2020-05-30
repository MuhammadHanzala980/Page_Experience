import {useHistory} from 'react-router-dom';
import {useCallback, useEffect, useState} from "react";
import {
    openPromotePostModalAction,
    openReactToPostModalAction,
    openShowPictureModalAction
} from "../../store/actions/ModalsAction/ModalsAction";
import {gotoContentPageAction} from "../../store/actions/ContentPageAction";
import {clearFeedAction, getContentsAction} from "../../store/actions/ContentAction/ContentAction";
import {deleteContributionAction, editContributionAction} from "../../store/actions";

const useObserver = (callback) => {
    const [observer, setObserver] = useState(null);

    useEffect(() => {
        console.log('new IntersectionObserver');
        const _observer = new IntersectionObserver(
            function (entries) {
                if (entries[0].isIntersecting === true) {
                    callback();
                }
            },
            {threshold: [0]}
        );
        setObserver(_observer);
    },
        // eslint-disable-next-line
        []);

    return observer;
};

const ITEM_PER_PAGE = 10;

export const useFeed = ({
                            gotoContentPage,
                            clearFeed,
                            getContents,
                            contents,
                        }) => {
    const history = useHistory();

    const [nItems, setNItems] = useState(0);

    const handleOpenContent = (content) => {
        const state = {
            back: true,
            nItems: nItems,
            contentId: content._id,
        };
        console.log('handleOpenContent');
        console.log(state);
        console.log(content);
        gotoContentPage(history, state, content);
    };

    const loadMoreCallback = useCallback(() => {
        console.log('LOAD MORE CALLBACK');
        if ((nItems + 1) * ITEM_PER_PAGE >= contents.length) {
            setNItems(nItems + 1);
        }
    }, [nItems, contents]);

    const observer = useObserver(loadMoreCallback);

    useEffect(()=> {
        clearFeed();
    }, [clearFeed]);

    const location = history.location;

    useEffect(()=> {
        clearFeed();
        setNItems(0);
    }, [location, clearFeed]);

    useEffect(() => {
        getContents(nItems, ITEM_PER_PAGE);
    }, [getContents, clearFeed, nItems]);

    return {
        observer,
        handleOpenContent
    };
};

export const mapStateToPropsFeed = (state) => {
    return {
        contents: state.contentReducer.contents,
        location: state.location,
        loginUser: state.loginUser.data,
        myInfo: state.myInfo,
    };
};

export const mapDispatchToPropsFeed = (dispatch) => {
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
        gotoContentPage: (history, state, content) => {
            dispatch(gotoContentPageAction(history, state, content));
        },
        clearFeed: () => dispatch(clearFeedAction()),
        getContents: (page, limit) => dispatch(getContentsAction(page, limit)),
        deleteContribution: (contentId, myInfo) =>
            dispatch(deleteContributionAction(contentId, myInfo)),
        editContribution: (contentId, myInfo) =>
            dispatch(editContributionAction(contentId, myInfo))
    };
};
