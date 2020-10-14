import {ADD_TO_CART, REMOVE_FROM_CART, INIT_CART, RESET, ADD_PRINT} from "../actions/cart-actions";


const cartReducer = (state = {cart: [{item: "ads"}]}, {type, payload}) => {
    let aux = state.cart.slice(0);
    let aux2 = state.cart_chosen.slice(0);
    console.log("entered")
    switch (type) {
        case ADD_PRINT:
            console.log("entered print",payload)
            return{
                ...state,
                printProducts:payload
            }
        case RESET:
            console.log("entered reset")
            aux2.map(product => {
                product.quant = 0;
            });
            return {
                ...state,
                cart:aux,
                cart_chosen: [],
            }
        case ADD_TO_CART:
            console.log("entered add")
            const indexItem = aux.findIndex(item => item.idProduct === payload);
            aux[indexItem].quant += 1
            const indexItem2 = aux2.findIndex(item => item.idProduct === payload);
            if(indexItem2===-1){
                aux2.push(aux[indexItem]);
            }
            return {
                ...state,
                cart: aux,
                cart_chosen:aux2
            };
        case REMOVE_FROM_CART:
            console.log("entered remove")
            const indexItemRemove = aux.findIndex(item => item.idProduct === payload);
            const indexItem2ToRemove = aux2.findIndex(item => item.idProduct === payload);
            let quant = aux[indexItemRemove].quant -= 1;
            if (quant === -1) {
                aux[indexItemRemove].quant = 0;
            }
            if(indexItem2ToRemove!==-1){
                if(aux2[indexItem2ToRemove].quant===0){
                    console.log("entered remove");
                     aux2.splice(indexItem2ToRemove, 1);
                }
            }
            console.log(aux2)
            return {
                ...state,
                cart: aux,
                cart_chosen:aux2
            }
        case INIT_CART:
            console.log("entered init")
            return {
                ...state,
                cart:payload
            }


        default:
            console.log("entered default")
            return state;
    }
};

export default cartReducer;