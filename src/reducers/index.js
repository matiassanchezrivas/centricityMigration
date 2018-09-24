import { combineReducers } from 'redux';
import workspacesReducer from './workspaces-reducer'

export default combineReducers({
    workspaces: workspacesReducer,
})