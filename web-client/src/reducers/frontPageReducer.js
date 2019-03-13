import {
	ALL_SERVICES_SUCCESS,
	REFRESH_USER,
	REFRESH_USER_SUCCESS
} from './../actions/frontPageTypes';

const INITIAL_STATE = {
	services: null,
	user: null,
	token: null
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ALL_SERVICES_SUCCESS:
			return { ...state, services: action.payload };
		case REFRESH_USER:
			return { ...state }
		case REFRESH_USER_SUCCESS:
			return { ...state, user: action.payload.user, token: action.payload.token }
		default:
			return (state);
	}
}