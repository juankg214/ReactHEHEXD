import React from "react";
import "../login/login.styles.scss"
import {Col, Container, Image, Row} from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import swal from "sweetalert";
import CardRegister from "../../components/card-register/CardRegister";
import { apiRegister} from "../../api";
import {withRouter} from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email_reg: "",
            name_reg: "",
            address_reg: "",
            addressarr: ["","","",""],
            number_reg: "",
            password_reg: "",
            password_com:"",
            loadingLogin: false,
            loadingReg: false,
            accept:false
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
    handleChangeAddress = (e) =>{
        let pos = parseInt(e.target.name.split("ad")[1]);
        let arr = this.state.addressarr
        arr[pos] = e.target.value
        let add = arr[0] + " "+ arr[1] + " #" + arr[2] + " - " + arr[3] +" Bogotá"
        this.setState({
            addressarr:arr,
            address_reg:add
        })
        console.log(this.state)
    }

    handleRegister = (e) => {
        e.preventDefault();
        const {email_reg, name_reg, address_reg, number_reg, password_reg,password_com} = this.state;
        if (email_reg && name_reg && address_reg && number_reg && password_reg) {
            if(password_reg !== password_com){
                swal("Las contraseñas no coinciden")
            }else if(!this.state.accept){
                swal("Debes aceptar los terminos y condiciones")
            } else{
                this.setState({loadingReg: true})
                apiRegister({
                    userName: email_reg.split("@")[0],
                    name: name_reg,
                    email: email_reg,
                    password: password_reg,
                    telephone: number_reg,
                    address: address_reg
                }, (res) => {
                    this.setState({loadingReg: false})
                    if (res.success) {
                        console.log("Sucess Register")
                        swal("Usuario Creado", "El usuario ha sido creado Exitosamente", "success")
                            .then(() => {
                                this.props.history.push('/')
                            })
                    } else {
                        if (res.message === "Validation error") {
                            swal("Error de validación", "El usuario ingresado ya existe", "error");
                        } else {
                            swal("Error", res.message, "error");
                        }
                    }
                })
            }
        } else {
            swal("Error", "Por favor diligencie todos los campos", "error");
        }
    }

    render() {
        console.log(this.state)
        return (
            <Container fluid className={"container-login"}>
                <Row className={"row-login h-100 align-items-center"}>
                    <Col xs={12} md={8} className={"colLogin order-md-last align-self-center"}>
                        <Row className={"justify-content-center"}>
                            <Image src={Logo} className={"img-logo"} fluid/>
                            <CardRegister handleRegister={this.handleRegister}
                                          handleChangeEmail={(e) => this.setState({email_reg: e.target.value})}
                                          handleChangeName={(e) => this.setState({name_reg: e.target.value})}
                                          handleChangeAddress={this.handleChangeAddress}
                                          handleChangeNumber={(e) => this.setState({number_reg: e.target.value})}
                                          handleChangePassword={(e) => this.setState({password_reg: e.target.value})}
                                          handleChangePasswordConfirm={(e) => this.setState({password_com: e.target.value})}
                                          handleAccept={(e) => this.setState({accept: e.target.checked})}
                                          loading={this.state.loadingReg}
                            />
                        </Row>
                    </Col>

                </Row>
            </Container>
        );
    }
}

export default withRouter(Register);