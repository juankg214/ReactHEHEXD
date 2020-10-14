const DOMAIN = "https://porkyback.herokuapp.com";
// const DOMAIN = "http://localhost:3000";
const PATH_LOGIN = "/api/auth/login";
const PATH_REG = "/api/auth/sign-up";
const PATH_GET_PRODUCTS = "/api/products/getall";
const PATH_GET_PRODUCTS_CLIENT = "/api/products/getallclient";
const PATH_UPDATE_PRODUCT ="/api/products/updateproduct"
const PATH_CREATE_PRODUCT="/api/products/createproduct"
const PATH_UPLOAD_IMAGE="/api/products/uploadimage"
const PATH_CREATE_ORDER_CLIENT = "/api/orders/createorder";
const PATH_GET_ORDER_CLIENT = "/api/orders/getuserorders";
const PATH_GET_INFO_ORDER = "/api/orders/getinfoorder";
const PATH_GET_ACTIVE_ORDERS = "/api/orders/getactiveorders";
const PATH_CHANGE_STATE = "/api/orders/chagestate"
const PATH_GET_PHONEUSER = '/api/orders/getuserphone'
const PATH_CREATE_ORDER_CLIENT_PHONE = '/api/orders/createorderphone'
const PATH_GET_ALL_EMPLOYEES ="/api/employee/getall"
const PATH_UPDATE_EMPLOYEE ="/api/employee/updateemployee"
const PATH_GET_ALL_TYPES ="/api/producttype/getall"
const PATH_CREATE_TYPES ="/api/producttype/create"
const PATH_SEND_REMEMBER_EMAIL = "/api/remember/remembermail"
const PATH_SEND_REMEMBER_PASS = "/api/remember/rememberpass"
const PATH_LOCATION_CHECK= "/api/location/checkaddress"
const PATH_GET_ALL_ORDERS ="/api/orders/getallorders"
let headers = {
    "content-type": "application/json",
}

function request(url, body, handlerFunction) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers:headers
    }).then((response) => {
        return response.json();
    }).then((response) => {
       handlerFunction(response);
    })
}

export function apiLogin(data, handlerFunction) {
    request(DOMAIN+PATH_LOGIN, data, handlerFunction );
}

export function apiRegister(data, handlerFunction) {
    request(DOMAIN + PATH_REG, data, handlerFunction);
}

export function apiGetAll(handlerFunction) {
    request(DOMAIN + PATH_GET_PRODUCTS, {token: localStorage.getItem("token")}, handlerFunction);
}
export function apiGetAllClient(handlerFunction) {
    request(DOMAIN + PATH_GET_PRODUCTS_CLIENT, {token: localStorage.getItem("token")}, handlerFunction);
}
export function apiUpdateProducts(data,handlerFunction) {
    request(DOMAIN + PATH_UPDATE_PRODUCT, data, handlerFunction);
}
export function apiCreateProducts(data,handlerFunction) {
    request(DOMAIN + PATH_CREATE_PRODUCT, data, handlerFunction);
}
export function  apiUploadImage(data) {
    fetch(DOMAIN+PATH_UPLOAD_IMAGE,{
        method:"POST",
        body:data
    })
}
export function apiCreateOrderClient(data,handlerFunction) {
    request(DOMAIN + PATH_CREATE_ORDER_CLIENT, data, handlerFunction);
}
export function apiCreateOrderClientPhone(data,handlerFunction) {
    request(DOMAIN + PATH_CREATE_ORDER_CLIENT_PHONE, data, handlerFunction);
}
export function apiGetOrderClient(data,handlerFunction) {
    request(DOMAIN + PATH_GET_ORDER_CLIENT, data, handlerFunction);
}
export function apiGetInfoOrder(data,handlerFunction) {
    request(DOMAIN + PATH_GET_INFO_ORDER, data, handlerFunction);
}
export function apiGetActiveOrders(data,handlerFunction) {
    request(DOMAIN + PATH_GET_ACTIVE_ORDERS, data, handlerFunction);
}
export function apiChangeState(data,handlerFunction) {
    request(DOMAIN + PATH_CHANGE_STATE, data, handlerFunction);
}
export function apiGetUserPhone(data,handlerFunction) {
    request(DOMAIN + PATH_GET_PHONEUSER, data, handlerFunction);
}
export function apiGetAllEmployees(handlerFunction) {
    request(DOMAIN + PATH_GET_ALL_EMPLOYEES, {token: localStorage.getItem("token")}, handlerFunction);
}
export function apiUpdateEmployee(data,handlerFunction) {
    request(DOMAIN + PATH_UPDATE_EMPLOYEE, data, handlerFunction);
}
export function apiGetAllTypes(handlerFunction) {
    request(DOMAIN + PATH_GET_ALL_TYPES, {token: localStorage.getItem("token")}, handlerFunction);
}
export function apiCreateType(data,handlerFunction) {
    request(DOMAIN + PATH_CREATE_TYPES, data, handlerFunction);
}
export function apiRememberMail(data,handleFunction) {
    request(DOMAIN + PATH_SEND_REMEMBER_EMAIL,data,handleFunction)
}
export function apiRememberPass(data,handleFunction) {
    request(DOMAIN + PATH_SEND_REMEMBER_PASS,data,handleFunction)
}
export function apiCheckaddress(data,handleFunction) {
    request(DOMAIN + PATH_LOCATION_CHECK,data,handleFunction)
}
export function apiGetAllOrders(data,handleFunction) {
    request(DOMAIN + PATH_GET_ALL_ORDERS,data,handleFunction)
}