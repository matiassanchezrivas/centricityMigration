import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from '../components/tabla';

import { Button } from 'reactstrap';
import { FiX,FiCheck, FiEdit, FiEdit3 } from 'react-icons/fi'
import axios from 'axios';
import Form from '../components/Form';
import ModalHOC from '../components/modal';

const ModalConnect = ModalHOC(Form)

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
            changeData: {
                active: false
            },
            update: false,

        }
        this.toggleModal = this.toggleModal.bind(this);
        this.addConnectInstance = this.addConnectInstance.bind(this);
        this.editConnectInstance = this.editConnectInstance.bind(this);
        this.editInstance = this.editInstance.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    fetchData() {
        //ver que el 3 es un :id
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
        if(prevState.update !== this.state.update){
           this.fetchData();
        }
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        })
    }

    editConnectInstance(id) {
        this.toggleModal()
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
        console.log('INSTANCE',instance)
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

    handleSubmit(event){
        console.log('handleSubmit')
        this.state.selectedData.id?this.editInstance(this.state.selectedData):
        this.addConnectInstance(this.state.changeData)
        
        this.setState({
                changeData: {},
                selectedData: {}
            })
            event.preventDefault();
            this.toggleModal()
        
    }
    
    handleChange(e){
        if(this.state.selectedData.id){
            var partialState = {... this.state.selectedData};
            partialState[e.target.name] = e.target.value;
            this.setState({
                selectedData: partialState
            });
            
        }
        else{
            var partialState = {... this.state.changeData};
            partialState[e.target.name] = e.target.value;
            this.setState({
                changeData: partialState
            });
        }
    }

    handleChangeCheckbox(e){
        if(this.state.selectedData.id){
            var partialState = {... this.state.selectedData};
            partialState.active = !this.state.selectedData.active;
            this.setState({
                selectedData: partialState
            });
            
        }
        else{
            var partialState = {... this.state.changeData};
            partialState[e.target.name] = true;
            this.setState({
                changeData: partialState
            });
        }
    }


    renderRow(data, header, k) {
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
                <div className="row">
                <ModalConnect 
                    title={"Add Connect Instance"} 
                    isOpen={modal} 
                    toggle={this.toggleModal} 
                    formValues={formValues} 
                    addConnectInstance={this.addConnectInstance} 
                    selectedData={selectedData} 
                    editInstance={this.editInstance}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    handleChangeCheckbox={this.handleChangeCheckbox}
                    buttons={[{
                            color: "primary",
                            onClick: this.handleSubmit,
                            text: "Save",
                            type: "submit"
                        },
                        {
                            color: "secondary",
                            onClick: this.toggleModal,
                            text: "Cancel",
                            type: "submit"
                        }
                
                    ]} 
                />
                </div>
                <div className="row justify-content-end" style={{margin: '30px 0 30px 0'}}>
                    <Button color="primary" onClick={()=>{
                        this.setState({
                            selectedData: {}
                        })
                        this.toggleModal()
                    }
                    }>Add Connect instance</Button>
                </div>
                <div className="row justify-content-md-center">
                    <Table headers={headers} data={data} renderRow={this.renderRow} />                    
                </div>
            </div>
        )
    }
}

export default ConnectContainer;