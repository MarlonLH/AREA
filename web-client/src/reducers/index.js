import { combineReducers } from 'redux';
import signReducer from './signReducer';
import logReducer from './logReducer';
import dashboardReducer from './dashboardReducer';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import frontReducer from './frontPageReducer';

export default combineReducers({
    sign: signReducer,
    log: logReducer,
    dashboard: dashboardReducer,
    user: userReducer,
    profile: profileReducer,
    front: frontReducer
})