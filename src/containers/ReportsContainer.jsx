import React from 'react';
import ReportsHeader from '../components/ReportsHeader'
//import HexagonsContainer from '../components/hexagonsContent'


// const styles = theme => ({
//     marginTop: {
//         marginTop: theme.spacing.unit * 2,
//     },
//     marginBottom: {
//         marginBottom: theme.spacing.unit * 2,
//     }
// });

class ReportsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    render() {
        return (<div>
            <ReportsHeader />
            {/* <HexagonsContainer /> */}
        </div>);
    }
}


export default ReportsContainer;