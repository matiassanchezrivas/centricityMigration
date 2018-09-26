import React from 'react';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';


//isOpen (BOOLEAN) = whether the modal is/isnt shown
//title (STRING)
//toggle (FUNCTION) 
//className (STRING)
//buttons (OBJECT) > example: {color: 'Primary', onClick: () => console.log('clic'), text: 'texto del boton'}

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
