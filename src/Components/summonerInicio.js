import React, { Component } from 'react';
import { Grid, Row, Col, Panel, ListGroup, ListGroupItem, Button, Image } from 'react-bootstrap';
import firebase from '../config/firebaseConfig';
import store from './redux/store';
import { Redirect } from 'react-router-dom';
const localhost = require('../config/localhost');


class summonerInicio extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect: false,
            data: {},
            textCarga: 'Summoners que sigo'
        };

        this.borrorSeguir = this.borrorSeguir.bind(this);
        this.updateSummonerList = this.updateSummonerList.bind(this);
        this.clickSummoner = this.clickSummoner.bind(this);
    }

    updateSummonerList(summonerList){
        store.dispatch(
            {
                type: 'UPDATE_SUMMONER_INICIO',
                summoner: summonerList
            }
        );
    }

    borrorSeguir(summonerId){
        firebase.auth().currentUser.getIdToken()
            .then(Token => {
                fetch('http://' + localhost + '/assocciatedAccounts/delete',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: "token="+Token+"&summonerId="+summonerId
                })
                .then(res => res.json())
                .then(result => {
                    if(result.description === 'delete ok'){
                        fetch('http://' + localhost + '/assocciatedAccounts/get',{
                            method: 'POST',
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            body: "token="+Token
                        })
                        .then(res2 => res2.json())
                        .then(result2 => {
                            this.updateSummonerList(result2.data);
                        })
                        .catch( error2 => {
                            console.log("fetch error : ", error2);
                        });

                    }else{
                        alert('Error inesperado');
                    }
                })
                .catch( error => {
                    console.log("fectch error : ", error);
                });
            }).catch(function (error) {
                console.log('error: ', error);
            });
    }

    clickSummoner(summoner, server){
        this.setState({
            textCarga: 'Cargando perfil de ' + summoner
        });

        let data = {};
        fetch('http://' + localhost + '/summoner/find/'+server+'/'+summoner)
        .then(response => response.json())
        .then(resultSummoner => {
            data.summoner = resultSummoner.data;
            if(resultSummoner.status === 1){

                fetch('http://' + localhost + '/league/find/'+server+'/'+resultSummoner.data.summonerId)
                .then(responseLeague => responseLeague.json())
                .then(resultLeague => {
                    data.league = resultLeague.data;
                    //http://' + localhost + '/matchlist/find/la2/118550

                    fetch('http://' + localhost + '/matchlist/find/'+server+'/'+resultSummoner.data.accountId)
                    .then(responseMatchList=> responseMatchList.json())
                    .then(resultMatchList=> {
                        // /allMatch/:server/:accountId

                        fetch('http://' + localhost + '/matchlist/allMatch/'+server+'/'+resultSummoner.data.accountId)
                        .then(responseMatchListFinal => responseMatchListFinal.json())
                        .then(resultMatchListFinal => {
                            data.matchlist = resultMatchListFinal.data[0].sumlist;
                            console.log(data);
                            this.setState({
                                redirect:true,
                                data: data
                            });
                        })
                        .catch( errorMatchListFinal => {
                            console.log("fetch error : ", errorMatchListFinal );
                        });
                    })
                    .catch( errorMatchList => {
                        console.log("fetch error : ", errorMatchList);
                    });
                })
                .catch( errorLeague => {
                    console.log("fetch error : ", errorLeague);
                });
            }
        })
        .catch( error => {
            console.log("fetch error : ", error);
        });
    }
    render() {
        const { summoner } = this.props;
        const {redirect, data, textCarga} = this.state;
        return (

                <Grid style={{marginTop: '40px'}}>
                    {
                        redirect ?
                            <Redirect to={{
                                pathname: '/summoner',
                                data: {data:data}}}
                            />
                            :
                            null
                    }

                    { summoner.length !== 0 ?
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <Panel bsStyle="info">
                                    <Panel.Heading> {textCarga} </Panel.Heading>
                                        <ListGroup>
                                            {
                                                summoner.map((data, index)=> {
                                                    return (
                                                        <ListGroupItem key={index}>
                                                            {
                                                                data.summonerLeague.map((d,ind )=> {
                                                                    return (
                                                                        <div key={ind}>
                                                                            <Grid >
                                                                                <Row>
                                                                                    <div onClick={()=>{this.clickSummoner(data.name,data.server)}}>
                                                                                        <Col sm={2} md={2} lg={2} style={{textAlign: 'center', marginTop:'6px'}}>
                                                                                            <Image
                                                                                                src={'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/profileicon/'+data.profileIconId+'.png'}
                                                                                                style={{
                                                                                                    width: '110px',
                                                                                                    height: '110px',
                                                                                                }}
                                                                                                circle
                                                                                            />
                                                                                        </Col>
                                                                                        <Col sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                                                                                            <h2>{data.name}</h2>
                                                                                            <h4 style={{marginTop: '0px'}} >Nivel: {data.summonerLevel}</h4>
                                                                                        </Col>
                                                                                        <Col sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                                                                                            <h4 style={{marginTop: '0px'}}>SoloQ</h4>
                                                                                            <p>{d.soloTier} {d.soloRank}</p>
                                                                                            <p>Victorias: {d.soloWins}</p>
                                                                                            <p>Derrotas: {d.soloLosses}</p>
                                                                                        </Col>
                                                                                        <Col sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                                                                                            <h4 style={{marginTop: '0px'}}>Flex</h4>
                                                                                            <p>{d.flexTier} {d.flexRank}  </p>
                                                                                            <p>Victorias: {d.flexWins}  </p>
                                                                                            <p>Derrotas: {d.flexLosses}</p>
                                                                                        </Col>
                                                                                    </div>
                                                                                    <Col sm={3} md={3} lg={3}>
                                                                                        <Button bsStyle="danger" bsSize="xs" className="pull-right" onClick={()=>{this.borrorSeguir(data.summonerId)}}>X</Button>
                                                                                    </Col>
                                                                                </Row>

                                                                            </Grid>

                                                                        </div>
                                                                    );
                                                                })
                                                            }
                                                        </ListGroupItem>
                                                    );
                                                })
                                            }
                                        </ListGroup>
                                </Panel>
                            </Col>
                        </Row>
                    :
                        null
                    }
                </Grid>

        );
    }
}

export default summonerInicio;