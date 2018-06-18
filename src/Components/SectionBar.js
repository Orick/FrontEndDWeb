import React, {Component} from 'react';
import { Navbar, Nav, NavItem, Grid} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './login';
import Summoner from './summoner';
import Simulador from './simulador';
import Stats from './stats';
import Inicio from './inicio';
import store from "./redux/store";

class SectionBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            logeado : store.getState().logeado,
            summoner: store.getState().summoner,
        };

        store.subscribe(() => {
            this.setState({
                logeado: store.getState().logeado,
                summoner: store.getState().summoner,
            });
        });
    }

    render() {
        const {logeado ,summoner} = this.state;
        return (
            <Router>
                <Grid style={{paddingRight: '0px',paddingLeft: '0px'}}>
                    <Navbar inverse collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand> League of Build </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <NavItem componentClass={Link} href="/" to="/">Inicio</NavItem>
                                <NavItem componentClass={Link} href="/simulador" to="/simulador">Simulador</NavItem>
                                <NavItem componentClass={Link} href="/stats" to="/stats">Estadísticas</NavItem>
                            </Nav>
                            <Login/>
                        </Navbar.Collapse>
                    </Navbar>

                    <Route exact path="/" render={() => <Inicio logeado={logeado} summoner={summoner}/>} />
                    <Route path="/simulador" component={Simulador}/>
                    <Route path="/summoner" component={Summoner}/>
                    <Route path="/stats" component={Stats} />
                </Grid>
            </Router>
        );
    }
}

export default SectionBar;
