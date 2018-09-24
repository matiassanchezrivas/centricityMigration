import React from 'react';
import { } from 'reactstrap';
import Tabla from '../components/tabla'


// const styles = theme => ({
//     marginTop: {
//         marginTop: theme.spacing.unit * 2,
//     },
//     marginBottom: {
//         marginBottom: theme.spacing.unit * 2,
//     }
// });

// var headers = ["First name", "Metric Type", "Validation type", "Arguments", "Workspace ID"];

const headers = [
    {
        key: 'First name',
        type: 'text',
        header: 'First name'
    },
    {
        key: 'Metric Type',
        type: 'text',
        header: 'Metric Type'
    },
    {
        key: 'Validation type',
        type: 'text',
        header: 'Validation type'
    },
    {
        key: 'Arguments',
        type: 'text',
        header: 'Arguments'
    },
    {
        key: 'Workspace ID',
        type: 'text',
        header: 'Workspace ID'
    },
]


var dataPrueba = [];

for (var i = 0; i < 100; i++) {
    dataPrueba.push(["asd", "skldnma", "asfjnsa", "asdjasn", "jkansd"])
}
class Monitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.renderTable = this.renderTable.bind(this);
    }
    componentDidMount() {
    }

    renderTable(data, header, k) {
        return(
            <td key={k}>{data[k]}</td>
        )
    
    }

    render() {
        return (<div>
            <Tabla
                headers={headers}
                data={dataPrueba}
                renderTable={this.renderTable}
            />
        </div>);
    }
}


export default Monitor;