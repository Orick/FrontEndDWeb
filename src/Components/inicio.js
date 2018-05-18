import React, { Component } from 'react';
import SearchBar from './searchBar';
import ImageSearchBar from  './ImageSearchBar';

class Summoner extends Component {
    render() {
        return (
            <div>
                <ImageSearchBar/>
                <SearchBar/>
            </div>
        );
    }
}

export default Summoner;