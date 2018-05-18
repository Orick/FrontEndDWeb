import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Grid} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './login';

import Summoner from './summoner';
import Simulador from './simulador';
import Stats from './stats';
import Inicio from './inicio';



class PageName extends Component {
    render() {
        return (
            <Router>
                <Grid>
                    <Navbar inverse collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                                Op.wp
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <NavItem>
                                    <Link to="/">Inicio</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/simulador">Simulador</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/stats">Estadísticas</Link>
                                </NavItem>
                            </Nav>
                            <Nav pullRight>
                                <NavItem>
                                    <Login/>
                                </NavItem>

                                <NavItem/>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    <Route exact path="/" component={Inicio} />
                    <Route path="/summoner" component={Summoner}/>
                    <Route path="/simulador" component={Simulador}/>
                    <Route path="/stats" component={Stats} />
                </Grid>
            </Router>
        );
    }
}

export default PageName;
