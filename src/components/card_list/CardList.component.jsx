import React from "react";
import CardItem from "../card-item/CardItem";

const CardList = ({cart, type, filter}) => {
    let items = [];
    if (type === "HOME") {
        items = cart.map((product, i) => {
            return (
                product.idProductType === filter?<CardItem key={product.idProduct} name={product.name} precio={product.price} id={product.idProduct}
                          cart={parseInt(product.quant)} description={product.description} image={product.image}/>:null
            );

        })
    } else if (type === "CART") {

        items = cart.map((product, i) => {
            return (
                product.quant !== 0 ?
                    <CardItem key={product.idProduct} name={product.name} precio={product.price} id={product.idProduct}
                              cart={parseInt(product.quant)} description={product.description} image={product.image}/> : null

            );

        })
    } else if (type === "CART_SEARCH") {

        items = cart.map((product, i) => {
            return (
                product.quant !== 0 ?
                    <CardItem key={i} name={product.productInfo.name} precio={product.productInfo.price} id={product.idProduct}
                              cart={parseInt(product.amount)} type={"NOT_MODIFIES"} description={product.productInfo.description} image={product.productInfo.image}/> : null

            );

        })
    }
    return (
        <div className="container w-100 mt-4">
            <div className="box w-100">
                {items}
            </div>
        </div>
    )
}
export default CardList;