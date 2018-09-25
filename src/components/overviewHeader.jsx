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
    Button, ButtonGroup, InputGroup, InputGroupAddon, Input, Dropdown,
    FormGroup, Label
} from 'reactstrap';
import Typeahead from './typeahead'

import { FaSearch } from 'react-icons/fa';

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


export default class HexagonsHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            dropdownOpen: false,
            rSelected: 0,
            groupBy: undefined,
            selectedUserNames: [],
        };

        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeUserNames = this.handleChangeUserNames.bind(this);
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
        if (name == 'groupBy') {
            this.setState({ [name]: value.split("Group by ")[1] }, () => { console.log(this.state) })
        }
    }

    updateUsernames(usernames) {
        const { fetchWorkspaces, searchFilter } = this.props;
        console.log('ENTRAA')

        this.props.updateUserNames(usernames)
        console.log('SEARCHFILTER', searchFilter)
        fetchWorkspaces(3, 0, 126, 'id', searchFilter)


    }

    handleChangeUserNames(userNames) {
        this.setState({ selectedUserNames: userNames })
    }


    render() {
        const { rSelected, groupBy, isOpen, selectedUserNames } = this.state;
        const { tags, userNames, updateUserNames } = this.props;
        console.log(userNames)
        const margin = (!isOpen) ? null : Styles.marginVertical;
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav style={{ ...margin, ...Styles.marginHorizontal }} navbar>
                            {<InputGroup >
                                <Typeahead onChange={this.handleChangeUserNames} options={userNames} multiple={true} placeholder='Type the usernames' />
                                <InputGroupAddon addonType="append"><Button onClick={() => this.updateUsernames(selectedUserNames)}><FaSearch /></Button></InputGroupAddon>
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
                            (groupBy != undefined) ? (<Nav style={{ ...margin, ...Styles.marginHorizontal }}>
                                <Input type="select" name="select" id="exampleSelect">
                                    {
                                        groupBy == 'tags' ?
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
                            <NavItem>
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
