import React from 'react';
import ReportsHeader from '../components/ReportsHeader'


class ReportsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range:
                {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                }

        };
        this.handleSelectRange = this.handleSelectRange.bind(this)
    }

    handleSelectRange(ranges) {
        this.setState({ range: ranges.selection });
    }

    componentDidMount() {
    }
    render() {
        const { range } = this.state;
        return (<div>
            <ReportsHeader
                range={range}
                handleSelectRange={this.handleSelectRange}
            />
        </div>);
    }
}


export default ReportsContainer;