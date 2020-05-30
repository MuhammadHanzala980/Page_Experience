import { CONTENT_PAGE_OPEN } from './ActionType';

function ContentPageSetContentAction(content) {
	return {
		type: CONTENT_PAGE_OPEN,
		payload: content,
	};
}

export function gotoContentPageAction(history, state, content) {
	history.replace(history.location.pathname, state);

	return async function (dispatch) {
		dispatch(ContentPageSetContentAction(content));
		history.push('/content/' + content._id);
	};
}
