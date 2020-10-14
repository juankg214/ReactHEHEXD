import {apiGetAllClient} from "../api";

export const ADD_TO_CART = "cart:addToCart"
export const REMOVE_FROM_CART = "cart:removeFromCart"
export const INIT_CART = "cart:initCart"
export const RESET = "cart:reset"
export const ADD_PRINT = "cart:print"

export function addPrint(item) {
    return {
        type: ADD_PRINT,
        payload: item,
    }
}

export function addToCart(id) {
    return {
        type: ADD_TO_CART,
        payload: id,
    }
}

export function removeFromCart(id) {
    return {
        type: REMOVE_FROM_CART,
        payload: id,
    }
}

export function resetAll() {
    return {
        type:RESET,
        payload:"reset"
    }
}

export function apiRequest() {
    return dispatch => {
        apiGetAllClient((res) => {
            if (res.success) {
                let data = res.products;
                data.map(product => {
                    product.quant = 0;
                })
                dispatch(addCart(data))
            }
        });
    }
}

export function addCart(data) {
    return {
        type: INIT_CART,
        payload: data,
    }
}