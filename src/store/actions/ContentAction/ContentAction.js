import {
	PUBLISH_CONTRIBUTION,
	PUBLISH_WORK,
	GET_ALL_USER_WORKS,
	GET_ALL_USER_CONTRIBUTIONS,
	GET_ALL_CONTENT,
	GET_JOURNAL_CONTENT,
	PROMOTE_POST_SUCCESS,
	REACT_POST_SUCCESS,
	GET_POST_REACTION_SUCCESS,
	OPEN_JOURNAL,
	GET_ALL_SUBSCRIPTION_CONTENT,
	GET_REACTIONS_LIST, CONTENT_PAGE_RELOAD, GET_ALL_TRENDING_CONTENT, GET_ALL_ARTFORM_CONTENT, CLEAR_FEED,
} from '../ActionType';
import axios from 'axios/index';
import { checkTokenExpired } from '../check';

export function PublishWork(data, token, dispatch) {
	axios
		.post(process.env.REACT_APP_API_URL + `/api/v1/content/work/new`, data, {
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + token,
			},
		})
		.then((results) => {
			if (checkTokenExpired(results, dispatch)) {
				return;
			}

			dispatch({
				type: PUBLISH_WORK,
				payload: results.data,
			});
			if (results.data && results.data.data && results.data.data.msg) {
				dispatch(getContentsAction(0, 100));
				return results.data.data.msg;
			} else return 'Error';
		})
		.catch((err) => {
			dispatch({
				type: PUBLISH_WORK,
				payload: false,
			});
		});
}

export function PublishWorkAction(data, token) {
	return async function (dispatch) {
		const dataHttp = new FormData();
		dataHttp.append('contentUserId', data.userId);
		dataHttp.append('contentTitle', data.title);
		dataHttp.append('contentDescription', data.description);
		dataHttp.append('contentArtist', data.author);

		if (data.photo !== '')
			await dataHttp.append('file', data.photo, data.photo.name);
		await PublishWork(dataHttp, token, dispatch);
	};
}

function getWorksByUser(page, limit, userId, dispatch) {
	axios
		.get(
			process.env.REACT_APP_API_URL +
				`/api/v1/content/work/all/limit/${limit}/page/${page}/user/${userId}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		.then((results) => {
			dispatch({
				type: GET_ALL_USER_WORKS,
				payload: results.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_USER_WORKS,
				payload: false,
			});
		});
}

export function getWorksByUserAction(page, limit, userId) {
	return async function (dispatch) {
		await getWorksByUser(page, limit, userId, dispatch);
	};
}

export const clearFeedAction = () => ({ type: CLEAR_FEED });

export function publishContribution(data, token, dispatch) {
	console.log('publish contribution', data);
	return axios
		.post(
			process.env.REACT_APP_API_URL + `/api/v1/content/contribution/new`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					authorization: 'Bearer ' + token,
				},
			}
		)
		.then((results) => {
			if (checkTokenExpired(results, dispatch)) {
				return;
			}

			dispatch({
				type: PUBLISH_CONTRIBUTION,
				payload: data,
			});
			if (results.data && results.data.data && results.data.data.msg) {
				dispatch(getContentsAction(0, 100));
				return results.data.data.msg;
			} else return 'Error';
		})
		.catch((err) => {
			dispatch({
				type: PUBLISH_CONTRIBUTION,
				payload: false,
			});
		});
}

export function publishContributionAction(data, token) {
	return async function (dispatch) {
		const dataHttp = new FormData();
		dataHttp.append('contentUserId', data.userId);
		if (data.journalId) dataHttp.append('journalId', data.journalId);
		dataHttp.append('contentTag', data.tag);
		dataHttp.append('contentDescription', data.description);
		dataHttp.append('artForms[]', data.artForms[0]);
		dataHttp.append('subject', data.subject);
		if (data.photo) await dataHttp.append('file', data.photo, data.photo.name);
		return publishContribution(dataHttp, token, dispatch);
	};
}

function getContributionsByUser(page, limit, userId, dispatch) {
	/*
  axios
    .get(
      process.env.REACT_APP_API_URL +
        `/api/v1/content/contribution/all/limit/${limit}/page/${page}/user/${userId}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(results => {
      dispatch({
        type: GET_ALL_USER_CONTRIBUTIONS,
        payload: results.data.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_USER_CONTRIBUTIONS,
        payload: false
      });
    });*/
	dispatch({
		type: GET_ALL_USER_CONTRIBUTIONS,
		payload: userId,
	});
}

export function getContributionByUserAction(page, limit, userId) {
	return async function (dispatch) {
		await getContributionsByUser(page, limit, userId, dispatch);
	};
}

function getContents(page, limit, dispatch) {
	const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));

	console.log('getContents:');
	console.log('page = ' + page);
	console.log('limit = ' + limit);
	return axios
		.get(
			process.env.REACT_APP_API_URL +
				`/api/v1/content/feed/user/passion/limit/${limit}/page/${page}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${myInfo.token}`,
				},
			}
		)
		
		.then((results) => {
			if (
				results &&
				results.data &&
				results.data.data &&
				results.data.data.data[0]
			) {
				dispatch({
					type: GET_ALL_CONTENT,
					payload: results.data.data.data,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_CONTENT,
				payload: false,
			});
		});
}

export function getContentsAction(page, limit) {
	return async function (dispatch) {
		return getContents(page, limit, dispatch);
	};
}

function getArtformContents(artform, page, limit, dispatch) {
	const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));

	console.log('getContents:');
	console.log('page = ' + page);
	console.log('limit = ' + limit);
	return axios
		.get(
			process.env.REACT_APP_API_URL +
			`/api/v1/content/feed/art-form/id/${artform}/limit/${limit}/page/${page}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${myInfo.token}`,
				},
			}
		)
		.then((results) => {
			if (
				results &&
				results.data &&
				results.data.data &&
				results.data.data.data[0]
			) {
				dispatch({
					type: GET_ALL_ARTFORM_CONTENT,
					payload: results.data.data.data,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_ARTFORM_CONTENT,
				payload: false,
			});
		});
}

export function getArtformContentsAction(artform, page, limit) {
	return async function (dispatch) {
		return getArtformContents(artform, page, limit, dispatch);
	};
}

function getTrendingContents(subject, page, limit, dispatch) {
	const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));

	console.log('getContents:');
	console.log('page = ' + page);
	console.log('limit = ' + limit);
	return axios
		.get(
			process.env.REACT_APP_API_URL +
			`/api/v1/content/feed/subject/${subject}/limit/${limit}/page/${page}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${myInfo.token}`,
				},
			}
		)
		.then((results) => {
			if (
				results &&
				results.data &&
				results.data.data &&
				results.data.data.data[0]
			) {
				dispatch({
					type: GET_ALL_TRENDING_CONTENT,
					payload: results.data.data.data,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_TRENDING_CONTENT,
				payload: false,
			});
		});
}

export function getTrendingContentsAction(subject, page, limit) {
	console.log('getTrendingContentsAction');
	console.log(subject);
	return async function (dispatch) {
		return getTrendingContents(subject, page, limit, dispatch);
	};
}

function getSubscribtionFeed(page, limit, dispatch) {
	const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));

	return axios
		.get(
			process.env.REACT_APP_API_URL +
				`/api/v1/content/feed/user/subscription/limit/${limit}/page/${page}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${myInfo.token}`,
				},
			}
		)
		.then((results) => {
			if (
				results &&
				results.data &&
				results.data.data &&
				results.data.data.data[0]
			) {
				dispatch({
					type: GET_ALL_SUBSCRIPTION_CONTENT,
					payload: results.data.data.data,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_SUBSCRIPTION_CONTENT,
				payload: false,
			});
		});
}

export function getSubscribtionFeedAction(page, limit) {
	return async function (dispatch) {
		return getSubscribtionFeed(page, limit, dispatch);
	};
}

function getJournal(passion, journal, page, limit, dispatch) {
	console.log('getJournal:');
	console.log('passion = ' + passion);
	console.log('journal = ' + journal);
	console.log('page = ' + page);
	console.log('limit = ' + limit);
	const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));
	return axios
		.get(
			process.env.REACT_APP_API_URL +
				`/api/v1/content/explore/passionId/${passion}/journalId/${journal}/limit/${limit}/page/${page}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${myInfo.token}`,
				},
			}
		)
		.then((results) => {
			if (
				results &&
				results.data &&
				results.data.data &&
				results.data.data.data[0]
			) {
				dispatch({
					type: GET_JOURNAL_CONTENT,
					payload: results.data.data.data,
				});
			}
		})
		.catch((err) => {
			if (checkTokenExpired(err.response, dispatch)) {
				return;
			}

			dispatch({
				type: GET_JOURNAL_CONTENT,
				payload: false,
			});
		});
}

export function getJournalAction(passion, journal, page, limit) {
	return async function (dispatch) {
		return getJournal(passion, journal, page, limit, dispatch);
	};
}

export function openJournalAction() {
	return {
		type: OPEN_JOURNAL,
		payload: null,
	};
}

export function promotePostAction(contentId, contentDescription) {
	return async function (dispatch) {
		return promotePost(contentId, contentDescription, dispatch);
	};
}

export function promotePost(contentId, contentDescription, dispatch) {
	const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));
	dispatch({
		type: PROMOTE_POST_SUCCESS,
		payload: '',
	});
	return axios
		.post(
			process.env.REACT_APP_API_URL + '/api/v1/content/promotion/new',
			{
				data: {
					userId: myInfo.userId,
					contentId: contentId,
					contentDescription: contentDescription,
				},
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${myInfo.token}`,
				},
			}
		)
		.then((results) => {
			console.log(results);

			if (
				results &&
				results.data &&
				results.data.data &&
				results.data.data.msg
			) {
				dispatch({
					type: PROMOTE_POST_SUCCESS,
					payload: results.data.data.msg,
				});
				return results.data.data;
			}

			console.log('promotePost error:');
			console.log(results);
			return 'Error';
		})
		.catch((err) => {
			console.log('promotePost catch:');
			console.log(err);

			if (checkTokenExpired(err.response, dispatch)) {
				return;
			}

			return 'Error';
		});
}

function reactPost(
	contentId,
	contentDescription,
	contentTags,
	contentImage,
	dispatch
) {
	const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));
	dispatch({
		type: REACT_POST_SUCCESS,
		payload: '',
	});
	return axios
		.post(
			process.env.REACT_APP_API_URL + '/api/v1/content/reaction/new',
			{
				data: {
					userId: myInfo.userId,
					contentId: contentId,
					contentDescription: contentDescription,
					contentImage: contentImage,
					contentTag: contentTags,
					typeOfReaction: '',
				},
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${myInfo.token}`,
				},
			}
		)
		.then((res) => {
			if (res.data) {
				if (res.data.data && res.data.data.msg) {
					dispatch(getContentsAction(0, 100));
					dispatch({
						type: CONTENT_PAGE_RELOAD,
						payload: null
					});
				}

				return res.data.data;
			}
			return res;
		})
		.catch((err) => {
			if (checkTokenExpired(err.response, dispatch)) {
				return;
			}
			//todo error catch
		});
}

export function reactPostAction(contentId, contentDescription, contentTags) {
	return async function (dispatch) {
		return reactPost(contentId, contentDescription, contentTags, '', dispatch);
	};
}

function getPostReactions(contentId, page, limit, dispatch) {
	const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));
	return axios
		.get(
			process.env.REACT_APP_API_URL +
				`/api/v1/users/reaction/contentId/${contentId}/limit/${limit}/page/${page}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${myInfo.token}`,
				},
			}
		)
		.then((results) => {
			dispatch({
				type: GET_POST_REACTION_SUCCESS,
				payload: results.data.data.data,
			});
		})
		.catch((err) => {
			if (checkTokenExpired(err.response, dispatch)) {
				return;
			}
			//todo error catch
		});
}

export function getPostReactionsAction(contentId, page, limit) {
	return async function (dispatch) {
		return getPostReactions(contentId, page, limit, dispatch);
	};
}

function getReactionsList(contentId, page, limit, dispatch) {
	const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));
	return axios
		.get(
			process.env.REACT_APP_API_URL +
				`/api/v1/content/reaction/list/contentId/${contentId}/limit/${limit}/page/${page}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${myInfo.token}`,
				},
			}
		)
		.then((results) => {
			console.log('GET_REACTIONS_LIST');
			console.log(results.data.data.data);
			dispatch({
				type: GET_REACTIONS_LIST,
				payload: results.data.data.data,
			});
		})
		.catch((err) => {
			if (checkTokenExpired(err.response, dispatch)) {
				return;
			}
			//todo error catch
		});
}

export function getReactionsListAction(contentId, page, limit) {
	return async function (dispatch) {
		return getReactionsList(contentId, page, limit, dispatch);
	};
};
