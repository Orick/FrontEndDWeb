import React, { Component } from 'react';
import {Row, Col, SplitButton, MenuItem} from 'react-bootstrap';
import '../css/simulador.css'; 

class Simulador extends Component {
    constructor(props){
        super(props);

        this.state = {
            idchamp1: 0,
            idchamp2: 0,
            iditem11: 0,
            iditem12: 0,
            iditem13: 0,
            iditem14: 0,
            iditem15: 0,
            iditem16: 0,
            iditem21: 0,
            iditem22: 0,
            iditem23: 0,
            iditem24: 0,
            iditem25: 0,
            iditem26: 0
        };

        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.getChampions = this.getChampions.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    renderMenuItem(champ, i) {
        return (
            <MenuItem eventKey={champ[0]}>{champ[1]}</MenuItem>
        );
    }

    getChampions(){
        const champs = [[50, 'Anie'], [14 ,'Warwick'], [25 ,'Urgot'], [10 ,'Miss Fortune'], [85 ,'Rexai']];
        return (champs);
    }

    getItems(){
        const champs = [[50, 'Anie'], [14 ,'Warwick'], [25 ,'Urgot'], [10 ,'Miss Fortune'], [85 ,'Rexai']];
        return (champs);
    }

    render() {
        const {idchamp1, idchamp2, iditem11, iditem12, iditem13, iditem14, iditem15, iditem16, iditem21, iditem22, iditem23, iditem24, iditem25, iditem26} = this.state;
        const CHAMPIONS = this.getChampions();
        const ITEMS = this.getItems();
        return (
            <Row>
                <Col sm={6} md={6} lg={6} className="center-container">
                    <SplitButton title="Campeon 1">
                        {CHAMPIONS.map(this.renderMenuItem)}
                    </SplitButton>
                </Col>
                <Col sm={6} md={6} lg={6} className="center-container">
                    <SplitButton title="Campeon 2">
                        {CHAMPIONS.map(this.renderMenuItem)}
                    </SplitButton>
                </Col>
            </Row>
        );
    }
}

export default Simulador;