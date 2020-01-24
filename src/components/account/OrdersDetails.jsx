import React, { Component } from "react";
import LinkWithDelay from '../../helpers/LinkWithDelay';
import {connect} from 'react-redux';
import firebase from "firebase/app";
import "firebase/firestore";
// import numeral from 'numeral';
import {applyStateFilterToOrders} from '../../ducks/accountDuck/applyFilterToOrdersDuck';
import TabsSelector from "../SupplierComponents/SupplierOrders/TabsSelector/TabsSelector";
import OrderCard from "./OrderCardComponent/OrderCard"
import FiltersOrdersComponent from './FiltersComponent/FiltersOrdersComponent'

class OrdersDetails extends Component {
  
  state={
    activeFilterByPay:false,
    selectedPay:'Todos',

    activeFilterByCustomer:false,
    selectedCustomer:undefined,

    //NOTE: Estas opciones mejor se estan trayendo de las props debido a que este filtro se aplica mediante un modal, por lo cual estas opciones se guardan en el estado global del app
    // activeFilterByOrderState:false,
    // selectedOrderState:undefined

    userOrders:[]
  }

  componentDidMount=()=>{
    console.log(this.props.selectedOrderState)
    this.getOrders('componentDidMount')
  }

  componentWillUnmount=()=>{
    document.getElementById('ownModal').removeAttribute('class')
    document.body.removeAttribute('class')
    document.body.className='myAccountStyle'

    this.props.applyStateFilterToOrders(false,'removerFiltro')
    this.unsuscribeAllListener()
  }

  applyFilterByPay=async(e)=>{
    if(e.target.id!=='Todos'){
      await this.setState({selectedPay:e.target.id,activeFilterByPay:true})
      this.getOrders('applyFilterByPay')
    }else{
      await this.setState({selectedPay:'Todos',activeFilterByPay:false})
      this.getOrders('applyFilterByPay')
    }
  }

  applyFilterByCustomer=async(e)=>{
    if(e.target.value!=='MostrarTodos'){
      await this.setState({selectedCustomer:e.target.value,activeFilterByCustomer:true})
      this.getOrders('applyFilterByCustomer')
    }else{
      await this.setState({selectedCustomer:undefined,activeFilterByCustomer:false})
      this.getOrders('applyFilterByCustomer')
    }
  }

  applyFilterByState=(e)=>{
    window.scrollTo(0, 0)//Seteando el scroll en las posiciones iniciales para no afectar el modal
    this.props.applyStateFilterToOrders(true)
  }

  componentDidUpdate=(prevProps)=>{
    if(prevProps.activeFilterByOrderState!==this.props.activeFilterByOrderState){
      this.getOrders('applyFilterByState')
    }
  }

  unsuscribeAllListener=async()=>{
    const listeners=[
      this.unsubscribePedidosSinFiltro,
      this.unsubscribePedidosFiltroFormaPago,
      this.unsubscribePedidosFiltroCliente,
      this.unsubscribePedidosFiltroEstado,
      this.unsubscribePedidosFiltro_Pago_y_cliente,
      this.unsubscribePedidosFiltro_Pago_y_estado,
      this.unsubscribePedidosFiltro_Cliente_y_Estado,
      this.unsubscribePedidosFiltro_Pago_Cliente_y_Estado
    ]

    //NOTE: Reiniciando vector pedidos cada vez que se filtra la vist a
    this.setState({userOrders:[]})
    
    //NOTE: unsuscribe el listener que existe actualmente
    return Promise.all(listeners.map(async(listener)=>{if(listener){return Promise.resolve(listener())}}))
  }

  getOrders=async(origen)=>{
    //TODO: traer idVendedor desde el documento de cada usuario...
    var db=firebase.firestore()
    const {activeFilterByPay,selectedPay,   activeFilterByCustomer,selectedCustomer}=this.state
    const {activeFilterByOrderState,selectedOrderState}=this.props

    if(origen!=='componentDidMount'){
      await this.unsuscribeAllListener()
    }

    if(activeFilterByPay===false && activeFilterByCustomer===false && activeFilterByOrderState===false){
      console.log('Pedidos sin filtro:')
      this.unsubscribePedidosSinFiltro=db.collection('pedidos').where('idVendedor','==','Andres').onSnapshot((snap)=>{
        let auxUserOrders=[]
        snap.forEach((doc)=>{
          auxUserOrders.push(doc.data())
        })
        this.setState({userOrders:auxUserOrders})
      })
    }else if(activeFilterByPay===true && activeFilterByCustomer===false && activeFilterByOrderState===false){
      console.log('Pedidos filtrados por forma de pago:',selectedPay)
      this.unsubscribePedidosFiltroFormaPago=db.collection('pedidos').where('idVendedor','==','Andres').where('tipoPago','==',selectedPay).onSnapshot((snap)=>{
        let auxUserOrders=[]
        snap.forEach((doc)=>{
          auxUserOrders.push(doc.data())
        })
        this.setState({userOrders:auxUserOrders})
      })
    }else if(activeFilterByPay===false && activeFilterByCustomer===true && activeFilterByOrderState===false){
      console.log('Pedidos filtrados por cliente:',this.state.selectedCustomer)
      this.unsubscribePedidosFiltroCliente=db.collection('pedidos').where('idVendedor','==','Andres').where('idCliente','==',selectedCustomer).onSnapshot((snap)=>{
        let auxUserOrders=[]
        snap.forEach((doc)=>{
          auxUserOrders.push(doc.data())
        })
        this.setState({userOrders:auxUserOrders})
      })
    }else if(activeFilterByPay===false && activeFilterByCustomer===false && activeFilterByOrderState===true){
      console.log('Pedidos filtrados por estado:',this.props.selectedOrderState)  
      this.unsubscribePedidosFiltroEstado=db.collection('pedidos').where('idVendedor','==','Andres').where('estado','==',selectedOrderState).onSnapshot((snap)=>{
        let auxUserOrders=[]
        snap.forEach((doc)=>{
          auxUserOrders.push(doc.data())
        })
        this.setState({userOrders:auxUserOrders})
      })
    }else if(activeFilterByPay===true && activeFilterByCustomer===true && activeFilterByOrderState===false){
      console.log('Pedidos filtrados por tipo de pago y cliente:')
      this.unsubscribePedidosFiltro_Pago_y_cliente=db.collection('pedidos').where('idVendedor','==','Andres').where('tipoPago','==',selectedPay).where('idCliente','==',selectedCustomer).onSnapshot((snap)=>{
        let auxUserOrders=[]
        snap.forEach((doc)=>{
          auxUserOrders.push(doc.data())
        })
        this.setState({userOrders:auxUserOrders})
      })
    }else if(activeFilterByPay===true && activeFilterByCustomer===false && activeFilterByOrderState===true){
      console.log('Pedidos filtrados por tipo de pago y estado:')
      this.unsubscribePedidosFiltro_Pago_y_estado=db.collection('pedidos').where('idVendedor','==','Andres').where('tipoPago','==',selectedPay).where('estado','==',selectedOrderState).onSnapshot((snap)=>{
        let auxUserOrders=[]
        snap.forEach((doc)=>{
          auxUserOrders.push(doc.data())
        })
        this.setState({userOrders:auxUserOrders})
      })
    }else if(activeFilterByPay===false && activeFilterByCustomer===true && activeFilterByOrderState===true){
      console.log('Pedidos filtrados por cliente y estado:')
      this.unsubscribePedidosFiltro_Cliente_y_Estado=db.collection('pedidos').where('idVendedor','==','Andres').where('idCliente','==',selectedCustomer).where('estado','==',selectedOrderState).onSnapshot((snap)=>{
        let auxUserOrders=[]
        snap.forEach((doc)=>{
          auxUserOrders.push(doc.data())
        })
        this.setState({userOrders:auxUserOrders})
      })
    }else if(activeFilterByPay===true && activeFilterByCustomer===true && activeFilterByOrderState===true){
      console.log('Pedidos filtrados por tipo de pago, cliente y estado:')
      this.unsubscribePedidosFiltro_Pago_Cliente_y_Estado=db.collection('pedidos').where('idVendedor','==','Andres').where('tipoPago','==',selectedPay).where('idCliente','==',selectedCustomer).where('estado','==',selectedOrderState).onSnapshot((snap)=>{
        let auxUserOrders=[]
        snap.forEach((doc)=>{
          auxUserOrders.push(doc.data())
        })
        this.setState({userOrders:auxUserOrders})
      })
    }
  }
  
  render() {
    const {userOrders}=this.state

    if(this.state.userOrders.length>0){
      return (
        <div className="pcControlerScreen ">

          <div className="row">
            <p className="accountTitle">Resumen de tus pedidos</p>
          </div>
          
          <TabsSelector 
            namesTabs={['Todos','ContraEntrega','Pago Online']} //TODO: Traer clientes del usuario vendedor desde su documento en DB.
            onClick={this.applyFilterByPay} 
            activeTab={this.state.selectedPay}>
          </TabsSelector>


          <FiltersOrdersComponent
            vectorClientes={['Pepito','Alejandro']}
            applyFilterByCustomer={this.applyFilterByCustomer}
            applyFilterByState={this.applyFilterByState}
            selectedOrderState={this.props.selectedOrderState}>
          </FiltersOrdersComponent>
                

          {userOrders.map(pedido=>
            <OrderCard 
              idPedido={pedido.idPedido} 
              posibleCancelar={pedido.posibleCancelar} 
              cambioLaDireccion={pedido.cambioLaDireccion} 
              casoAbierto={pedido.casoAbierto} 
              tipoPago={pedido.tipoPago} 
              ultimoEstado={pedido.ultimoEstado} 
              fecha={pedido.fecha} 
              idProveedor={pedido.idProveedor} 
              imagenProducto={pedido.imagenProducto} 
              costo={pedido.costo} 
              ganancia={pedido.ganancia} 
              precioVenta={pedido.precioVenta} 
              idCliente={pedido.idCliente} 
              direccionCliente={pedido.direccionCliente}>
            </OrderCard>  
          )}

        </div>
      )
        }else{
          return(
            <div className="pcControlerScreen ">
              <div className="row">
                <p className="accountTitle">Resumen de tus pedidos</p>
              </div>

              <TabsSelector 
                namesTabs={['Todos','ContraEntrega','Pago Online']} 
                onClick={this.applyFilterByPay} 
                activeTab={this.state.selectedPay}>
              </TabsSelector>

              <FiltersOrdersComponent
                vectorClientes={['Pepito','Alejandro']}
                applyFilterByCustomer={this.applyFilterByCustomer}
                applyFilterByState={this.applyFilterByState}
                selectedOrderState={this.props.selectedOrderState}>>
              </FiltersOrdersComponent>
            </div>
          )
        }
  }};


const mapStateToProps=(state)=>({
  //NOTE: Este es el que me devuelve el estado seleccionado desde el modal del filtro por estados
  activeFilterByOrderState:state.showOrHideApplyStateFilterReducer.activeFilterByOrderState,
  selectedOrderState:state.showOrHideApplyStateFilterReducer.selectedOrderState,
})

const mapDispatchToProps=(dispatch)=>{
  return {
    applyStateFilterToOrders:(option,orderState)=>dispatch(applyStateFilterToOrders(option,orderState))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrdersDetails);
