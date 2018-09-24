import React, { Component } from 'react';
import { Form, Input, Label, FormGroup, ModalFooter, Button  } from 'reactstrap';

class FormConnect extends Component{
    render(){
        const { handleSubmit, formValues, handleChange, selectedData, handleChangeCheckbox, toggle } = this.props
        return(
            <div>
                <Form onSubmit={handleSubmit}>
                         {formValues.map((value, key) =>(
                            <FormGroup key={key}>
                                {value === 'active'?
                                <div>
                                    <Input
                                        type="checkbox" 
                                        name={value} 
                                        id={value} 
                                        placeholder={value} 
                                        onChange={handleChangeCheckbox}
                                        style={{marginLeft: '3.75rem'}}
                                        defaultChecked={selectedData[value]}
                                    />
                                    <Label for={value}>{value.toUpperCase()}</Label>
                                </div>:
                                <div>
                                    <Label for={value}>{value.toUpperCase()}</Label>
                                    <Input
                                        type="text" 
                                        name={value} 
                                        id={value} 
                                        placeholder={value} 
                                        onChange={handleChange}
                                        defaultValue={selectedData[value]}
                                    />
                                </div>
                                } 
                            </FormGroup>
                        ))}
                </Form>
            </div>
        )
    }
}

export default FormConnect;
