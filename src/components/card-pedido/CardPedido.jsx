import React from "react";
import {Button, Card} from "react-bootstrap";
import {withRouter} from "react-router-dom";

const CardPedido = ({fecha, precio, id, history, estado, direccion}) => {
    return (
        <Card className={"item mb-4"} style={{width: "18rem"}}>
            <Card.Body>
                <Card.Title>ID Orden #{id}</Card.Title>
                <p className={"p-admin"}><b> Precio: </b> ${precio}</p>
                <p className={"p-admin"}><b> Dirección: </b> {direccion}</p>
                <hr/>
                <p style={{textAlign: "center", color: "#A30021"}}>{estado}</p>
                <hr/>
                <div>
                    <Button variant={"none"} className={"añadir"} style={{width: "100%"}}
                            size="sm"
                            onClick={() => history.push(`/${localStorage.getItem("role")}/cart?${id}`)}
                    >Consultar Pedido
                    </Button>
                </div>

            </Card.Body>
        </Card>
    )

}
export default withRouter(CardPedido);