import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import DateRangePicker from './DateRangePicker'

//isOpen (BOOLEAN) = whether the modal is/isnt be shown
//title (STRING)
//toggle (FUNCTION) 
//className (OBJECT)
//buttons (OBJECT) > example: {color: 'Primary', onClick: () => console.log('clic'), text: 'texto del boton'}



const ModalHOC = BaseComponent => (props) => {
    const { isOpen, toggle, className, buttons, title } = props;
    return (
        <Modal isOpen={isOpen} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
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
