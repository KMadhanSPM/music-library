import React, { Component } from 'react';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';



const navLinks = [
    { url: 'about-us', name: <i className="fa fa-address-card" aria-hidden="true"></i> },
    { url: 'projects', name: <i className="fa fa-bell" aria-hidden="true"></i> },
    { url: 'services', name: <i className="fa fa-download" aria-hidden="true"></i> },
];

class Sidebar extends React.Component {

    render() {
        return (
            <div className="sidebar">
                <div className='menu active'>
                    <ul>

                        <Nav defaultActiveKey="/home" className="flex-column">
                            {navLinks.map(({ url, name }) => (
                                <Nav.Link eventKey={url}>
                                    {name}
                                </Nav.Link>
                            ))}
                        </Nav>

                        <div className="upgrade-btn">
                            <a href='#'><i className="fa fa-assistive-listening-systems" aria-hidden="true"></i>Upgrade</a>
                        </div>

                        <Nav defaultActiveKey="/home" className="flex-column bottom-nav">
                            {navLinks.map(({ url, name }) => (
                                <Nav.Link eventKey={url}>
                                    {name}
                                </Nav.Link>
                            ))}
                        </Nav>

                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;