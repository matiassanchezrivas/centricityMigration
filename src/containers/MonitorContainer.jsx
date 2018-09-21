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

var headers = ["First name", "Metric Type", "Validation type", "Arguments", "Workspace ID"];


var dataPrueba = [];

for (var i = 0; i < 100; i++) {
    dataPrueba.push(["asd", "skldnma", "asfjnsa", "asdjasn", "jkansd"])
}
class Monitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }

    render() {
        return (<div>
            <Tabla
                headers={headers}
                data={dataPrueba}
            />
        </div>);
    }
}


export default Monitor;