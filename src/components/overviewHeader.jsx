import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button, ButtonGroup, InputGroup, InputGroupAddon, Input,
} from 'reactstrap';
import Typeahead from './typeahead'

import { FaSearch } from 'react-icons/fa';
import Form from './forms'
import ModalHOC from './modal'

const groupby = ['', 'tags', 'region', 'directory', 'account']
const views = ['Status', 'List', 'Grid']

var Styles = {
    marginHorizontal: {
        marginRight: '5px',
        marginLeft: '5px'
    },
    marginVertical: {
        marginTop: '5px',
        marginBottom: '5px',
    }
}

const ModalForm = ModalHOC(Form);

const selectedInit = {
    userNames: [],
    machineNames: [],
    status: [], //"AVAILABLE"
    tags: [], //"Name:6"
    unhealthy: undefined,
    liquidwareMetric: "up_time_percent",
    liquidwareOperator: "equals",
    liquidwareValue: "",
    userConnected: 'all'
}

export default class HexagonsHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            dropdownOpen: false,
            rSelected: 0,
            groupBy: undefined,
            selectedUserNames: [],
            modalFormOpen: true,
            selectedOnFilter: selectedInit
        };

        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.toggleModal = this.toggleModal.bind(this)
        this.resetFilter = this.resetFilter.bind(this);
    }

    onRadioBtnClick(rSelected) {
        this.setState({ rSelected });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    toggleDropdown() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    handleChange(name, value) {
        if (name === 'groupBy') {
            this.setState({ [name]: value.split("Group by ")[1] }, () => { console.log(this.state) })
        }
    }

    updateUsernames(usernames) {
        this.props.updateUserNames(usernames)
    }

    handleChangeFilter(tag, value) {
        console.log(tag, value)
        this.setState({ selectedOnFilter: Object.assign({}, this.state.selectedOnFilter, { [tag]: value }) }, () => {
            console.log(this.state)
        })
    }

    componentWillReceiveProps(nextProps) {
        const { fetchWorkspaces } = this.props;
        if (this.props.searchFilter !== nextProps.searchFilter) {
            fetchWorkspaces(3, 0, 126, 'id', nextProps.searchFilter);
        }
    }

    toggleModal() {
        this.setState({
            modalFormOpen: !this.state.modalFormOpen
        });
    }

    resetFilter() {
        this.setState({ selectedOnFilter: selectedInit })
    }


    render() {
        const { rSelected, groupBy, isOpen, selectedOnFilter, modalFormOpen } = this.state;
        const { tags, userNames, machineNames, bundles } = this.props;
        const margin = (!isOpen) ? null : Styles.marginVertical;
        return (
            <div>
                <ModalForm
                    isOpen={modalFormOpen}
                    toggle={this.toggleModal}
                    title="Filters"
                    buttons={[{
                        color: "primary",
                        onClick: this.toggleModal,
                        text: "Apply"
                    }, {
                        color: "info",
                        onClick: this.resetFilter,
                        text: "Reset"
                    }, {
                        color: "secondary",
                        onClick: this.toggleModal,
                        text: "Cancel"
                    }]}
                    machineNames={machineNames}
                    userNames={userNames}
                    selectedOnFilter={selectedOnFilter}
                    onChange={this.handleChangeFilter}
                    bundles={bundles}
                    tags={tags}
                />
                <Navbar color="light" light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav style={{ ...margin, ...Styles.marginHorizontal }} navbar>
                            {<InputGroup >
                                <Typeahead selected={selectedOnFilter.userNames} onChange={(value) => this.handleChangeFilter("userNames", value)} options={userNames} multiple={true} placeholder='Type the usernames' />
                                <InputGroupAddon addonType="append"><Button onClick={() => this.updateUsernames(selectedOnFilter.userNames)}><FaSearch /></Button></InputGroupAddon>
                            </InputGroup>}
                        </Nav>

                        <Nav style={{ ...margin, ...Styles.marginHorizontal }}>
                            <Input type="select" name="groupBy" onChange={(event) => this.handleChange("groupBy", event.target.value)}>
                                {groupby.map((report, i) =>
                                    <option key={i}>Group by {report}</option>
                                )}
                            </Input>
                        </Nav>
                        {
                            (groupBy !== undefined) ? (<Nav style={{ ...margin, ...Styles.marginHorizontal }}>
                                <Input type="select" name="select" id="exampleSelect">
                                    {
                                        groupBy === 'tags' ?
                                            tags.map((tag, i) =>
                                                < option key={i} >{tag}</option>
                                            ) :
                                            groupby.map((report, i) =>
                                                <option key={i}>Muestra</option>
                                            )
                                    }
                                </Input>

                            </Nav>) : null
                        }


                        <ButtonGroup style={{ ...margin, ...Styles.marginHorizontal }}>
                            {views.map((view, i) => <Button key={i} onClick={() => this.onRadioBtnClick(i)} active={rSelected === i} >{view}</Button>)}
                        </ButtonGroup>


                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Actions
                    </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Sync Directory
                      </DropdownItem>
                                    <DropdownItem>
                                        Schedule
                      </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem onClick={this.toggleModal}>
                                <NavLink href="#">Filters</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Launch Workspaces</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>

            </div>
        );
    }
}
