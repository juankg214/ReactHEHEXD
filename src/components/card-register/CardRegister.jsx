import React from "react";
import {Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {withRouter} from "react-router-dom";

const CardRegister = (props) => {
    return(
        <Card className={"w-100 shadow-lg p-1 mt-1"} style={{borderRadius: "0"}}>
            <Row className={"h-100 align-items-center"}>
                <Col className={"h-100"}>
            <Card.Title className={"card-title-login mb-0"}>
                <FontAwesomeIcon icon={faUserPlus} className={"mr-3"} style={{display:props.type==="admin"?"none":""}} />
                Crear Cuenta</Card.Title>
            <hr/>
            <Card.Body>
                <Form onSubmit={props.handleRegister}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com"
                                      onChange={props.handleChangeEmail}
                        />
                    </Form.Group>
                    <Form.Group controlId="nombre">
                        <Form.Label>Nombre Completo</Form.Label>
                        <Form.Control type="text" placeholder="Jhon Doe"
                                      onChange={props.handleChangeName}/>
                    </Form.Group>
                    <Form.Group controlId="direccion">
                        <Form.Label>Dirección de Residencia</Form.Label>
                        <Row>
                            <Col xs={8} sm={4}>
                                <Form.Control as="select" onChange={props.handleChangeAddress} name={"ad0"}>
                                    <option value=""></option>
                                    <option value="Calle">Calle</option>
                                    <option value="Carrera">Carrera</option>
                                    <option value="Avenida">Avenida</option>
                                    <option value="Av. Carrera">Av. Carrera</option>
                                    <option value="Av. Calle">Av. Calle</option>
                                    <option value="Circular">Circular</option>
                                    <option value="Circunvalar">Circunvalar</option>
                                    <option value="Diagonal">Diagonal</option>
                                    <option value="Manzana">Manzana</option>
                                    <option value="Transversal">Transversal</option>
                                    <option value="Via">Via</option>
                                </Form.Control>
                            </Col>
                            <Col xs={4} sm={2}>
                                <Form.Control type="text" placeholder="26" name={"ad1"} onChange={props.handleChangeAddress}/>
                            </Col>
                            <Col xs={1}>
                                #
                            </Col>
                            <Col xs={4} sm={2}>
                                <Form.Control type="text" placeholder="15" name={"ad2"} onChange={props.handleChangeAddress}/>
                            </Col>
                            <Col xs={1}>
                                -
                            </Col>
                            <Col xs={4} sm={2}>
                                <Form.Control type="text" placeholder="20" name={"ad3"} onChange={props.handleChangeAddress}/>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="telefono">
                        <Form.Label>Número de Telefono</Form.Label>
                        <Form.Control type="number" placeholder="3104787358"
                                      onChange={props.handleChangeNumber}/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                      onChange={props.handleChangePassword}/>
                    </Form.Group>
                    <Form.Group controlId="passwordconfirm">
                        <Form.Label>Confirmar contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                                      onChange={props.handleChangePasswordConfirm}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Acepto terminos y condiciones para el manejo de mis datos personales" onChange={props.handleAccept}/>
                    </Form.Group>
                    <Button variant="none" className="prim red-color w-100" type="submit">
                        {props.loading &&
                        <Spinner as="span" className="mr-2" animation="grow" size="sm"/>
                        }
                        Registrarse </Button>
                    <Button variant="none" className="prim blue-color w-100" type="button"
                        onClick={()=>props.history.push("/")}>
                        Volver
                    </Button>
                </Form>
            </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default withRouter(CardRegister);