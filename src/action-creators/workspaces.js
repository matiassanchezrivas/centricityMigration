import axios from '../config/axios';
import { RECEIVE_WORKSPACES, RECEIVE_GROUPS, RECEIVE_BUNDLES, RECEIVE_TAGS, RECEIVE_MACHINE_NAMES, RECEIVE_USER_NAMES } from '../constants';

const tabDefaults = {
    defaultView: "STATUS",
    GRID: {
        itemsPerPage: 100,
        //iconSize: 'N/A',
    },
    LIST: {
        //iconSize : 200, 
        itemsPerPage: 51,
    },
    STATUS: {
        //iconSize : 60, 
        itemsPerPage: 63 * 2,
    },
}

const receiveWorkspaces = (workspaces) => ({
    type: RECEIVE_WORKSPACES,
    workspaces
})

const receiveTags = (tags) => ({
    type: RECEIVE_TAGS,
    tags
})

const receiveBundles = (bundles) => ({
    type: RECEIVE_BUNDLES,
    bundles
})

const receiveGroups = (groups) => ({
    type: RECEIVE_GROUPS,
    groups
})

const receiveMachineNames = (machineNames) => ({
    type: RECEIVE_MACHINE_NAMES,
    machineNames
})

const receiveUserNames = (userNames) => ({
    type: RECEIVE_USER_NAMES,
    userNames
})

export const fetchWorkspaces = (userId, page, size, sort) => dispatch => {
    return axios.post(`/workspace/customer/${userId}/list2?page=${page}&size=${size}&sort=${sort}`)
        .then(res => res.data)
        .then(workspaces => dispatch(receiveWorkspaces(workspaces.content)))
        .catch(e => console.log(e))
}

export const fetchTags = (id) => dispatch => {
    debugger;
    return axios.post(`/workspace/tags/byCustomerId/${id}`)
        .then(res => res.data)
        .then(tags => { debugger; dispatch(receiveTags(tags)) })
        .catch(e => console.log(e))
}

export const fetchBundles = (id) => dispatch => {
    return axios.post(`/workspace/customer/${id}/bundles`)
        .then(res => res.data)
        .then(bundles => dispatch(receiveBundles(bundles)))
        .catch(e => console.log(e))
}

export const fetchGroups = (id) => dispatch => {
    return axios.post(`/workspace/customer/${id}/groups`)
        .then(res => res.data)
        .then(groups => dispatch(receiveGroups(groups)))
        .catch(e => console.log(e))
}

export const fetchMachineNames = (id) => dispatch => {
    return axios.get(`/workspace/machineName/byCustomerId/${id}`)
        .then(res => res.data)
        .then(machineNames => dispatch(receiveMachineNames(machineNames)))
        .catch(e => console.log(e))
}

export const fetchUserNames = (id) => dispatch => {
    return axios.get(`/workspace/usernames/byCustomerId/${id}`)
        .then(res => res.data)
        .then(machineNames => dispatch(receiveUserNames(machineNames)))
        .catch(e => console.log(e))
}

// export const fetchWorkspacesByUserName = (id) => dispatch => {
//     return axios.post(`/workspace/customer/${userId}/list2?page=${page}&size=${size}&sort=${sort}`)
//         .then(res => res.data)
//         .then(machineNames => dispatch(receiveUserNames(machineNames)))
//         .catch(e => console.log(e))
// }

// $scope.filterByUsername = function () {
//     $scope.loaded = false;
//     $scope.settings.req.usernames = $scope.request.usernames.map(function (m) { return m.text });
//     WorkspaceAPI.getWorkspaces2($scope.settings.req, 0, $scope.settings.pagination.itemsPerPage, 'userName').then(function (response) {
//         $scope.processWorkspaces(response);
//     });
// }



// return $http.post(cpconfig.API_URL + '/workspace/customer/' + Session.user.customer.id + "/list2?page=" + page + "&size=" + size + "&sort=" + sort, request).then(function (response) {
//     return response.data;
// });

// ({}, 0, tabDefaults['STATUS'].itemsPerPage, "id")

