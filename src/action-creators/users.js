import axios from 'axios';
import { RECEIVE_USER, RECEIVE_USERS, UNLOG_USER } from '../constants';

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const fetchUser = (id) => dispatch => {
    console.log('fetch user', id)
    return axios.get(`/api/auth/users/${id}`)
        .then(res => res.data)
        .then(user => dispatch(receiveUser(user)))
}

export const fetchUsers = () => dispatch => {
    return axios.get(`/api/auth/users`)
        .then(res => res.data)
        .then(users => dispatch(receiveUsers(users.data)))
}

export const unlogUser = () => dispatch => {
    return axios.get('/api/auth/logout')
        .then(data => dispatch({ type: UNLOG_USER }))
}

export const registerUser = newUser => dispatch => {
    return axios.post('api/auth/directregister/', newUser)
        .then(res => res.data)
        .then((newUser) => {
            //dispatch(fetchItemAdmin(item[0].id))
            console.log('newUser', newUser)
            return dispatch(fetchUser(newUser.id))
        })
        .catch((e) => {
            console.log(e);
        })
}

export const removeUser = id => dispatch => {
    return axios.delete(`api/auth/delete/${id}`)
        .then(res => { return res.data })
        .then((item) => {
            return item;
        })
        .catch((e) => {
            return (e);
        })
}

