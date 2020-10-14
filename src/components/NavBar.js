import React from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";

const NavBar = ({cart, history, type = "client",signout,cart_chosen}) => {
    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => history.push(`/${localStorage.getItem("role")}/home`)}>Menu</Nav.Link>
                    <Nav.Link
                        onClick={() => history.push(`/${localStorage.getItem("role")}/mis_ordenes`)}>Pedidos</Nav.Link>
                    <Nav.Link style={{display: type !== "client" ? "" : "none"}}
                              onClick={() => history.push(`/${localStorage.getItem("role")}/pedidos`)}>Ordenes Actuales</Nav.Link>
                    <Nav.Link style={{display: type === "admin" ? "" : "none"}}
                              onClick={() => history.push(`/${localStorage.getItem("role")}/empleados`)}>Gestion Empleados</Nav.Link>
                    <Nav.Link style={{display: type === "admin" ? "" : "none"}}
                              onClick={() => history.push(`/${localStorage.getItem("role")}/productos`)}>Gestion Productos</Nav.Link>
                    <Nav.Link style={{display: type === "admin" ? "" : "none"}}
                              onClick={() => history.push(`/${localStorage.getItem("role")}/ordenes`)}>Gestion Ordenes</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Button variant={"none"}
                    style={{marginLeft: "0", color: "#fff", zIndex: "1", position: "relative", borderRadius: "60px"}}
                    title={"Cerrar Sesión"}
                    onClick={() => signout("false")}
            >
                Cerrar Sesión
            </Button>
            <Button variant={"none"}
                    style={{marginLeft: "0", zIndex: "1", position: "relative", color: "#fff", borderRadius: "60px"}}
                    className={"justify-content-center mr-3"}
                    title={"Ir al Carrito"}
                    onClick={() => history.push(`/${localStorage.getItem("role")}/cart`)}
            >
                <FontAwesomeIcon icon={faShoppingCart}
                                 style={{fontSize: "1.5rem", zIndex: "1", color: "#fff"}}/>
                <span className={"dot2"}>{cart_chosen.length}</span>
            </Button>
        </Navbar>


    )
}
function mapStateToProps(state) {
    return {
        cart_chosen: state.cart_chosen
    }
}

export default connect(mapStateToProps)(withRouter(NavBar));