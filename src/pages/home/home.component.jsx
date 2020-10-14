import React from "react";
import {withRouter} from "react-router-dom";
import "./home.styles.css"
import NavBar from "../../components/NavBar";
import CardList from "../../components/card_list/CardList.component";
import SideBar from "../../components/side-bar/SideBar";
import {connect} from "react-redux";
import SideBarCollapsed from "../../components/side-bar/SideBarCollapsed";
import {apiRequest} from "../../actions/cart-actions";
import {apiGetAllTypes} from "../../api";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 1,
            sideBarDataUser:[]
        };
    }

    componentWillMount() {
        apiGetAllTypes((e)=>{
            if(e.success){
                this.setState({
                    sideBarDataUser:e.types
                })
            }
        })
    }

    handlerSelect = (key) => {
        this.setState({filter: key})
    }

    render() {

        return (
            <div style={{zIndex: "1"}}>
                <div className={"sidebar-fullwidth"}>
                    <SideBar data={this.state.sideBarDataUser} handler={this.handlerSelect}/>
                </div>

                <div style={{zIndex: "1000"}} className={"sidebar-minwidth"}>
                    <SideBarCollapsed data={this.state.sideBarDataUser} handler={this.handlerSelect}/>
                </div>

                <div className={"main"} style={{zIndex: "1"}}>
                    <NavBar cart={this.props.cart} type={this.props.role} signout={this.props.handleLoggedIn}/>
                    <CardList cart={this.props.cart} filter={this.state.filter} type={"HOME"}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
    }
}

const mapActionsToProps = {
    onApiRequest: apiRequest
}

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Home));