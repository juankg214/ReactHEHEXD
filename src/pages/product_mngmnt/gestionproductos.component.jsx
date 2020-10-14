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
    apiGetAll,
    apiUpdateProducts,
    apiCreateProducts,
    apiUploadImage,
    apiCreateType,
    apiGetAllTypes
} from "../../api";
class GestionProductos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProducts: [],
            modal: false,
            modalcreate:false,
            modaltype:false,
            activeProduct: {},
            createProduct:{
                name:"",
                price:"",
                package:0,
                description:"",
                idProductType:1,
                active:1,
                image:"",
                file:null
            },
            createtype:{
                nameType:""
            },
            categories:[]
        }
        this.toggle = this.toggle.bind(this);
        this.togglecreate = this.togglecreate.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleSentForm = this.handleSentForm.bind(this)
        this.updatelist = this.updatelist.bind(this)
        this.handleSentFormCreate = this.handleSentFormCreate.bind(this)
        this.handleFormChangeCreate = this.handleFormChangeCreate.bind(this)
        this.toggletype = this.toggletype.bind(this);
        this.handleFormChangetype = this.handleFormChangetype.bind(this)
        this.handleSentFormType = this.handleSentFormType.bind(this)
    }
    componentWillMount() {
        this.updatelist();
        this.updatecategories()
    }
    updatecategories(e){
        apiGetAllTypes((e)=>{
            if(e.success){
                this.setState({
                    categories:e.types
                })
            }
        })
    }
    updatelist(e){
        apiGetAll((e)=>{
            if(e.success){
                e.products.map((e)=>{
                    e["type"] = e["typeOfProduct"]["nameType"]
                    e["oactive"] = e["active"] ? 1 : 0
                    e["active"] = e["active"] ? "Disponible" : "No disponible"
                    e["oprice"] = e['price']
                    e["price"] = '$' +e["price"].toLocaleString('en')
                    e["clickEvent"] = ()=>this.handlerclick(e["idProduct"])
                })
                this.setState({
                    dataProducts:e.products
                })
            }
        })
    }
    handlerclick(id){
        this.toggle()
        let product = this.state.dataProducts.filter((e)=>{
            return(e["idProduct"] === id)
        })[0]
        this.setState({
            activeProduct:product
        })
    }
    handleFormChange(e){
        let tempro = this.state.activeProduct
        tempro[e.target.name] = e.target.value
        this.setState({
            activeProduct:tempro
        })
    }
    handleFormChangeCreate(e){
        let tempro = this.state.createProduct
        if(e.target.name !== "file")
            tempro[e.target.name] = e.target.value
        else{
            tempro[e.target.name] = e.target.files[0]
            tempro["image"] = e.target.files[0].name.split(".")[0]
        }
        this.setState({
            createProduct:tempro
        })
    }
    handleSentForm(e){
        apiUpdateProducts({...this.state.activeProduct,token: localStorage.getItem("token")},(e)=>{
            if(e.success){
                swal("Producto modificado", "El producto ha sido modificado", "success")
                this.updatelist()
            }else{
                swal("Problema",e.message, "error")
            }
        })
        this.toggle()
    }
    async handleSentFormCreate(e){
        await apiCreateProducts({...this.state.createProduct,token: localStorage.getItem("token")},(e)=>{
            if(e.success){
                this.updatelist()
                swal("Producto creado", "El producto ha sido creado", "success")
            }else{
                swal("Problema",e.message, "error")
            }
        })
        const data = new FormData()
        data.append("file",this.state.createProduct.file)
        data.append("json",JSON.stringify(this.state.createProduct))
        await apiUploadImage(data)
        this.togglecreate()
    }
    toggle(){
        this.setState({
            modal:!this.state.modal
        })
    }
    togglecreate(){
        this.setState({
            modalcreate:!this.state.modalcreate
        })
    }
    toggletype(){
        this.setState({
            modaltype:!this.state.modaltype
        })
    }

    handleFormChangetype(e){
        let tempro = this.state.createtype
        tempro[e.target.name] = e.target.value
        this.setState({
            createtype:tempro
        })
    }

    handleSentFormType(){
        apiCreateType({...this.state.createtype,token: localStorage.getItem("token")},(e)=>{
            if(e.success){
                swal("Categoria creada", "La categoria ha sido creada", "success")
                this.updatecategories()
            }else{
                swal("Problema",e.message, "error")
            }
        })

        this.toggletype()
    }


    render() {
        console.log(this.state)
        let op = this.state.categories.map((e)=>{
            return (<option value={e.idProductType}>{e.nameType}</option>)
        })
        return (
            <div style={{overflow:"scroll"}}>
                <MDBContainer>
                    <MDBModal isOpen={this.state.modaltype} toggle={this.toggletype}>
                        <MDBModalHeader toggle={this.toggletype}>Crear categoria</MDBModalHeader>
                        <MDBModalBody>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Nombre de la categoria</Form.Label>
                                    <Form.Control type="text" placeholder="nombre" name="nameType" value={this.state.createtype?this.state.createtype.nameType:""}  onChange={this.handleFormChangetype}/>
                                </Form.Group>
                            </Form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggletype}>Cerrar</MDBBtn>
                            <MDBBtn color="primary" onClick={this.handleSentFormType}>Aceptar</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>Editar producto</MDBModalHeader>
                        <MDBModalBody>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Nombre del producto</Form.Label>
                                    <Form.Control type="text" placeholder="nombre" name="name" value={this.state.activeProduct?this.state.activeProduct.name:""}  onChange={this.handleFormChange}/>
                                </Form.Group>

                                <Form.Group controlId="formPrice">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control type="number" placeholder="precio" name="oprice" value={this.state.activeProduct?this.state.activeProduct.oprice:""} onChange={this.handleFormChange}/>
                                </Form.Group>

                                <Form.Group controlId="formPackage">
                                    <Form.Label>Numero de empaques</Form.Label>
                                    <Form.Control type="number" placeholder="empaques" name="package" value={this.state.activeProduct?this.state.activeProduct.package:""} onChange={this.handleFormChange}/>
                                </Form.Group>

                                <Form.Group controlId="formdescription">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" placeholder="descripcion" name="description" value={this.state.activeProduct?this.state.activeProduct.description:""} onChange={this.handleFormChange}/>
                                </Form.Group>

                                <Form.Group controlId="formActive">
                                    <Form.Label>Disponibilidad</Form.Label>
                                    <Form.Control as="select" value={this.state.activeProduct?this.state.activeProduct.oactive:0} name={"oactive"} onChange={this.handleFormChange}>
                                        <option value={0}>No disponible</option>
                                        <option value={1}>Disponible</option>
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
                        <MDBModalHeader toggle={this.togglecreate}>Crear producto</MDBModalHeader>
                        <MDBModalBody>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Nombre del producto</Form.Label>
                                    <Form.Control type="text" placeholder="nombre" name="name" value={this.state.createProduct.name}  onChange={this.handleFormChangeCreate}/>
                                </Form.Group>

                                <Form.Group controlId="formPrice">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control type="number" placeholder="precio" name="price" value={this.state.createProduct.price} onChange={this.handleFormChangeCreate}/>
                                </Form.Group>

                                <Form.Group controlId="formPackage">
                                    <Form.Label>Numero de empaques</Form.Label>
                                    <Form.Control type="number" placeholder="empaques" name="package" value={this.state.createProduct.package} onChange={this.handleFormChangeCreate}/>
                                </Form.Group>

                                <Form.Group controlId="formdescription">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" placeholder="descripcion" name="description" value={this.state.createProduct.description} onChange={this.handleFormChangeCreate}/>
                                </Form.Group>

                                <Form.Group controlId="formActive">
                                    <Form.Label>Disponibilidad</Form.Label>
                                    <Form.Control as="select" value={this.state.createProduct.active} name={"active"} onChange={this.handleFormChangeCreate}>
                                        <option value={0}>No disponible</option>
                                        <option value={1}>Disponible</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formActive">
                                    <Form.Label>Categoria</Form.Label>
                                    <Form.Control as="select" value={this.state.createProduct.idProductType} name={"idProductType"} onChange={this.handleFormChangeCreate}>
                                        {op}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Imagen</Form.Label>
                                    <Form.Control type="file" placeholder="imagen" name="file"  onChange={this.handleFormChangeCreate}/>
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
                                    Gestión de Productos
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <h4 style={{marginTop: "0", padding: "0"}}>Gestion de Productos</h4>
                            <Row>
                                <Col>
                                    <Button variant="primary" onClick={() => this.togglecreate()}>
                                        Crear producto
                                    </Button>
                                    <Button variant="secondary" onClick={() => this.toggletype()}>
                                        Crear categoria
                                    </Button>
                                </Col>
                            </Row>
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
                                        field: 'idProduct',
                                        width: 150
                                    },
                                    {
                                        label: 'Nombre',
                                        field: 'name',
                                        width: 150
                                    },
                                    {
                                        label: 'Categoria',
                                        field: 'type',
                                        sort: 'asc',
                                        width: 150
                                    },
                                    {
                                        label: 'Precio',
                                        field: 'price',
                                        width: 150
                                    },
                                    {
                                        label: 'imagen',
                                        field: 'image',
                                        width: 150
                                    },
                                    {
                                        label: 'Disponibilidad',
                                        field: 'active',
                                        width: 150
                                    }
                                ],
                                rows:this.state.dataProducts
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

export default connect(mapStateToProps)(withRouter(GestionProductos));