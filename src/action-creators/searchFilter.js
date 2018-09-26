import { UPDATE_SEARCH_GROUP, UPDATE_USER_NAMES } from '../constants';

const receiveSearchGroup = (group) => ({
    type: UPDATE_SEARCH_GROUP,
    group
})

const receiveUserNames = (userNames) => ({
    type: UPDATE_USER_NAMES,
    userNames
})

export const updateSearchGroup = (group) => dispatch => {
    return dispatch(receiveSearchGroup(group))
}

export const updateUserNames = (userNames) => dispatch => {
    dispatch(receiveUserNames(userNames))
}