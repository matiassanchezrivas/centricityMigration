import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import DateRangePicker from './DateRangePicker'

class Tab extends Component {

    render() {
        const { isOpen, toggle, className, title, buttons, range, handleSelectRange } = this.props;
        //IsOpen boolean
        //toggle function
        //classname
        console.log("buttons", buttons);

        return (
            <Modal isOpen={isOpen} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <DateRangePicker
                    range={range}
                    handleSelectRange={handleSelectRange}
                />
                <ModalFooter>
                    {(buttons) ?
                        buttons.map((button, i) =>
                            <Button key={i} color={button.color} onClick={button.onClick}>{button.text}</Button>
                        )
                        : null}
                </ModalFooter>
            </Modal>
        )
    }
}

export default Tab;
