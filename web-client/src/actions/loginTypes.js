import { callApi } from '../Apis/callApi'

export const LOG_EMAIL_CHANGED = 'log_email_changed';
export const LOG_PASSWORD_CHANGED = 'log_password_changed';
export const LOG_USER = 'log_user';
export const LOG_USER_FAIL = 'log_user_fail';
export const LOG_USER_SUCCESS = 'log_user_success';
export const UNLOG_USER = 'unlog_user';

export const logEmailChanged = (email) => {
    return {
        type: LOG_EMAIL_CHANGED,
        payload: email
    }
}

export const logPasswordChanged = (password) => {
    return {
        type: LOG_PASSWORD_CHANGED,
        payload: password
    }
}

export const unlogUser = () => {
    return {
        type: UNLOG_USER
    }
}

export const logUser = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: LOG_USER
        });
        callApi('http://localhost:8080/v1/users/login', {
            'Content-Type': 'application/json'
        }, 'post', JSON.stringify({
            email: email,
            password: password
        }))
        .then(res => {
            console.log('redux : ', res)
            if (res.success === false)
                logUserFail(dispatch, res.error)
            else
                logUserSuccess(dispatch, res.user, res.token)
        })
        .catch(err => {
            logUserFail(dispatch)
        })
    };
};

const logUserFail = (dispatch, error) => {
    dispatch({
        type: LOG_USER_FAIL,
        payload: error
    });
};

const logUserSuccess = (dispatch, user, token) => {
    dispatch({
        type: LOG_USER_SUCCESS,
        payload: {
            user: user,
            token: token
        }
    })
}
