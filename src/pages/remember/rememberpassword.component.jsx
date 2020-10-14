import React from "react";
import "./login.styles.scss"
import {Button, Card, Col, Container, Form, Image, Row, Spinner} from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import swal from "sweetalert";
import CardLogin from "../../components/card_login/CardLogin";
import {apiRememberMail, apiRememberPass, apiRememberpASS} from "../../api";
import {useHistory, withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey, faUser,faUserLock} from "@fortawesome/free-solid-svg-icons";
import InputForm from "../../components/inputs-form/InputForm.component";

class RememberPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password:"",
            token: this.props.match.params.token
        }
    }

    render() {
        console.log(this.state)
        return (
            <Container fluid className={"container-login"}>
                <Row className={"row-login h-100 align-items-center"}>
                    <Col xs={12} md={6} className={"colLogin order-md-last align-self-center"}>
                        <Row className={"justify-content-center"}>
                            <Image src={Logo} className={"img-logo"} fluid/>
                            <Card className={"card-login shadow-lg p-3 mt-4 mb-4"}>
                                <Card.Title className={"card-title-login mb-0"}>
                                    <FontAwesomeIcon icon={faUserLock} className={"mr-2"}/>
                                    Nueva contraseña</Card.Title>
                                <hr/>
                                <Card.Body>
                                    <Form>
                                        <InputForm type="password" placeholder="Nueva contraseña" icon={faUser} value={this.state.password} handler={(e) =>this.setState({password:e.target.value}) }/>
                                        <Button variant="none" className="prim red-color w-100" type="button"
                                                onClick={()=> {
                                                    apiRememberPass({
                                                        password:this.state.password,
                                                        token:this.state.token
                                                    },(res)=>{
                                                        if(res.success){
                                                            swal(
                                                                "Contraseña actualizada",
                                                                "La contraseña ha sido acutalizada",
                                                                "success"
                                                            ).then(this.props.history.push('/'))
                                                        }else{
                                                            swal(
                                                                "Ha ocurrido un problema",
                                                                "la contraseña no fue actualizada",
                                                                "error"
                                                            ).then(this.props.history.push('/'))
                                                        }
                                                    });
                                                }}>
                                            Reestablecer</Button>
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

export default withRouter(RememberPassword);