import React, { Component } from 'react';
import {Row, Col, MenuItem, Modal, Button, Image, Popover, OverlayTrigger, FormGroup, ControlLabel, FormControl, DropdownButton} from 'react-bootstrap';
import firebase from '../config/firebaseConfig';
import '../css/simulador.css'; 

class Simulador extends Component {
    constructor(props){
        super(props);

        this.state = {
            idchamp: [1, 2],
            urlchamp: ["http://ddragon.leagueoflegends.com/cdn/8.10.1/img/champion/Annie.png", "http://ddragon.leagueoflegends.com/cdn/8.10.1/img/champion/Olaf.png"],
            boolshowchamp: [false, false],
            iditem: [[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0]],
            urlitem: [["", "", "", "", "", ""],["", "", "", "", "", ""]],
            boolshowitem: [[false, false, false, false, false, false],[false, false, false, false, false, false]],
            champdata: [],
            itemdata: [],
            actualItemButton: [-1,-1],
            actualChampButton: -1,
            attack: [],
            recibe: [],
            showBuildi: false,
            nameBuild: "",
            buildNames:[],
            buildData:[]
        };

        this.showItem = this.showItem.bind(this);
        this.closeItem = this.closeItem.bind(this);
        this.showChamp = this.showChamp.bind(this);
        this.closeChamp = this.closeChamp.bind(this);
        this.renderMenuChamp = this.renderMenuChamp.bind(this);
        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.selectChamp = this.selectChamp.bind(this);
        this.calcularDamage = this.calcularDamage.bind(this);
        this.regirtrarBuild = this.regirtrarBuild.bind(this);
        this.saveBuildButton = this.saveBuildButton.bind(this);
        this.closeBuild = this.closeBuild.bind(this);
        this.showBuild = this.showBuild.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.renderMenuBuilds = this.renderMenuBuilds.bind(this);
        this.selectBuildButton = this.selectBuildButton.bind(this);
        this.selectBuild = this.selectBuild.bind(this);
    }
    calcularDamage(champ1,champ2,iditem11,iditem12,iditem13,iditem14,iditem15,iditem16,iditem21,iditem22,iditem23,iditem24,iditem25,iditem26){
        fetch('http://localhost:8080/simulador/attack/' + champ1 + '/' + iditem11 + '/' + iditem12 + '/' + iditem13 + '/' + iditem14 + '/' + iditem15 + '/' + iditem16)
        .then(response => response.json())
        .then(attack => {
            fetch('http://localhost:8080/simulador/recibe/' + champ2 + '/' + iditem21 + '/' + iditem22 + '/' + iditem23 + '/' + iditem24 + '/' + iditem25 + '/' + iditem26)
            .then(response => response.json())
            .then(recibe => {
                this.setState({recibe: recibe.data, attack: attack.data});

            })
            .catch(error => {
                console.log("fetch: " + error)
            });
        })
        .catch(error => {
            console.log("fetch: " + error)
        });
        return (this.state.attack[0] - this.state.recibe[0])
    }

    closeItem(i, j) {
        let items = this.state.boolshowitem;
        items[i][j] = false;
        this.setState({ boolshowitem: items, actualItemButton: [-1,-1] });
    }

    closeChamp(i) {
        let champs = this.state.boolshowchamp;
        champs[i] = false;
        this.setState({ boolshowchamp: champs, actualChampButton: -1 });
    }

    showItem(i, j) {
        let items = this.state.boolshowitem;
        items[i][j] = true;
        this.setState({ boolshowitem: items, actualItemButton: [i,j] });
    }

    showChamp(i) {
        let champs = this.state.boolshowchamp;
        champs[i] = true;
        this.setState({ boolshowchamp: champs, actualChampButton: i });
    }

    closeBuild() {
        this.setState({ showBuildi: false});
    }

    showBuild() {
        this.setState({ showBuildi: true});
    }

    renderMenuItem(item) {
        const popover = (
            <Popover id={item[0]}>
              {item[3]}
            </Popover>
        );

        const {actualItemButton} = this.state;
        
        return (
            <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover}>
            <Image src={item[2]} rounded responsive onClick={()=>{this.selectItem(item[0], item[2], actualItemButton[0], actualItemButton[1])}}/>
            </OverlayTrigger>
        );
    }

    renderMenuChamp(champ) {
        const popover = (
            <Popover id={champ[0]}>
              {champ[1]}
            </Popover>
        );

        const {actualChampButton} = this.state;
        
        return (
            <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover}>
            <Image src={'http://ddragon.leagueoflegends.com/cdn/8.10.1/img/champion/' + champ[2]} rounded responsive onClick={()=>{this.selectChamp(champ[0], 'http://ddragon.leagueoflegends.com/cdn/8.10.1/img/champion/' + champ[2], actualChampButton)}}/>
            </OverlayTrigger>
        );
    }

    selectItem(id, url, i, j){
        let {iditem, urlitem} = this.state;
        iditem[i][j] = id;
        urlitem[i][j] = url;
        this.setState({
            iditem: iditem,
            urlitem: urlitem
        });
        this.closeItem(i,j);
        console.log(this.state.iditem);
        console.log(this.state.urlitem);
    }

    selectChamp(id, url, i){
        let {idchamp, urlchamp} = this.state;
        idchamp[i] = id;
        urlchamp[i] = url;
        this.setState({
            idchamp: idchamp,
            urlchamp: urlchamp
        });
        this.closeChamp(i);
        console.log(this.state.idchamp);
        console.log(this.state.urlchamp);
    }

    regirtrarBuild(){
        let user = firebase.auth().currentUser;
        if (user) {
            user.getIdToken(true)
            .then(Token =>{
                fetch('http://localhost:8080/builds/',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: "iduser="+user.uid+'&name='+this.state.nameBuild+'&idchamp1='+this.state.idchamp[0]+'&idchamp2='+this.state.idchamp[1]+'&iditem11='+this.state.iditem[0][0]+'&iditem12='+this.state.iditem[0][1]+'&iditem13='+this.state.iditem[0][2]+'&iditem14='+this.state.iditem[0][3]+'&iditem15='+this.state.iditem[0][4]+'&iditem16='+this.state.iditem[0][5]+'&iditem21='+this.state.iditem[1][0]+'&iditem22='+this.state.iditem[1][1]+'&iditem23='+this.state.iditem[1][2]+'&iditem24='+this.state.iditem[1][3]+'&iditem25='+this.state.iditem[1][4]+'&iditem26='+this.state.iditem[1][5]
                })
                .then(res => res.json())
                .then(result => {
                    this.closeBuild();
                })
                .catch( error => {
                    console.log(error);
                });
            })
            .catch(error=>{
            });
        }
    }

    getValidationState() {
        const length = this.state.nameBuild.length;
        if (length > 1) return 'success';
        else if (length > 0) return 'error';
        return null;
    }
    
    nameChange(e) {
        this.setState({ nameBuild: e.target.value });
    }
    
    saveBuildButton(){
        let user = firebase.auth().currentUser;
        if (user) {
            return(
                <div>
                <Button bsSize="large" onClick={()=>{this.showBuild()}}> Guardar Build </Button>
                <Modal show={this.state.showBuildi} onHide={()=>{this.closeBuild()}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Builds</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form>
                            <FormGroup
                            controlId="formBasicText"
                            validationState={this.getValidationState()}
                            >
                            <ControlLabel>Nombre Build</ControlLabel>
                            <FormControl type="text" value={this.state.nameBuild} placeholder="Ingrese un nombre" onChange={this.nameChange}/>
                            <FormControl.Feedback />
                            </FormGroup>
                        </form>
                            <Button bsSize="large" onClick={()=>{this.regirtrarBuild()}}> Guardar Build </Button>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeBuild()}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>
                </div>
            );
        }
    }

    selectBuildButton(){
        let user = firebase.auth().currentUser;
        if (user) {
            
            fetch('http://localhost:8080/builds/' + user.uid)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    buildNames: result.data
                });
            })
            .catch( error => {
                console.log("fectch error : ", error);
            });

            let {buildNames} = this.state;

            return(
                <DropdownButton bsSize="large" title="Builds" id="dropdown-size-large">
                    {buildNames.map(this.renderMenuBuilds)}
                </DropdownButton>
            );
        }
    }

    renderMenuBuilds(builds,i){
        return (
            <MenuItem eventKey={i} onClick={()=>{this.selectBuild(builds)}} >{builds}</MenuItem>
        );
    }

    selectBuild(build){
        let user = firebase.auth().currentUser;
        if (user) {
            fetch('http://localhost:8080/builds/obtener/' + user.uid + '/' + build)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    buildData: result.data
                });
            })
            .catch( error => {
                console.log("fectch error : ", error);
        });
        }

        let {buildData, idchamp, iditem} = this.state;
        
        idchamp[0] = buildData[0];
        idchamp[1] = buildData[1];
        iditem[0][0] = buildData[2];
        iditem[0][1] = buildData[3];
        iditem[0][2] = buildData[4];
        iditem[0][3] = buildData[5];
        iditem[0][4] = buildData[6];
        iditem[0][5] = buildData[7];
        iditem[1][0] = buildData[8];
        iditem[1][1] = buildData[9];
        iditem[1][2] = buildData[10];
        iditem[1][3] = buildData[11];
        iditem[1][4] = buildData[12];
        iditem[1][5] = buildData[13];
        
        this.setState({
            idchamp: idchamp,
            iditem: iditem
        });
    }

    componentDidMount(){
        fetch('http://localhost:8080/items/data/basic')
        .then(response => response.json())
        .then(result => {
            this.setState({
                itemdata: result.data
            });
        })
        .catch( error => {
            console.log("fectch error : ", error);
        });

        fetch('http://localhost:8080/champions/data/basic')
        .then(response => response.json())
        .then(result => {
            this.setState({
                champdata: result.data
            });
        })
        .catch( error => {
            console.log("fectch error : ", error);
        });
    }

    render() {
        const {boolshowchamp,boolshowitem,itemdata,champdata} = this.state;
        return (
        <div>
            <Row>
                <Col classname='right-container' sm={6} md={6} lg={6}>
                    {this.saveBuildButton()}
                </Col>
                <Col classname='left-container' sm={6} md={6} lg={6}>
                    {this.selectBuildButton()}
                </Col>
            </Row>
            <Row>
                {console.log(this.state.actualItemButton)}
                <Col sm={6} md={6} lg={6}>
                    
                <Row className="left-container">
                    <Col sm={0} md={0} lg={0}>
                        <Button bsSize="large" onClick={()=>{this.showChamp(0)}}> Campeon 1 </Button>
                        <Image className="padding-container" src={this.state.urlchamp[0]} rounded responsive/>
                    </Col>
                </Row>
                        <Modal show={boolshowchamp[0]} onHide={()=>{this.closeChamp(0)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Campeon 1</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {champdata.map(this.renderMenuChamp)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeChamp(0)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>

                    <Row className="left-container">
                        <Col sm={0} md={0} lg={0}>
                            <Button bsSize="large" onClick={()=>{this.showItem(0,0)}}> Item 1 </Button>
                            <Image className="padding-container" src={this.state.urlitem[0][0]} rounded responsive/>
                        </Col>
                    </Row>
                        <Modal show={boolshowitem[0][0]} onHide={()=>{this.closeItem(0,0)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Item 1</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemdata.map(this.renderMenuItem)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeItem(0,0)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>
                    
                    <Row className="left-container">
                        <Button bsSize="large" onClick={()=>{this.showItem(0,1)}}> Item 2 </Button>
                        <Image className="padding-container" src={this.state.urlitem[0][1]} rounded responsive/>
                    </Row>
                        <Modal show={boolshowitem[0][1]} onHide={()=>{this.closeItem(0,1)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Item 2</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemdata.map(this.renderMenuItem)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeItem(0,1)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>
                    
                    <Row className="left-container">
                        <Button bsSize="large" onClick={()=>{this.showItem(0,2)}}> Item 3 </Button>
                        <Image className="padding-container" src={this.state.urlitem[0][2]} rounded responsive/>
                    </Row>
                        <Modal show={boolshowitem[0][2]} onHide={()=>{this.closeItem(0,2)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Item 3</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemdata.map(this.renderMenuItem)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeItem(0,2)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>
                    
                    <Row className="left-container">
                        <Button bsSize="large" onClick={()=>{this.showItem(0,3)}}> Item 4 </Button>
                        <Image className="padding-container" src={this.state.urlitem[0][3]} rounded responsive/>
                    </Row>
                        <Modal show={boolshowitem[0][3]} onHide={()=>{this.closeItem(0,3)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Item 4</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemdata.map(this.renderMenuItem)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeItem(0,3)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>
                    
                    <Row className="left-container">
                        <Button bsSize="large" onClick={()=>{this.showItem(0,4)}}> Item 5 </Button>
                        <Image className="padding-container" src={this.state.urlitem[0][4]} rounded responsive/>
                    </Row>
                        <Modal show={boolshowitem[0][4]} onHide={()=>{this.closeItem(0,4)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Item 5</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemdata.map(this.renderMenuItem)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeItem(0,4)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>
                    
                    <Row className="left-container">
                        <Button bsSize="large" onClick={()=>{this.showItem(0,5)}}> Item 6 </Button>
                        <Image className="padding-container" src={this.state.urlitem[0][5]} rounded responsive/>
                    </Row>
                        <Modal show={boolshowitem[0][5]} onHide={()=>{this.closeItem(0,5)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Item 6</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemdata.map(this.renderMenuItem)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeItem(0,5)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>

                </Col>
                <Col sm={6} md={6} lg={6}>

                    <Row className="left-container">
                        <Col sm={0} md={0} lg={0}>
                            <Button bsSize="large" onClick={()=>{this.showChamp(1)}}> Campeon 2 </Button>
                            <Image className="padding-container" src={this.state.urlchamp[1]} rounded responsive/>
                        </Col>
                    </Row>
                        <Modal show={boolshowchamp[1]} onHide={()=>{this.closeChamp(1)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Campeon 2</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {champdata.map(this.renderMenuChamp)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeChamp(1)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>

                    <Row className="left-container">
                        <Button bsSize="large" onClick={()=>{this.showItem(1,0)}}> Item 1 </Button>
                        <Image className="padding-container" src={this.state.urlitem[1][0]} rounded responsive/>
                    </Row>
                        <Modal show={boolshowitem[1][0]} onHide={()=>{this.closeItem(1,0)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Item 1</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemdata.map(this.renderMenuItem)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeItem(1,0)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>
                    
                    <Row className="left-container">
                        <Button bsSize="large" onClick={()=>{this.showItem(1,1)}}> Item 2 </Button>
                        <Image className="padding-container" src={this.state.urlitem[1][1]} rounded responsive/>
                    </Row>
                        <Modal show={boolshowitem[1][1]} onHide={()=>{this.closeItem(1,1)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Item 2</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemdata.map(this.renderMenuItem)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeItem(1,1)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>
                    
                    <Row className="left-container">
                        <Button bsSize="large" onClick={()=>{this.showItem(1,2)}}> Item 3 </Button>
                        <Image className="padding-container" src={this.state.urlitem[1][2]} rounded responsive/>
                    </Row>
                        <Modal show={boolshowitem[1][2]} onHide={()=>{this.closeItem(0,2)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Item 3</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemdata.map(this.renderMenuItem)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeItem(1,2)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>
                    
                    <Row className="left-container">
                        <Button bsSize="large" onClick={()=>{this.showItem(1,3)}}> Item 4 </Button>
                        <Image className="padding-container" src={this.state.urlitem[1][3]} rounded responsive/>
                    </Row>
                        <Modal show={boolshowitem[1][3]} onHide={()=>{this.closeItem(0,3)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Item 4</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemdata.map(this.renderMenuItem)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeItem(1,3)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>
                    
                    <Row className="left-container">
                        <Button bsSize="large" onClick={()=>{this.showItem(1,4)}}> Item 5 </Button>
                        <Image className="padding-container" src={this.state.urlitem[1][4]} rounded responsive/>
                    </Row>
                        <Modal show={boolshowitem[1][4]} onHide={()=>{this.closeItem(1,4)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Item 5</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemdata.map(this.renderMenuItem)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeItem(1,4)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>
                    
                    <Row className="left-container">
                        <Button bsSize="large" onClick={()=>{this.showItem(1,5)}}> Item 6 </Button>
                        <Image className="padding-container" src={this.state.urlitem[1][5]} rounded responsive/>
                    </Row>
                        <Modal show={boolshowitem[1][5]} onHide={()=>{this.closeItem(1,5)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Item 6</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemdata.map(this.renderMenuItem)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.closeItem(1,5)}}>Cerrar</Button>
                        </Modal.Footer>
                        </Modal>

                </Col>
            </Row>
            
            <Row>
                <Col classname='right-container' sm={6} md={6} lg={6}>
                    <Button onClick={()=> { this.calcularDamage(this.state.idchamp[0],this.state.idchamp[1],this.state.iditem[0][0],this.state.iditem[0][1],this.state.iditem[0][2],this.state.iditem[0][3],this.state.iditem[0][4],this.state.iditem[0][5],this.state.iditem[1][0],this.state.iditem[1][1],this.state.iditem[1][2],this.state.iditem[1][3],this.state.iditem[1][4],this.state.iditem[1][5]) }}>
                        Calcular
                    </Button>
                </Col>
                <Col classname='left-container' sm={6} md={6} lg={6}>
                    {this.state.attack[0] - this.state.recibe[0]}
                </Col>
            </Row>
            
        </div>
        );
    }
}

export default Simulador;