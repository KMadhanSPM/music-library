import React, { Component } from 'react';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem, Container, Row } from 'react-bootstrap';
import WebDesignNavbar from './webdesign-navbar';
import ItemList from './itemlist';

class WorkSpaceInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {


        return (
            <div className="workspace-info">
                <WebDesignNavbar />
                <ItemList />
            </div>
        );
    }
}

export default WorkSpaceInfo;
