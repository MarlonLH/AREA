import {
	CHECK_USER_AUTHORIZATION,
	CHECK_USER_AUTHORIZATION_FAIL
} from "./../actions/userTypes";

const INITIAL_STATE = {
	error: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CHECK_USER_AUTHORIZATION:
			return { ...state, error: null };
		case CHECK_USER_AUTHORIZATION_FAIL:
			return { ...state, error: 'Unauthorized' };
		default:
			return { state };
	}
}