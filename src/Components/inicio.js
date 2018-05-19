import React, { Component } from 'react';
import SearchBar from './searchBar';
import ImageSearchBar from  './ImageSearchBar';

class Inicio extends Component {
    render() {
        return (
            <div>
                <ImageSearchBar/>
                <SearchBar/>
            </div>
        );
    }
}

export default Inicio;