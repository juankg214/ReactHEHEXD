import React from "react";
import {withRouter} from "react-router-dom";
import CardListAdmin from "../../components/card_list_admin_pedidos/cardListAdmin.component";
import "./admin.styles.css"
import NavBar from "../../components/NavBar";
import {connect} from "react-redux";
import {Breadcrumb, Button, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCompressArrowsAlt, faHome} from "@fortawesome/free-solid-svg-icons";
import {apiGetActiveOrders} from "../../api";

class Admin extends React.Component {

    constructor() {
        super();
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
       this.updateApi();
    }

    updateApi = () => {
        apiGetActiveOrders({token: localStorage.getItem("token")}, (res) => {
            if (res.success) {
                console.log(res)
                this.setState({orders: res.orders});
            }
        })
    }

    render() {

        return (
            <div>


                <div className={""} style={{zIndex: "1"}}>
                    <NavBar cart={this.props.cart} type={this.props.role} signout={this.props.handleLoggedIn}/>
                    <div style={{
                        backgroundColor: "#E9ECEF",
                        paddingBottom: "20px",
                        position: "relative",
                        width: "100%"
                    }}>
                        <Container>
                            <Breadcrumb style={{width: "15rem", marginBottom: "0"}}>
                                <Breadcrumb.Item href="#"><FontAwesomeIcon icon={faHome} style={{fontSize: "1.5rem"}}
                                                                           className={"mr-2"}/></Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                    Ordenes Actuales
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h4 style={{marginTop: "0", padding: "0"}}>Ordenes Actuales</h4>
                        </Container>
                    </div>
                    <Button variant="none" className={"btn-detalles my-2 ml-4"} onClick={() => this.updateApi()} style={{width: "10rem", fontSize: "0.8rem"}}>
                        <FontAwesomeIcon icon={faCompressArrowsAlt} className={"mr-2"}
                                         style={{fontSize: "1rem", zIndex: "1", color: "#fff"}}/>
                        Actualizar
                    </Button>
                    <CardListAdmin update={this.updateApi} data={this.state.orders}/>

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


export default connect(mapStateToProps)(withRouter(Admin));