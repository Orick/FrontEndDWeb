import React, { Component } from 'react';
import {Row, Col, SplitButton, MenuItem} from 'react-bootstrap';
import '../css/simulador.css'; 

class Simulador2 extends Component {
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
            iditem26: 0,
            itemdata: null
        };
    }

    calcularDaño(champ1,champ2,iditem11,iditem12,iditem13,iditem14,iditem15,iditem16,iditem21,iditem22,iditem23,iditem24,iditem25,iditem26){
        fetch('http://localhost:8000/simulador/attack/' + champ1 + '/' + iditem11 + '/' + iditem12 + '/' + iditem13 + '/' + iditem14 + '/' + iditem15 + '/' + iditem16)
        .then(response => response.json())
        .then(result => {
            console.log(result)

        });
    }
    
    render() {
        const {idchamp1, idchamp2, iditem11, iditem12, iditem13, iditem14, iditem15, iditem16, iditem21, iditem22, iditem23, iditem24, iditem25, iditem26} = this.state;
        return (
            <div> holi </div>
        );
    }
}

export default Simulador2;