import {
	GET_ALL_USER_CONTRIBUTIONS,
	GET_ALL_USER_WORKS,
	GET_ALL_CONTENT,
	OPEN_JOURNAL,
	GET_JOURNAL_CONTENT,
	PUBLISH_CONTRIBUTION,
	PUBLISH_WORK,
	PROMOTE_POST_SUCCESS,
	REACT_POST_SUCCESS,
	GET_POST_REACTION_SUCCESS,
	DELETE_CONTRIBUTION,
	GET_ALL_SUBSCRIPTION_CONTENT,
	UNSUBSCRIBE_FROM_USER,
	LOGOUT_USER,
	LOGIN_USER,
	CLEAR_FEED,
	GET_ALL_TRENDING_CONTENT,
	GET_ALL_ARTFORM_CONTENT
} from '../../actions/ActionType';

const initialState = {
	passionsList: [],
	promoteMsg: '',
	reactMsg: '',
	postReactions: [],
	contents: [],
	journalContents: [],
	myContents: [],
	subscriptionContent: [],
	trendingContent: [],
	artformContent: []
};
const filterContentByUserId = (contents, userId) => {
	const myContents = [];
	if (contents.length > 0) {
		contents.forEach((content) => {
			if (
				content &&
				content.user &&
				content.user._id &&
				content.user._id === userId
			) {
				myContents.push(content);
			}
		});
	}

	return myContents;
};

function prepareContents(existingContents, newContents) {
	const diffContents = [];
	newContents.forEach((content) => {
		if (!existingContents.find((el) => el._id === content._id)) {
			diffContents.unshift(content);
		}
	});

	const contents = [...existingContents, ...diffContents];

	contents.sort(
		(a, b) =>
			new Date(b.dateOfCreation).getTime() -
			new Date(a.dateOfCreation).getTime()
	);

	return contents;
}

export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN_USER:
			return initialState;
		case LOGOUT_USER:
			return initialState;
		case GET_ALL_USER_CONTRIBUTIONS:
			return {
				...state,
				myContents: filterContentByUserId(state.contents, action.payload),
			};
		case GET_ALL_USER_WORKS:
			return {
				data: action.payload,
			};
		case PUBLISH_CONTRIBUTION:
			return state;
		case PUBLISH_WORK:
			return state;
		// need to change function name
		case GET_ALL_CONTENT:
			if (action.payload && action.payload[0]) {
				const contents = prepareContents(state.contents, action.payload);
				return { ...state, contents };
			} else {
				return state;
			}
		case GET_ALL_TRENDING_CONTENT:
			if (action.payload && action.payload[0]) {
				const trendingContent = prepareContents(state.trendingContent, action.payload);
				console.log(GET_ALL_TRENDING_CONTENT);
				console.log(action.payload);
				console.log(trendingContent);
				return { ...state, trendingContent };
			} else {
				return state;
			}
		case GET_ALL_ARTFORM_CONTENT:
			if (action.payload && action.payload[0]) {
				const artformContent = prepareContents(state.artformContent, action.payload);
				console.log('GET_ALL_ARTFORM_CONTENT');
				console.log(action.payload);
				console.log(artformContent);
				return { ...state, artformContent };
			} else {
				return state;
			}
		case CLEAR_FEED:
			console.log('CLEAR FEED');
			return { ...state, contents: [], subscriptionContent: [], trendingContent: [], artformContent: [] };

		case UNSUBSCRIBE_FROM_USER:
			return { ...state, contents: [], subscriptionContent: [] };

		case GET_ALL_SUBSCRIPTION_CONTENT:
			if (action.payload && action.payload[0]) {
				const contents = prepareContents(state.subscriptionContent, action.payload);
				return { ...state, subscriptionContent: contents };
			} else {
				return state;
			}

		case OPEN_JOURNAL:
			return { ...state, journalContents: [] };
		case GET_JOURNAL_CONTENT:
			if (action.payload && action.payload[0]) {
				const newContents = [];
				action.payload.forEach((content) => {
					if (!state.journalContents.find((el) => el._id === content._id)) {
						newContents.unshift(content); // unshift mybe
					}
				});
				const journalContents = [...state.journalContents, ...newContents];
				journalContents.sort(
					(a, b) =>
						new Date(b.dateOfCreation).getTime() -
						new Date(a.dateOfCreation).getTime()
				);
				return { ...state, journalContents };
			} else {
				return state;
			}
		case PROMOTE_POST_SUCCESS:
			return {
				...state,
				promoteMsg: action.payload,
			};
		case REACT_POST_SUCCESS:
			return {
				...state,
				reactMsg: action.payload,
			};
		case GET_POST_REACTION_SUCCESS:
			return {
				...state,
				postReactions: action.payload,
			};
		case DELETE_CONTRIBUTION:
			const newContent = state.contents.filter(
				(content) => content._id !== action.payload.contentId
			);
			return { ...state, contents: newContent };
		default:
			return state;
	}
}
