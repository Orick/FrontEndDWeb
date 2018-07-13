import React, { Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import '../css/bar.css';
const localhost = require('../config/localhost');
//import store from './redux/store';

class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            server:'la2',
            redirect : false,
            msgError : '',
            data : {}
        };

        this.searchSummoner = this.searchSummoner.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.pressEnter = this.pressEnter.bind(this);
    }

    handleChange(event) {
        this.setState({server: event.target.value});
    }

    pressEnter(event){
        if(event.key === 'Enter') {
            this.searchSummoner();
        }
    }
    searchSummoner(){
        this.setState({
            msgError :'Cargando..'
        });

        let data = {};
        const summoner = this.refs.summoner.value;
        const server = this.state.server;
        if( summoner && server) {

            fetch('http://' + localhost + ':8080/summoner/find/'+server+'/'+summoner)
                .then(response => response.json())
                .then(resultSummoner => {
                    data.summoner = resultSummoner.data;
                    if(resultSummoner.status === 1){

                        fetch('http://' + localhost + ':8080/league/find/'+server+'/'+resultSummoner.data.summonerId)
                        .then(responseLeague => responseLeague.json())
                        .then(resultLeague => {
                            data.league = resultLeague.data;
                            //http://' + localhost + ':8080/matchlist/find/la2/118550

                            fetch('http://' + localhost + ':8080/matchlist/find/'+server+'/'+resultSummoner.data.accountId)
                            .then(responseMatchList=> responseMatchList.json())
                            .then(resultMatchList=> {
                                // /allMatch/:server/:accountId

                                fetch('http://' + localhost + ':8080/matchlist/allMatch/'+server+'/'+resultSummoner.data.accountId)
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
                                        msgError :'Error inesperado'
                                    });
                                });
                            })
                            .catch( errorMatchList => {
                                console.log("fetch error : ", errorMatchList);
                                this.setState({
                                    msgError :'Error inesperado'
                                });
                            });
                        })
                        .catch( errorLeague => {
                            console.log("fetch error : ", errorLeague);
                            this.setState({
                                msgError :'Error inesperado'
                            });
                        });
                    }else{
                        this.setState({
                            msgError :'Summoner no encontrado'
                        });
                    }
                })
                .catch( error => {
                    console.log("fetch error : ", error);
                    this.setState({
                        msgError :'Error inesperado'
                    });
                });
        }else{
            this.setState({
                msgError :'Ingrese Summoner para buscar'
            });
        }
    }
    render() {
        const {redirect, msgError, data} = this.state;
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
                <Col sm={12} md={12} lg={12}>
                    <div className="search-container">
                        <input type="text" ref="summoner" onKeyDown={this.pressEnter} className="inputBar" placeholder="Summoner.." name="search"/>
                        <select value={this.state.server} className='serverButton'  onChange={this.handleChange}>
                            <option value="la2">LAS</option>
                            <option value="la1">LAN</option>
                            <option value="br1">BR</option>
                            <option value="na1">NA</option>
                        </select>
                        <Button bsSize="xs" className="ButtonBar" onClick={()=>{this.searchSummoner();}}>
                            <i className="fa fa-search"/>
                        </Button>
                        <br/>
                        <h3 className="infoText">{msgError}</h3>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default SearchBar;
