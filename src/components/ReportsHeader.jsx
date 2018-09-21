import React from 'react';
import DateRangePickerContainer from './DateRangePickerContainer'

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
    Dropdown,
} from 'reactstrap';


var reports = ['Last User Connection', 'AVG Performance', 'Events', 'Events by workspaces', 'Used time by hours', 'Used time by days', 'Machine vs Users']



export default class HexagonsHeader extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.state = {
            isOpen: false,
            dropdownOpen: false
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
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                            <DropdownToggle caret>
                                Select a Report
        </DropdownToggle>
                            <DropdownMenu>
                                {reports.map((report, i) => <DropdownItem key={i}>{report}</DropdownItem>

                                )}

                            </DropdownMenu>
                        </Dropdown>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#">View</NavLink>
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
                <DateRangePickerContainer />

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
