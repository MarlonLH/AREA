import {
    SIGN_USERNAME_CHANGED,
    SIGN_EMAIL_CHANGED,
    SIGN_PASSWORD_CHANGED,
    SIGN_CONFIRM_PASSWORD_CHANGED,
    SIGN_TERMS_AGREE_CHANGED,
    SIGN_USER,
    SIGN_USER_FAIL,
    SIGN_USER_SUCCESS,
    UNSIGN_USER
} from './../actions/signupTypes';

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    confirmPassword: false,
    terms: true,
    loading: false,
    user: null,
    token: null,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_USERNAME_CHANGED:
            return { ...state, username: action.payload };
        case SIGN_EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case SIGN_PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case SIGN_CONFIRM_PASSWORD_CHANGED:
            return { ...state, confirmPassword: action.payload };
        case SIGN_TERMS_AGREE_CHANGED:
            return { ...state, terms: action.payload };
        case SIGN_USER:
            return { ...state, loading: true, error: '' };
        case SIGN_USER_FAIL:
            return { ...state, error: action.payload, loading: false };
        case SIGN_USER_SUCCESS:
            return { ...state, user: action.payload.user, token: action.payload.token, loading: false };
        case UNSIGN_USER:
            return { INITIAL_STATE }
        default:
            return (state);
    }
};