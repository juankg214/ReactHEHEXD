import React from "react";
import CardPedido from "../card-pedido/CardPedido"

const CardList = ({ordenes}) => {


       const items = ordenes.map((orden, i) => {

            return (
                <CardPedido key={orden.idOrder} fecha={orden.dateOrder} direccion={orden.address} precio={orden.priceOrder} estado={orden.state} id={orden.idOrder}
                         />
            );

        })

    return (
        <div className="container w-100 mt-4">
            <div className="box w-100">
                {items}
            </div>
        </div>
    )
}
export default CardList;