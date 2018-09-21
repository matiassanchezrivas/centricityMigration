import { RECEIVE_USER, RECEIVE_USERS, UNLOG_USER } from '../constants';

const initialState = {
    currentUser: {},
    users: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            return Object.assign({}, state, { currentUser: action.user });
        case UNLOG_USER:
            return Object.assign({}, state, { currentUser: {} })
        case RECEIVE_USERS:
            console.log('ACTION USERS', action.users)
            return Object.assign({}, state, { users: action.users })
        default:
            return state;
    }
}