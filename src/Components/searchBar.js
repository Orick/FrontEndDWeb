import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import '../css/bar.css';
//import store from './redux/store';

class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            server:'la2',
            redirect : false,
            mostrarError: false,
            msgError : '',
            data : {}
        };

        this.searchSummoner = this.searchSummoner.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({server: event.target.value});
    }

    searchSummoner(){
        let data = {};
        const summoner = this.refs.summoner.value;
        const server = this.state.server;
        if( summoner && server) {

            fetch('http://localhost:8080/summoner/find/'+server+'/'+summoner)
                .then(response => response.json())
                .then(resultSummoner => {
                    data.summoner = resultSummoner.data;
                    if(resultSummoner.status === 1){

                        fetch('http://localhost:8080/league/find/'+server+'/'+resultSummoner.data.summonerId)
                        .then(responseLeague => responseLeague.json())
                        .then(resultLeague => {
                            data.league = resultLeague.data;
                            //http://localhost:8080/matchlist/find/la2/118550

                            fetch('http://localhost:8080/matchlist/find/'+server+'/'+resultSummoner.data.accountId)
                            .then(responseMatchList=> responseMatchList.json())
                            .then(resultMatchList=> {
                                // /allMatch/:server/:accountId

                                fetch('http://localhost:8080/matchlist/allMatch/'+server+'/'+resultSummoner.data.accountId)
                                .then(responseMatchListFinal => responseMatchListFinal.json())
                                .then(resultMatchListFinal => {
                                    data.matchlist = resultMatchListFinal.data[0].sumlist;
                                    this.setState({
                                        redirect:true,
                                        data: data
                                    });
                                })
                                .catch( errorMatchListFinal => {
                                    console.log("fetch error : ", errorMatchListFinal );
                                    this.setState({
                                        mostrarError: true,
                                        msgError :'Error inesperado'
                                    });
                                });
                            })
                            .catch( errorMatchList => {
                                console.log("fetch error : ", errorMatchList);
                                this.setState({
                                    mostrarError: true,
                                    msgError :'Error inesperado'
                                });
                            });
                        })
                        .catch( errorLeague => {
                            console.log("fetch error : ", errorLeague);
                            this.setState({
                                mostrarError: true,
                                msgError :'Error inesperado'
                            });
                        });
                    }else{
                        this.setState({
                            mostrarError: true,
                            msgError :'Summoner no encontrado'
                        });
                    }
                })
                .catch( error => {
                    console.log("fetch error : ", error);
                    this.setState({
                        mostrarError: true,
                        msgError :'Error inesperado'
                    });
                });
        }else{
            this.setState({
                mostrarError: true,
                msgError :'Ingrese Summoner para buscar'
            });
        }
    }
    render() {
        //<Redirect to='/summoner' />
        const {redirect, mostrarError, msgError, data} = this.state;
        return (
            <Row>
                {
                    redirect ?
                        <Redirect to={{
                            pathname: '/summoner',
                            data: {data:data}}}
                        />
                        :
                        null
                }

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
                    {mostrarError ? <h3>{msgError}</h3> : null }

                </Col>
            </Row>
        );
    }
}

export default SearchBar;
