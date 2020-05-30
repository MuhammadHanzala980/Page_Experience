import axios from 'axios/index';
import { LOGIN_USER } from '../ActionType';

export function getmyInfoApi() {
	return async function (dispatch) {
		const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));
		await axios
			.get(
				process.env.REACT_APP_API_URL +
					'/api/v1/users/info/userId/' +
					myInfo.userId,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${myInfo.token}`,
					},
				}
			)
			.then((results) => {
				dispatch({
					type: LOGIN_USER,
					payload: results.data.data,
				});
			})
			.catch((err) => {
				//todo error catch
			});
	};
}

export function getmyInfoAction() {
	return async function (dispatch) {
		const data = sessionStorage.getItem('myinfo');
		dispatch({
			type: LOGIN_USER,
			payload: JSON.parse(data),
		});
	};
}

export function getmyInfo() {
	const data = sessionStorage.getItem('myinfo');
	return JSON.parse(data);
}
