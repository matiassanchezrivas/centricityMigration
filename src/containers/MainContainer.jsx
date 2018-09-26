import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import WorkspacesContainer from './WorkspacesContainer'

import { fetchWorkspaces, fetchTags, fetchBundles, fetchGroups, fetchMachineNames, fetchUserNames } from '../action-creators/workspaces'

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const { fetchWorkspaces, fetchTags, fetchGroups, fetchMachineNames, fetchUserNames, fetchBundles } = this.props;
        fetchWorkspaces(3, 0, 126, 'id')
            .catch((e) => console.log(e))
        fetchTags(3)
            .then((data) => console.log('TAGS', data))
        fetchGroups(3)
            .then((data) => console.log('GROUPS', data))
        fetchMachineNames(3)
            .then((data) => console.log('MACHINENAMES', data))
        fetchUserNames(3)
            .then((data) => console.log('USERNAMES', data))
        fetchBundles(3)
            .then((data) => console.log('BUNDLES', data))

    }

    render() {
        return (<div className="App">
            <Switch>
                <Route exact path="/workspaces/" component={WorkspacesContainer} />
                <Redirect from="/" to="workspaces" />
            </Switch>
        </div>);
    }
}

const mapDispatchToProps = function (dispatch) {
    return ({
        fetchWorkspaces: (userId, page, size, sort, filter) => dispatch(fetchWorkspaces(userId, page, size, sort, filter)),
        fetchTags: (id) => dispatch(fetchTags(id)),
        fetchGroups: (id) => dispatch(fetchGroups(id)),
        fetchUserNames: (id) => dispatch(fetchUserNames(id)),
        fetchMachineNames: (id) => dispatch(fetchMachineNames(id)),
        fetchBundles: (id) => dispatch(fetchBundles(id))
    })
}


const mapStateToProps = function (state) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);