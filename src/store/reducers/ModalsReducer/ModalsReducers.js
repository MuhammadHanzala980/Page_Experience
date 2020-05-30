import {
    OPEN_PROMOTE_POST_MODAL,
    OPEN_REACT_TO_POST_MODAL,
    OPEN_PUBLISH_CONTRIBUTION_MODAL,
    OPEN_PUBLISH_WORK_MODAL,
    OPEN_SHOW_PICTURE_MODAL,
    CLOSE_PROMOTE_POST_MODAL, 
    CLOSE_REACT_TO_POST_MODAL, 
    CLOSE_PUBLISH_CONTRIBUTION_MODAL,
    CLOSE_PUBLISH_WORK_MODAL,
    CLOSE_SHOW_PICTURE_MODAL,
} from "../../actions/ActionType";
const initialState = {
    promotePostisOpen: false,
    reactToPostisOpen: false,
    publishContributionisOpen: false,
    publishWorkisOpen: false,
    showPictureisOpen: false,
    showPcitureData: {},
    promotePostData: {},
    reactToPostData: {},
};

export default function (state = initialState, action) {    
    //console.log(action.type);
    switch (action.type) {
        case OPEN_PROMOTE_POST_MODAL:
            return {...state, promotePostisOpen: true, promotePostData: action.payload };
        case OPEN_REACT_TO_POST_MODAL:
            return {...state, reactToPostisOpen:true, reactToPostData: action.payload };
        case OPEN_PUBLISH_CONTRIBUTION_MODAL:
            return {...state, publishContributionisOpen: true}
        case OPEN_PUBLISH_WORK_MODAL:
            return {...state, publishWorkisOpen: true};
        case OPEN_SHOW_PICTURE_MODAL:
            return {...state, showPictureisOpen: true, showPcitureData: action.payload};
        case CLOSE_PROMOTE_POST_MODAL:
            return {...state, promotePostisOpen: false};
        case CLOSE_REACT_TO_POST_MODAL:
            return {...state, reactToPostisOpen:false}
        case CLOSE_PUBLISH_CONTRIBUTION_MODAL:
            return {...state, publishContributionisOpen: false};
        case CLOSE_PUBLISH_WORK_MODAL:
            return {...state, publishWorkisOpen: false};
        case CLOSE_SHOW_PICTURE_MODAL:
            return {...state, showPictureisOpen: false};
        default:
            return state;
    }
}