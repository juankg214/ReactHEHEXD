import React from "react";
import {withRouter} from "react-router-dom";
import NavBar from "../../components/NavBar";
import {connect} from "react-redux";
import swal from "sweetalert";
import {Breadcrumb, Container,Form,Button,Row,Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import { MDBDataTable,MDBContainer,MDBModal,MDBBtn, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';
import {
    apiGetAllOrders
} from "../../api";
class GestionOrdenes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataOrders: [],
        }
    }
    componentWillMount() {
        this.updateTable()
    }
    handlerclick(e){
        console.log(e)
    }
    updateTable(){
        apiGetAllOrders({token: localStorage.getItem("token")},(res)=>{
            if(res.success){
                res.orders.map((e)=>{
                    e["clickEvent"] = ()=>{this.props.history.push(`/${localStorage.getItem("role")}/cart?${e["idOrder"]}`)}
                    let print = {products:[],direccion:e.address,telefono:e.telephone,indicaciones:e.indications,comentarios:e.comments, id:e.idOrder,precio:e.priceOrder,name:e.name,delivery:e.delivery}
                    e.productsInOrder.map((product)=>{
                        print.products.push({name:product.productInfo.name,precio:product.totalPrice,quant:product.amount, package:product.productInfo.package})
                    })
                    let d = e["dateOrder"].split("T")
                    e["dateOrder"] = d[0]
                    e["time"] = d[1].substring(0,d[1].length-5)
                    e["score"] = e["score"] === 1 ? "Telefono" : "Web"
                    e["print"] = <Button onClick={() => {
                        // onPrint(print);
                        localStorage.setItem("data", JSON.stringify(print))
                        window.open(`${window.location.origin}/${localStorage.getItem("role")}/print`)
                    }}>Imprimir</Button>
                })
                this.setState({
                    dataOrders:res.orders
                })
            }

        })
    }

    render() {
        console.log(this.state)
        return (
            <div style={{overflow:"scroll"}}>

                <div className={""} style={{zIndex: "1"}}>

                    <NavBar cart={this.props.cart} type={this.props.role} signout={this.props.handleLoggedIn}/>
                    <div style={{
                        backgroundColor: "#E9ECEF",
                        paddingBottom: "20px",
                        position: "relative",
                        width: "100%"
                    }}>

                        <Container>

                            <Breadcrumb style={{width: "17rem", marginBottom: "0"}}>
                                <Breadcrumb.Item href="#"><FontAwesomeIcon icon={faHome} style={{fontSize: "1.5rem"}}
                                                                           className={"mr-2"}/></Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                    Gestión de Ordenes
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h4 style={{marginTop: "0", padding: "0"}}>Gestion de Ordenes</h4>
                        </Container>

                    </div>
                    <MDBContainer>
                        <MDBDataTable
                            striped
                            bordered
                            small
                            responsiveMd
                            data={{
                                columns:[
                                    {
                                        label: 'Id',
                                        field: 'idOrder',
                                        width: 150
                                    },
                                    {
                                        label: 'Nombre',
                                        field: 'name',
                                        width: 150
                                    },
                                    {
                                        label: 'Dirección',
                                        field: 'address',
                                        width: 150
                                    },
                                    {
                                        label: 'Total',
                                        field: 'priceOrder',
                                        width: 150
                                    },
                                    {
                                        label: 'Estado',
                                        field: 'state',
                                        width: 150
                                    },
                                    {
                                        label: 'Tipo',
                                        field: 'score',
                                        width: 150
                                    },
                                    {
                                        label: 'Fecha',
                                        field: 'dateOrder',
                                        width: 150
                                    },
                                    {
                                        label: 'Hora',
                                        field: 'time',
                                        width: 150
                                    },
                                    {
                                        label: 'imprimir',
                                        field: 'print',
                                        width: 150
                                    }
                                ],
                                rows:this.state.dataOrders

                            }}
                        />
                    </MDBContainer>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
    }
}

export default connect(mapStateToProps)(withRouter(GestionOrdenes));