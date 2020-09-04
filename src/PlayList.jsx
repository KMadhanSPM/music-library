import React, { Component } from 'react';
import { Col, Tabs, Tab, Container, Row, Button, Modal, ButtonToolbar } from 'react-bootstrap';
import Autosuggest from "react-autosuggest";

/**Matching Values based on Input Search*/
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
/**Getting the values after comparision*/
function getSuggestions(value, songs) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return songs.filter(song => regex.test(song.title));
}
/**AutoSuggest Required getSuggestionValue and renderSuggestion field*/
function SuggestionList(suggestion) {
    return '';
}

class PlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playList: [],   //PlayList created
            showPlayList: false,
            songs: [], //Songs from API List
            value: '', //Value typed in Search Field
            suggestions: [], //Suggessted Songs based on Search Input
            showAddSongModal: false, //Modal for Add and Delete Songs
            playListName: 'Please Select PlayList', // Selected PlayList
        }
    }
    /**Modal for Handling Add and Delete Songs from List*/
    handleModal = () => {
        this.setState({ showAddSongModal: true })
    }
    componentDidMount() {
        /**Fetching Songs from API*/
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
        /**Setting Default Value as All Songs to Show*/
        if (prevState.value != this.state.value) {
            if (this.state.value == '') {
                this.setState({
                    suggestions: this.state.songs
                });
            }
        }
    }
    /** Setting input Value to State, when user typed*/
    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };
    /** Mandatory field for AutoSuggest*/
    onSuggestionsClearRequested = () => {
    };
    /** Fetch Data based on Input State*/
    onSuggestionsFetchRequested = ({ value }) => {
        if (value.length != 0)
            this.setState({
                suggestions: getSuggestions(value, this.state.songs)
            });
    };
    /** Create playlist*/
    createPlayList = () => {
        const length = this.state.playList.length + 1
        this.setState(previousState => ({
            playList: [...previousState.playList, `PlayList${length}`]
        }));
    }
    /** PlayList Items Created */
    playListItem = (e) => {
        const playListName = e.target.innerHTML
        this.setState({
            showPlayList: true,
            playListName: playListName
        })
    }
    /** Shuffling songs*/
    shuffleSongs = (e) => {
        if (this.state[this.state.playListName + '_name']) {
            const shuffledValue = this.state[this.state.playListName + '_name'].sort(() => Math.random() - 0.5)
            this.setState({
                [this.state.playListName + '_name']: shuffledValue
            })
        }
    }
    /**Add Songs To PlayList */
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
    /**Delete Songs from PlayList */
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
        /* Input Property for AutoSuggest**/
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
                        this.state.showPlayList == false ?
                            /* To create PlayList and Lists Created Playlist**/
                            <>
                                <div className='playlists'>
                                    {this.state.playList.length != 0 ?
                                        /* Listing Created Playlist**/
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
                                /* Modal for Add and Delete Songs**/
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
                                                getSuggestionValue={SuggestionList}
                                                renderSuggestion={SuggestionList}
                                                inputProps={inputProps}
                                            />
                                            <>
                                                {
                                                    this.state.suggestions.length != 0 ?
                                                        /* Listing Songs for Add and Delete Songs to Playlist**/
                                                        this.state.suggestions.map((item, index) => {
                                                            return (
                                                                <div className='songlisting p-2' key={`songlisting${index}`}>
                                                                    <div style={{ display: "flex" }} >
                                                                        <p className="text-left">{item.id}. {item.title}</p>
                                                                        {
                                                                            /* Adding and Deleting Songs in Playlist**/
                                                                            this.state[this.state.playListName + 'modifyItem' + item.id] == false ?
                                                                                <Button id={item.id} variant="danger" className='deletesong' style={{ marginLeft: 'auto' }} onClick={(e) => { this.deleteSongToPlayList(e) }}><i id={item.id} className="fa fa-trash" aria-hidden="true"></i></Button> :
                                                                                <Button id={item.id} className='addsong' onClick={(e) => { this.addSongToPlayList(e) }}><i id={item.id} className="fa fa-plus" aria-hidden="true"></i></Button>
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
                                            <Button variant="light" onClick={modalClose}><i className="fa fa-times-circle" aria-hidden="true"></i></Button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>
                                :
                                /* Adding and Shuffling Songs to PlayList**/
                                <>
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
                                                /* Playing and Deleting Songs in PlayList**/
                                                this.state[this.state.playListName + '_name'].map((item, index) => {
                                                    return (
                                                        <div key={`songlisting${index}`}>
                                                            {item[0] ?
                                                                <div className='songlisting p-2' style={{ display: 'flex' }}>
                                                                    <a className="pl-1 pt-0" href={item[0].url}>
                                                                        <i className="fa fa-play mt-2 mr-4" style={{ color: '#ba6247' }} aria-hidden="true"></i>
                                                                        <p className="text-left mt-1 mb-0">{item[0].id}. {item[0].title}</p>
                                                                    </a>
                                                                    <p className='mt-1 mb-0' style={{ marginLeft: 'auto' }}>{item[0].albumId} Mins</p>
                                                                    <Button id={item[0].id} variant="danger" className='deletesong' onClick={(e) => { this.deleteSongToPlayList(e) }}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                                                                </div> : ''
                                                            }
                                                        </div>
                                                    )
                                                })
                                                : <p>No Songs</p>
                                        }
                                    </div>
                                </>
                    }
                </Container>
            </div>
        );
    }
}
export default PlayList;
