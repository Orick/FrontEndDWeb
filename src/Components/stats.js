import React, { Component } from 'react';
import { Grid, Row, Col, Modal, Panel, ListGroup, ListGroupItem, Button, Image } from 'react-bootstrap';
import imageMarco from '../image/marco.png'
import firebase from '../config/firebaseConfig';
import store from './redux/store'

class Stats extends Component {
    constructor(props){
        super(props);
        this.state = {
            statsdata: [],
            itemdata: [],
            champdata: [],
            lgShow: false
        };
        this.getChampionLink = this.getChampionLink.bind(this);
        this.getItemLink = this.getItemLink.bind(this);
    }

    componentWillMount(){
        fetch('http://localhost:8080/stats/recover/all')
        .then(response => response.json())
        .then(result =>{
            this.setState({
                statsdata: result.data
            });
        })
        .catch( error => {
            console.log("fetch error: ", error)
        });
        
        fetch('http://localhost:8080/items/data/basic')
        .then(response => response.json())
        .then(result =>{
            this.setState({
                itemdata: result.data
            });
        })
        .catch( error => {
            console.log("fetch error: ", error)
        });

        fetch('http://localhost:8080/champions/data/basic')
        .then(response => response.json())
        .then(result =>{
            this.setState({
                champlist: result.data
            });
        })
        .catch( error => {
            console.log("fetch error: ", error)
        });
    }

    async getChampionImage(idChamp) {
        if (idChamp !== 0) {
            var iter;
            for (iter = 0; iter < champdata.length; iter++) {
                if (champdata[iter][0] === idChamp) {
                    return 'http://ddragon.leagueoflegends.com/cdn/8.10.1/img/champion/' + champdata[iter][2];
                }
            }
        } else {
            return ;
        }
    }

    getChampionName(idchamp){
        if (idChamp !== 0) {
            var iter;
            for (iter = 0; iter < champdata.length; iter++) {
                if (champdata[iter][0] === idChamp) {
                    return champdata[iter][1];
                }
            }
        }
    }

    getItemLink(itemHash,pos){
        var itemId = itemHash.subsrt(pos*5+1,4)
        if(itemId !== 0 ){
            return 'http://ddragon.leagueoflegends.com/cdn/8.10.1/img/item/'+itemId+'.png';
        }else{
            return ;
        }
    }

    render() {
        let lgClose = () => this.setState( lgShow: false);
        const {statsdata, itemdata, champdata} = this.state;
        return (
<Grid style={{marginTop: '30px'}}>
    <Row>
        <Col sm={9} md={9} lg={9}>
            <Panel bsStyle ="info">
            <Panel.Heading style={{textAlign: 'center'}}> <h1>Champions</h1> </Panel.Heading>
                <ListGroup>
                    {
                        statsdata.map((stats, index)=>{
                            return(
                                <ListGroupItem key={index}>
                                    <Grid>
                                        <Row>
                                            <Col sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
                                                <Image
                                                    src={this.getChampionImage(stats.champId)}
                                                    style={{width: '120px', height: '120px'}}
                                                    rounded
                                                />
                                            </Col>
                                            <Col sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
                                                <h2>{this.getChampionName(stats.champId)}</h2>
                                                <h3>Role: {stats.role}</h3>
                                            </Col>
                                            <Col sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
                                                <Button bsStyle="primary" onClick={this.handleShow}>View Champ Stats</Button>
                                            </Col>

                                            <Modal show={this.state.show} onHide={this.handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title style={{textAlign: 'center'}}><h1>{this.getChampionName(stats.champId)}</h1></Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Table style="background-color: #0000CD" class="threecol">
                                                        <tr>
                                                            <td><Image
                                                                    src={this.getChampionImage(stats.champId)}
                                                                    style={{width: '120px', height: '120px'}}
                                                                    rounded
                                                                    /></td>
                                                            <td>{this.getChampionName(stats.champId)}</td>
                                                            <td>{stats.role}</td>
                                                        </tr>
                                                    </Table>
                                                    <Table style="background-color: #3333ff" class="fourcol">
                                                        <tr>
                                                            <td>Kills</td>
                                                            <td>{stats.kills}</td>
                                                            <td>Win Rate</td>
                                                            <td>{stats.winRate}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Deaths</td>
                                                            <td>{stats.deaths}</td>
                                                            <td>% Role Played</td>
                                                            <td>{stats.percentRolePlayed}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Assists</td>
                                                            <td>{stats.assists}</td>
                                                            <td>Ban Rate</td>
                                                            <td>{stats.banRate}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Games Played</td>
                                                            <td>{stats.gamesPlayed}</td>
                                                            <td>Gold Earned</td>
                                                            <td>{stats.goldEarned}</td>
                                                        </tr>
                                                    </Table>
                                                    <Table style="background-color: #3333ff" class="threecol">
                                                        <tr>
                                                            <td><Image
                                                                    src={this.getChampionImage(stats.finalItemHash,1)}
                                                                    style={{width: '100%'}}
                                                                    /></td>
                                                            <td><Image
                                                                    src={this.getChampionImage(stats.finalItemHash,2)}
                                                                    style={{width: '100%'}}
                                                                    /></td>
                                                            <td><Image
                                                                    src={this.getChampionImage(stats.finalItemHash,3)}
                                                                    style={{width: '100%'}}
                                                                    /></td>
                                                        </tr>
                                                        <tr>
                                                            <td><Image
                                                                    src={this.getChampionImage(stats.finalItemHash,4)}
                                                                    style={{width: '100%'}}
                                                                    /></td>
                                                            <td><Image
                                                                    src={this.getChampionImage(stats.finalItemHash,5)}
                                                                    style={{width: '100%'}}
                                                                    /></td>
                                                            <td><Image
                                                                    src={this.getChampionImage(stats.finalItemHash,6)}
                                                                    style={{width: '100%'}}
                                                                    /></td>
                                                        </tr>
                                                    </Table>
                                                    <Table style="background-color: #3333ff" class="fourcol">
                                                        <tr>
                                                            <td>Games Played</td>
                                                            <td>{stats.finalItemCount}</td>
                                                            <td>Win Rate</td>
                                                            <td>{stats.finalItemWinRate}</td>
                                                        </tr>
                                                    </Table>

                                                </Modal.Body>    
                                            </Modal>

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
        );
    }
}

class MyModal extends Component {
    render() {
        return(
            <Modal
                {...this.props}
                bsSize="large"
            >
                <Modal.Body>
                    <Grid>
                        <Row>
                            <Col  sm={6} md={6} lg={6} style={{textAlign: 'center'}}>
                                Image
                            </Col>
                            <Col  sm={6} md={6} lg={6} style={{textAlign: 'center'}}>
                                Name
                            </Col>
                            <Col  sm={6} md={6} lg={6} style={{textAlign: 'center'}}>
                                Role
                            </Col>
                        </Row>
                        <Row>
                            <Col  sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
                                Win Rate
                            </Col>
                            <Col  sm={6} md={6} lg={6} style={{textAlign: 'center'}}>
                                Win Rate %
                            </Col>
                            <Col  sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
                                Games Played
                            </Col>
                            <Col  sm={6} md={6} lg={6} style={{textAlign: 'center'}}>
                                Number Games Played
                            </Col>
                        </Row>
                        <Row>
                            <Col  sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
                                Kills
                            </Col>
                            <Col  sm={6} md={6} lg={6} style={{textAlign: 'center'}}>
                                Number Kills
                            </Col>
                            <Col  sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
                                % Role
                            </Col>
                            <Col  sm={6} md={6} lg={6} style={{textAlign: 'center'}}>
                                Role%
                            </Col>
                        </Row>
                        <Row>
                            <Col  sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
                                Deaths
                            </Col>
                            <Col  sm={6} md={6} lg={6} style={{textAlign: 'center'}}>
                                Number Deaths
                            </Col>
                            <Col  sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
                                Ban Ratio
                            </Col>
                            <Col  sm={6} md={6} lg={6} style={{textAlign: 'center'}}>
                                Ban %
                            </Col>
                        </Row>
                        <Row>
                            <Col  sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
                                Assists
                            </Col>
                            <Col  sm={6} md={6} lg={6} style={{textAlign: 'center'}}>
                                Number of Assists
                            </Col>
                            <Col  sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
                                Gold Reunido
                            </Col>
                            <Col  sm={6} md={6} lg={6} style={{textAlign: 'center'}}>
                                Numero de Gold
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Stats;
