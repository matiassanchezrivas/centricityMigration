import React from 'react';
import HexagonsHeader from '../components/hexagonsHeader'
import HexagonsContainer from '../components/hexagonsContent'

// const styles = theme => ({
//     marginTop: {
//         marginTop: theme.spacing.unit * 2,
//     },
//     marginBottom: {
//         marginBottom: theme.spacing.unit * 2,
//     }
// });

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    render() {
        return (<div>
            <HexagonsHeader />
            <HexagonsContainer />
        </div>);
    }
}


export default Overview;