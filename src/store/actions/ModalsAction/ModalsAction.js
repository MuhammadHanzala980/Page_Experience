import {
	OPEN_PROMOTE_POST_MODAL,
	OPEN_REACT_TO_POST_MODAL,
	OPEN_PUBLISH_CONTRIBUTION_MODAL,
	OPEN_PUBLISH_WORK_MODAL,
	OPEN_SHOW_PICTURE_MODAL,
	CLOSE_PUBLISH_WORK_MODAL,
	CLOSE_PROMOTE_POST_MODAL,
	CLOSE_REACT_TO_POST_MODAL,
	CLOSE_PUBLISH_CONTRIBUTION_MODAL,
	CLOSE_SHOW_PICTURE_MODAL,
} from '../ActionType';

export const openPromotePostModalAction = (content) => {
	return {
		type: OPEN_PROMOTE_POST_MODAL,
		payload: content,
	};
};

export const closePromotePostModalAction = (content) => {
	return {
		type: CLOSE_PROMOTE_POST_MODAL,
		payload: {},
	};
};

export const openReactToPostModalAction = (content) => {
	return {
		type: OPEN_REACT_TO_POST_MODAL,
		payload: content,
	};
};

export const closeReactToPostModalAction = () => {
	return {
		type: CLOSE_REACT_TO_POST_MODAL,
		payload: {},
	};
};

export const openPublishContributionModalAction = (content) => {
	return {
		type: OPEN_PUBLISH_CONTRIBUTION_MODAL,
		payload: content,
	};
};

export const closePublishContributionModalAction = () => {
	return {
		type: CLOSE_PUBLISH_CONTRIBUTION_MODAL,
		payload: {},
	};
};
export const openPublishWorkModalAction = (content) => {
	return {
		type: OPEN_PUBLISH_WORK_MODAL,
		payload: content,
	};
};

export const closePublishWorkModalAction = () => {
	return {
		type: CLOSE_PUBLISH_WORK_MODAL,
		payload: {},
	};
};

export const openShowPictureModalAction = (content) => {
	return {
		type: OPEN_SHOW_PICTURE_MODAL,
		payload: content,
	};
};

export const closeShowPictureModalAction = () => {
	return {
		type: CLOSE_SHOW_PICTURE_MODAL,
		payload: {},
	};
};
