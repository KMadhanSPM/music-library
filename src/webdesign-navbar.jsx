import React, { Component } from 'react';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem, Container, Row, Form } from 'react-bootstrap';
import Select from "react-select";


class WebDesignNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {


        return (
            <div className="workspace-navbar text-left">

                <Navbar className="bg-light justify-content-between">
                    <Form inline>
                        <h5 className="pt-3">Web Desingn <i class="fa fa-star" aria-hidden="true"></i> <span>Add Board Description</span></h5>

                    </Form>
                    <Form inline className='nav-icons'>
                        <Nav.Link href="#deets"><i class="fa fa-address-book" aria-hidden="true"></i> / 0
                        </Nav.Link>
                        <Nav.Link href="#deets"><i class="fa fa-address-book" aria-hidden="true"></i> / 1
                        </Nav.Link>
                        <Nav.Link href="#deets"><i class="fa fa-address-book" aria-hidden="true"></i> Start Zoom Call
                        </Nav.Link>
                        <Nav.Link href="#deets"><i class="fa fa-address-book" aria-hidden="true"></i> Activities
                        </Nav.Link>
                        <Nav.Link href="#deets" style={{ border: 'none' }}><i class="fa fa-ellipsis-h" aria-hidden="true"></i> </Nav.Link>
                    </Form>
                </Navbar>

                <Navbar className="bg-light justify-content-between">
                    <Form inline>
                        <i class="fa fa-clone" aria-hidden="true"></i>
                        <Select
                            styles={{
                                indicatorSeparator: () => null,
                                control: (provided, state) => ({
                                    ...provided,
                                    minHeight: "10px",
                                    border: "none",
                                    cursor: "pointer",
                                    paddingLeft: 0,
                                    width: "150px",
                                    background: "transparent"
                                })
                            }}
                            placeholder="Main Table"
                        />
                    </Form>
                    <Form inline>
                        <Select
                            className='mr-4'
                            styles={{
                                indicatorSeparator: () => null,
                                control: (provided, state) => ({
                                    ...provided,
                                    minHeight: "10px",
                                    border: "none",
                                    cursor: "pointer",
                                    paddingLeft: 0,
                                    width: "135px",
                                    border: '1px solid #d6d6d6',
                                    borderRadius: '21px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                })
                            }}
                            placeholder="New Items"
                            theme={theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    neutral50: '#FFF',
                                },
                            })}
                        />
                        <div className="form-group has-feedback mr-4">
                            <input placeholder="Search / Filter Brand" type="text" className="form-control search" value="" />
                        </div>

                        <Nav.Link href="#deets"><i class="fa fa-address-book" aria-hidden="true"></i>
                        </Nav.Link>
                        <Nav.Link href="#deets"><i class="fa fa-filter" aria-hidden="true"></i>
                        </Nav.Link>
                    </Form>
                </Navbar>
            </div>
        );
    }
}

export default WebDesignNavbar;
