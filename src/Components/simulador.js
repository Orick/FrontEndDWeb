import React, { Component } from 'react';
import {Row, Col, SplitButton, MenuItem, Modal, Button, Image, Popover, OverlayTrigger} from 'react-bootstrap';
import '../css/simulador.css'; 

class Simulador extends Component {
    constructor(props){
        super(props);

        this.state = {
            idchamp: [0, 0],
            urlchamp: ["", ""],
            boolshowchamp: [false, false],
            iditem: [[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0]],
            urlitem: [["", "", "", "", "", ""],["", "", "", "", "", ""]],
            boolshowitem: [[false, false, false, false, false, false],[false, false, false, false, false, false]],
            champdata: [],
            itemdata: [],
            actualItemButton: [-1,-1],
            actualChampButton: -1
        };

        this.showItem = this.showItem.bind(this);
        this.closeItem = this.closeItem.bind(this);
        this.renderMenuChamp = this.renderMenuChamp.bind(this);
        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.getChampions = this.getChampions.bind(this);
    }

    closeItem(i, j) {
        let items = this.state.boolshowitem;
        items[i][j] = false;
        this.setState({ boolshowitem: items, actualItemButton: [-1,-1] });
    }

    showItem(i, j) {
        let items = this.state.boolshowitem;
        items[i][j] = true;
        this.setState({ boolshowitem: items, actualItemButton: [i,j] });
    }

    renderMenuChamp(champ, i) {
        return (
            <MenuItem eventKey={champ[0]}>{champ[1]}</MenuItem>
        );
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

    getChampions(){
        const champs = [[50, 'Anie'], [14 ,'Warwick'], [25 ,'Urgot'], [10 ,'Miss Fortune'], [85 ,'Rexai']];
        return (champs);
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
    }

    render() {
        const CHAMPIONS = this.getChampions();
        const {boolshowitem,itemdata} = this.state;
        return (
            <Row>
                {console.log(this.state.actualItemButton)}
                <Col sm={6} md={6} lg={6}>
                    
                    <Row className="center-container">
                    <SplitButton title="Campeon 1">
                        {CHAMPIONS.map(this.renderMenuChamp)}
                    </SplitButton>
                    </Row>

                    <Row className="left-container">
                        <Col sm={0} md={0} lg={0}>
                            <Button bsSize="large" onClick={()=>{this.showItem(0,0)}}> Item 1 </Button>
                        </Col>
                        <Col sm={0} md={0} lg={0}>
                            <Image src={this.state.urlitem} rounded responsive/>
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

                    <Row className="center-container">
                    <SplitButton title="Campeon 2">
                        {CHAMPIONS.map(this.renderMenuChamp)}
                    </SplitButton>
                    </Row>

                    <Row className="left-container">
                        <Button bsSize="large" onClick={()=>{this.showItem(1,0)}}> Item 1 </Button>
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
        );
    }
}

export default Simulador;