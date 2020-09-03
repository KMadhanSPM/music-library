import React, { Component } from 'react';
import { Col, Tabs, Tab, Container, Row } from 'react-bootstrap';
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


class AllSongs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            songs: [],
            value: '',
            suggestions: []
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(songs => {
                this.setState({
                    songs: songs,
                    suggestions: songs
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


    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Enter Song Name",
            value,
            onChange: this.onChange
        };
        return (
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
                                        <div className='songlisting' key={`songlisting${index}`}>
                                            <a className="pl-1" href={item.url}>
                                                <p className="text-left">{item.id}. {item.title}</p>
                                                <p style={{ marginLeft: 'auto' }}>{item.albumId} Mins</p>
                                            </a>
                                        </div>
                                    )
                                })
                                : <p>No matches Found</p>
                        }
                    </>
                </Container>
            </div>
        );
    }
}
export default AllSongs;
