import { RECEIVE_WORKSPACES, RECEIVE_TAGS, RECEIVE_BUNDLES, RECEIVE_GROUPS, RECEIVE_MACHINE_NAMES, RECEIVE_USER_NAMES } from '../constants';

const initialState = {
    workspaces: [],
    tags: [],
    bundles: [],
    groups: [],
    machineNames: [],
    userNames: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_WORKSPACES:
            return Object.assign({}, state, { workspaces: action.workspaces });
        case RECEIVE_TAGS:
            return Object.assign({}, state, { tags: action.tags });
        case RECEIVE_BUNDLES:
            return Object.assign({}, state, { bundles: action.bundles });
        case RECEIVE_GROUPS:
            return Object.assign({}, state, { groups: action.groups });
        case RECEIVE_MACHINE_NAMES:
            return Object.assign({}, state, { machineNames: action.machineNames });
        case RECEIVE_USER_NAMES:
            return Object.assign({}, state, { userNames: action.userNames });
        default:
            return state;
    }
}