import {
    LOG_EMAIL_CHANGED,
    LOG_PASSWORD_CHANGED,
    LOG_USER,
    LOG_USER_FAIL,
    LOG_USER_SUCCESS,
    UNLOG_USER
} from './../actions/loginTypes';

const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    user: null,
    token: null,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case LOG_PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOG_USER:
            return { ...state, loading: true, error: '' };
        case LOG_USER_FAIL:
            return { ...state, error: action.payload, loading: false };
        case LOG_USER_SUCCESS:
            return { ...state, user: action.payload.user, token: action.payload.token, loading: false };
        case UNLOG_USER:
            return { INITIAL_STATE }
        default:
            return (state);
    }
};