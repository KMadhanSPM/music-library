import React, { Component } from 'react';
import MusicApp from './MusicApp';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <MusicApp />
      </>
    );
  }
}

export default App;
