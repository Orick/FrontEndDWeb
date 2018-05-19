import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
//import {Link} from 'react-router-dom';
import '../css/bar.css';

class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            server:'la2',
            summonerName: '',
            level: 0
        };

        this.searchSummoner = this.searchSummoner.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({server: event.target.value});
    }

    searchSummoner(){
        const summoner = this.refs.summoner.value;
        const server = this.state.server;
        console.log(summoner,server);
        if( summoner && server){
            fetch('http://localhost:8080/summoner/find/'+server+'/'+summoner)
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        summonerName: result.data.name,
                        level:result.data.summonerLevel
                    });
                })
                .catch( error => {
                    console.log("fectch error : ", error);
                });
        }
    }
    render() {

        const {summonerName, level} = this.state;
        return (
            <Row>
                <Col sm={12} md={12} lg={12}  className="search-container">
                        <input type="text" ref="summoner" placeholder="Summoner.." name="search"/>
                        <select value={this.state.server} onChange={this.handleChange}>
                            <option value="la2">LAS</option>
                            <option value="la1">LAN</option>
                            <option value="br1">BR</option>
                            <option value="na1">NA</option>
                        </select>

                            <button onClick={()=>{this.searchSummoner();}}>
                                <i className="fa fa-search"/>

                            </button>

                    <br/>
                    Summoner: {summonerName}<br/>
                    Level: {level}
                </Col>
            </Row>
        );
    }
}

export default SearchBar;
