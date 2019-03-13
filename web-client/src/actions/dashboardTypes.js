import { callApi } from './../Apis/callApi';

export const DASHBOARD_CHANGE_DISPLAY = 'dashboard_change_display';

export const DASHBOARD_GET_SERVICE = 'dashboard_get_service';
export const DASHBOARD_GET_SERVICE_SUCCESS = 'dashboard_get_service_success';
export const DASHBOARD_GET_SERVICE_FAIL = 'dashboard_get_service_fail';

export const DASHBOARD_GET_ACTIONS = 'dashboard_get_actions';
export const DASHBOARD_GET_ACTIONS_SUCCESS = 'dashboard_get_actions_success';
export const DASHBOARD_GET_ACTIONS_FAIL = 'dashboard_get_actions_fail';

export const DASHBOARD_SELECT_SERVICE = 'dashboard_select_service';
export const DASHBOARD_SELECT_TRIGGER = 'dashboard_select_trigger';
export const DASHBOARD_ACTION_INFO_CHANGE = 'dashboard_action_info_change';

export const DASHBOARD_SELECT_REACTION = 'dashboard_select_reaction';
export const DASHBOARD_SELECT_REACTION_TRIGGER = 'dashboard_select_reaction_trigger';
export const DASHBOARD_REACTION_INFO_CHANGE = 'dashboard_reaction_info_change';

export const DASHBOARD_GET_REACTIONS = 'dashboard_get_reactions';
export const DASHBOARD_GET_REACTIONS_SUCCESS = 'dashboard_get_reactions_success';
export const DASHBOARD_GET_REACTIONS_FAIL = 'dashboard_get_reactions_fail';

export const DASHBOARD_GET_REACTION_TRIGGER = 'dashboard_get_reaction_trigger';
export const DASHBOARD_GET_REACTION_TRIGGER_SUCCESS = 'dashboard_get_reaction_trigger_success';
export const DASHBOARD_GET_REACTION_TRIGGER_FAIL = 'dashboard_get_reaction_trigger_fail';

export const DASHBOARD_NEW_AREA = 'dashboard_new_area';
export const DASHBOARD_NEW_AREA_SUCCESS = 'dashboard_new_area_success';
export const DASHBOARD_NEW_AREA_FAIL = 'dashboard_new_area_fail';

export const DASHBOARD_GET_USER_SERVICES = 'dashboard_get_user_services';
export const DASHBOARD_GET_USER_SERVICES_SUCCESS = 'dashboard_get_user_services_success';
export const DASHBOARD_GET_USER_SERVICES_FAIL = 'dashboard_get_user_services_fail';

export const DASHBOARD_SELECT_USER_SERVICE = 'dashboard_select_user_service';

export const DASHBOARD_GET_USER_SERVICE_AREA = 'dashboard_get_user_service_area';
export const DASHBOARD_GET_USER_SERVICE_AREA_SUCCESS = 'dashboard_get_user_service_area_success';
export const DASHBOARD_GET_USER_SERVICE_AREA_FAIL = 'dashboard_get_user_service_area_fail';

export const DASHBOARD_GET_ACTION_INFO = 'dashboard_get_actions_info';
export const DASHBOARD_GET_ACTION_INFO_SUCCESS = 'dashboard_get_actions_info_success';
export const DASHBOARD_GET_ACTION_INFO_FAIL = 'dashboard_get_actions_info_fail';

export const DASHBOARD_GET_REACTION_INFO = 'dashboard_get_reactions_info';
export const DASHBOARD_GET_REACTION_INFO_SUCCESS = 'dashboard_get_reactions_info_success';
export const DASHBOARD_GET_REACTION_INFO_FAIL = 'dashboard_get_reactions_info_fail';

export const DASHBOARD_DELETE_AREA = 'dashboard_delete_area';
export const DASHBOARD_DELETE_AREA_SUCCESS = 'dashboard_delete_area_success';
export const DASHBOARD_DELETE_AREA_FAIL = 'dashboard_delete_area_fail';

export const DASHBOARD_GET_TOKEN = 'dashboard_get_token';
export const DASHBOARD_GET_TOKEN_SUCCESS = 'dashboard_get_token_success';

/*  DASHBOARD MAIN  */

export const dashboardChangeDisplay = (index) => {
    return {
        type: DASHBOARD_CHANGE_DISPLAY,
        payload: index
    };
};

/*  DASHBOARD GET SERVICE  */

export const dashboardGetService = () => {
    return (dispatch) => {
        dispatch({
            type: DASHBOARD_GET_SERVICE
        })
        callApi("http://localhost:8080/v1/services/actions", {
            'Content-Type': 'application/json'
        }, 'get', null)
        .then(res => {
            if (res.success && res.success === false)
                dashboardGetServiceFail(dispatch, res.error)
            else
                dashbaordGetServiceSuccess(dispatch, res)
        })
        .catch(err => {
            dashboardGetServiceFail(dispatch, err.error)
        })
    };
};

const dashbaordGetServiceSuccess = (dispatch, services) => {
    dispatch({
        type: DASHBOARD_GET_SERVICE_SUCCESS,
        payload: services
    });
};

const dashboardGetServiceFail = (dispatch, error) => {
    dispatch({
        type: DASHBOARD_GET_SERVICE_FAIL,
        payload: error
    })
}

/*  DASHBOARD SELECT SERVICE  */

export const dashboardSelectService = (id) => {
    return ({
        type: DASHBOARD_SELECT_SERVICE,
        payload: id
    })
}

/*  DASHBOARD SELECT TRIGGER */

export const dashboardSelectTrigger = (trigger) => {
    return ({
        type: DASHBOARD_SELECT_TRIGGER,
        payload: trigger
    })
}

/*  DASHBOARD ACTION INFO CHANGE  */

export const dashboardActionInfoChange = (payload) => {
    return ({
        type: DASHBOARD_ACTION_INFO_CHANGE,
        payload: payload
    })
}

/*  DASHBOARD GET ACTIONS  */

export const dashboardGetActions = (serviceId) => {
    return (dispatch) => {
        dispatch({
            type: DASHBOARD_GET_ACTIONS
        })
        callApi("http://localhost:8080/v1/actions/all/" + serviceId, {
            'Content-Type': 'application/json'
        }, 'get', null)
        .then(res => {
            if (res.success === false)
            dashboardGetActionsFail(dispatch, res)
            else
            dashboardGetActionsSuccess(dispatch, res)
        })
        .catch(err => {
            console.error(err)
            dashboardGetActionsFail(dispatch, err.error)
        })
    };
};

const dashboardGetActionsSuccess = (dispatch, actions) => {
    dispatch({
        type: DASHBOARD_GET_ACTIONS_SUCCESS,
        payload: actions
    });
};

const dashboardGetActionsFail = (dispatch, error) => {
    dispatch({
        type: DASHBOARD_GET_ACTIONS_FAIL,
        payload: error
    })
}

/*  DASHBOARD GET REACTIONS  */

export const dashboardGetReactions = () => {
    return (dispatch) => {
        dispatch({
            type: DASHBOARD_GET_REACTIONS
        })
        callApi("http://localhost:8080/v1/services/reactions", {
            'Content-Type': 'application/json'
        }, 'get', null)
        .then(res => {
            if (res.success === false)
            dashboardGetReactionsFail(dispatch, res)
            else
                dashboardGetReactionsSuccess(dispatch, res)
            })
        .catch(err => {
            dashboardGetReactionsFail(dispatch, err)
        })
    };
};

const dashboardGetReactionsSuccess = (dispatch, reactions) => {
    dispatch({
        type: DASHBOARD_GET_REACTIONS_SUCCESS,
        payload: reactions
    });
};

const dashboardGetReactionsFail = (dispatch, error) => {
    dispatch({
        type: DASHBOARD_GET_REACTIONS_FAIL,
        payload: error
    })
}

/*  DASHBOARD GET REACTION TRIGGERS */

export const dashboardGetReactionTriggers = (serviceId) => {
    return (dispatch) => {
        dispatch({
            type: DASHBOARD_GET_REACTION_TRIGGER
        })
        callApi("http://localhost:8080/v1/reactions/all/" + serviceId, {
            'Content-Type': 'application/json'
        }, 'get', null)
        .then(res => {
            if (res.success === false)
                dashboardGetReactionTriggersFail(dispatch, res)
            else
                dashboardGetReactionTriggersSuccess(dispatch, res)
            })
        .catch(err => {
            dashboardGetReactionTriggersFail(dispatch, err)
        })
    };
};

const dashboardGetReactionTriggersSuccess = (dispatch, reactions) => {
    dispatch({
        type: DASHBOARD_GET_REACTION_TRIGGER_SUCCESS,
        payload: reactions
    });
};

const dashboardGetReactionTriggersFail = (dispatch, error) => {
    dispatch({
        type: DASHBOARD_GET_REACTION_TRIGGER_FAIL,
        payload: error
    })
}

/*  DASHBOARD SELECT REACTION  */

export const dashboardSelectReaction = (reaction) => {
    return ({
        type: DASHBOARD_SELECT_REACTION,
        payload: reaction
    })
}

/*  DASHBOARD SELECT REACTION TRIGGER  */

export const dashboardSelectReactionTrigger = (trigger) => {
    return ({
        type: DASHBOARD_SELECT_REACTION_TRIGGER,
        payload: trigger
    })
}

/*  DASHBOARD_REACTION_INFO_CHANGE  */

export const dashboardReactionInfoChange = (infos) => {
    return ({
        type: DASHBOARD_REACTION_INFO_CHANGE,
        payload: infos
    })
}

/*  DASHBOARD NEW AREA  */

export const dashboardNewArea = (bearer, ActionParam, ReactionParam, ActionId, ReactionId, ServiceSourceId) => {
    return (dispatch) => {
        dispatch({
            type: DASHBOARD_NEW_AREA
        })
        callApi("http://localhost:8080/v1/areas", {
			'Content-Type': 'application/json',
			'Authorization': bearer
		}, 'post', JSON.stringify({
            ActionParam: ActionParam,
            ReactionParam: ReactionParam,
            Active: 1,
            ActionId: ActionId,
            ReactionId: ReactionId,
            ServiceSourceId: ServiceSourceId
        }))
        .then(res => {
            console.log(res)
            if (res.success === false)
				dashboardNewAreaFail(dispatch, res.error)
            else
                dashboardNewAreaSuccess(dispatch, res)
        })
        .catch(err => {
            dashboardNewAreaFail(dispatch, err.error)
        })
    };
};

const dashboardNewAreaSuccess = (dispatch) => {
    dispatch({
        type: DASHBOARD_NEW_AREA_SUCCESS,
        payload: "Area successfully created !"
    });
};

const dashboardNewAreaFail = (dispatch, error) => {
    dispatch({
        type: DASHBOARD_NEW_AREA_FAIL,
        payload: error
    })
}

/*  DASHBOARD GET USER SERVICES  */

export const dashboardGetUserServices = (bearer) => {
    return (dispatch) => {
        dispatch({
            type: DASHBOARD_GET_USER_SERVICES
        }) 
        callApi('http://localhost:8080/v1/areas', {
			'Content-Type': 'application/json',
			'Authorization': bearer
		}, 'get', null )
        .then(res => {
            if (res.success === false)
                dashboardGetUserServicesFail(dispatch, res.error)
            else
                dashboardGetUserServicesSuccess(dispatch, res)
        })
        .catch(err => {
            dashboardGetUserServicesFail(dispatch, err.error)
        })
    };
};

const dashboardGetUserServicesSuccess = (dispatch, userServices) => {
    dispatch({
        type: DASHBOARD_GET_USER_SERVICES_SUCCESS,
        payload: userServices
    });
};

const dashboardGetUserServicesFail = (dispatch, error) => {
    dispatch({
        type: DASHBOARD_GET_USER_SERVICES_FAIL,
        payload: error
    })
}

/*  DASHBOARD SELECT USER SERVICE  */

export const dashboardSelectUserService = (service) => {
    return ({
        type: DASHBOARD_SELECT_USER_SERVICE,
        payload: service
    })
}

/*  DASHBOARD GET ACTION INFO  */

export const dashboardGetActionInfo = (actionsId) => {
    return (dispatch) => {
        dispatch({
            type: DASHBOARD_GET_ACTION_INFO
        })
        let actionsInfo = [];
        for (let i in actionsId) {
            callApi('http://localhost:8080/v1/actions/' + actionsId[i], {
            'Content-Type': 'application/json' }, 'get', null)
            .then(res => {
                if (res.success === "error")
                    dashboardGetActionInfoFail(dispatch, res)
                else
                    actionsInfo.push({
                        name: res.Name,
                        actionId: res.id
                    });
            }).catch(err => dashboardGetActionInfoFail(dispatch, err))
        }
        dashboardGetActionInfoSuccess(dispatch, actionsInfo);
    }
}

const dashboardGetActionInfoFail = (dispatch, error) => {
    dispatch({
        type: DASHBOARD_GET_ACTION_INFO_FAIL,
        payload: error
    })
}

const dashboardGetActionInfoSuccess = (dispatch, res) => {
    dispatch({
        type: DASHBOARD_GET_ACTION_INFO_SUCCESS,
        payload: res
    })
}

/*  DASHBOARD GET REACTION INFO  */

export const dashboardGetReactionInfo = (reactionsId) => {
    return (dispatch) => {
        dispatch({
            type: DASHBOARD_GET_REACTION_INFO
        })
        let reactionsInfo = [];
        for (let i in reactionsId) {
            callApi('http://localhost:8080/v1/reactions/' + reactionsId[i], {
            'Content-Type': 'application/json' }, 'get', null)
            .then(res => {
                if (res.success === "error")
                    dashboardGetReactionInfoFail(dispatch, res)
                else
                    reactionsInfo.push(res);
            }).catch(err => dashboardGetReactionInfoFail(dispatch, err))
        }
        dashboardGetReactionInfoSuccess(dispatch, reactionsInfo);
    }
}

const dashboardGetReactionInfoFail = (dispatch, error) => {
    dispatch({
        type: DASHBOARD_GET_REACTION_INFO_FAIL,
        payload: error
    })
}

const dashboardGetReactionInfoSuccess = (dispatch, res) => {
    dispatch({
        type: DASHBOARD_GET_REACTION_INFO_SUCCESS,
        payload: res
    })
}

/*  DASHBOARD DELETE AREA  */

export const dashboardDeleteArea = (areaId, bearer) => {
    return (dispatch) => {
        dispatch({
            type: DASHBOARD_DELETE_AREA
        })
        callApi('http://localhost:8080/v1/areas/' + areaId, {
			'Content-Type': 'application/json',
			'Authorization': bearer
		}, 'delete', null )
        .then(res => {
            if (res.success === false)
                dashboardDeleteAreaFail(dispatch, res.error)
            else
                dashboardDeleteAreaSuccess(dispatch, res)
        })
        .catch(err => {
            dashboardDeleteAreaFail(dispatch, err.error)
        })
    }
}

const dashboardDeleteAreaFail = (dispatch, error) => {
    dispatch({
        type: DASHBOARD_DELETE_AREA_FAIL,
        payload: error
    })
}

const dashboardDeleteAreaSuccess = (dispatch, res) => {
    dispatch({
        type: DASHBOARD_DELETE_AREA_SUCCESS,
        payload: res
    })
}

/*  DASHBOARD GET TOKEN  */

export const dashboardGetToken = (bearer) => {
    return (dispatch) => {
        callApi('http://localhost:8080/v1/tokens', {
            'Content-Type': 'application/json',
			'Authorization': bearer
        }, 'get', null)
        .then(res => {
            console.log(res);
            if (res && res.Token)
                dashboardGetTokenSuccesss(dispatch);
        }).catch(err => console.error(err));
    }
}

const dashboardGetTokenSuccesss = (dispatch) => {
    dispatch({
        type: DASHBOARD_GET_TOKEN_SUCCESS
    })
}