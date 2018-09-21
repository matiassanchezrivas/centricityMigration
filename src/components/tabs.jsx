import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class Tab extends Component {
    render() {
        const { tabItems, toggle, activeTab } = this.props;
        //tabItems STRING ARRAY
        //toggle FUNCTION
        //activeTab NUMBER
        return (
            <Nav tabs>
                {tabItems.map((menuItem, i) => {
                    return (
                        <NavItem key={i}>
                            <NavLink
                                className={classnames({ active: activeTab === i })}
                                onClick={() => { toggle(i); }}
                            >
                                {menuItem}
                            </NavLink>
                        </NavItem>
                    )
                })}
            </Nav>
        )
    }
}

export default Tab;
