import React from 'react';
import OverviewHeader from '../components/overviewHeader'
import OverviewContent from '../components/overviewContent'
import { connect } from 'react-redux';
import { updateUserNames, updateFilter } from '../action-creators/searchFilter'
import { fetchWorkspaces } from '../action-creators/workspaces'

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {

    }
    render() {
        const { bundles, updateFilter, tags, machineNames, groups, userNames, workspaces, searchFilter, updateUserNames, fetchWorkspaces } = this.props;
        return (<div>
            <OverviewHeader
                tags={tags}
                userNames={userNames}
                updateUserNames={updateUserNames}
                fetchWorkspaces={fetchWorkspaces}
                searchFilter={searchFilter}
                machineNames={machineNames}
                groups={groups}
                bundles={bundles}
                updateFilter={updateFilter}
            />
            <OverviewContent workspaces={workspaces} searchFilter={searchFilter} />
        </div>);
    }
}

const mapDispatchToProps = function (dispatch) {
    return ({
        updateUserNames: (userNames) => dispatch(updateUserNames(userNames)),
        fetchWorkspaces: (userId, page, size, sort, filter) => dispatch(fetchWorkspaces(userId, page, size, sort, filter)),
        updateFilter: (filter) => dispatch(updateFilter(filter))
    })
}


const mapStateToProps = function (state) {
    return {
        workspaces: state.workspaces.workspaces,
        tags: state.workspaces.tags,
        groups: state.workspaces.groups,
        userNames: state.workspaces.userNames,
        machineNames: state.workspaces.machineNames,
        bundles: state.workspaces.bundles,
        searchFilter: state.searchFilter,

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);

