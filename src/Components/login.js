import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import firebase from '../config/firebaseConfig';
import store from './redux/store';
import {Nav, NavItem, Button} from 'react-bootstrap';
import '../css/bar.css';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            showLogin: false,
            visibleM: 'hidden',
            textError: '',
            showRecuperar: false,
            visibleRecuperar:'hidden',
            textErrorRecuperar: '',
            showUpdate: false,
            visibleUpdate: 'hidden',
            textErrorUpdate: '',
            visibleCrear:'hidden',
            showCrear: false,
            textErrorCrear:'',
            logeado : store.getState().logeado,
            summoner: store.getState().summoner,
            email: ''
        };
        this.loginForm = this.loginForm.bind(this);
        this.loginShow = this.loginShow.bind(this);
        this.loginClose = this.loginClose.bind(this);
        this.loginCorrect = this.loginCorrect.bind(this);
        this.recuperarShow = this.recuperarShow.bind(this);
        this.recuperarClose = this.recuperarClose.bind(this);
        this.recuperarContrasena= this.recuperarContrasena.bind(this);

        this.logOutCorrect = this.logOutCorrect.bind(this);

        this.showUpdatePassword = this.showUpdatePassword.bind(this);
        this.closeUpdatePassword1 = this.closeUpdatePassword1.bind(this);
        this.cambiarContrasena = this.cambiarContrasena.bind(this);

        this.crearShow= this.crearShow.bind(this);
        this.closeCrear= this.closeCrear.bind(this);
        this.crearUsuario= this.crearUsuario.bind(this);

        store.subscribe(() => {
            this.setState({
                logeado: store.getState().logeado,
                email:store.getState().email
            });
        });
    }
    static validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    loginShow(){
        this.setState({
            showLogin: true,
            visibleM: 'hidden'
        });
    }
    loginClose(){
        this.setState({
            showLogin: false
        });
    }

    recuperarShow(){
        this.setState({
            showRecuperar: true,
            visibleRecuperar:'hidden'
        });
    }
    recuperarClose(){
        this.setState({
            showRecuperar: false,
            visibleRecuperar:'hidden'
        });
    }


    showUpdatePassword(){
        this.setState({
            showUpdate: true,
            visibleUpdate:'hidden'
        });
    }
    closeUpdatePassword1(){
        this.setState({
            showUpdate: false,
            visibleUpdate:'hidden'
        });
    }

    crearShow(){
        this.setState({
            showCrear: true,
            visibleCrear:'hidden'
        });
    }
    closeCrear(){
        this.setState({
            showCrear: false,
            visibleCrear:'hidden'
        });
    }



    crearUsuario(){
        const emailCrear = this.refs.emailCrear.value;

        const passwordCrear = this.refs.passwordCrear.value;
        if(emailCrear && passwordCrear){

            this.setState({
                visibleCrear:'visible',
                textErrorCrear: 'Cargando..'
            });

            if(Login.validateEmail(emailCrear)){
                fetch('http://localhost:8080/assocciatedAccounts/create',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: "email="+emailCrear+"&password="+passwordCrear
                })
                .then(res => res.json())
                .then(result => {
                    this.setState({
                        visibleCrear:'visible',
                        textErrorCrear: result.description
                    });
                })
                .catch( error => {
                    console.log("fetch error : ", error);
                });
            }else{
                this.setState({
                    visibleCrear:'visible',
                    textErrorCrear: 'Formato email no correcto'
                });
            }
        }else{
            this.setState({
                visibleCrear:'visible',
                textErrorCrear: 'Faltan datos'
            });
        }
    }



    cambiarContrasena(){
        const emailUpdate = this.state.email;
        if(emailUpdate){

            this.setState({
                visibleUpdate:'visible',
                textErrorUpdate: 'Cargando..'
            });

            if(Login.validateEmail(emailUpdate)){
                const clase = this;
                firebase.auth().sendPasswordResetEmail(emailUpdate).then(function() {
                    clase.setState({
                        visibleUpdate:'visible',
                        textErrorUpdate: 'Se ha enviado un correo con las instrucciones'
                    });
                }).catch(function(error) {
                    clase.setState({
                        visibleUpdate:'visible',
                        textErrorUpdate: 'Error inesperado, intente mas tarde'
                    });
                });
            }else {
                this.setState({
                    visibleUpdate:'visible',
                    textErrorUpdate: 'Formato email erroneo'
                });
            }
        }else{
            this.setState({
                visibleUpdate:'visible',
                textErrorUpdate: 'Ingrese Email'
            });
        }
    }
    recuperarContrasena(){
        const emailRecuperar = this.refs.emailRecuperar.value;
        if(emailRecuperar){
            this.setState({
                visibleRecuperar:'visible',
                textErrorRecuperar: 'Cargando..'
            });
            if(Login.validateEmail(emailRecuperar)){
                const clase = this;
                firebase.auth().sendPasswordResetEmail(emailRecuperar).then(function() {
                    clase.setState({
                        visibleRecuperar:'visible',
                        textErrorRecuperar: 'Se ha enviado un correo con las instrucciones'
                    });
                }).catch(function(error) {
                    clase.setState({
                        visibleRecuperar:'visible',
                        textErrorRecuperar: 'Error inesperado, intente mas tarde'
                    });
                });
            }else {
                this.setState({
                    visibleRecuperar:'visible',
                    textErrorRecuperar: 'Formato email erroneo'
                });
            }
        }else{
            this.setState({
                visibleRecuperar:'visible',
                textErrorRecuperar: 'Ingrese Email'
            });
        }
    }
    loginCorrect(user){
        store.dispatch(
            {
                type: 'LOGEAR',
                summoner: user.data,
                email: user.email
            }
        );
    }
    logOutCorrect(){
        firebase.auth().signOut().then(function() {
            console.log('logOut ok');
            store.dispatch(
                {
                    type: 'LOGOUT'
                }
            );
        }).catch(function(error) {
            alert('Error Inesperado');
        });

    }
    loginForm(){
        const password = this.refs.pass.value;
        const email = this.refs.email.value;
        if( password && email){
            this.setState({
                visibleM: 'visible',
                textError: 'Cargando..'
            });
            if( Login.validateEmail(email) ){
                firebase.auth().signInWithEmailAndPassword(email,password)
                .then( user => {
                    user.getIdToken()
                        .then(Token => {
                            console.log(Token);
                            fetch('http://localhost:8080/assocciatedAccounts/get',{
                                method: 'POST',
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                body: "token="+Token
                            })
                            .then(res => res.json())
                            .then(result => {
                                this.loginCorrect({data:result.data, email:email});
                                this.loginClose();
                            })
                            .catch( error => {
                                console.log("fectch error : ", error);
                            });


                        }).catch(function (error) {
                            console.log('error: ', error);
                        });
                }).catch( error => {
                    this.setState({
                        visibleM: 'visible',
                        textError: 'Error en contraseña o email'
                    });
                });
            }else{
                this.setState({
                    visibleM: 'visible',
                    textError: 'Formato email no valido'
                });
            }
        }else{
            this.setState({
                visibleM: 'visible',
                textError: 'Faltan Datos'
            });
        }
    }

    render() {
        const {logeado, email,visibleM, textError, showLogin, showRecuperar, textErrorRecuperar,
            visibleRecuperar, showUpdate, visibleUpdate, textErrorUpdate,
            visibleCrear, showCrear, textErrorCrear} = this.state;
        return (
            <div>
                {logeado ?
                    <Nav pullRight>
                        <NavItem>
                            <p onClick={() => this.showUpdatePassword()} style={{margin: '0 0 0px'}}>{email}</p>
                            <Modal show={showUpdate} onHide={()=> this.closeUpdatePassword1() }>
                                <Modal.Header closeButton>
                                    <Modal.Title>Cambiar Contrasena</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <h3>{email}</h3>
                                    <br/>
                                    <Button  style={{marginTop:'5px'}} onClick={()=>{this.cambiarContrasena()}}>
                                        Cambiar
                                    </Button>
                                    <br/>
                                    <div>
                                        <p className="textError" style={{visibility:visibleUpdate}}> {textErrorUpdate} </p>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </NavItem>
                        <NavItem onClick={()=>{this.logOutCorrect()}}>
                            Logout
                        </NavItem>

                    </Nav>
                    :
                    <Nav pullRight>
                        <NavItem>
                            <p onClick={() => this.loginShow()} style={{margin: '0 0 0px'}}>Login</p>
                            <Modal  show={showLogin} onHide={() => this.loginClose()}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Login</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        Email <br/>
                                        <input
                                            type="text"
                                            ref="email"
                                        />
                                    </div>
                                    <div>
                                        Password <br/>
                                        <input
                                            type="password"
                                            ref="pass"
                                        />
                                    </div>
                                    <div>
                                        <a onClick={()=>{this.recuperarShow()}}>Recuperar contraseña</a>
                                        <Modal show={showRecuperar} onHide={() => this.recuperarClose()}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Recuperar Contrasena</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <input
                                                    type="text"
                                                    ref="emailRecuperar"
                                                    placeholder={'Email..'}
                                                />
                                                <br/>
                                                <Button style={{marginTop:"5px"}} bsSize="small" onClick={()=>{this.recuperarContrasena()}}>
                                                    Recuperar
                                                </Button>
                                                <br/>
                                                <div>
                                                    <p className="textError" style={{visibility:visibleRecuperar}}> {textErrorRecuperar} </p>
                                                </div>
                                            </Modal.Body>
                                        </Modal>



                                        <br/>
                                        <a onClick={()=>{this.crearShow()}}>Crear usuario</a>
                                        <Modal show={showCrear} onHide={() => this.closeCrear()}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Crear usuario</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                Email <br/>
                                                <input
                                                    type="text"
                                                    ref="emailCrear"
                                                />
                                                <br/>
                                                Password <br/>
                                                <input
                                                    type="password"
                                                    ref="passwordCrear"
                                                />
                                                <br/>
                                                 <Button style={{marginTop:"5px"}} bsSize="small" onClick={()=>{this.crearUsuario()}}>
                                                    Crear
                                                </Button>
                                                <br/>
                                                <div>
                                                    <p className="textError"  style={{visibility:visibleCrear}}> {textErrorCrear} </p>
                                                </div>
                                            </Modal.Body>
                                        </Modal>

                                    </div>
                                    <div style={{paddingTop:'3px'}}>
                                        <Button bsSize="small" onClick={()=>{ this.loginForm(); }}>
                                            <span>Login</span>
                                        </Button>

                                        <div>
                                            <p className="textError" style={{visibility:visibleM}}> {textError} </p>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </NavItem>

                    </Nav>
                }
            </div>
        );
    }
}

export default Login;
