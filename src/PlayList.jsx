import React, { Component } from 'react';
import { Col, Tabs, Tab, Container, Row, Button, Modal, ButtonToolbar } from 'react-bootstrap';
import Autosuggest from "react-autosuggest";


function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, songs) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return songs.filter(song => regex.test(song.title));
}

function getSuggestionValue(suggestion) {
    return '';
}

function renderSuggestion(suggestion) {
    return (
        <span></span>
    );
}

class PlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playList: [],
            showPlayList: false,
            albums: [],
            songs: [],
            value: '',
            suggestions: [],
            showAddSongModal: false,
            playListName: 'Please Select PlayList',
        }
    }

    handleModal = () => {
        this.setState({ showAddSongModal: true })
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(songs => {
                this.setState({
                    songs: songs,
                    suggestions: songs,
                })
            }
            );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value != this.state.value) {
            if (this.state.value == '') {
                this.setState({
                    suggestions: this.state.songs
                });
            }
        }
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsClearRequested = () => {

    };

    onSuggestionsFetchRequested = ({ value }) => {
        if (value.length != 0)
            this.setState({
                suggestions: getSuggestions(value, this.state.songs)
            });
    };

    createPlayList = () => {
        const length = this.state.playList.length + 1
        this.setState(previousState => ({
            playList: [...previousState.playList, `PlayList${length}`]
        }));
    }

    playListItem = (e) => {
        const playListName = e.target.innerHTML
        this.setState({
            showPlayList: true,
            playListName: playListName
        })
    }



    shuffleSongs = (e) => {
        if (this.state[this.state.playListName + '_name']) {
            const shuffledValue = this.state[this.state.playListName + '_name'].sort(() => Math.random() - 0.5)
            this.setState({
                [this.state.playListName + '_name']: shuffledValue
            })
        }
    }

    addSongToPlayList = (e) => {
        const filteredSongs = this.state.songs.filter(i => i.id == e.target.id)
        this.setState({
            [this.state.playListName + 'modifyItem' + e.target.id]: false
        })
        if (this.state[this.state.playListName + '_name'])
            this.setState(previousState => ({
                [this.state.playListName + '_name']: [...previousState[this.state.playListName + '_name'], filteredSongs]
            }));
        else
            this.setState({
                [this.state.playListName + '_name']: [filteredSongs]
            })
    }

    deleteSongToPlayList = (e) => {
        if (this.state[this.state.playListName + '_name'].length != 0) {
            const deletedSongs = this.state[this.state.playListName + '_name'].filter(i => i[0].id != e.target.id)
            this.setState({
                [this.state.playListName + '_name']: deletedSongs,
                [this.state.playListName + 'modifyItem' + e.target.id]: true
            })
        }
    }

    render() {

        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Enter Song Name",
            value,
            onChange: this.onChange
        };

        let modalClose = () => this.setState({ showAddSongModal: false })

        return (
            <div className="App">
                <Container>
                    {

                        <>
                            {
                                this.state.showPlayList == false ?
                                    <>
                                        <div className='playlists'>
                                            {this.state.playList.length != 0 ?
                                                this.state.playList.map((item, index) => {
                                                    return (
                                                        <div className='p-2' key={`key_${index}`}>
                                                            <Button variant={this.state.playListName == item ? 'success' : 'secondary'} onClick={(e) => this.playListItem(e)}>{item}</Button>
                                                        </div>
                                                    )
                                                }) : <p className='mt-3 pl-3'>No PlayList</p>
                                            }
                                            <div className='p-2' style={{ marginLeft: 'auto' }}>
                                                <Button onClick={this.createPlayList}>
                                                    Create PlayList
                                            </Button>
                                            </div>
                                        </div>
                                        {
                                            this.state.playList.length != 0 ? <h4><b>{this.state.playListName}</b></h4> : ''
                                        }
                                    </>
                                    :
                                    this.state.showAddSongModal == true ?
                                        <div>
                                            <Modal
                                                show={this.state.showAddSongModal}
                                                onHide={modalClose}
                                                size="md"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered
                                                className="modal-vs"
                                            >
                                                <div className="allsongs">
                                                    <Container>
                                                        <Autosuggest
                                                            suggestions={suggestions}
                                                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                            getSuggestionValue={getSuggestionValue}
                                                            renderSuggestion={renderSuggestion}
                                                            inputProps={inputProps}
                                                        />
                                                        <>
                                                            {
                                                                this.state.suggestions.length != 0 ?
                                                                    this.state.suggestions.map((item, index) => {
                                                                        return (
                                                                            <div className='songlisting p-2' key={`songlisting${index}`}>
                                                                                <div style={{ display: "flex" }} >
                                                                                    <p className="text-left">{item.id}. {item.title}</p>
                                                                                    {
                                                                                        this.state[this.state.playListName + 'modifyItem' + item.id] == false ?
                                                                                            <Button id={item.id} variant="danger" className='deletesong' style={{ marginLeft: 'auto' }} onClick={(e) => { this.deleteSongToPlayList(e) }}><i class="fa fa-trash" aria-hidden="true"></i></Button> :
                                                                                            <Button id={item.id} className='addsong' onClick={(e) => { this.addSongToPlayList(e) }}><i class="fa fa-plus" aria-hidden="true"></i></Button>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                    : <p>No matches Found</p>
                                                            }
                                                        </>
                                                    </Container>
                                                </div>
                                                <Modal.Footer className="text-center">
                                                    <div className="m-auto">
                                                        <Button variant="light" onClick={modalClose}><i class="fa fa-times-circle" aria-hidden="true"></i></Button>
                                                    </div>
                                                </Modal.Footer>
                                            </Modal>
                                        </div> :
                                        <div>
                                            <div className='playlists'>
                                                {this.state.playList.length != 0 ?
                                                    this.state.playList.map((item, index) => {
                                                        return (
                                                            <div className='p-2' key={`key_${index}`}>
                                                                <Button variant={this.state.playListName == item ? 'success' : 'secondary'} onClick={(e) => this.playListItem(e)}>{item}</Button>
                                                            </div>
                                                        )
                                                    }) : ''
                                                }
                                                <div className='p-2' style={{ marginLeft: 'auto' }}>
                                                    <Button onClick={this.createPlayList}>
                                                        Create PlayList
                                                    </Button>
                                                </div>
                                            </div>
                                            <h4><b>{this.state.playListName}</b></h4>
                                            <Button style={{ float: 'right', margin: '0 20px' }} onClick={this.shuffleSongs}>
                                                Shuffle
                                            </Button>
                                            <Button style={{ float: 'right', margin: '0 20px' }}
                                                onClick={() => this.handleModal()}
                                            >
                                                Add
                                            </Button>
                                            <div className='pt-5'>
                                                {
                                                    this.state[this.state.playListName + '_name'] && this.state[this.state.playListName + '_name'].length != 0 ?
                                                        this.state[this.state.playListName + '_name'].map((item, index) => {
                                                            return (
                                                                <>
                                                                    {item[0] ?
                                                                        <div className='songlisting p-2' key={`songlisting${index}`} style={{ display: 'flex' }}>
                                                                            <a className="pl-1 pt-0" href={item[0].url}>
                                                                                <i class="fa fa-play mt-2 mr-4" style={{color: '#ba6247'}} aria-hidden="true"></i>
                                                                                <p className="text-left mt-1 mb-0">{item[0].id}. {item[0].title}</p>
                                                                            </a>
                                                                            <p className='mt-1 mb-0' style={{ marginLeft: 'auto' }}>{item[0].albumId} Mins</p>
                                                                            <Button id={item[0].id} variant="danger" className='deletesong' onClick={(e) => { this.deleteSongToPlayList(e) }}><i class="fa fa-trash" aria-hidden="true"></i></Button>
                                                                        </div> : ''
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                        : <p>No Songs</p>
                                                }
                                            </div>
                                        </div>


                            }
                        </>

                    }
                </Container>
            </div>
        );
    }
}
export default PlayList;
