import {
	LOGIN_USER,
	UPDATE_MY_USER_INFOS,
	GET_MY_INFOS,
	LOGOUT_USER,
	UPDATE_MY_PROFILE,
} from '../../actions/ActionType';

const initialState = {
	dateOfCreation: '',
	token: '',
	fullname: '',
	firstname: '',
	lastname: '',
	profilePhoto: '',
	userId: '',
	email: '',
	passion: {
		title: '',
		description: '',
		image: '',
	},
};
const getInfos = (state, infos) => {
	if (!infos) return {};
	const dateOfCreation = infos.dateOfCreation;
	const token = infos.token;
	const fullname = infos.fullname;
	const firstname = infos.firstname;
	const lastname = infos.lastname;
	const profilePhoto = infos.profilePhoto;
	const userId = infos.userId;
	const email = infos.email;
	const bio = infos.bio;
	const headline = infos.headline;
	const location = infos.location;
	const passion = infos.passion;
	const expiresInMS = infos.expiresInMS;
	console.log('expire in ms(remove once token issue fixed', expiresInMS);
	passion.title =
		infos.passion && infos.passion.title
			? infos.passion.title
			: state.passion.title;
	passion.image =
		infos.passion && infos.passion.image
			? infos.passion.image
			: state.passion.image;
	passion.description =
		infos.passion && infos.passion.description
			? infos.passion.description
			: state.passion.description;
	const MyInfo = {
		dateOfCreation: dateOfCreation ? dateOfCreation : state.dateOfCreation,
		token: token ? token : state.token,
		fullname: fullname ? fullname : state.fullname,
		firstname: firstname ? firstname : state.firstname,
		lastname: lastname ? lastname : state.lastname,
		userId: userId ? userId : state.userId,
		profilePhoto: profilePhoto ? profilePhoto : state.profilePhoto,
		email: email ? email : state.email,
		bio: bio ? bio : state.bio,
		headline: headline ? headline : state.headline,
		location: location ? location : state.location,
		passion,
	};
	return MyInfo;
};
export default function (state = initialState, action) {
	//    console.log(action.type, action.payload);
	switch (action.type) {
		case LOGIN_USER:
			console.log(action.payload);
			return { ...state, ...getInfos(state, action.payload) };
		case UPDATE_MY_USER_INFOS:
			return { ...state, ...getInfos(state, action.payload) };
		case GET_MY_INFOS:
			return { ...state, ...getInfos(state, action.payload) };
		case LOGOUT_USER:
			return initialState;
		case UPDATE_MY_PROFILE:
			return { ...state, ...getInfos(state, action.payload) };
		default:
			return state;
	}
}
