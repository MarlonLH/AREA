import { callApi } from './../Apis/callApi';

export const ALL_SERVICES = 'all_services';
export const ALL_SERVICES_SUCCESS = 'all_services_success';
export const ALL_SERVICES_FAIL = 'all_services_fail';

export const REFRESH_USER = 'refresh_user'
export const REFRESH_USER_SUCCESS = 'refresh_user_success';

export const allServices = () => {
	return (dispatch) => {
		dispatch({
            type: ALL_SERVICES
        })
        callApi("http://localhost:8080/v1/services/", {
            'Content-Type': 'application/json'
        }, 'get', null)
        .then(res => {
			console.log(res);
            if (res.success && res.success === false)
                allServicesFail(dispatch, res.error)
            else
                allServicesSuccess(dispatch, res)
        })
        .catch(err => {
            allServicesFail(dispatch, err.error)
        })
    };
};

const allServicesSuccess = (dispatch, services) => {
    dispatch({
        type: ALL_SERVICES_SUCCESS,
        payload: services
    });
};

const allServicesFail = (dispatch, error) => {
    dispatch({
        type: ALL_SERVICES_FAIL,
        payload: error
    })
}

export const refreshUser = (bearer) => {
    return (dispatch) => {
        dispatch({
            type: REFRESH_USER
        })
        callApi('http://localhost:8080/v1/users/login', {
            'Content-Type': 'application/json',
			'Authorization': bearer
        }, 'get', null)
        .then(res => {
            console.log('redux : ', res)
            if (res.success === true)
                refreshUserSuccess(dispatch, res.user, res.token)
        })
        .catch(err => console.error(err))
    }
}

const refreshUserSuccess = (dispatch, user, token) => {
    dispatch({
        type: REFRESH_USER_SUCCESS,
        payload: {
            user: user,
            token: token
        }
    })
}