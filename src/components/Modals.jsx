import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import DateRangePicker from './DateRangePicker'

//isOpen (BOOLEAN) = whether the modal is/isnt shown
//title (STRING)
//toggle (FUNCTION)
//className (STRING)
//buttons (OBJECT) > example: {color: ‘Primary’, onClick: () => console.log(‘clic’), text: ‘texto del boton’}

const ModalHOC = BaseComponent => (props) => {
   const { isOpen, toggle, className, buttons, title } = props;
   return (
       <Modal isOpen={isOpen} toggle={toggle} className={className}>
           {title ? <ModalHeader toggle={toggle}>{title}</ModalHeader> : null}
           <BaseComponent {...props} />
           {(buttons) ?
               <ModalFooter>
                   {buttons.map((button, i) =>
                       <Button key={i} color={button.color} onClick={button.onClick}>{button.text}</Button>
                   )}
               </ModalFooter>
               : null}
       </Modal>)
}

export default ModalHOC;


// import React, { Component } from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Label, FormGroup } from 'reactstrap';

// class Modals extends Component {
//     render(){
//         const {modal, toggle, formValues, handleChange, handleSubmit, handleChangeCheckbox, selectedData, state} = this.props
//         return(
//             <Modal isOpen={modal} toggle={toggle} className={this.props.className}>
//                 <ModalHeader toggle={this.toggle}>{state.header}</ModalHeader>
//                 <Form onSubmit={handleSubmit}>
//                     <ModalBody>
//                         {formValues.map((value, key) =>(
//                             <FormGroup key={key}>
//                                 {value === 'active'?
//                                 <div>
//                                     <Input
//                                         type="checkbox" 
//                                         name={value} 
//                                         id={value} 
//                                         placeholder={value} 
//                                         onChange={handleChangeCheckbox}
//                                         style={{marginLeft: '3.75rem'}}
//                                         defaultChecked={selectedData[value]}
//                                     />
//                                     <Label for={value}>{value.toUpperCase()}</Label>
//                                 </div>:
//                                 <div>
//                                     <Label for={value}>{value.toUpperCase()}</Label>
//                                     <Input
//                                         type="text" 
//                                         name={value} 
//                                         id={value} 
//                                         placeholder={value} 
//                                         onChange={handleChange}
//                                         defaultValue={selectedData[value]}
//                                     />
//                                 </div>
//                                 } 
//                             </FormGroup>
//                         ))}
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button color="primary" type="submit" >Save</Button>
//                         <Button color="secondary" onClick={toggle}>Cancel</Button>
//                     </ModalFooter>
//                 </Form>
//         </Modal>
//         )
//     }
// }

// export default Modals;