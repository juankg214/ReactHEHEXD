import React, {useState} from "react";
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {apiChangeState} from "../../api";
import {connect} from "react-redux";
import {addPrint} from "../../actions/cart-actions";


const CardItemAdmin = ({name, address, cel, fecha, estado, id, history, precio, update, products, comentarios, indicaciones, onPrint,delivery,status}) => {
    console.log(delivery)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const titleEstado = React.createRef();
    let print = {products:[],direccion:address,telefono:cel,indicaciones:indicaciones,comentarios:comentarios, id:id,precio:precio,name:name,delivery:delivery}

    const items = products.map((product,i) => {
        print.products.push({name:product.productInfo.name,precio:product.totalPrice,quant:product.amount, package:product.productInfo.package})
        return(
            <div key={i} className="d-flex bd-highlight"  style={{backgroundColor: i % 2 === 1 ? "#F8F8F8" : "#FFF"}}>
                <div className="p-2 flex-grow-1 bd-highlight">{product.productInfo.name} X{product.amount}</div>
                <div className="p-2 bd-highlight">
                    ${product.totalPrice}
                </div>
            </div>
        );
    })


    function handleChange(key) {
        apiChangeState({token:localStorage.getItem("token"),idOrderRef:id,idStateRef:key},(res) => {
            console.log(res)
            if(res.success){
                update();
            }
        });
    }

    return (
        <div>
            <Card style={{width: "18rem", border: "2px solid #606060"}} className={"item mb-4 mt-2"}>
                <Card.Body>
                    <Card.Title style={{fontSize: "1.5rem"}}> <b>Pedido #{id} - {status ===1 ? "Telefono" : "Web"}</b></Card.Title>
                    <Row>
                        <Col xs={12} sm={12}>
                            <p className={"p-admin"}><b> Nombre: </b> {name}</p>
                            <p className={"p-admin"}><b> Dirección: </b> {address}</p>
                            <p className={"p-admin"}><b> Celular: </b> {cel}</p>
                            <p className={"p-admin"}><b> Fecha: </b>{new Date(fecha).toString().split("GMT")[0]}</p>
                            <p className={"p-admin"}><b> Precio: </b> ${precio}</p>
                        </Col>
                    </Row>
                    <hr/>
                    <p style={{textAlign: "center", color: "#A30021"}}>{estado}</p>
                    <hr/>

                    <div className={"mt-4"}>
                        <Button variant={"none"} className={"btn-pedido mr-2"} style={{display: "inline-block"}}
                                onClick={() => history.push(`/${localStorage.getItem("role")}/cart?${id}`)}
                                size="sm">Ver Pedido</Button>
                        <Button variant={"none"} className={"btn-detalles"} style={{display: "inline-block"}}
                                onClick={handleShow}
                                size="sm">Detalles</Button>
                    </div>

                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title ref={titleEstado}>Pedido #{id} - {status ===1 ? "Telefono" : "Web"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12} sm={6} style={{textAlign: "center"}}>
                                <hr/>
                                <b ref={titleEstado} style={{fontSize: "1.5rem"}}>  {estado} </b>
                                <hr/>
                                <div style={{textAlign: "center"}}>
                                    <Button variant={"none"} className={"btn-estado mt-4"}
                                            onClick={() => handleChange(2)}>Confirmado</Button>
                                    <Button variant={"none"} className={"btn-estado"}
                                            onClick={() => handleChange(3)}>Cocinando</Button>
                                    <Button variant={"none"} className={"btn-estado"}
                                            onClick={() => handleChange(4)}>En Camino</Button>
                                    <Button variant={"none"} className={"btn-estado"}
                                            onClick={() => handleChange(5)}>Entregado</Button>
                                </div>
                            </Col>
                            <Col className={"align-self-center"}>
                                {items}
                                <div style={{textAlign: "end"}}>
                                    <h4 className={"mt-4 mb-4"}>Total: ${precio}</h4>
                                    <Button variant={"none"} className={"btn-detalles"}
                                            style={{width: "10rem", fontSize: "1rem"}}
                                            onClick={() => {
                                                onPrint(print);
                                                localStorage.setItem("data", JSON.stringify(print))
                                                window.open(`${window.location.origin}/${localStorage.getItem("role")}/print`)
                                            }}>Imprimir Recibo</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="none" className={"btn-detalles"} style={{width: "5rem", fontSize: "0.8rem"}}
                            onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapActionsToProps = {
    onPrint: addPrint
}

export default connect(null,mapActionsToProps)(withRouter(CardItemAdmin));
