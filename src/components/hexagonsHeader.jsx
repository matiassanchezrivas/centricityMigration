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

import { FaSearch } from 'react-icons/fa';

const orderby = ['', 'tags', 'region', 'directory', 'account']
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
            orderBy: undefined,
        };

        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        if (name == 'orderBy') {
            this.setState({ [name]: value.split("Order by ")[1] }, () => { console.log(this.state) })
        }
    }


    render() {
        const { rSelected, orderBy, isOpen } = this.state;
        const margin = (!isOpen) ? null : Styles.marginVertical;
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarToggler onClick={this.toggle} />

                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav style={{ ...margin, ...Styles.marginHorizontal }} navbar>
                            <InputGroup>
                                <Input />
                                <InputGroupAddon addonType="append"><Button><FaSearch /></Button></InputGroupAddon>
                            </InputGroup>
                        </Nav>

                        <Nav style={{ ...margin, ...Styles.marginHorizontal }}>
                            <Input type="select" name="orderBy" onChange={(event) => this.handleChange("orderBy", event.target.value)}>
                                {orderby.map((report, i) =>
                                    <option key={i}>Order by {report}</option>
                                )}
                            </Input>
                        </Nav>

                        {
                            (orderBy != undefined) ? (<Nav style={{ ...margin, ...Styles.marginHorizontal }}>
                                <Input type="select" name="select" id="exampleSelect">
                                    {orderby.map((report, i) =>
                                        <option key={i}>Muestra</option>
                                    )}
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

            // <div className={null}>
            //     <div class="hexagons__header">
            //         <div class="actions">
            //             <input class="input ng-pristine ng-valid has-visited ng-touched" style={{ height: 'auto !important', width: '100% !important' }}
            //                 placeholder="Type the usernames">
            //             </input>
            //             <button class="primary-bglight-button primary-bglight-button2" style={{ marginRight: '2vh', padding: '0 30px' }} >
            //                 {/* ng-click="filterByUsername()"> */}
            //                 S
            //                 <span class="glyphicon glyphicon-search"></span>
            //             </button>

            //             <select class="form-control select-workspaces ng-pristine ng-valid has-visited ng-touched">
            //                 {orderBy.map((opt) => <option value={opt}>{opt}</option>)}
            //             </select>
            //             <div class="btn-bar">
            //                 {views.map((view) => <div class="btn-bar__item">{view} view</div>)}
            //                 {/* <div class="btn-bar__item" ng-class="{'btn-bar__item--active': settings.tab == 'LIST'}" ng-click="changeTab('LIST')">List view</div> */}
            //             </div>
            //             <button class="primary-bglight-button primary-bglight-button2 button--arrow right" ng-if="(isAuthorized([roles.CH_USER_ADMIN,  roles.CH_SYSTEM_ADMIN]))"
            //                 data-animation="am-flip-x" bs-dropdown="actions" data-placement="bottom-right" translate>Actions</button>
            //             <button class="primary-bglight-button primary-bglight-button2" ng-click="openFilters()">Filters</button>
            //             <button class="primary-bglight-button primary-bglight-button2" ng-if="(isAuthorized([roles.CH_USER_ADMIN, roles.CH_SYSTEM_ADMIN]))"
            //                 ng-click="launchWorkspaces()" tanslate>Launch Workspaces</button>
            //         </div>
            //     </div>
            // </div>
        );
    }
}
