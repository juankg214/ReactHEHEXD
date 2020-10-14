import React from "react";
import {withRouter} from "react-router-dom";
import NavBar from "../../components/NavBar";
import {connect} from "react-redux";
import {Breadcrumb, Button, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import DatatablePage from "../../components/table.component";
import CardRegister from "../../components/card-register/CardRegister";
import {apiGetAll, apiGetAllEmployees, apiRegister, apiUpdateEmployee} from "../../api";
import {MDBBtn, MDBContainer, MDBDataTable, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import swal from "sweetalert";

class GestionEmpleados extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataEmployees: [],
            activeEmployee: {},
            createEmployee:{
                name:"",
                password:"",
                username:"",
                userRole:"2"
            },
            modal: false,
            modalcreate:false
        }
        this.toggle = this.toggle.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleSentForm = this.handleSentForm.bind(this)

        this.togglecreate = this.togglecreate.bind(this);
        this.handleFormChangeCreate = this.handleFormChangeCreate.bind(this)
        this.handleSentFormCreate = this.handleSentFormCreate.bind(this)
    }

    componentWillMount() {
        this.updatelist();
    }

    updatelist() {
        apiGetAllEmployees((e) => {
            if (e.success) {
                const roles = ["Empleado", "Administrador"]
                e.employees.map((ele) => {
                    ele["userRoleshow"] = roles[parseInt(ele["userRole"]) - 2]
                    ele["active"] = ele["active"] ? 1 : 0
                    ele["activeshow"] = ele["active"] ? "Activo" : "Inactivo"
                    ele["clickEvent"] = () => this.handlerclick(ele["userId"])
                })
                this.setState({
                    dataEmployees: e.employees
                })
            }
        })
    }

    handlerclick(id) {
        console.log(id)
        let activeEmployee = this.state.dataEmployees.filter((e) => {
            return (e["userId"] == id)
        })[0]
        this.setState({
            activeEmployee
        })
        this.toggle()

    }

    handleFormChange(e) {
        let tememplo = this.state.activeEmployee
        tememplo[e.target.name] = e.target.value
        this.setState({
            activeEmployee: tememplo
        })
    }

    handleSentForm() {
        apiUpdateEmployee({...this.state.activeEmployee, token: localStorage.getItem("token")}, (e) => {
            if (e.success) {
                swal("Empleado modificado", "Se ha modificado el empleado", "success")
                this.updatelist()
            } else {
                swal("Problema", e.message, "error")
            }
        })
        this.toggle()
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    togglecreate() {
        this.setState({
            modalcreate: !this.state.modalcreate
        })
    }

    handleFormChangeCreate(e) {
        let tememplo = this.state.createEmployee
        tememplo[e.target.name] = e.target.value
        this.setState({
            createEmployee: tememplo
        })
    }

    handleSentFormCreate() {
        let tem =this.state.createEmployee
        tem["userName"] = tem["email"].split("@")[0]
        apiRegister({...tem, token: localStorage.getItem("token")}, (e) => {
            console.log(e)
            if (e.success) {
                swal("Empleado Creado", "Se ha creado el empleado", "success")
                this.updatelist()
            } else {
                swal("Problema", e.message, "error")
            }
        })
        this.togglecreate()
    }

    render() {
        console.log(this.state.createEmployee)
        return (
            <div>
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>Editar Empleado</MDBModalHeader>
                        <MDBModalBody>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Nombre del empleado</Form.Label>
                                    <Form.Control type="text" placeholder="nombre" name="name"
                                                  value={this.state.activeEmployee ? this.state.activeEmployee.name : ""}
                                                  onChange={this.handleFormChange}/>
                                </Form.Group>
                                <Form.Group controlId="formRole">
                                    <Form.Label>Rol</Form.Label>
                                    <Form.Control as="select" placeholder="Rol" name="userRole"
                                                  value={this.state.activeEmployee ? this.state.activeEmployee.userRole : ""}
                                                  onChange={this.handleFormChange}>
                                        <option value={2}>Empleado</option>
                                        <option value={3}>Administrador</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formActive">
                                    <Form.Label>Activo</Form.Label>
                                    <Form.Control as="select" placeholder="Activo" name="active"
                                                  value={this.state.activeEmployee ? this.state.activeEmployee.active : ""}
                                                  onChange={this.handleFormChange}>
                                        <option value={0}>Inactivo</option>
                                        <option value={1}>Activo</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>Cerrar</MDBBtn>
                            <MDBBtn color="primary" onClick={this.handleSentForm}>Aceptar</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
                <MDBContainer>
                    <MDBModal isOpen={this.state.modalcreate} toggle={this.togglecreate}>
                        <MDBModalHeader toggle={this.togglecreate}>Crear Empleado</MDBModalHeader>
                        <MDBModalBody>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Nombre del empleado</Form.Label>
                                    <Form.Control type="text" placeholder="nombre" name="name"
                                                  value={this.state.activeEmployee ? this.state.createEmployee.name : ""}
                                                  onChange={this.handleFormChangeCreate}/>
                                </Form.Group>
                                <Form.Group controlId="formemail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="correo electronico" name="email"
                                                  value={this.state.activeEmployee ? this.state.createEmployee.email : ""}
                                                  onChange={this.handleFormChangeCreate}/>
                                </Form.Group>
                                <Form.Group controlId="formPass">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="correo electronico" name="password"
                                                  value={this.state.activeEmployee ? this.state.createEmployee.password : ""}
                                                  onChange={this.handleFormChangeCreate}/>
                                </Form.Group>
                                <Form.Group controlId="formRole">
                                    <Form.Label>Rol</Form.Label>
                                    <Form.Control as="select" placeholder="Rol" name="userRole"
                                                  value={this.state.activeEmployee ? this.state.createEmployee.userRole : ""}
                                                  onChange={this.handleFormChangeCreate}>
                                        <option value={2}>Empleado</option>
                                        <option value={3}>Administrador</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.togglecreate}>Cerrar</MDBBtn>
                            <MDBBtn color="primary" onClick={this.handleSentFormCreate}>Aceptar</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
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
                                    Gestión de Empleados
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h4 style={{marginTop: "0", padding: "0"}}>Gestión de Empleados</h4>
                            <Row>
                                <Col>
                                    <Button variant="primary" onClick={() => this.togglecreate()}>
                                        Crear Empleado
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <Container>
                        <MDBDataTable
                            striped
                            bordered
                            small
                            responsiveMd
                            data={{
                                columns: [
                                    {
                                        label: 'Id',
                                        field: 'userId',
                                        width: 150
                                    },
                                    {
                                        label: 'Nombre',
                                        field: 'name',
                                        width: 150
                                    },
                                    {
                                        label: 'Rol',
                                        field: 'userRoleshow',
                                        sort: 'asc',
                                        width: 150
                                    },
                                    {
                                        label: 'Email',
                                        field: 'email',
                                        width: 150
                                    },
                                    {
                                        label: 'Activo',
                                        field: 'activeshow',
                                        width: 150
                                    }
                                ],
                                rows: this.state.dataEmployees
                            }}
                        />
                    </Container>
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

export default connect(mapStateToProps)(withRouter(GestionEmpleados));