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
    Button, ButtonGroup, InputGroup, InputGroupAddon, Input, Dropdown
} from 'reactstrap';

import { FaSearch } from 'react-icons/fa';


const orderBy = ['By Tags', 'By Region', 'By Directory', 'By Account']
const views = ['Status', 'List', 'Grid']


export default class HexagonsHeader extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.state = {
            isOpen: false,
            dropdownOpen: true
        };
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

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="xs-4" navbar>
                            <InputGroup>
                                <Input />
                                <InputGroupAddon addonType="append"><Button><FaSearch /></Button></InputGroupAddon>
                            </InputGroup>
                        </Nav>
                        <Nav>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                                <DropdownToggle caret>
                                    Select a Report
        </DropdownToggle>
                                <DropdownMenu>
                                    {orderBy.map((report, i) => <DropdownItem key={i}>{report}</DropdownItem>

                                    )}

                                </DropdownMenu>
                            </Dropdown>
                        </Nav>
                        <Nav className="ml-3" navbar>
                            <ButtonGroup>
                                {views.map((view, i) => <Button key={i}>{view}</Button>)}
                            </ButtonGroup>
                        </Nav>
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
