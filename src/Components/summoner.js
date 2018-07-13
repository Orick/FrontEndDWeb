import React, { Component } from 'react';
import { Grid, Row, Col, Panel, ListGroup, ListGroupItem, Button, Image } from 'react-bootstrap';
import imageMarco from '../image/marco.png'
import firebase from '../config/firebaseConfig';
import store from './redux/store'
const localhost = require('../config/localhost');

class Summoner extends Component {
    constructor(props){
        super(props);
        this.state = {
            summoner : {},
            league : {},
            matchlist: [],
            link: {},
            dataLoad: false,
            mostrarText: false,
            textButton: '',
            errorDataLoad: 'Cargando'
        };
        this.serguirSummoner = this.serguirSummoner.bind(this);
        this.actualizarSummoner = this.actualizarSummoner.bind(this);
        this.getColor = this.getColor.bind(this);
        this.getItemLink = this.getItemLink.bind(this);
        this.getQueueName = this.getQueueName.bind(this);
        this.getChamptionLink = this.getChamptionLink.bind(this);
        this.updateSummonerList = this.updateSummonerList.bind(this);
    }

    componentWillMount(){
        if(this.props.location.data){

            let promiseLink = [];
            this.props.location.data.data.matchlist.forEach(data => {
               promiseLink.push(this.getChamptionLink(data.champion));
            });

            Promise.all(promiseLink)
                .then(result => {
                    let links = {};
                    result.map(el => {
                        links[el.idChamp] = el.link
                    });

                    // let listSummoner = [];
                    // this.props.location.data.data.summoner.map(summoner =>{
                    // });
                    let summoner = this.props.location.data.data.summoner;
                    let load = true;
                    // if( !(summoner.accountId && summoner.name && summoner.profileIconId && summoner.server && summoner.summonerId && summoner.summonerLevel)){
                    //     load = true;
                    // }
                    let league = this.props.location.data.data.league;
                    // if(!( league.flexLosses && league.flexRank && league.flexTier && league.flexWins && league.soloLosses && league.soloRank && league.soloTier && league.soloWins ) ){
                    //     load = true;
                    // }

                    let propMatchlist = this.props.location.data.data.matchlist;
                    let matchlist = [];
                    propMatchlist.map( match => {
                        if( match.champion && match.lane && match.role && match.listMatch[0].kills && match.listMatch[0].deaths && match.listMatch[0].assists && match.listMatch[0].item0 && match.listMatch[0].item1 && match.listMatch[0].item2 && match.listMatch[0].item3 && match.listMatch[0].item4 && match.listMatch[0].item5 && match.listMatch[0].item6 && match.listMatch[0].win){
                            matchlist.push(match);
                        }
                    });
                    if( load ){
                        this.setState({
                            summoner : summoner,
                            league : league,
                            matchlist: matchlist,
                            dataLoad : true,
                            link:links
                        });
                    }else{
                        this.setState({
                            dataLoad: false,
                            errorDataLoad : 'Intente nuevamente'
                        });
                    }

                })
                .catch(error => {
                   console.log('Error promise', error);
                });
        }else{
            console.log('AAAA');
            this.setState({
                dataLoad: false,
                errorDataLoad : 'Intente nuevamente'
            });

        }

    }

    async getChamptionLink(idChamp){
        return new Promise((resolve,reject)=> {
            fetch('http://' + localhost + ':8080/champions/imagen/'+idChamp)
            .then(res => res.json())
            .then(result => {
                resolve({link:'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/' + result.data, idChamp:idChamp});
            })
            .catch( error => {
                reject({link:imageMarco, idChamp:idChamp});
            });
        });
    }

    getColor(win){
        if(win === "1"){
            return '#22D32D';
        }else{
            return '#F74747';
        }
    }

    getQueueName(idQueue){
        if(idQueue === 430 ){
            return 'Normal';
        }else if(idQueue === 450 ){
            return 'ARAM';
        }else if(idQueue === 440 ) {
            return 'Flex';
        }else if(idQueue === 900){
            return 'URF'
        }else{
            return 'SoloQ';
        }
    }

    getItemLink(id){
        if(id !== 0 ){
            return 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/item/'+id+'.png';
        }else{
            return imageMarco;
        }
    }


    updateSummonerList(summonerList){
        store.dispatch(
            {
                type: 'UPDATE_SUMMONER_INICIO',
                summoner: summonerList
            }
        );
    }


    serguirSummoner(summonerId){
        this.setState({
            mostrarText: true,
            textButton: 'Cargando..'
        });
        let user = firebase.auth().currentUser;
        if (user) {
            user.getIdToken(true)
            .then(Token =>{
                fetch('http://' + localhost + ':8080/assocciatedAccounts/assig',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: "token="+Token+'&summonerid='+summonerId
                })
                .then(res => res.json())
                .then(result => {
                    if(result.statusCode === 'assocciatedAccounts/assig/ok'){
                        if( result.description === 'Relacion ya existente'){
                            this.setState({
                                mostrarText: true,
                                textButton: 'Ya sigues a este summoner'
                            });
                        }else{
                            fetch('http://' + localhost + ':8080/assocciatedAccounts/get',{
                                method: 'POST',
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                body: "token="+Token
                            })
                            .then(res2 => res2.json())
                            .then(result2 => {
                                this.updateSummonerList(result2.data);
                                this.setState({
                                    mostrarText: true,
                                    textButton: 'Siguiendo!'
                                });

                            })
                            .catch( error2 => {
                                console.log("fetch error : ", error2);
                            });
                        }
                    }else{
                        this.setState({
                            mostrarText: true,
                            textButton: 'Error inesperado'
                        });
                    }
                })
                .catch( error => {
                    this.setState({
                        mostrarText: true,
                        textButton: 'Error inesperado'
                    });
                });
            })
            .catch(error=>{
                this.setState({
                    mostrarText: true,
                    textButton: 'Error inesperado'
                });
            });
        }else{
            this.setState({
                mostrarText: true,
                textButton: 'Debes estar logueado'
            });
        }

    }

    actualizarSummoner(summonerId, server, name, accountId){
        this.setState({
            mostrarText: true,
            textButton: 'Cargando..'
        });
        console.log('Actualizar', summonerId, server,name,accountId);

        fetch('http://' + localhost + ':8080/summoner/update/'+server+'/'+name)
        .then(res => res.json())
        .then(resultUpdateSummoner => {
            if( resultUpdateSummoner.status === 1){
                console.log(resultUpdateSummoner);
                fetch('http://' + localhost + ':8080/league/update/'+server+'/'+summonerId)
                .then(res => res.json())
                .then(resultUpdateLeague=> {
                    if( resultUpdateLeague.status === 1){
                        console.log(resultUpdateLeague);
                        fetch('http://' + localhost + ':8080/matchlist/find/'+server+'/'+accountId)
                        .then(res => res.json())
                        .then(resultUpdateMatch1=> {
                            if( resultUpdateMatch1.status === 1){
                                fetch('http://' + localhost + ':8080/matchlist/allMatch/'+server+'/'+accountId)
                                .then(responseMatchListFinal => responseMatchListFinal.json())
                                .then(resultMatchListFinal => {
                                    if(resultMatchListFinal.status === 1){
                                        let promiseLink = [];
                                        resultMatchListFinal.data[0].sumlist.forEach(data => {
                                            promiseLink.push(this.getChamptionLink(data.champion));
                                        });

                                        Promise.all(promiseLink)
                                        .then(result => {
                                            let links = {};
                                            result.map(el => {
                                                links[el.idChamp] = el.link
                                            });
                                            console.log('summoner',resultUpdateSummoner.data);
                                            console.log('League',resultUpdateLeague.data);
                                            console.log('MatchList',resultMatchListFinal.data[0].sumlist);
                                            this.setState({
                                                summoner : resultUpdateSummoner.data,
                                                league : resultUpdateLeague.data,
                                                matchlist: resultMatchListFinal.data[0].sumlist,
                                                dataLoad : true,
                                                link:links,
                                                mostrarText: true,
                                                textButton: 'Actualizado!!'
                                            });
                                        })
                                        .catch(error => {
                                            this.setState({
                                                mostrarText: true,
                                                textButton: 'Error al actualizar'
                                            });
                                        });
                                    }else{
                                        this.setState({
                                            mostrarText: true,
                                            textButton: 'Error al actualizar'
                                        });
                                    }
                                })
                                .catch( errorMatchListFinal => {
                                    console.log("fetch error : ", errorMatchListFinal );
                                    this.setState({
                                        mostrarText: true,
                                        textButton: 'Error al actualizar'
                                    });
                                });
                            }else{
                                this.setState({
                                    mostrarText: true,
                                    textButton: 'Error al actualizar'
                                });
                            }
                        })
                        .catch( error => {
                            console.log(error);
                            this.setState({
                                mostrarText: true,
                                textButton: 'Error inesperado'
                            });
                        });
                    }else{
                        this.setState({
                            mostrarText: true,
                            textButton: 'Error al actualizar'
                        });
                    }
                })
                .catch( error => {
                    console.log(error);
                    this.setState({
                        mostrarText: true,
                        textButton: 'Error inesperado'
                    });
                });
            }else{
                this.setState({
                    mostrarText: true,
                    textButton: 'Error al actualizar'
                });
            }
        })
        .catch( error => {
            console.log(error);
            this.setState({
                mostrarText: true,
                textButton: 'Error inesperado'
            });
        });
    }

    render() {
        const {dataLoad, summoner, league, matchlist, link, mostrarText, textButton, errorDataLoad} = this.state;
        return (
<div>
    {dataLoad ?

<Grid style={{marginTop: '40px'}}>
    <Row>
        <Col sm={12} md={12} lg={12}>
            <Panel bsStyle="info">
                <ListGroup>
                    <ListGroupItem>
                        <Grid>
                            <Row>
                                <Col sm={3} md={3} lg={3} style={{textAlign: 'center', marginTop:'6px'}}>
                                    <Image
                                        src={'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/profileicon/'+summoner.profileIconId+'.png'}
                                        style={{width: '110px', height: '110px'}}
                                        circle
                                    />
                                </Col>
                                <Col sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                                    <h3>{summoner.name}</h3>
                                    <h4 style={{marginTop: '0px'}} >Nivel: {summoner.summonerLevel}</h4>
                                </Col>

                                <Col sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                                    <h4 style={{marginTop: '0px'}}>SoloQ</h4>
                                    <p>{league.soloTier} {league.soloRank}</p>
                                    <p>Victorias: {league.soloWins}</p>
                                    <p>Derrotas: {league.soloLosses}</p>
                                </Col>
                                <Col sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                                    <h4 style={{marginTop: '0px'}}>Flex</h4>
                                    <p>{league.flexTier} {league.flexRank}  </p>
                                    <p>Victorias: {league.flexWins}  </p>
                                    <p>Derrotas: {league.flexLosses}</p>
                                </Col>
                                <Col sm={2} md={2} lg={2}>
                                    <Button bsStyle="primary" className="pull-right" onClick={()=>{this.serguirSummoner(summoner.summonerId)}}>Seguir</Button>
                                    <Button bsStyle="primary" className="pull-right" onClick={()=>{this.actualizarSummoner(summoner.summonerId,summoner.server, summoner.name,summoner.accountId)}}>Actualizar</Button>
                                    {mostrarText ? <h4 style={{textAlign:'center', marginTop:'50px'}}>{textButton}</h4>: null }
                                </Col>
                            </Row>
                        </Grid>
                    </ListGroupItem>
                </ListGroup>
            </Panel>

            <Panel bsStyle="info">
                <Panel.Heading> Match List </Panel.Heading>
                <ListGroup>
                    {
                        matchlist.map((match, index)=>{
                            return(
                                <ListGroupItem key={index} style={{backgroundColor: this.getColor(match.listMatch[0].win)}}>
                                    <Grid>
                                        <Row>
                                            <Col sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                                                <Image
                                                    src={String(link[match.champion])}
                                                    style={{width: '110px', height: '110px'}}
                                                />
                                            </Col>
                                            <Col sm={2} md={2} lg={2} style={{textAlign: 'center'}}>
                                                <h4 style={{marginTop: '0px'}}>{this.getQueueName(match.queue)}</h4>
                                                <p>Kills {match.listMatch[0].kills}</p>
                                                <p>Deaths {match.listMatch[0].deaths}</p>
                                                <p>Assists {match.listMatch[0].assists}</p>
                                            </Col>
                                            <Col sm={1} md={1} lg={1} style={{textAlign: 'center', marginTop:'12px', marginLeft:'0px',marginRight:'0px', paddingLeft:'0px',paddingRight:'4px'}}>
                                                <Image
                                                    src={this.getItemLink(match.listMatch[0].item0)}
                                                    style={{width: '100%'}}
                                                />
                                            </Col>
                                            <Col sm={1} md={1} lg={1} style={{textAlign: 'center', marginTop:'12px', marginLeft:'0px',marginRight:'0px', paddingLeft:'0px',paddingRight:'4px'}}>
                                                <Image
                                                    src={this.getItemLink(match.listMatch[0].item1)}
                                                    style={{width: '100%'}}
                                                />
                                            </Col>
                                            <Col sm={1} md={1} lg={1} style={{textAlign: 'center', marginTop:'12px', marginLeft:'0px',marginRight:'0px', paddingLeft:'0px',paddingRight:'4px'}}>
                                                <Image
                                                    src={this.getItemLink(match.listMatch[0].item2)}
                                                    style={{width: '100%'}}
                                                />
                                            </Col>
                                            <Col sm={1} md={1} lg={1} style={{textAlign: 'center', marginTop:'12px', marginLeft:'0px',marginRight:'0px', paddingLeft:'0px',paddingRight:'4px'}}>
                                                <Image
                                                    src={this.getItemLink(match.listMatch[0].item3)}
                                                    style={{width: '100%'}}
                                                />
                                            </Col>
                                            <Col sm={1} md={1} lg={1} style={{textAlign: 'center', marginTop:'12px', marginLeft:'0px',marginRight:'0px', paddingLeft:'0px',paddingRight:'4px'}}>
                                                <Image
                                                    src={this.getItemLink(match.listMatch[0].item4)}
                                                    style={{width: '100%'}}
                                                />
                                            </Col>
                                            <Col sm={1} md={1} lg={1} style={{textAlign: 'center', marginTop:'12px', marginLeft:'0px',marginRight:'0px', paddingLeft:'0px',paddingRight:'4px'}}>
                                                <Image
                                                    src={this.getItemLink(match.listMatch[0].item5)}
                                                    style={{width: '100%'}}
                                                />
                                            </Col>
                                            <Col sm={1} md={1} lg={1} style={{textAlign: 'center', marginTop:'12px', marginLeft:'0px',marginRight:'0px', paddingLeft:'0px',paddingRight:'4px'}}>
                                                <Image
                                                    src={this.getItemLink(match.listMatch[0].item6)}
                                                    style={{width: '100%'}}
                                                />
                                            </Col>

                                        </Row>
                                    </Grid>
                                </ListGroupItem>
                            );
                        })
                    }

                </ListGroup>
            </Panel>
        </Col>
    </Row>
</Grid>
    :
        <p>
            {errorDataLoad}
        </p>
    }
</div>
        );
    }
}

// MATCH LIST
// 0:
//     champion:142
//     lane:"MID"
//     queue:430
//     role:"SOLO"
//     listMatch: Array(1)
//         0:
//             kills:11
//             deaths:1
//             assists:3
//             item0:2424
//             item1:3285
//             item2:3089
//             item3:1056
//             item4:1001
//             item5:1029
//             item6:3364
//             win:"1"


// summoner:
//     accountId:118550
//     createdAt:"2018-05-22T01:31:23.994Z"
//     name:"Orick"
//     profileIconId:3379
//     revisionDate:1526925293000
//     server:"la2"
//     summonerId:113649
//     summonerLevel:71

// league:
//     createdAt:"2018-05-22T01:31:24.786Z"
//     flexLeagueId:"b8b62f50-2f1b-11e8-a8e4-d4ae5275c01c"
//     flexLeagueName:"Urgot's Brood"
//     flexLeaguePoints:16
//     flexLosses:8
//     flexRank:"III"
//     flexTier:"PLATINUM"
//     flexWins:9
//     server:"la2"
//     soloLeagueId:"98131b70-192a-11e8-a512-c81f66dd66f6"
//     soloLeagueName:"Poppy's Wizards"
//     soloLeaguePoints:72
//     soloLosses:9
//     soloRank:"V"
//     soloTier:"PLATINUM"
//     soloWins:15
//     summonerId:113649

export default Summoner;
