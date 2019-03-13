import {
	PROFILE_CONNECT_GOOGLE,
	PROFILE_CONNECT_GOOGLE_FAIL,
	PROFILE_CONNECT_GOOGLE_SUCCESS
} from './../actions/profileTypes';

const INITIAL_STATE = {
	googleToken: null,
	loading: false,
	error: ''
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PROFILE_CONNECT_GOOGLE:
			return { ...state, loading: true, error: '', googleToken: null };
		case PROFILE_CONNECT_GOOGLE_SUCCESS:
			return { ...state, loading: false, googleToken: action.payload, error: '' }
		case PROFILE_CONNECT_GOOGLE_FAIL:
			return { ...state, loading: false, error: action.payload, googleToken: null }
		default:
			return { state };
	}
}