import { UPDATE_SEARCH_GROUP, UPDATE_USER_NAMES } from '../constants';

const initialState = {
    group: [],
    usernames: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_GROUP:
            return Object.assign({}, state, { group: action.group });
        case UPDATE_USER_NAMES:
            return Object.assign({}, state, { usernames: action.userNames });
        default:
            return state;
    }
}