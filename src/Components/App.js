import React, { Component } from 'react';
import SectionBar from './SectionBar';
import ImagePresentation from './ImagePresentation';
import '../css/index.css';

class App extends Component {
  render() {
    return (
        <div>
            <ImagePresentation/>
            <SectionBar/>
        </div>

    );
  }
}


export default App;
