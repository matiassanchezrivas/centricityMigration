import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,

    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Input, InputGroup, InputGroupAddon, Button
} from 'reactstrap';

import { FaCalendar } from 'react-icons/fa';
import Modal from './modal'


var reports = ['Last User Connection', 'AVG Performance', 'Events', 'Events by workspaces', 'Used time by hours', 'Used time by days', 'Machine vs Users']

export default class HexagonsHeader extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            isOpen: false,
            dropdownOpen: false,
            dateRangeModalOpen: false,
        };

        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleModal() {
        this.setState({
            dateRangeModalOpen: !this.state.dateRangeModalOpen
        });
    }

    toggleDropdown() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const { range, handleSelectRange } = this.props;
        const { dateRangeModalOpen } = this.state;

        return (
            <div>
                <Modal
                    isOpen={dateRangeModalOpen}
                    toggle={this.toggleModal}
                    title="Select date"
                    buttons={[{
                        color: "secondary",
                        onClick: this.toggleModal,
                        text: "cancel"
                    }]}
                    range={range}
                    handleSelectRange={handleSelectRange}
                />
                <Navbar color="light" light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                            <DropdownToggle caret>
                                Select a Report
                            </DropdownToggle>
                            <DropdownMenu>
                                {reports.map((report, i) => <DropdownItem key={i}>{report}</DropdownItem>)}
                            </DropdownMenu>
                        </Dropdown>
                        <Nav className="ml-auto" navbar>


                            <NavItem onClick={this.toggleModal}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend"><Button><FaCalendar /></Button></InputGroupAddon>
                                    <Input readOnly value={range.startDate.toISOString().slice(0, 10)} />
                                </InputGroup>
                            </NavItem>
                            <NavItem onClick={this.toggleModal}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend"><Button><FaCalendar /></Button></InputGroupAddon>
                                    <Input readOnly value={range.endDate.toISOString().slice(0, 10)} />
                                </InputGroup>
                            </NavItem>


                            <NavItem>
                                <Button>View</Button>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Exports
                    </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        PDF
                      </DropdownItem>
                                    <DropdownItem>
                                        Excel
                      </DropdownItem>
                                    <DropdownItem>
                                        CSV
                      </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                        </Nav>
                    </Collapse>
                </Navbar>

            </div >
        );
    }
}
