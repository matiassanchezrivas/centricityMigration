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
import ModalHOC from './modal'
import DateRangePicker from './DateRangePicker'


var reports = ["Select a report", 'Last user connection', 'AVG Performance', 'Events', 'Events by workspaces', 'Used time by hours', 'Used time by days', 'Machine vs Users']
var Styles = {
    marginHorizontal: {
        marginRight: "10px",
    },
    marginVertical: {
        marginTop: "10px",
    }
}

const ModalDateRangePicker = ModalHOC(DateRangePicker);

export default class HexagonsHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            dropdownOpen: false,
            dateRangeModalOpen: false,
            report: undefined
        };

        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(name, value) {
        if (name == 'report') {
            if (value != "Select a report") {
                this.setState({ [name]: value })
            } else {
                this.setState({ [name]: undefined })
            }

        }
    }




    render() {
        const { range, handleSelectRange } = this.props;
        const { dateRangeModalOpen, isOpen } = this.state;
        const margin = (!isOpen) ? null : Styles.marginVertical;

        return (
            <div>
                <ModalDateRangePicker
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
                        <Nav navbar>
                            <NavItem style={{ ...margin, ...Styles.marginHorizontal }}>
                                <Input type="select" name="orderBy" onChange={(event) => this.handleChange("orderBy", event.target.value)}>
                                    {reports.map((report, i) =>
                                        <option key={i}>{report}</option>
                                    )}
                                </Input>
                            </NavItem>

                            <NavItem onClick={this.toggleModal} style={{ ...margin, ...Styles.marginHorizontal }}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend"><Button><FaCalendar /></Button></InputGroupAddon>
                                    <Input readOnly value={range.startDate.toISOString().slice(0, 10)} />
                                </InputGroup>
                            </NavItem>
                            <NavItem onClick={this.toggleModal} style={{ ...margin, ...Styles.marginHorizontal }}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend"><Button><FaCalendar /></Button></InputGroupAddon>
                                    <Input readOnly value={range.endDate.toISOString().slice(0, 10)} />
                                </InputGroup>
                            </NavItem>
                            <NavItem style={{ ...margin, ...Styles.marginHorizontal }}>
                                <Button>View</Button>
                            </NavItem>

                        </Nav>
                        <Nav navbar className="ml-auto">
                            <UncontrolledDropdown nav inNavbar >
                                <DropdownToggle nav caret >
                                    Export
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
