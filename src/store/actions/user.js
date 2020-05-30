import axios from 'axios/index';

import {
	LOGIN_USER,
	LOGOUT_USER,
	UPDATE_MY_USER_INFOS,
	GET_MY_INFOS,
	UPDATE_MY_PROFILE,
} from './ActionType';

function loginUser(data, dispatch) {
	return axios
		.post(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((results) => {
			if (results.data !== undefined) {
				if (results.data.code === 200) {
					axios(
						`${process.env.REACT_APP_API_URL}/api/v1/users/info/userId/${results.data.data.userId}`,
						{ headers: { Authorization: `Bearer ${results.data.data.token}` } }
					).then((secondResults) => {
						console.log(secondResults);
						sessionStorage.setItem('token', results.data.data.token);
						sessionStorage.setItem(
							'myinfo',
							JSON.stringify({
								...results.data.data,
								passion: {
									id: results.data.data.passion,
									title: secondResults.data.data.passion.title,
								},
							})
						);
						console.log({
							...results.data.data,
							passion: {
								id: results.data.data.passion,
								title: secondResults.data.data.passion.title,
							},
						});
						dispatch({
							type: LOGIN_USER,
							payload: {
								...results.data.data,
								passion: {
									id: results.data.data.passion,
									title: secondResults.data.data.passion.title,
								},
							},
						});
					});
				}
				return results.data.data;
			}
		})
		.catch((err) => {
			console.error(err);
			dispatch({
				type: LOGIN_USER,
				payload: { error: 'somthing when wrong!' },
			});
		});
}

export function loginUserAction(data) {
	return async function (dispatch) {
		return loginUser(data, dispatch);
	};
}

export function updateMyInfoAction(myInfos) {
	return {
		type: UPDATE_MY_USER_INFOS,
		payload: myInfos,
	};
}

export function logoutUserAction() {
	sessionStorage.removeItem('myinfo');
	sessionStorage.removeItem('token');
	return {
		type: LOGOUT_USER,
		payload: {
			token: '',
			dateOfCreation: '',
			fullname: '',
			firstname: '',
			lastname: '',
			imageUrl: '',
			userId: '',
			profilePhoto: '',
			email: '',
			passion: {
				title: '',
				description: '',
				image: '',
			},
		},
	};
}

function getMyInfo(myInfo, dispatch) {
	return axios
		.get(
			`${process.env.REACT_APP_API_URL}/api/v1/users/info/userId/${myInfo.userId}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${myInfo.token}`,
				},
			}
		)
		.then((results) => {
			console.log('results', results);
			if (results.data !== undefined) {
				if (results.data.code === 200) {
					//sessionStorage.setItem("token", results.data.data.token);
					//sessionStorage.setItem("myinfos", JSON.stringify(results.data.data));
					console.log('dispatching ');
					dispatch({
						type: GET_MY_INFOS,
						payload: results.data.data,
					});
				}
				return results.data.data;
			}
		})
		.catch((err) => {
			console.error(err);
			dispatch({
				type: GET_MY_INFOS,
				payload: { error: 'somthing when wrong!' },
			});
		});
}
export function getMyInfoAction(myInfo) {
	return async function (dispatch) {
		return getMyInfo(myInfo, dispatch);
	};
}

function updateUserProfile(myInfo, dispatch) {
	const data = new FormData();
	data.append('data[userId]', myInfo.userId);
	data.append('data[bio]', myInfo.bio);
	data.append('data[headline]', myInfo.headline);
	data.append('data[location]', myInfo.location);
	if (myInfo.file) data.append('data[file]', myInfo.file, myInfo.file.name);
	return axios
		.post(`${process.env.REACT_APP_API_URL}/api/v1/users/info/edit`, data, {
			headers: {
				Authorization: `Bearer ${myInfo.token}`,
			},
		})
		.then((results) => {
			if (results.data !== undefined) {
				if (results.data.code === 200) {
					dispatch({
						type: UPDATE_MY_PROFILE,
						payload: myInfo,
					});
					dispatch(getMyInfoAction(myInfo));
				}
				return results.data.data;
			}
		})
		.catch((err) => {
			console.error(err);
			dispatch({
				type: UPDATE_MY_PROFILE,
				payload: myInfo, // fro now
				//payload: {error: "somthing went wrong!"},
			});
		});
}

export function updateUserProfileAction(myInfo) {
	console.log('update user profile action user infos action ', myInfo);
	return async function (dispatch) {
		return updateUserProfile(myInfo, dispatch);
	};
}
