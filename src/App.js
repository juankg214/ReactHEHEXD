import React from 'react';
import './App.css';
import {Route, Switch, withRouter} from "react-router-dom";
import Login from "./pages/login/login.component";
import Remember from "./pages/remember/remember.component";
import RememberPassword from "./pages/remember/rememberpassword.component";
import Home from "./pages/home/home.component";
import Cart from "./pages/cart/cart.component";
import Ordenes from "./pages/mis_ordenes/Ordenes";
import {connect} from "react-redux";
import {apiRequest, resetAll} from "./actions/cart-actions";
import Admin from "./pages/admin/admin.component";
import Print from "./pages/print/print.component";
import GestionEmpleados from "./pages/employee_mngmnt/gestionempleados.component";
import GestionProductos from './pages/product_mngmnt/gestionproductos.component'
import GestionOrdenes from "./pages/order_mngmnt/orders.component";
import Register from './pages/register/register.component'
import Cartphone from './pages/cartphone/cartphone.component'
import {ProtectedRoute} from "./components/protected-component/protected.component";
// import CardRegister from "./components/card-register/CardRegister";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: "",
        };
    }

    handleLoggedIn = (answer) => {
        console.log("change", answer)
        this.setState({
            isLoggedIn: answer
        }, () => {
            if (answer === "false") {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("address");
                localStorage.removeItem("tel");
                localStorage.removeItem("username");
                console.log("removed token");
                this.props.onReset();
            } else {
                this.props.onApiRequest();
                const role = localStorage.getItem("role");
                if(role === "client"){
                    this.props.history.push(`${role.toLowerCase()}/home`);
                } else {
                    this.props.history.push(`${role.toLowerCase()}/pedidos`);
                }
            }
            this.forceUpdate();
        });
    }

    componentDidMount() {
        let logged = "false";
        if (localStorage.getItem("token")) {
            logged = "true";
            this.props.onApiRequest();
        }
        this.setState({
            isLoggedIn: logged
        },() => {
            if(logged==="true" && this.props.location.pathname==="/"){
                const role = localStorage.getItem("role");
                if(role === "client"){
                    this.props.history.push(`${role.toLowerCase()}/home`);
                } else {
                    this.props.history.push(`${role.toLowerCase()}/pedidos`);
                }
            }
        });
    }
    render() {
        return (
                <Switch>
                    <Route exact path="/" render={() => <Login handler={this.handleLoggedIn}/>}/>
                    <Route exact path="/register" render={() => <Register handler={this.handleLoggedIn}/>}/>
                    <Route exact path="/remember" render={() => <Remember handler={this.handleLoggedIn}/>}/>
                    <Route path="/rememberpassword/:token" render={() => <RememberPassword handler={this.handleLoggedIn}/>}/>
                    {/*Vistas Usuario*/}
                    <ProtectedRoute exact path="/client/home" component={Home} handleLoggedIn={this.handleLoggedIn} typeRole = "client"/>
                    <ProtectedRoute exact path="/client/cart" component={Cart} handleLoggedIn={this.handleLoggedIn} typeRole = "client"/>
                    <ProtectedRoute exact path="/client/mis_ordenes" component={Ordenes} handleLoggedIn={this.handleLoggedIn} typeRole = "client"/>
                    {/*{Vistas Empleado}*/}
                    <ProtectedRoute exact path="/employee/home" component={Home} handleLoggedIn={this.handleLoggedIn} typeRole = "employee"/>
                    <ProtectedRoute exact path="/employee/cart" component={Cartphone} handleLoggedIn={this.handleLoggedIn} typeRole = "employee"/>
                    <ProtectedRoute exact path="/employee/mis_ordenes" component={Ordenes} handleLoggedIn={this.handleLoggedIn} typeRole = "employee"/>
                    <ProtectedRoute exact path="/employee/pedidos" component={Admin} handleLoggedIn={this.handleLoggedIn} typeRole = "employee"/>
                    <ProtectedRoute exact path="/employee/print" component={Print} handleLoggedIn={this.handleLoggedIn} typeRole = "employee"/>
                    {/*Vistas Admin*/}
                    <ProtectedRoute exact path="/admin/home" component={Home} handleLoggedIn={this.handleLoggedIn} typeRole = "admin"/>
                    <ProtectedRoute exact path="/admin/cart" component={Cartphone} handleLoggedIn={this.handleLoggedIn} typeRole = "admin"/>
                    <ProtectedRoute exact path="/admin/mis_ordenes" component={Ordenes} handleLoggedIn={this.handleLoggedIn} typeRole = "admin"/>
                    <ProtectedRoute exact path="/admin/pedidos" component={Admin} handleLoggedIn={this.handleLoggedIn} typeRole = "admin"/>
                    <ProtectedRoute exact path="/admin/print" component={Print} handleLoggedIn={this.handleLoggedIn} typeRole = "admin"/>
                    <ProtectedRoute exact path="/admin/empleados" component={GestionEmpleados} handleLoggedIn={this.handleLoggedIn} typeRole = "admin"/>
                    <ProtectedRoute exact path="/admin/productos" component={GestionProductos} handleLoggedIn={this.handleLoggedIn} typeRole = "admin"/>
                    <ProtectedRoute exact path="/admin/ordenes" component={GestionOrdenes} handleLoggedIn={this.handleLoggedIn} typeRole = "admin"/>

                </Switch>
        );
    }
}

const mapActionsToProps = {
    onApiRequest: apiRequest,
    onReset: resetAll,
}
export default connect(null,mapActionsToProps)(withRouter(App));

