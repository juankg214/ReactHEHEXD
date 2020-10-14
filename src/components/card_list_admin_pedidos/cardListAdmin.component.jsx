import React from "react";
import CardItemAdmin from "./cardItemAdmin.component";

const CardListAdmin = ({data, update}) => {
    const items = data.map(pedido => {
        return (
            <CardItemAdmin status={pedido.score} update={update} key={pedido.idOrder} id={pedido.idOrder} name={pedido.name} address={pedido.address} cel={pedido.telephone} fecha={pedido.dateOrder}
            estado={pedido.state} comentarios={pedido.comments} indicaciones={pedido.indications} products={pedido.productsInOrder} precio={pedido.priceOrder} delivery={pedido.delivery} />
        )
    })
    return (
        <div className={"box"}>
            {items}
        </div>
    )
}
export default CardListAdmin;