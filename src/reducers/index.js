import { combineReducers } from 'redux';
import workspacesReducer from './workspaces-reducer'
import searchFilterReducer from './searchFilter-reducer'

export default combineReducers({
    workspaces: workspacesReducer,
    searchFilter: searchFilterReducer,
})