import React, { Component } from 'react';
import { Col, Tabs, Tab, Container, Row } from 'react-bootstrap';
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
function SuggestionList() {
    return '';
}

class AllSongs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [], //Songs from API List
            value: '', //Value typed in Search Field
            suggestions: [] //Suggessted Songs based on Search Input
        }
    }
    componentDidMount() {
        /**Fetching Songs from API*/
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
    render() {
        const { value, suggestions } = this.state;
        /* Input Property for AutoSuggest**/
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
                        getSuggestionValue={SuggestionList}
                        renderSuggestion={SuggestionList}
                        inputProps={inputProps}
                    />
                    {
                        this.state.suggestions.length != 0 ?
                            /* Listing Songs as per user typed Value in Search**/
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
                </Container>
            </div>
        );
    }
}
export default AllSongs;
