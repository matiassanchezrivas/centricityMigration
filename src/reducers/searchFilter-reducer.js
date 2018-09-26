import { UPDATE_SEARCH_GROUP, UPDATE_USER_NAMES, UPDATE_FILTER } from '../constants';

const initialState = {
    group: [],
    usernames: [],
    bundleId: [],
    ips: [],
    liquidwareMetric: "",
    liquidwareOperator: "",
    liquidwareValue: "",
    machineName: [],
    status: [],
    tags: [],
    unhealthy: null,
    userConnected: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_GROUP:
            return Object.assign({}, state, { group: action.group });
        case UPDATE_USER_NAMES:
            return Object.assign({}, state, { usernames: action.userNames });
        case UPDATE_FILTER:
            console.log('ACTION', action)
            return Object.assign({}, state, action.filter);
        default:
            return state;
    }
}