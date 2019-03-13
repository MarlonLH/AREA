import { callApi } from './../Apis/callApi';

export const CHECK_USER_AUTHORIZATION = "check_user_authorization";
export const CHECK_USER_AUTHORIZATION_FAIL = "check_user_authorization_fail";

export const checkUserAuthorization = (bearer) => {
	return (dispatch) => {
		dispatch({
			type: CHECK_USER_AUTHORIZATION
		})
		callApi('http://localhost:8080/v1/areas', {
			'Content-Type': 'application/json',
			'Authorization': bearer
		}, 'get', null )
        .then(res => {
            if (res.success === false)
				checkUserAuthorizationFail(dispatch, res.error)
        })
        .catch(err => {
            checkUserAuthorizationFail(dispatch, err.error)
        })
	}
}

const checkUserAuthorizationFail = (dispatch, error) => {
	dispatch({
		type: CHECK_USER_AUTHORIZATION_FAIL,
		payload: error
	})
}