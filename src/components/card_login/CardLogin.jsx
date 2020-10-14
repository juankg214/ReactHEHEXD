import React from "react";
import {Button, Card, Form, Spinner} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import InputForm from "../inputs-form/InputForm.component";

const CardLogin = (props) => {
    const history = useHistory();
    return(
        <Card className={"card-login shadow-lg p-3 mt-4 mb-4"}>
            <Card.Title className={"card-title-login mb-0"}>
                <FontAwesomeIcon icon={faUser} className={"mr-2"}/>
                Iniciar Sesión</Card.Title>
            <hr/>
            <Card.Body>
                <Form onSubmit={props.handleLogin}>
                    <InputForm type="email" placeholder="Email" icon={faUser}
                               handler={props.handleChangeName} value={props.user}/>
                    <InputForm type="password" placeholder="Contraseña" icon={faKey}
                               value={props.pass}
                               handler={props.handleChangePass}/>
                    <p>
                        ¿Olvidaste la contraseña? <a href="/remember">click aqui</a>
                    </p>
                    <Button variant="none" className="prim red-color w-100" type="submit">
                        {props.loading &&
                        <Spinner as="span" className="mr-2" animation="grow" size="sm"/>
                        }
                        Iniciar Sesión </Button>
                    <Button variant="none" className="prim blue-color w-100" type="button" onClick ={() => {
                        console.log("asd")
                        history.push('/register')
                    }}> Registrate </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default CardLogin;