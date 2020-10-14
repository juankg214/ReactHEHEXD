import React from "react";
import {Button, Card} from "react-bootstrap";
import {connect} from "react-redux";
import {addToCart, removeFromCart} from "../../actions/cart-actions";

const CardItem = ({name, precio, id, addToCart, cart, removeFromCart, image, description, type="normal"}) => {
    function addCart() {
        addToCart(id)
    }

    function removeCart() {
        removeFromCart(id);
    }

    return (
        <Card style={{width: "19rem", minHeight: "25rem"}} className={"item mb-4"}>

            <Card.Img variant="top" style={{zIndex: "1", position: "relative", minHeight: "190px"}}
                      src={(`/img/${image}.jpg`)}/>
            <span className={"dot"} style={{display: cart !== 0 ? "" : "none"}}>{cart}</span>

            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <div style={{minHeight:"4rem", textAlign:"left"}} className={"div_desc"}>
                    <hr/>
                    <p style={{fontSize: "0.8rem"}}>{description}</p>
                </div>
                <hr style={{marginTop:"0"}}/>
                <div style={{display:type!=="normal"?"none":""}}>
                    <h5 style={{display: "inline-block"}}> ${precio} </h5>
                    <Button variant={"none"} className={"remover ml-4 mr-1"} style={{display: "inline-block"}}
                            onClick={() => removeCart()}
                            size="sm">Remover</Button>
                    <Button variant={"none"} className={"añadir"} style={{display: "inline-block"}}
                            onClick={() => addCart()}
                            size="sm">Añadir</Button>
                </div>
            </Card.Body>
        </Card>
    )

}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: item => dispatch(addToCart(item)),
        removeFromCart: id => dispatch(removeFromCart(id))
    }
}

export default connect(null, mapDispatchToProps)(CardItem);