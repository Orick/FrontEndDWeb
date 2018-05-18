import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import firebase from '../config/firebaseConfig';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            showLogin: false,
            visibleM: 'hidden',
            textError: ''
        };

        this.loginForm = this.loginForm.bind(this);
        this.loginShow = this.loginShow.bind(this);
        this.loginClose = this.loginClose.bind(this);
    }

    static validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    loginShow(){
        this.setState({
            showLogin: true
        });
    }
    loginClose(){
        this.setState({
            showLogin: false
        });
    }

    loginForm(){
        const password = this.refs.pass.value;
        const email = this.refs.email.value;
        if( password && email){
            this.setState({
                visibleM: 'hidden'
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
                                console.log(result);
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
        const {visibleM, textError, showLogin} = this.state;
        return (
            <div>
                <p onClick={() => this.loginShow()} style={{margin: '0 0 0px'}}>Login</p>
                <Modal show={showLogin} onHide={() => this.loginClose()}>
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
                            Pass <br/>
                            <input
                                type="password"
                                ref="pass"
                            />
                        </div>
                        <div>
                            <button onClick={()=>{ this.loginForm(); }}>
                                <span>Login</span>
                            </button>
                            <div>
                                <p style={{visibility:visibleM}}> {textError} </p>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        );
    }
}

export default Login;
