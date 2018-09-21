import React from 'react';
import { Table } from 'reactstrap';


export default class Tabla extends React.Component {
    render() {
        const { headers, data } = this.props
        return (
            <Table striped>
                <thead>
                    <tr>
                        {headers && headers.length ? headers.map((header, keys) => {
                            console.log(header);
                            return (
                                header === 'id' ? null :
                                    <th key={keys}>{header.toUpperCase()}</th>
                            )
                        }) : null}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length ? data.map((value, key) => (
                        <tr key={key}>
                            {value.map((dato, i) =>
                                <td key={i}> {dato}</td>
                            )}
                        </tr>
                    )) : <tr> No monitors available</tr>}
                </tbody>
            </Table>
        );
    }
}