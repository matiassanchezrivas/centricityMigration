import React from 'react';
import { Table } from 'reactstrap';



export default class Tabla extends React.Component {
    render() {
        const { headers, data, renderTable } = this.props
        // headers es un array de obj en el cual trae key, type, header 
        // KEY: el key
        // TYPE: si es txt, checkbox, link...
        // HEADER: el texto a mostrar
        // data es un arreglo que tiene obj con toda la data de la db
        // renderTable es una funcion que renderea el contenido de la table
        return (
            <Table striped>
                <thead>
                    <tr>
                        {headers && headers.length ? headers.map((header, keys) => {
                            return(
                                <th key={keys}>{header.header.toUpperCase()}</th>
                            )
                        }) : null}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length ? data.map((value, key) => (
                        <tr key={key}>
                        {headers.map((header, k) => {
                        return (
                            renderTable(value, header, k)
                        )
                        })} 
                        </tr>
                    )) : <tr> No monitors available</tr>}
                </tbody>
            </Table>
        );
    }
}