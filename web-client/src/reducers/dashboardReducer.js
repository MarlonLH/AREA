import {
    DASHBOARD_CHANGE_DISPLAY,
    DASHBOARD_ACTION_INFO_CHANGE,
    DASHBOARD_GET_SERVICE,
    DASHBOARD_GET_SERVICE_SUCCESS,
    DASHBOARD_GET_SERVICE_FAIL,
    DASHBOARD_GET_ACTIONS,
    DASHBOARD_GET_ACTIONS_SUCCESS,
    DASHBOARD_GET_ACTIONS_FAIL,
    DASHBOARD_GET_REACTIONS,
    DASHBOARD_GET_REACTIONS_SUCCESS,
    DASHBOARD_GET_REACTIONS_FAIL,
    DASHBOARD_GET_USER_SERVICES,
    DASHBOARD_GET_USER_SERVICES_SUCCESS,
    DASHBOARD_GET_USER_SERVICES_FAIL,
    DASHBOARD_GET_USER_SERVICE_AREA,
    DASHBOARD_GET_USER_SERVICE_AREA_SUCCESS,
    DASHBOARD_GET_USER_SERVICE_AREA_FAIL,
    DASHBOARD_SELECT_SERVICE,
    DASHBOARD_SELECT_TRIGGER,
    DASHBOARD_SELECT_REACTION,
    DASHBOARD_GET_REACTION_TRIGGER,
    DASHBOARD_GET_REACTION_TRIGGER_FAIL,
    DASHBOARD_GET_REACTION_TRIGGER_SUCCESS,
    DASHBOARD_SELECT_REACTION_TRIGGER,
    DASHBOARD_REACTION_INFO_CHANGE,
    DASHBOARD_NEW_AREA,
    DASHBOARD_NEW_AREA_SUCCESS,
    DASHBOARD_NEW_AREA_FAIL,
    DASHBOARD_SELECT_USER_SERVICE,
    DASHBOARD_GET_ACTION_INFO,
    DASHBOARD_GET_ACTION_INFO_FAIL,
    DASHBOARD_GET_ACTION_INFO_SUCCESS,
    DASHBOARD_GET_REACTION_INFO,
    DASHBOARD_GET_REACTION_INFO_FAIL,
    DASHBOARD_GET_REACTION_INFO_SUCCESS,
    DASHBOARD_DELETE_AREA,
    DASHBOARD_DELETE_AREA_SUCCESS,
    DASHBOARD_DELETE_AREA_FAIL,
    DASHBOARD_GET_TOKEN,
    DASHBOARD_GET_TOKEN_SUCCESS
} from './../actions/dashboardTypes'

const INITIAL_STATE = {
    index: 0,

    serviceLoading: false,
    services: null,
    selectedService: null,
    actionLoading: false,
    actions: null,
    trigger: null,
    actionsInfo: [],
    
    reactionLoading: false,
    reactions: null,
    selectedReaction: null,
    reactionTrigLoading: false,
    reactionTriggers: null,
    reaTrigger: null,
    reactionInfos: [],

    loadingNewArea: false,
    newAreaSuccess: null,
    newAreaError: null,

    userServicesLoading: false,
    userServices: null,
    userSelectedService: null,
    userServiceAREALoading: false,
    userServiceAREA: null,

    actionInfo: null,
    reactionInfo: null,

    deleteAreaLoading: null,
    deleteAreaRes: null,

    tokenStatus: false,

    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DASHBOARD_CHANGE_DISPLAY:
            return { ...INITIAL_STATE, index: action.payload };

        case DASHBOARD_GET_SERVICE:
            return { ...state, serviceLoading: true };
        case DASHBOARD_GET_SERVICE_SUCCESS:
            return { ...state, serviceLoading: false, services: action.payload, actionsInfo: [] };
        case DASHBOARD_GET_SERVICE_FAIL:
            return { ...state, serviceLoading: false, error: action.payload };

        case DASHBOARD_SELECT_SERVICE:
            return { ...state, selectedService: action.payload, actionsInfo: [] };
        case DASHBOARD_SELECT_TRIGGER:
            return { ...state, trigger: action.payload, actionsInfo: [] };
        case DASHBOARD_ACTION_INFO_CHANGE:
            return { ...state, actionsInfo: action.payload };

        case DASHBOARD_GET_ACTIONS:
            return { ...state, actionLoading: true };
        case DASHBOARD_GET_ACTIONS_SUCCESS:
            return { ...state, actionLoading: false, actions: action.payload };
        case DASHBOARD_GET_ACTIONS_FAIL:
            return { ...state, actionLoading: false, error: action.payload };

        case DASHBOARD_GET_REACTIONS:
            return { ...state, reactionLoading: true };
        case DASHBOARD_GET_REACTIONS_SUCCESS:
            return { ...state, reactionLoading: false, reactions: action.payload };
        case DASHBOARD_GET_REACTIONS_FAIL:
            return { ...state, reactionLoading: false, error: action.payload };

        case DASHBOARD_SELECT_REACTION:
            return { ...state, selectedReaction: action.payload, reactionInfos: [] };

        case DASHBOARD_GET_REACTION_TRIGGER:
            return { ...state, reactionTrigLoading: true, error: '' };
        case DASHBOARD_GET_REACTION_TRIGGER_FAIL:
            return { ...state, reactionTrigLoading: false, error: action.payload };
        case DASHBOARD_GET_REACTION_TRIGGER_SUCCESS:
            return { ...state, reactionTrigLoading: false, reactionTriggers: action.payload, reactionInfos: [] };

        case DASHBOARD_SELECT_REACTION_TRIGGER:
            return { ...state, reaTrigger: action.payload, reactionInfos: [] };
        case DASHBOARD_REACTION_INFO_CHANGE:
            return { ...state, reactionInfos: action.payload };

        case DASHBOARD_NEW_AREA:
            return { ...state, loadingNewArea: true, newAreaError: null, newAreaSuccess: null };
        case DASHBOARD_NEW_AREA_SUCCESS:
            return { ...state, loadingNewArea: false, newAreaSuccess: action.payload };
        case DASHBOARD_NEW_AREA_FAIL:
            return { ...state, loadingNewArea: false, newAreaError: action.payload };

        case DASHBOARD_GET_USER_SERVICES:
            return { ...state, userServicesLoading: true };
        case DASHBOARD_GET_USER_SERVICES_SUCCESS:
            return { ...state, userServicesLoading: false, userServices: action.payload };
        case DASHBOARD_GET_USER_SERVICES_FAIL:
            return { ...state, userServicesLoading: false, error: action.payload };

        case DASHBOARD_SELECT_USER_SERVICE:
            return { ...state, userSelectedService: action.payload };

        case DASHBOARD_GET_USER_SERVICE_AREA:
            return { ...state, userServiceAREALoading: true };
        case DASHBOARD_GET_USER_SERVICE_AREA_SUCCESS:
            return { ...state, userServiceAREALoading: false, userServiceAREA: action.payload};
        case DASHBOARD_GET_USER_SERVICE_AREA_FAIL:
            return { ...state, userServiceAREALoading: false, error: action.payload };

        case DASHBOARD_GET_ACTION_INFO:
            return { ...state, actionLoading: true, actionInfo: null };
        case DASHBOARD_GET_ACTION_INFO_FAIL:
            return { ...state, actionLoading: false };
        case DASHBOARD_GET_ACTION_INFO_SUCCESS:
            return { ...state, actionLoading: false, actionInfo: action.payload };

        case DASHBOARD_GET_REACTION_INFO:
            return { ...state, reactionLoading: true, reactionInfo: null };
        case DASHBOARD_GET_REACTION_INFO_FAIL:
            return { ...state, reactionLoading: false };
        case DASHBOARD_GET_REACTION_INFO_SUCCESS:
            return { ...state, reactionLoading: false, reactionInfo: action.payload };

        case DASHBOARD_DELETE_AREA:
            return { ...state, deleteAreaLoading: true, deleteAreaError: null };
        case DASHBOARD_DELETE_AREA_SUCCESS:
            return { ...state, deleteAreaLoading: false, deleteAreaRes: 1 };
        case DASHBOARD_DELETE_AREA_FAIL:
            return { ...state, deleteAreaLoading: false, deleteAreaRes: 0 };

        case DASHBOARD_GET_TOKEN:
            return { ...state, tokenStatus: false };
        case DASHBOARD_GET_TOKEN_SUCCESS:
            return { ...state, tokenStatus: true };

        default:
            return (state);
    }
};