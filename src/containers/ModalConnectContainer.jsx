import React from 'react';
import Form from '../components/Form';
import ModalHOC from '../components/modal';

const ModalConnect = ModalHOC(Form)

class ModalConnectContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            alias:'',
            url:'',
            active: false,
            action: true,
            arn:'',
            instanceId:'',
            region:'',
            header:'Add Connect Instance'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        
    }

    componentDidMount(){
        if(this.props.selectedData.id){
            this.setState(this.props.selectedData)
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})      
    }

    handleSubmit(event) {
        if(this.props.selectedData.id){
            this.props.editInstance(this.state)
        }
        else{
            this.props.addConnectInstance(this.state)
        }
        this.props.toggle()
        event.preventDefault();
        
    }

    handleChangeCheckbox(){
        this.setState({active: !this.state.active})
    }
    
    render() {
    const {modal, toggle, formValues, selectedData } = this.props
    return (
      <div>
            {/* <Modals 
                selectedData={selectedData}
                modal={modal} 
                toggle={toggle} 
                formValues={formValues} 
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleChangeCheckbox = {this.handleChangeCheckbox}
                state={this.state}   
                             
            /> */}
            <ModalConnect 
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleChangeCheckbox = {this.handleChangeCheckbox}
                state={this.state}
                title={"Add Connect Instance"} 
                isOpen={modal} 
                toggle={this.toggleModal} 
                formValues={formValues} 
                addConnectInstance={this.addConnectInstance} 
                selectedData={selectedData} 
                editInstance={this.editInstance}
                buttons={[{
                            color: "primary",
                            onClick: this.toggleModal,
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
    );
  }
}

export default ModalConnectContainer;