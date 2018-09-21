import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import WorkspacesContainer from './WorkspacesContainer'

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
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
        //fetchUser: (id) => dispatch(fetchUser(id)),
    })
}


const mapStateToProps = function (state) {
    return {
        // selectedUser: state.users.selectedUser,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);