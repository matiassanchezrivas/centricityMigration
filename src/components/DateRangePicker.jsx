import React, { Component } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default class MyComponent extends Component {
    render() {
        const { range, handleSelectRange } = this.props;
        return (
            <DateRangePicker
                ranges={[range]}
                onChange={handleSelectRange}
                months={2}
                maxDate={new Date()}
            />
        )
    }
}