import React, { Component } from 'react';
import { Nav, Tab, NavItem, Row, Col, Form } from 'react-bootstrap';
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";

const CustomToggle = (props) => {
    const decoratedOnClick = useAccordionToggle(props.eventKey);
    return (
        <div className="accordionAlign" onClick={decoratedOnClick}>
            <i className={`fas fa-chevron-down arrowAlign`}
            ></i>
            <i class="fa fa-home" aria-hidden="true"></i>
            <button type="button" className="accordionButton">
                {props.children}
            </button>

            <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </div>
    );
};


const navLinks = [
    { url: 'about-us', name: <i className="fa fa-address-card" aria-hidden="true"></i> },
    { url: 'projects', name: <i className="fa fa-bell" aria-hidden="true"></i> },
    { url: 'services', name: <i className="fa fa-download" aria-hidden="true"></i> },
];

class WorkSpaces extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }


    render() {
        return (
            <div className='workspaces '>
                <p className='ml-3 mt-4'>Workspaces</p>
                <Form inline className="ml-3">
                    <div className="form-group has-feedback mr-4">
                        <i className="fas fa-search fa-fw" />
                        <input placeholder="Filter Boards ..." type="text" className="form-control curved" value="" />
                    </div>
                </Form>

                <div
                    className="mt-4"
                >
                    <CustomToggle eventKey="0" active='true'>
                        Main
                    </CustomToggle>

                    {/* <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <p>The forward violet thus did I chide: Sweet thief, whence didst thou steal thy sweet that smells, If not from my love's breath? The purple pride Which on thy soft cheek for complexion dwells In my love's veins thou hast too grossly dy'd. The lily I condemned for thy hand, And buds of marjoram had stol'n thy hair; The roses fearfully on thorns did stand, One blushing shame, another white despair; A third, nor red nor white, had stol'n of both,</p>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <p>The forward violet thus did I chide: Sweet thief, whence didst thou steal thy sweet that smells, If not from my love's breath? The purple pride Which on thy soft cheek for complexion dwells In my love's veins thou hast too grossly dy'd. The lily I condemned for thy hand, And buds of marjoram had stol'n thy hair; The roses fearfully on thorns did stand, One blushing shame, another white despair; A third, nor red nor white, had stol'n of both,</p>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container> */}

                </div>

                <div className="workspace-nav">
                    <p className='p-4 '>
                        DashBoard
                    </p>
                    <p className='p-4 '>
                        Get the Mobile App
                        <i class="fa fa-play-circle" aria-hidden="true"></i>
                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                    </p>
                </div>


            </div>
        );
    }
}

export default WorkSpaces;