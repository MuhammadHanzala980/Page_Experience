import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./Journal.css";
import Contribution from '../../../components-no-duplication/Contribution/Contribution';
import { openJournalAction, getJournalAction} from "../../../store/actions/ContentAction/ContentAction";
import { openPromotePostModalAction, openReactToPostModalAction, openShowPictureModalAction } from '../../../store/actions/ModalsAction/ModalsAction';
import {
    deleteContributionAction,
    editContributionAction,
} from '../../../store/actions';
import JournalNav from "./JournalNav";
import LazyLoadingEventCreator
    from "../../../components-no-duplication/LazyLoadingEventCreator/LazyLoadingEventCreator";
import {useHistory} from "react-router-dom";
import {gotoContentPageAction} from "../../../store/actions/ContentPageAction";

const ITEM_PER_PAGE = 10;

const Journal = ({
                     section,
                     myInfo,
                     openJournal,
                     openPromotePostModal,
                     openReactToPostModal,
                     openShowPictureModal,
                     gotoContentPage,
                     deleteContribution,
                     editContribution,
                     journalContents,
                     getJournal,
                 }) => {
    const [tagFilter, setTagFilter] = useState("");
    const [observer, setObserver] = useState(null);
    const [needRefresh, setNeedRefresh] = useState(0);
    const [nItems, setNItems] = useState(0);

    useEffect(() => {
        openJournal();
    }, [section, openJournal]);

    useEffect(()=>{
        const _observer = new IntersectionObserver(function(entries) {
            if(entries[0].isIntersecting === true){
                const update = Math.random();
                setNeedRefresh(update);
            }
        }, { threshold: [0] });
        setObserver(_observer);
    },[]);

    useEffect(()=>{
        if((nItems + 1) * ITEM_PER_PAGE >= journalContents.length && journalContents.length !== 0){
            setNItems(nItems + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[needRefresh]);
    useEffect(()=>{
        getJournal(section.passion._id, section.journal._id, nItems, ITEM_PER_PAGE);
    },[getJournal, nItems, section]);

    let contentsFilted = journalContents;
    if(tagFilter && contentsFilted && contentsFilted){
        contentsFilted = contentsFilted.filter(content => content.contentTag && content.contentTag.toLowerCase() === tagFilter);
    }

    const history = useHistory();

    const handleOpenContent = (content) => {
        history.replace(
            history.location.pathname,
            {
                back: true,
                nItems: nItems,
                tagFilter: tagFilter,
                contentId: content._id
            });
        gotoContentPage(history, content);
    };

        return (
        <React.Fragment>
            <JournalNav/>
            <div className="content">
                {contentsFilted && contentsFilted[0] ?
                    contentsFilted.map(content => (
                        <Contribution
                            onClick={handleOpenContent}
                            key={content._id}
                            content={content}
                            openPromotePostModal={openPromotePostModal}
                            openReactToPostModal={openReactToPostModal}
                            openShowPictureModal={openShowPictureModal}
                            deleteContribution= {(contentId) => deleteContribution(contentId, myInfo)}
                            editContribution={(contentId) => editContribution(contentId, myInfo)}
                            myUserId={myInfo.userId}
                            setTagFilter={setTagFilter}
                        />)
                    )
                    : null
                }
                <div style={{width:'100%', height:'20px'}}>
                    <LazyLoadingEventCreator observer={ observer }/>
                </div>
            </div>
        </React.Fragment>
    );
};


const mapStateToProps = state => ({
    myInfo: state.myInfo,
    journalContents: state.contentReducer.journalContents,
});

const mapDispatchToProps = dispatch => {
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
        openJournal: () =>
            dispatch(openJournalAction()),
        getJournal: (passion, journal, page, limit) =>
            dispatch(getJournalAction(passion, journal, page, limit)),
        deleteContribution: (contentId, myInfo) =>
            dispatch(deleteContributionAction(contentId, myInfo)),
        editContribution: (contentId, myInfo) =>
            dispatch(editContributionAction(contentId, myInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Journal);

