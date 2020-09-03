import React, { Component } from 'react';
import { Col,Tabs,Tab, Container, Row } from 'react-bootstrap';
import AllSongs from './AllSongs';
import PlayList from './PlayList';



class MusicApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="App pt-4">
                <Container>
                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="All songs">
                            <AllSongs />
                        </Tab>
                        <Tab eventKey="profile" title="Playlist">
                            <PlayList />
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }
}
export default MusicApp;
