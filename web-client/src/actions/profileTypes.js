import { callApi } from './../Apis/callApi';

export const PROFILE_CONNECT_GOOGLE = "profile_connect_google";
export const PROFILE_CONNECT_GOOGLE_SUCCESS = "profile_connect_google_success";
export const PROFILE_CONNECT_GOOGLE_FAIL = "profile_connect_google_fail";

export const profileConnectGoogle = (bearer, code) => {
    return (dispatch) => {
        dispatch({
            type: PROFILE_CONNECT_GOOGLE
        });
        console.log(code);
		callApi('http://localhost:8080/v1/tokens', {
			'Content-Type': 'application/json',
			'Authorization': bearer
		}, 'post', JSON.stringify({
            Token: code,
            Active: 1
        }))
        .then(res => {
            if (res.success === false)
                profileConnectGoogleFail(dispatch, res.error)
            else
                profileConnectGoogleSuccess(dispatch, res.user, res.token)
        })
        .catch(err => {
            profileConnectGoogleFail(dispatch)
        })
    };
};

const profileConnectGoogleFail = (dispatch, error) => {
    dispatch({
        type: PROFILE_CONNECT_GOOGLE_FAIL,
        payload: error
    });
};

const profileConnectGoogleSuccess = (dispatch, user, token) => {
    dispatch({
        type: PROFILE_CONNECT_GOOGLE_SUCCESS,
        payload: {
            user: user,
            token: token
        }
    })
}