import React from "react";
import "./style.css"
import Logo from "../../assets/images/logo.png";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class Print extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id:"",
            comentarios:"",
            indicaciones:"",
            direccion:"",
            telefono:"",
            precio:0,
            name:""
        }
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("data"));
        this.setState({
            data: data.products,
            id: data.id,
            comentarios: data.comentarios,
            indicaciones: data.indicaciones,
            direccion:data.direccion,
            telefono:data.telefono,
            precio:data.precio,
            name:data.name,
            delivery:data.delivery
        });
        setTimeout(function () {
            window.print();
        }, 1000);
    }

    render() {
        let icopor = 0;
        let items = this.state.data.map((item) => {
            icopor+=item.package*item.quant*500;
            return (
                <tr>
                    <td className="quantity">{item.quant}</td>
                    <td className="description">{item.name}</td>
                    <td className="price">{item.precio}</td>
                </tr>
            )
        });
        return (
            <div className="ticket receipt">
                <img src={Logo} alt="" style={{width: "55%"}}/>
                <p className="centered mt-2">Piqueteadero Porky
                <br/> Crr. 103F 139 - 20
                    <br/>
                    Telefonos: 681 23 53 <br/> 311 831 2457
                    <br/>
                    Nit 41511230-1
                </p>
                <hr style={{height:"2px",border:"none",color:"#333",backgroundColor:"#333"}}/>
                <p style={{marginTop:"0", marginBottom:"0"}}  className="centered">Orden # {this.state.id}</p>
                <p style={{marginTop:"0", marginBottom:"0"}} > <b>Nombre:</b> {this.state.name} </p>
                <p style={{marginTop:"0", marginBottom:"0"}} > <b>Dirección:</b> {this.state.direccion} </p>
                <p style={{marginTop:"0", marginBottom:"0"}} >  <b>Telefono:</b> {this.state.telefono} </p>
                <p style={{marginTop:"0", marginBottom:"0"}} ><b>Indicaciones:</b> {this.state.indicaciones} </p>
                <p style={{marginTop:"0", marginBottom:"0"}} > <b>Comentarios</b> {this.state.comentarios} </p>
                <hr style={{height:"2px",border:"none",color:"#333",backgroundColor:"#333"}}/>
                <table>
                    <thead>
                    <tr>
                        <th className="quantity">Q.</th>
                        <th className="description">Descripción</th>
                        <th className="price">$$</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items}
                    <tr>
                        <td className="quantity"></td>
                        <td className="description">Icopor</td>
                        <td className="price">{icopor}</td>
                    </tr>
                    <tr>
                        <td className="quantity"></td>
                        <td className="description">Domicilio</td>
                        <td className="price">{this.state.delivery}</td>
                    </tr>
                    <tr>
                        <td className="quantity"></td>
                        <td className="description">TOTAL</td>
                        <td className="price">{this.state.precio}</td>
                    </tr>
                    </tbody>
                </table>
                <p className="centered mt-2">Gracias Por su Compra </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.printProducts,
    }
}
export default connect(mapStateToProps)(withRouter(Print));
