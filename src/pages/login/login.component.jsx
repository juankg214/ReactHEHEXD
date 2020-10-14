import React from "react";
import "./login.styles.scss"
import {Col, Container, Image, Row} from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import swal from "sweetalert";
import CardLogin from "../../components/card_login/CardLogin";
import {apiLogin} from "../../api";
import {withRouter} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email_reg: "",
            name_reg: "",
            address_reg: "",
            number_reg: "",
            password_reg: "",
            loadingLogin: false,
            loadingReg: false
        }
    }

    handleChangeName = (e) => {
        this.setState({
            username: e.target.value,
        });
    };

    handleChangePass = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleLogin = (e) => {
        e.preventDefault();
        const {username, password} = this.state;
        if (username && password) {
            this.setState({loadingLogin: true})
            apiLogin({email: username, password: password}, (res) => {
                this.setState({loadingLogin: false})
                if (res.success) {
                    console.log("Sucess Login")
                    console.log(res);
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("role", res.role);
                    localStorage.setItem("address", res.address);
                    localStorage.setItem("tel",res.tel);
                    localStorage.setItem("username",res.username);
                    localStorage.setItem("nameuser",res.name);
                    localStorage.setItem("location",JSON.stringify(res.location));
                    //client, employee, admin
                    this.props.handler("true");
                } else {
                    if (res.message === "Password incorrect") {
                        swal("Contraseña Incorrecta", "Por favor revise la contraseña", "error");
                    } else if (res.message === "user doesn't exist") {
                        swal("El usuario no existe", "El usuario ingresado no existe", "error");
                    } else {
                        swal("Error", "Se ha detectado un error desconocido, por favor intente nuevamente", "error");
                    }
                }
            });
        } else {
            swal("Error", "Por favor diligencie todos los campos", "error");
        }
    }

    render() {
        return (
            <Container fluid className={"container-login"}>
                <Row className={"row-login h-100 align-items-center"}>
                    <Col xs={12} md={6} className={"colLogin order-md-last align-self-center"}>
                            <Row className={"justify-content-center"}>
                                <Image src={Logo} className={"img-logo"} fluid/>
                                <CardLogin handleChangeName={this.handleChangeName}
                                           handleChangePass={this.handleChangePass}
                                           handleLogin={this.handleLogin}
                                           pass={this.state.password}
                                           user={this.state.username}
                                           loading={this.state.loadingLogin}
                                />
                            </Row>
                    </Col>

                </Row>
            </Container>
        );
    }
}

export default withRouter(Login);