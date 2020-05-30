import {
	CONTENT_PAGE_OPEN,
	GET_REACTIONS_LIST,
	CONTENT_PAGE_RELOAD
} from '../../actions/ActionType';

const initialState = {
	id2content: [],
	reactions: null,
	needReload: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case CONTENT_PAGE_OPEN:
			console.log('CONTENT_PAGE_OPEN:');
			console.log(action.payload);

			let new_id2content = { ...state.id2content };

			let content = action.payload;
			if (content && content._id) {
				new_id2content[content._id] = content;
			}

			return {
				...state,
				reactions: null,
				id2content: new_id2content,
			};
		case CONTENT_PAGE_RELOAD:
			console.log('REDUCER: CONTENT_PAGE_RELOAD');
			return {
				...state,
				needReload: true
			};
		case GET_REACTIONS_LIST:
			console.log('GET_REACTIONS_LIST REDUCER');
			console.log(action.payload);
			return {
				...state,
				reactions: action.payload,
				needReload: false
			};
		default:
			return state;
	}
}
