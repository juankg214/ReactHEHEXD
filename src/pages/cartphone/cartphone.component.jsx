import React from "react";
import NavBar from "../../components/NavBar";
import {Breadcrumb, Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faMapMarkedAlt,faPhone,faMoneyBillWave} from "@fortawesome/free-solid-svg-icons";
import "../cart/cart.styles.css"
import CardList from "../../components/card_list/CardList.component";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {apiCheckaddress, apiCreateOrderClientPhone, apiGetInfoOrder, apiGetUserPhone} from "../../api";
import swal from "sweetalert";
import {resetAll} from "../../actions/cart-actions";

class CartPhone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            addresstoshow: "",
            address: "",
            addressarr: ["", "", "", ""],
            indicaciones: "",
            comentarios: "",
            type: "normal",
            search: "",
            total: 4000,
            delivery: 4000,
            products_search: [],
            createUser: true,
            location: ""
        }
    }
    componentDidMount() {
        let idOrder = this.props.location.search;
        if (idOrder !== "") {
            idOrder = idOrder.split("?")[1]
            apiGetInfoOrder({token: localStorage.getItem("token"), idOrder: idOrder}, (res) => {
                if (res.success) {
                    console.log(res);
                    this.setState({
                        type: "search",
                        products_search: res.orderInfo.productsInOrder,
                        address: res.orderInfo.address,
                        addresstoshow: res.orderInfo.address,
                        delivery:res.orderInfo.delivery,
                        comentarios: res.orderInfo.comments,
                        indicaciones: res.orderInfo.indications,
                        name:res.orderInfo.name,
                        phone:res.orderInfo.telephone,
                    });
                }

            });
        }
    }
    handleChangeAddress = (e) =>{
        let pos = parseInt(e.target.name.split("ad")[1]);
        let arr = this.state.addressarr
        arr[pos] = e.target.value
        let add = arr[0] + " "+ arr[1] + " #" + arr[2] + " - " + arr[3] +" Bogotá"
        this.setState({
            addressarr:arr,
            address:add
        })
        console.log(this.state)
    }
    checkaddress = (e) =>{
        const token = localStorage.getItem("token");
        apiCheckaddress({token,address:this.state.address},(res)=>{
            if(res.success){
                this.setState({
                    addresstoshow:res.location.address,
                    total: (this.state.total - this.state.delivery) + res.location.price,
                    delivery:res.location.price,
                    location:res.location.idLocation
                })
            }else{
                swal("Error", res.message, "error");
            }

        })
    }

    createOrder = (e) => {
        e.preventDefault();
        let products = [];
        let price = parseInt(this.state.delivery);
        this.props.cart_chosen.forEach((cart) => {
            console.log(500 * parseInt(cart.package) * parseInt(cart.quant))
            price += parseInt(cart.price) * parseInt(cart.quant) + 500 * parseInt(cart.package) * parseInt(cart.quant);
            products.push({id: cart.idProduct, amount: cart.quant, total: parseInt(cart.price) * parseInt(cart.quant)})
        })
        if (price < 34000) {
            swal("El valor minimo de los productos debe ser de $30000", "", "error");
        } else {
            const {addresstoshow, indicaciones, comentarios,createUser,phone,name,delivery,location} = this.state;
            const token = localStorage.getItem("token");
            if (products.length >= 1 && addresstoshow && token) {
                let body = {
                    phone,
                    name,
                    products: products,
                    address: addresstoshow,
                    comments: comentarios,
                    indications: indicaciones,
                    priceOrder: price,
                    token: token,
                    createUser,
                    delivery,
                    location,
                }
                apiCreateOrderClientPhone(body, (res) => {
                    if (res.success) {
                        swal("Su orden ha sido creada correctamente", "", "success")
                        this.props.onReset();
                    } else {
                        swal("Un error ha ocurrido", res.message, "error")
                    }
                });
                console.log(body);
            } else {
                swal("error", "Ha ocurrido un error, no se pudo enviar la orden", "error");
            }
        }

    }

    findUser = (e) =>{
        apiGetUserPhone({phone:this.state.phone,token: localStorage.getItem("token")},(res)=>{
            if(res.user){
                const user = res.user;
                console.log(user)
                this.setState({
                    addresstoshow: user.locationAssignPhone.address,
                    name: user.name,
                    indicaciones:user.indications,
                    createUser:false,
                    total:this.state.total-this.state.delivery + user.locationAssignPhone.price,
                    delivery:user.locationAssignPhone.price
                })
            }else{
                this.setState({
                    createUser:true
                })
                swal("Usuario no encontrado por favor llena los datos correspondientes")
            }
        })
    }
    render() {
        const unique = this.props.cart.filter((item) => {
            return item.quant !== 0;
        });
        let total = 0;
        let data = this.state.type === "normal" ? this.props.cart_chosen : this.state.products_search;
        let items = [];
        if (this.state.type === "normal") {
            items = data.map((cart, i) => {
                total += parseInt(cart.price) * parseInt(cart.quant) + 500 * parseInt(cart.package) * parseInt(cart.quant);
                return (
                    <div key={cart.idProduct} className="d-flex bd-highlight"
                         style={{backgroundColor: i % 2 === 1 ? "#F8F8F8" : "#FFF"}}>
                        <div className="p-2 flex-grow-1 bd-highlight">{cart.name} x{cart.quant}</div>
                        <div className="p-2 bd-highlight">
                            ${cart.price * cart.quant} <p
                            style={{display: parseInt(cart.package) === 0 ? "none" : "inline"}}>{"+ $" + 500 * parseInt(cart.package) * parseInt(cart.quant)}</p>
                        </div>

                    </div>
                );
            })
        } else {
            items = data.map((cart, i) => {
                total += parseInt(cart.productInfo.price) * parseInt(cart.amount) + 500 * parseInt(cart.productInfo.package) * parseInt(cart.amount);
                return (
                    <div key={i} className="d-flex bd-highlight"
                         style={{backgroundColor: i % 2 === 1 ? "#F8F8F8" : "#FFF"}}>
                        <div className="p-2 flex-grow-1 bd-highlight">{cart.productInfo.name} x{cart.amount}</div>
                        <div className="p-2 bd-highlight">
                            ${cart.productInfo.price * cart.amount} <p
                            style={{display: parseInt(cart.productInfo.package) === 0 ? "none" : "inline"}}>{"+ $" + 500 * parseInt(cart.productInfo.package) * parseInt(cart.amount)}</p>
                        </div>
                    </div>
                );
            })
        }


        return (
            <div>
                <NavBar cart={this.props.cart} type={this.props.role} signout={this.props.handleLoggedIn}/>

                <div style={{backgroundColor: "#E9ECEF", paddingBottom: "20px", position: "relative", width: "100%"}}>
                    <Container>
                        <Breadcrumb style={{width: "10rem", marginBottom: "0"}}>
                            <Breadcrumb.Item href="#"><FontAwesomeIcon icon={faHome} style={{fontSize: "1.5rem"}}
                                                                       className={"mr-2"}/></Breadcrumb.Item>
                            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                Carro
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <h4 style={{marginTop: "0", padding: "0"}}>Tu Carro de Compra</h4>
                    </Container>
                </div>

                <Container className={"mt-4"}>
                    <div className={"row"}>
                        <Col xs={12} sm={7}>
                            <p>{unique.length} productos en el carro:</p>
                            <hr/>
                            <CardList type={this.state.type === "normal" ? "CART" : "CART_SEARCH"}
                                      cart={this.state.type === "normal" ? this.props.cart_chosen : this.state.products_search}/>
                        </Col>
                        <Col xs={12} sm={4} className={"mt-4 mb-4 mr-3 h-100"}>
                            {items}
                            <hr/>
                            <div className="d-flex bd-highlight"
                                 style={{backgroundColor: "#FFF"}}>
                                <div className="p-2 flex-grow-1 bd-highlight">Domicilio</div>
                                <div className="p-2 bd-highlight">
                                    ${this.state.delivery}
                                </div>
                            </div>
                            <h5 className={"mt-4"}>Total:</h5>
                            <h2 className={"mt-4 mb-4"}>${total + this.state.delivery}</h2>
                            <Form onSubmit={this.state.type === "normal" ? this.createOrder : () => {
                            }}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faPhone}/>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type={"text"}
                                            placeholder={"telefono"}
                                            aria-describedby="inputGroupPrepend"
                                            onChange={(e) => this.setState({phone: e.target.value})}
                                            value={this.state.phone}
                                            readOnly={this.state.type !== "normal"}
                                            required
                                        />
                                        <Button variant="primary" onClick={this.findUser}>Buscar</Button>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        placeholder={"Nombre"}
                                        aria-describedby="inputGroupPrepend"
                                        onChange={(e) => this.setState({name: e.target.value})}
                                        value={this.state.name}
                                        readOnly={this.state.type !== "normal"}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faMapMarkedAlt}/>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type={"text"}
                                            placeholder={"dirección"}
                                            aria-describedby="inputGroupPrepend"
                                            onChange={(e) => this.setState({addresstoshow: e.target.value})}
                                            value={this.state.addresstoshow}
                                            readOnly={this.state.type !== "normal"}
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faMoneyBillWave}/>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type={"number"}
                                            placeholder={"costo de envio"}
                                            aria-describedby="inputGroupPrepend"
                                            onChange={(e) => this.setState({delivery: parseFloat(e.target.value)})}
                                            value={this.state.delivery}
                                            readOnly={this.state.type !== "normal"}
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="direccion">
                                    <Form.Label>Otra direccion?</Form.Label>
                                    <Row>
                                        <Col xs={8} sm={7}>
                                            <Form.Control as="select"  name={"ad0"} onChange={this.handleChangeAddress}>
                                                <option value=""></option>
                                                <option value="Calle">Calle</option>
                                                <option value="Carrera">Carrera</option>
                                                <option value="Avenida">Avenida</option>
                                                <option value="Av. Carrera">Av. Carrera</option>
                                                <option value="Av. Calle">Av. Calle</option>
                                                <option value="Circular">Circular</option>
                                                <option value="Circunvalar">Circunvalar</option>
                                                <option value="Diagonal">Diagonal</option>
                                                <option value="Manzana">Manzana</option>
                                                <option value="Transversal">Transversal</option>
                                                <option value="Via">Via</option>
                                            </Form.Control>
                                        </Col>
                                        <Col xs={4} sm={5}>
                                            <Form.Control type="text" placeholder="26" name={"ad1"} onChange={this.handleChangeAddress}/>
                                        </Col>
                                        <Col xs={1}>
                                            #
                                        </Col>
                                        <Col xs={4} sm={5}>
                                            <Form.Control type="text" placeholder="15" name={"ad2"} onChange={this.handleChangeAddress} />
                                        </Col>
                                        <Col xs={1}>
                                            -
                                        </Col>
                                        <Col xs={4} sm={4}>
                                            <Form.Control type="text" placeholder="20" name={"ad3"} onChange={this.handleChangeAddress} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button variant="primary" size="sm" block onClick={this.checkaddress}> Actualizar dirección </Button>
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Indicaciones</Form.Label>
                                    <Form.Control as="textarea" rows="3"
                                                  onChange={(e) => this.setState({indicaciones: e.target.value})}
                                                  value={this.state.indicaciones}
                                                  readOnly={this.state.type !== "normal"}
                                                  placeholder={"Nombre del conjunto, torre, apartamento, punto de refencia o barrio"}
                                    />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Comentarios</Form.Label>
                                    <Form.Control as="textarea" rows="3"
                                                  onChange={(e) => this.setState({comentarios: e.target.value})}
                                                  value={this.state.comentarios}
                                                  readOnly={this.state.type !== "normal"}
                                    />
                                </Form.Group>
                                <Button type={"submit"} style={{
                                    width: "100%",
                                    minHeight: "75px",
                                    backgroundColor: "#A30021",
                                    display: this.state.type === "normal" ? "" : "none"
                                }}>{this.state.type === "normal" ? "Checkout" : "Llamar"}</Button>
                                <Button style={{
                                    width: "100%",
                                    minHeight: "50px",
                                    backgroundColor: "#A30021",
                                    display: this.state.type === "normal" ? "none" : ""
                                }} href="tel:+57 304 520 66 52">Contactenos</Button>
                            </Form>
                        </Col>
                    </div>
                </Container>

            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        cart_chosen: state.cart_chosen
    }
}

const mapActionsToProps = {
    onReset: resetAll,
}

export default connect(mapStateToProps, mapActionsToProps)(withRouter(CartPhone));
