import React, { Component } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ranges:
                {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                }
        };
    }

    handleSelect(ranges) {
        console.log(ranges);
        // {
        // 	selection: {
        // 		startDate: [native Date Object],
        // 		endDate: [native Date Object],
        // 	}
        // }
    }
    render() {
        const selectionRange = {

        }
        return (
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={this.handleSelect}
            />
        )
    }
}