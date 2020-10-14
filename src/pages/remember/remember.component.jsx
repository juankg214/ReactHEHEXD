import React from "react";
import "./login.styles.scss"
import {Button, Card, Col, Container, Form, Image, Row, Spinner} from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import swal from "sweetalert";
import CardLogin from "../../components/card_login/CardLogin";
import {apiRememberMail} from "../../api";
import {withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey, faUser,faUserLock} from "@fortawesome/free-solid-svg-icons";
import InputForm from "../../components/inputs-form/InputForm.component";

class Remember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:""
        }
    }

    render() {
        return (
            <Container fluid className={"container-login"}>
                <Row className={"row-login h-100 align-items-center"}>
                    <Col xs={12} md={6} className={"colLogin order-md-last align-self-center"}>
                        <Row className={"justify-content-center"}>
                            <Image src={Logo} className={"img-logo"} fluid/>
                            <Card className={"card-login shadow-lg p-3 mt-4 mb-4"}>
                                <Card.Title className={"card-title-login mb-0"}>
                                    <FontAwesomeIcon icon={faUserLock} className={"mr-2"}/>
                                    Olvidaste tu contraseña</Card.Title>
                                <hr/>
                                <Card.Body>
                                    <Form>
                                        <InputForm type="email" placeholder="Email" icon={faUser} value={this.state.email} handler={(e) =>this.setState({email:e.target.value}) }/>
                                        <Button variant="none" className="prim red-color w-100" type="button"
                                                onClick={()=> {
                                                    apiRememberMail({
                                                    email:this.state.email
                                                },(res)=>{
                                                    if(res.success){
                                                        swal(
                                                            "Correo enviado",
                                                            "El correo ha sido enviado a " + this.state.email,
                                                            "success"
                                                        ).then(this.props.history.push('/'))
                                                    }else{
                                                        swal(
                                                            "Correo no ha sido enviado",
                                                            "El correo no ha podido ser enviado por favor revice la dirrección",
                                                            "error"
                                                        ).then(this.props.history.push('/'))
                                                    }
                                                });
                                            }}>
                                            Recuperar</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>

                </Row>
            </Container>
        );
    }
}

export default withRouter(Remember);