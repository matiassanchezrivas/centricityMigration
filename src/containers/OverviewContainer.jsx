import React from 'react';
import HexagonsHeader from '../components/hexagonsHeader'
import HexagonsContainer from '../components/hexagonsContent'
import { connect } from 'react-redux';


class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {

    }
    render() {
        const { tags } = this.props;
        return (<div>
            <HexagonsHeader tags={tags} />
            <HexagonsContainer />
        </div>);
    }
}

const mapDispatchToProps = function (dispatch) {
    return ({
    })
}


const mapStateToProps = function (state) {
    return {
        workspaces: state.workspaces.workspaces,
        tags: state.workspaces.tags,
        groups: state.workspaces.groups,
        userNames: state.workspaces.userNames,
        machineNames: state.workspaces.machineNames,
        budles: state.workspaces.bundles,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);

