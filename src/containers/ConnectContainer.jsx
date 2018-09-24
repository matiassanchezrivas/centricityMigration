import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from '../components/tabla';
import ModalConnectContainer from './ModalConnectContainer';
import { Button } from 'reactstrap';
import { FiX,FiCheck, FiEdit, FiEdit3 } from 'react-icons/fi'
import axios from 'axios';


const formValues = ['alias', 'arn', 'instanceid', 'url', 'region', 'active']
const headers =[
                {
                    key: 'alias',
                    type: 'link',
                    header: 'alias'
                },
                {
                    key: 'url',
                    type: 'link',
                    header: 'url'                    
                },
                {
                    key: 'active',
                    type: 'icons',
                    header: 'active'
                },
                {
                    key: 'action',
                    type: 'icons',
                    header: 'action'
                }
            ]

class ConnectContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            headers: [],
            modal: false,
            selectedData: {},
            update: false
        }
        this.openModal = this.openModal.bind(this);
        this.addConnectInstance = this.addConnectInstance.bind(this);
        this.editConnectInstance = this.editConnectInstance.bind(this);
        this.editInstance = this.editInstance.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.renderTable = this.renderTable.bind(this);
    }

    fetchData() {
        //ver que el 3 es un :id
        console.log('fetchdata')
        axios.get('http://dev.sandbox-us.centricity.io:8091/connect/instances/customer/3/list')
            .then(resp => resp.data)
            .then(data => {
                data.map(resp => {
                    return resp.link = `http://localhost:9000/#/connectdashboard/${resp.id}`                    
                })                
                return data
            })
            .then(data => {
                this.setState({
                    data,
                    headers
                })
            })
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('prev',prevState)
        console.log('state', this.state)
        if(prevState.update !== this.state.update){
            console.log('entro')
           this.fetchData();
        }
    }

    openModal() {
        this.setState({
            modal: !this.state.modal
        })
    }

    editConnectInstance(id) {
        this.openModal()
        this.state.data.map(inst => {
            if(inst.id === id){
                this.setState({
                    selectedData: inst
                })
            }
        })
    }

    addConnectInstance(newConnectInstance) {
        // ver que el 3 es un :id
        axios.post('http://dev.sandbox-us.centricity.io:8091/connect/instances/addinstance/3', newConnectInstance)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    editInstance(instance){
        axios.post('http://dev.sandbox-us.centricity.io:8091/connect/instances/updateinstance/3', instance)
        .then(function (response) {
            console.log(response);            
        })
        .then(() => {
            this.setState({
                update: !this.state.update
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    renderTable(data, header, k) {
        if(header.key === 'alias'){
            return(
                <td key={k}><Link to={`/#/connectdashboard/${data.id}`}>{data[header.key]}</Link></td>
            )    
        }
        if(header.key === 'url'){
            return(
                <td key={k}><a href={data.url}>{data[header.key]}</a></td>
            )
        }
        if(header.key === 'active'){
            if(data.active){
                return(
                    <td key={k}><FiCheck /></td>
                )
            }
            else {
                return(
                    <td key={k}><FiX /></td>
                )
            }
        }
        if(header.key === 'action'){
            return(
                <td key={k}>
                    <button type="button" className="btn btn-link" onClick={()=>this.editConnectInstance(data.id)}><FiEdit /></button>
                    <button type="button" className="btn btn-link"><FiEdit3 /></button>
                </td> 
            )
        }
    }

    render(){
        const { data, headers, modal, selectedData } = this.state
        return(
            <div className="container">
                {modal?<ModalConnectContainer modal={modal} toggle={this.openModal} formValues={formValues} addConnectInstance={this.addConnectInstance} selectedData={selectedData} editInstance={this.editInstance} />:null}
                <div className="row justify-content-end" style={{margin: '30px 0 30px 0'}}>
                    <Button color="primary" onClick={()=>this.openModal()}>Add Connect instance</Button>
                </div>
                <div className="row justify-content-md-center">
                    <Table headers={headers} data={data} renderTable={this.renderTable} />                    
                </div>
            </div>
        )
    }
}

export default ConnectContainer;