import React, { Component } from 'react';
import { Grid, Row, Col, Panel, ListGroup, ListGroupItem, Button, Image } from 'react-bootstrap';
import firebase from '../config/firebaseConfig';
import store from './redux/store';


class summonerInicio extends Component {
    constructor(props){
        super(props);
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
                fetch('http://localhost:8080/assocciatedAccounts/delete',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: "token="+Token+"&summonerId="+summonerId
                })
                .then(res => res.json())
                .then(result => {
                    if(result.description === 'delete ok'){
                        fetch('http://localhost:8080/assocciatedAccounts/get',{
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

    clickSummoner(summoner){
        console.log(summoner);
    }
    render() {
        const { summoner } = this.props;
        return (

                <Grid style={{marginTop: '40px'}}>
                    { summoner.length !== 0 ?
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <Panel bsStyle="info">
                                    <Panel.Heading> Summoners que sigo </Panel.Heading>
                                        <ListGroup>
                                            {
                                                summoner.map((data, index)=> {
                                                    return (
                                                        <ListGroupItem key={index}>
                                                            {
                                                                data.summonerLeague.map((d,ind )=> {
                                                                    return (
                                                                        <div key={ind}>
                                                                            <Grid  onClick={()=>{this.clickSummoner(data.name)}}>
                                                                                <Row>
                                                                                    <Col sm={2} md={2} lg={2} style={{textAlign: 'center', marginTop:'6px'}}>
                                                                                        <Image
                                                                                            src={'http://ddragon.leagueoflegends.com/cdn/8.10.1/img/profileicon/'+data.profileIconId+'.png'}
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