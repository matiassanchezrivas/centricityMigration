import { UPDATE_SEARCH_GROUP, UPDATE_USER_NAMES, UPDATE_FILTER } from '../constants';

const receiveSearchGroup = (group) => ({
    type: UPDATE_SEARCH_GROUP,
    group
})

const receiveUserNames = (userNames) => ({
    type: UPDATE_USER_NAMES,
    userNames
})

const receiveFilter = (filter) => ({
    type: UPDATE_FILTER,
    filter
})

export const updateFilter = (filter) => dispatch => {
    dispatch(receiveFilter(filter))
}

export const updateSearchGroup = (group) => dispatch => {
    return dispatch(receiveSearchGroup(group))
}

export const updateUserNames = (userNames) => dispatch => {
    dispatch(receiveUserNames(userNames))
}

