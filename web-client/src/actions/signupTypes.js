import { callApi } from '../Apis/callApi'

export const SIGN_USERNAME_CHANGED = 'sign_username_changed';
export const SIGN_EMAIL_CHANGED = 'sign_email_changed';
export const SIGN_PASSWORD_CHANGED = 'sign_password_changed';
export const SIGN_CONFIRM_PASSWORD_CHANGED = 'sign_confirm_password_changed';
export const SIGN_TERMS_AGREE_CHANGED = 'sign_terms_agree_changed';
export const SIGN_USER = 'sign_user';
export const SIGN_USER_FAIL = 'sign_user_fail';
export const SIGN_USER_SUCCESS = 'sign_user_success';
export const UNSIGN_USER = 'unsign_user';

export const signUsernameChanged = (username) => {
    return {
        type: SIGN_USERNAME_CHANGED,
        payload: username
    };
};

export const signEmailChanged = (email) => {
    return {
        type: SIGN_EMAIL_CHANGED,
        payload: email
    };
};

export const signPasswordChanged = (password) => {
    return {
        type: SIGN_PASSWORD_CHANGED,
        payload: password
    };
};

export const signConfirmPasswordChanged = (confirmPassword) => {
    return {
        type: SIGN_CONFIRM_PASSWORD_CHANGED,
        payload: confirmPassword
    };
};

export const signTermsAgreeChanged = (terms) => {
    return {
        type: SIGN_TERMS_AGREE_CHANGED,
        payload: terms
    };
};

export const unsignUser = () => {
    return {
        type: UNSIGN_USER
    };
};

export const signUser = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: SIGN_USER
        });
        callApi('http://localhost:8080/v1/users', {
            'Content-Type': 'application/json'
        }, 'post', JSON.stringify({
            email: email,
            password: password
        }))
        .then(res => {
            console.log('redux : ', res)
            if (res.success === false)
                signUserFail(dispatch, res.error)
            else
                signUserSuccess(dispatch, res.user, res.token)
        })
        .catch(err => {
            signUserFail(dispatch)
        })
    };
};

const signUserFail = (dispatch, error) => {
    dispatch({
        type: SIGN_USER_FAIL,
        payload: error
    });
};

const signUserSuccess = (dispatch, user, token) => {
    dispatch({
        type: SIGN_USER_SUCCESS,
        payload: {
            user: user,
            token: token
        }
    })
}