import React, { Component } from 'react';
import { Grid, Row, Col, Modal, Panel, ListGroup, ListGroupItem, Button, Image, Table } from 'react-bootstrap';
import imageMarco from '../image/marco.png'

class Stats extends Component {
    constructor(props){
        super(props);
        this.state = {
			dataLoad: false,
			errorDataLoad: "cream gravy",
            statsdata: []
        };
        this.getChampionImage = this.getChampionImage.bind(this);
		this.getChampionName = this.getChampionName.bind(this);
        this.getItemLink = this.getItemLink.bind(this);
    }
	
	/*componentWillMount(){
		fetch('http://localhost:8080/stats/data/all')
        .then(response => response.json())
        .then(result =>{
            statsdata: result.data
        })
        .catch( error => {
            console.log("fetch error: ", error)
        });
		
	}*/
	
	
	/*componentWillMount(){
        if(this.props.location.data){

            let promiseLink = [];
            this.props.location.data.data.statsdata.forEach(data => {
               promiseLink.push(this.getChampionImage(data.champion));
            });

            Promise.all(promiseLink)
                .then(result => {
                    let load = true;
                    let propStatsdata = {"data":[{"id": 1, "champId": 240, "role": "Duo Support", "winRate": "56.13%", "kills": "4.25", "deaths": "3.58", "assists": "4.07", "gamesPlayed": 1591, "percentRolePlayed": "12.03%", "banRate": "0.14%",  "goldEarned": "7210.74", "finalItemCount": 299, "finalItemWins": 119, "finalItemWinRate": "39.80%", "finalItemHash": "items-3047-3071-3053-3748-3053-3401"}]};//this.props.location.data.data.stats;
                    let statsdata = [];
					
                    propStatsdata.data.map( stats => {
                        if( stats.champId && stats.role && stats.winRate ){
							console.log("I'm in")
                            statsdata.push(stats);
                        }
                    });
                    if( load ){
                        this.setState({
                            statsdata: statsdata
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
	*/
	
	
	componentDidMount(){
		let hardcode = [{id: 1, champId: 240, role: "Duo Support", winRate:"56.13%", kills: "4.25", deaths: "3.58", assists: "4.07", gamesPlayed: 1591, percentRolePlayed: "12.03%", banRate: "0.14%",  goldEarned: "7210.74", finalItemCount: 299,  finalItemWins: 119, finalItemWinRate: "39.80%", finalItemHash: "items-3047-3071-3053-3748-3053-3401"}];
		let statsdata =[];
		statsdata.push(hardcode);
		this.setState({
			statsdata: statsdata,
			dataLoad: true
			});
	}
		/*
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
		
		
        fetch('http://localhost:8080/stats/data/all')
        .then(response => response.json())
        .then(result =>{
            this.setState({
                statsdata: result.data
            });
        })
        .catch( error => {
            console.log("fetch error: ", error)
        });
    }*/

    async getChampionImage(idChamp) {
        return new Promise((resolve,reject)=> {
            fetch('http://localhost:8080/champions/imagen/'+idChamp)
            .then(res => res.json())
            .then(result => {
                resolve({link:'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/' + result.data, idChamp:idChamp});
            })
            .catch( error => {
                reject({link:imageMarco, idChamp:idChamp});
            });
        });
		
		/*
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
		*/
    }

    getChampionName(idChamp){
        return new Promise((resolve,reject)=> {
            fetch('http://localhost:8080/champions/imagen/'+idChamp)
            .then(res => res.json())
            .then(result => {
                resolve("Hi I'm Daisy");
            })
            .catch( error => {
                reject({link:imageMarco, idChamp:idChamp});
            });
        });
		
		/*
        if (idChamp !== 0) {
            var iter;
            for (iter = 0; iter < champdata.length; iter++) {
                if (champdata[iter][0] === idChamp) {
                    return champdata[iter][1];
                }
            }
        }
		*/
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
		const {dataLoad, statsdata, errorDataLoad} = this.state;
        //const {itemdata, champdata} = this.state;
		//const statsdata=[{id: 1, champId: 240, role: "Duo Support", winRate:"56.13%", kills: "4.25", deaths: "3.58", assists: "4.07", gamesPlayed: 1591, percentRolePlayed: "12.03%", banRate: "0.14%",  goldEarned: "7210.74", finalItemCount: 299,  finalItemWins: 119, finalItemWinRate: "39.80%", finalItemHash: "items-3047-3071-3053-3748-3053-3401"}];
        return (
<div>
    {dataLoad ?
	
<Grid style={{marginTop: '30px'}}>
    <Row>
        <Col sm={9} md={9} lg={9}>
            <Panel bsStyle ="info">
            <Panel.Heading> <h1>Champions</h1> </Panel.Heading>
                <ListGroup>
                    <ListGroupItem key={1}>
						<Grid>
							<Row>
								<Col sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
									<Image
										src={this.getChampionImage(statsdata[0].champId)}
										style={{width: '120px', height: '120px'}}
										rounded
									/>
								</Col>
								<Col sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
									<h2>{this.getChampionName(statsdata[0].champId)}</h2>
									<h3>Role: {statsdata[0].role}</h3>
								</Col>
								<Col sm={3} md={3} lg={3} style={{textAlign: 'center'}}>
									<Button bsStyle="primary" onClick={this.handleShow}>View Champ Stats</Button>
								</Col>

								<Modal show={this.state.show} onHide={this.handleClose}>
									<Modal.Header closeButton>
										<Modal.Title style={{textAlign: 'center'}}><h1>{this.getChampionName(statsdata[0].champId)}</h1></Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<Table class="threecolmain">
											<tr>
												<td><Image
														src={this.getChampionImage(statsdata[0].champId)}
														style={{width: '120px', height: '120px'}}
														rounded
														/></td>
												<td>{this.getChampionName(statsdata[0].champId)}</td>
												<td>{statsdata[0].role}</td>
											</tr>
										</Table>
										<Table class="fourcol">
											<tr>
												<td>Kills</td>
												<td>{statsdata[0].kills}</td>
												<td>Win Rate</td>
												<td>{statsdata[0].winRate}</td>
											</tr>
											<tr>
												<td>Deaths</td>
												<td>{statsdata[0].deaths}</td>
												<td>% Role Played</td>
												<td>{statsdata[0].percentRolePlayed}</td>
											</tr>
											<tr>
												<td>Assists</td>
												<td>{statsdata[0].assists}</td>
												<td>Ban Rate</td>
												<td>{statsdata[0].banRate}</td>
											</tr>
											<tr>
												<td>Games Played</td>
												<td>{statsdata[0].gamesPlayed}</td>
												<td>Gold Earned</td>
												<td>{statsdata[0].goldEarned}</td>
											</tr>
										</Table>
										<Table class="threecoltwo">
											<tr>
												<td><Image
														src={this.getChampionImage(statsdata[0].finalItemHash,1)}
														style={{width: '100%'}}
														/></td>
												<td><Image
														src={this.getChampionImage(statsdata[0].finalItemHash,2)}
														style={{width: '100%'}}
														/></td>
												<td><Image
														src={this.getChampionImage(statsdata[0].finalItemHash,3)}
														style={{width: '100%'}}
														/></td>
											</tr>
											<tr>
												<td><Image
														src={this.getChampionImage(statsdata[0].finalItemHash,4)}
														style={{width: '100%'}}
														/></td>
												<td><Image
														src={this.getChampionImage(statsdata[0].finalItemHash,5)}
														style={{width: '100%'}}
														/></td>
												<td><Image
														src={this.getChampionImage(statsdata[0].finalItemHash,6)}
														style={{width: '100%'}}
														/></td>
											</tr>
										</Table>
										<Table class="fourcol">
											<tr>
												<td>Games Played</td>
												<td>{statsdata[0].finalItemCount}</td>
												<td>Win Rate</td>
												<td>{statsdata[0].finalItemWinRate}</td>
											</tr>
										</Table>

									</Modal.Body>    
								</Modal>

							</Row>
						</Grid>
					</ListGroupItem>
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
/*
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
*/
export default Stats;