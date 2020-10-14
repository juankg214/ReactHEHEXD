import React from "react";
import NavBar from "../../components/NavBar";
import {Breadcrumb, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import CardListPedido from "../../components/card_list_pedido/CardListPedido"
import {apiGetOrderClient} from "../../api";

class Ordenes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ordenes :[]
        }
    }

    componentDidMount() {
        apiGetOrderClient({token:localStorage.getItem("token")},(res) => {
            if(res.success){
                this.setState({ordenes:res.orders})
            }
        })
    }


    render() {
        return (
            <div>
                <NavBar cart={this.props.cart} type={this.props.role} signout={this.props.handleLoggedIn}/>



                <div style={{backgroundColor: "#E9ECEF", paddingBottom: "20px", position: "relative", width: "100%"}}>
                    <Container>
                        <Breadcrumb style={{width: "10rem", marginBottom: "0"}}>
                            <Breadcrumb.Item href="#"><FontAwesomeIcon icon={faHome} style={{fontSize: "1.5rem"}}
                                                                       className={"mr-2"}/></Breadcrumb.Item>
                            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                Pedidos
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <h4 style={{marginTop: "0", padding: "0"}}>Mis Pedidos</h4>
                    </Container>

                </div>
                <CardListPedido ordenes={this.state.ordenes}/>

            </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        cart: state.cart,
    }
}

export default connect(mapStateToProps)(withRouter(Ordenes));
