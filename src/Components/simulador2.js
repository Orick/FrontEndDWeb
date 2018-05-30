import React, { Component } from 'react';
import {Row, Col, SplitButton, MenuItem} from 'react-bootstrap';
import '../css/simulador.css'; 

class Simulador2 extends Component {
    constructor(props){
        super(props);

        this.state = {
            attack: [],
            recibe: [],
        };
        this.calcularDamage = this.calcularDamage.bind(this);
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
    
    render() {
        return (
            <div>
                {this.state.attack[0] - this.state.recibe[0]}
            <button onClick={()=> { this.calcularDamage(1,2,1001,0,0,0,0,0,0,0,1001,0,0,0) }}>
                Calcular
            </button>
            </div>
        );
    }
}

export default Simulador2;