import React, { Component } from "react";
import './OrderDetails.css'
import {connect} from 'react-redux';

import LinkWithDelay from '../../../helpers/LinkWithDelay'
import firebase from "firebase/app";
import "firebase/firestore";
// import numeral from 'numeral';

import TabsSelector from "../../SupplierComponents/SupplierOrders/TabsSelector/TabsSelector"
import OrderCard from "./../OrderCardComponent/OrderCard"
import FiltersOrdersComponent from './../FiltersComponent/FiltersOrdersComponent'
import StickyFooter from "./../../10-LayOuts/PanHummerStickyFooter/StickyFooter"

import Modal from './../../12-Modal/Modal'
import OpenCaseSeller from './../../4-CaseSystem/SellerOpenCase/OpenCaseSeller'
import ModalFilterStateOrders from './../ModalFilterStateOrders/ModalFilterStateOrders'
import CancelOrderModal from "./../CancelOrderModal/CancelOrderModal";

import Alert from './../../11-Alert/Alert'
import ChangeShippingAddressModal from "./../ChangeShippingAddressModal/ChangeShippingAddressModal"
import SellerFlowCase from "./../../4-CaseSystem/SellerFlowCase/SellerFlowCase"
import SpinnerInChargeMore from './../../layout/SpinnerInChargeMore/SpinnerInChargeMore'

class OrdersDetails extends Component {
  
  state={
    activeFilterByPay:false,
    selectedPay:'Todos',

    activeFilterByCustomer:false,
    selectedCustomer:undefined,

    activeFilterByOrderState:false,
    selectedOrderState:undefined,

    userOrders:[],

    showModal:false,
    whatModalToShow:null,

    idPedido:null,
    tiempoCreacion:null,
    direccionVendedor:null,
    pedidoObjeto:null,

    showAlert:false,
    whatAlertToShow:null,

    cambiandoDireccion:false,
    cancelandoPedido:false,
    mostrandoAlerta:false,


    x:undefined,
    y:undefined,

    prevDocument:null, //NOTE: Usado para paginar los pedidos.

    listeners:[],
    isBottom:false,
    isDocuments:false,
  }

  toggleAlert=(whatAlertToShow,cambiarAlert)=>{
    if(cambiarAlert===true){
      this.setState({
        whatAlertToShow:whatAlertToShow
      })
    }else{
      this.setState({
        showAlert:!this.state.showAlert,
        whatAlertToShow:whatAlertToShow
      })
    }
  }

  toggleModal=(whatModalToShow,cambiarModal)=>{
    //NOTE: Si showModal ahora sera true, entonces se guarda la ubicacion del scroll antes de abrir el modal
    if(!this.state.showModal===true){
      this.state.x=window.pageXOffset
      this.state.y=window.pageYOffset
    }
    this.carryOnWithToggleModal(whatModalToShow,cambiarModal)
  }
  carryOnWithToggleModal=(whatModalToShow,cambiarModal)=>{
    //NOTE: Si el showModal ahora va a ser false, entonces se ubica el scroll en la posicion que se guardo antes de ser abierto!
    if(!this.state.showModal===false){window.scrollTo(this.state.x,this.state.y)}

    if(cambiarModal===true){
      this.setState({
        whatModalToShow:whatModalToShow
      })
    }else{
      this.setState({
        showModal:!this.state.showModal,
        whatModalToShow:whatModalToShow
      })
    }
  }


  
  componentDidMount=()=>{
    this.getOrders('componentDidMount')
    document.addEventListener('scroll', this.trackScrolling);//NOTE: Añadiendo el listener de "scroll" al documento
  }
  
  
  componentWillUnmount=()=>{
    this.unsuscribeAllListener()
    document.removeEventListener('scroll', this.trackScrolling);//NOTE: Elimiand el listener de "scroll" al documento
  }

  unsuscribeAllListener=async()=>{
    console.log('Se van a desisncribir los listener')
    //NOTE: Unsuscribe todos los listenes ( cada vez que se crear un listener se agrega al array "listeners" en el estado del componente, luego al querer unsuscribe them se mapea el vector y se corre la funcion asociada a cada uno)
    this.state.listeners.map(listener=>{
      listener()
    })
    //NOTE: Reiniciando vector pedidos cada vez que se filtra la vista, asi como reseteando el prevDoc y eliminarndo todos los listeneres una ves han sido unsuscribed
    this.setState({userOrders:[],prevDocument:null,listeners:[]})
  }


  //NOTE: Funciones de filtro
  applyFilterByPay=async(e)=>{
    if(e.target.id!==this.state.selectedPay){
      if(e.target.id!=='Todos'){
        await this.setState({selectedPay:e.target.id,activeFilterByPay:true})
        this.getOrders('applyFilterByPay')
      }else{
        await this.setState({selectedPay:'Todos',activeFilterByPay:false})
        this.getOrders('applyFilterByPay')
      }
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

  applyFilterByState=async(option)=>{
    if(option!==this.state.selectedOrderState){
      if(option===undefined){
        await this.setState({selectedOrderState:undefined,activeFilterByOrderState:false})
        this.getOrders('applyFilterByState')
      }else{
        await this.setState({selectedOrderState:option,activeFilterByOrderState:true})
        this.getOrders('applyFilterByState')
      }
    }
  }

  
  //NOTE: Funcion listeners que traen los pedidos desde DB
  getOrders=async(origen)=>{
    //TODO: No ocurre estando solo con el filtro de "cliente" ni solo con el filtro de "tipoPago"
    //TODO: No ocurre estando activos los filtros cliente y tipoPago al mismo timepo
    //TODO: Si ocurre estando activos los filtros tipoPago y estado al mismo tiempo!
    //TODO: Cuando esta activo el filtro cliente y el filtro estado y se crea un caso no se capta el cambio y suigue mostrando "abrir caso"
    //TODO: Lo mismo ocurre estando activos los tres filtros
    //TODO: Lo mismo ocurre con solo el filtro de estado

    //TODO: Eso ocurre por que al cambiar el estado como en el caso de la apertura de un caso, en donde pasa de estar en "Despachado" a "Caso abierto", el listener que habia sido activado con "Despachado" ya no cobija al pedido "Caso abierto" y por lo tanto no lo actualiza! 
    var db=firebase.firestore()
    const {activeFilterByPay, selectedPay}=this.state
    const {activeFilterByCustomer,  selectedCustomer}=this.state
    const {activeFilterByOrderState,  selectedOrderState}=this.state
    const idVendedor=this.props.uid
    var {prevDocument}=this.state
    
    console.log(origen)
    if(origen!=='componentDidMount' &&  origen!=='cargarMas'){
      await this.unsuscribeAllListener()
    }

    let query_original
    let limit=2
    if(activeFilterByPay===false && activeFilterByCustomer===false && activeFilterByOrderState===false){
      console.log('Pedidos sin filtro:')
      query_original=db.collection('pedidos').where('idVendedor','==',idVendedor).orderBy('OrderByDate','desc').limit(limit)
    }else if(activeFilterByPay===true && activeFilterByCustomer===false && activeFilterByOrderState===false){
      console.log('Pedidos filtrados por forma de pago:',selectedPay)
      query_original=db.collection('pedidos').where('idVendedor','==',idVendedor).where('tipoPago','==',selectedPay).orderBy('OrderByDate','desc').limit(limit)
    }else if(activeFilterByPay===false && activeFilterByCustomer===true && activeFilterByOrderState===false){
      console.log('Pedidos filtrados por cliente:',this.state.selectedCustomer)
      query_original=db.collection('pedidos').where('idVendedor','==',idVendedor).where('idCliente','==',selectedCustomer).orderBy('OrderByDate','desc').limit(limit)
    }else if(activeFilterByPay===false && activeFilterByCustomer===false && activeFilterByOrderState===true){
      console.log('Pedidos filtrados por estado:',this.state.selectedOrderState)  
      query_original=db.collection('pedidos').where('idVendedor','==',idVendedor).where('estado','==',selectedOrderState).orderBy('OrderByDate','desc').limit(limit)
    }else if(activeFilterByPay===true && activeFilterByCustomer===true && activeFilterByOrderState===false){
      console.log('Pedidos filtrados por tipo de pago y cliente:')
      query_original=db.collection('pedidos').where('idVendedor','==',idVendedor).where('tipoPago','==',selectedPay).where('idCliente','==',selectedCustomer).orderBy('OrderByDate','desc').limit(limit)
    }else if(activeFilterByPay===true && activeFilterByCustomer===false && activeFilterByOrderState===true){
      console.log('Pedidos filtrados por tipo de pago y estado:')
      query_original=db.collection('pedidos').where('idVendedor','==',idVendedor).where('tipoPago','==',selectedPay).where('estado','==',selectedOrderState).orderBy('OrderByDate','desc').limit(limit)
    }else if(activeFilterByPay===false && activeFilterByCustomer===true && activeFilterByOrderState===true){
      console.log('Pedidos filtrados por cliente y estado:')
      query_original=db.collection('pedidos').where('idVendedor','==',idVendedor).where('idCliente','==',selectedCustomer).where('estado','==',selectedOrderState).orderBy('OrderByDate','desc').limit(limit)
    }else if(activeFilterByPay===true && activeFilterByCustomer===true && activeFilterByOrderState===true){
      console.log('Pedidos filtrados por tipo de pago, cliente y estado:')
      query_original=db.collection('pedidos').where('idVendedor','==',idVendedor).where('tipoPago','==',selectedPay).where('idCliente','==',selectedCustomer).where('estado','==',selectedOrderState).orderBy('OrderByDate','desc').limit(limit)
    }

    let querySelected
    let stopQuery=false
    if(prevDocument===null || origen!=='cargarMas'){ //NOTE: Es la primera vez que se lee el query.
      querySelected=query_original
    }else if(prevDocument!==undefined && origen==='cargarMas'){//NOTE: Ya se ha leido el query y se ha gurdado correctamente el ultimo documento, entonces debe hacers eel mismo query con "startAfter"
      querySelected=query_original.startAfter(prevDocument)
    }else if(prevDocument===undefined || origen!=='cargarMas'){ //NOTE: No hay mas documentos
      stopQuery=true
      this.setState({isDocuments:false,isBottom:false})
      console.log('No hay mas documentos para traer')
    }else{
      stopQuery=true
      this.setState({isDocuments:false,isBottom:false})
      console.log('Algo distinto ocurrio')
    }
    
    if(stopQuery===false){
      this.setState({isBottom:true})
      //TODO: Remover setTimeout, esta aca solo para simular una demora en la carga de datos y permitir mostrar por mas tiempo el Spinner!
      setTimeout(() => {
        this.state.listeners.push(querySelected.onSnapshot((snap)=>{
          console.log('Snap docs',snap.docs)
          if(snap.empty){
            console.log('snap is empty')
            this.setState({isDocuments:false})
          }else{
            console.log('snap is not empty')
            this.setState({isDocuments:true})
          }
          this.state.prevDocument=snap.docs[snap.docs.length-1] //NOTE: Guardando como prevDoc el ultimo de aquellos traidos en el snap.
          let auxUserOrders=[]
          snap.forEach((doc)=>{
            if(doc.data().posibleCancelar==='true'){//TODO: posibleCandelar debe ser un booleano de verdad
              this.calculateIfHaveBeenHappenedTwentyFourHours(doc.data().id,doc.data().tiempoCreacion)//NOTE: Si el atributo "posible cancelar" del pedido traido en el snap es === true, entonces se envia a la funcion calculate24hr para calcula el tiempo restante. De esta forma, al trae un doc siempre se revisa primero que pueda ser cancelado, de lo contrario se desabilita esta opcion
            }
            let docExist=this.state.userOrders.filter(order=>order.id===doc.data().id)//NOTE: Comprobando si el doc traido ya exite en el array de ordenes que se esta renderizando
            let indexDocExist=this.state.userOrders.indexOf(docExist[0])//NOTE: Obteniendo el index del documento, en caso de existir sera != -1
            if(docExist.length>0){//NOTE: Ya existe el objeto
              console.log('Ya existe el objeto')
              this.state.userOrders.splice(indexDocExist,1,doc.data()) //NOTE: Como ya existe, entonces usando splice se reemplaza el objeto en la misma posicin en la que estaba
            }else{//NOTE: No existe el objeto
              console.log('No existe el objeto')
              auxUserOrders.push(doc.data()) //NOTE: Como no existe, entonces se hace push para agregarlo en ultima posicion.
            }
          })
          this.setState({userOrders:[...this.state.userOrders,...auxUserOrders],isBottom:false})
          document.addEventListener('scroll', this.trackScrolling);//NOTE: Reactivando el listener de scroll
        }))
      }, 500);
    }
      
  }

  componentDidUpdate=()=>{
    console.log(this.state.listeners)
  }
  
  //NOTE: Funcion para comprobar el tiempo que ha pasado desde la creacion del pedido.
  //Es llamada desde getOrders siempre y cuando un pedido tenga su atributo: "posibleCancelar=true"
  //Tambien es llamado desde cancelOrder
  //En caso de haber pasado 24 hr desde la creacion :::: Cambia el atributo :::: "posibleCancelar===false" -> el cual permite renderizar el boton "Cancelar" si es true y "Cambiar direccion" si es false
  calculateIfHaveBeenHappenedTwentyFourHours=async(idPedido,tiempoCreacion)=>{
    let tiempoActual= Date.now() //Hora expresada en milisegundos, dividir sobre 1000 para obtener segundos
    let diferenciaTiempos=(tiempoActual/1000)-(tiempoCreacion/1000)
    
    if(diferenciaTiempos>=60){ //86400 segundos -> 24 hr 
      console.log('Ya no es posible cancelar; Han pasado 24 hr, se procede a actualizar su estado en la DB de tal forma que ya no se pueda cancelar el pedido en cuestion')
      await firebase.firestore().collection('pedidos').doc(idPedido)
        .update({posibleCancelar:'false'}) //TODO: Debe ser boolenano de verdad
        .then(res=>{console.log('actualizado con exito')})
        .catch(err=>console.log('ocurrio un error:',err))
      return 'noEsPosibleCancelar'

    }else{
      console.log('Aun es posible cancelar; Faltan:',((86400-diferenciaTiempos)/60)/60,'horas, para superar las 24 hr desde la creacion')
      return 'siEsPosibleCancelar'
    }
  }


  //NOTE: Funciones disponibles unicamente desde los botones de cada pedido renderizado

  //Es llamado solamente desde el boton "Cancelar" el cual solo es visible si el atribuo :::: "posibleCancelar===true"
  //Confirma si no han pasado 24 hr desde la creacion, si es posible cancelar, entonces: cambia atributos :::: "estado==='cancelado'" ::&&:: "posibleCancelar===false" -> permieitnedo renderizar btn "Canceladó"
  cancelOrder=(e,idPedido,tiempoCreacion,pedidoObjeto)=>{
    e.preventDefault()
    //NOTE: Las siguientes 2 lineas guardan la posicion desde donde llame "cancelOrder" de tal forma que al volver despues de cerrar el modal, el scroll se ubique nuevamente alli.
    this.state.x=window.pageXOffset
    this.state.y=window.pageYOffset
    this.state.idPedido=idPedido
    this.state.tiempoCreacion=tiempoCreacion
    // this.state.pedidoObjeto=pedidoObjeto
    this.toggleModal('cancelOrder')
    window.scrollTo(0,0)
    //NOTE: Mostrar advertencia y pedir confirmacion acerca de cancelar este pedido
    //Dependiendo de la confirmacion en el modal de "cancelOrder" se continua o no con "carryOnWithCancelOrder"
  }
  carryOnWithCancelOrder=async(idPedido,tiempoCreacion)=>{
    this.state.showAlert=false//NOTE: Inicianco el carryOn siempre con showAlert=false
    var {cancelandoPedido,mostrandoAlerta}=this.state
    let order=this.state.userOrders.filter(userOrder=>userOrder.id===idPedido)
    let posibleCancelar=order[0].posibleCancelar

    if(posibleCancelar==='true'){
      const res = await this.calculateIfHaveBeenHappenedTwentyFourHours(idPedido,tiempoCreacion)//NOTE: Verifica que si sea posible cancelar: devuelve "siEsPosibleCancelar" o "noEsPosibleCancelar" 
      if(res==='siEsPosibleCancelar' && cancelandoPedido===false){
        cancelandoPedido=true
        await firebase.firestore().collection('pedidos').doc(idPedido)
          .update({estado:'Cancelado',posibleCancelar:'false'})//TODO: posibleCandelar debe ser un booleano de verdad
          .then(res=>{
            console.log('El pedido con id=',idPedido,'ha sido cancelado con exito')
            this.toggleAlert('pedidoCanceladoConExito')
            setTimeout(() => {this.toggleAlert(null)}, 6000);
          })
          .catch(err=>console.log('ocurrio un error al cancelar pedido:',err))
        this.toggleModal(null)
        window.scrollTo(this.state.x,this.state.y)
        cancelandoPedido=false
      }else if(res==='noEsPosibleCancelar' && mostrandoAlerta===false){
        mostrandoAlerta=true
        this.toggleModal(null)
        window.scrollTo(this.state.x,this.state.y)
        this.toggleAlert('noEsPosibleCancelar')
        setTimeout(() => {
          this.toggleAlert(null)
          mostrandoAlerta=false
        }, 6000);
        console.log('No es posible cancelar el pedido ya que han pasado mas de 24 hr desde su creacion')
      }else if(cancelandoPedido===true){
        console.log('Actuamente existe un proceso de cancelacion de pedido')
      }
    }else if(posibleCancelar==='false'){
      console.log(':::No es posible cancelar el pedido ya que han pasado mas de 24 hr desde su creacion!')
    }
  }



  //Es llamado solamente desde el boton "Cambiar direccion" el cual solo es visible si el atributo :::: "posibleCancelar===false" ::&&:: "estado===Pendiente"
  //Cambiar atributos :::: "cambioLaDireccion===true" ::&&:: "direccionCliente===direccionUsuarioVendero" -> permitiendo renderizar btn "Direccion cambiadá"
  changeShippingAddress=(e,idPedido,direccionVendedor,pedidoObjeto)=>{
    e.preventDefault()
    //NOTE: Las siguientes 2 lineas guardan la posicion desde donde llame "cancelOrder" de tal forma que al volver despues de cerrar el modal, el scroll se ubique nuevamente alli.
    this.state.x=window.pageXOffset
    this.state.y=window.pageYOffset
    this.state.idPedido=idPedido
    this.state.direccionVendedor=direccionVendedor
    // this.state.pedidoObjeto=pedidoObjeto
    this.toggleModal('changeShippingAddress')
    window.scrollTo(0,0)//TODO: Revisar por que es necesario esto para poder cargar bien el modal
  }
  carryOnWithChangeShippingAddress=async(idPedido,direccionVendedor)=>{
    this.state.showAlert=false//NOTE: Inicianco el carryOn siempre con showAlert=false
    var {cambiandoDireccion,mostrandoAlerta}=this.state
    const {direccionResidencia}=this.props.user

    let order=this.state.userOrders.filter(userOrder=>userOrder.id===idPedido)
    let estado=order[0].estado
    let cambioLaDireccion=order[0].cambioLaDireccion

    if(estado==='Pendiente' && cambioLaDireccion==='false' && cambiandoDireccion===false){
      cambiandoDireccion=true
      await firebase.firestore().collection('pedidos').doc(idPedido)
        .update({cambioLaDireccion:'true',direccionCliente:direccionResidencia})//TODO: cambioLaDireccion debe ser un booleano de verdad.
        .then(res=>{
          console.log('Direccion cambiada con exito')
          this.toggleAlert('direccionCambiadaConExito')
          setTimeout(() => {this.toggleAlert(null)}, 6000);
        })
        .catch(err=>console.log('ocurrio un error al cambiar direccion:',err))
      this.toggleModal(null)
      window.scrollTo(this.state.x,this.state.y)
      cambiandoDireccion=false
    }else if(estado==='Despachado' && mostrandoAlerta===false){
      mostrandoAlerta=true
      this.toggleModal(null)
      window.scrollTo(this.state.x,this.state.y) //NOTE: Usando la posicion x y y grabadas en el state antes de abrirl el modal, se regresa el scroll a la posicion en la que estba cuando fue abierto el modal.
      this.toggleAlert('noEsPosibleCambiarDireccion')
      setTimeout(() => {
        this.toggleAlert(null)
        mostrandoAlerta=false
      }, 6000);
    }else if(cambioLaDireccion==='true'){
      console.log('Ya se ha cambiado la direccion de este pedido!')
    }else if(cambiandoDireccion===true){
      console.log('Existe un proceso de cambio activo en este momento!')
    }
  }



  openCase=(e,idPedido)=>{
    e.preventDefault()
    this.state.x=window.pageXOffset
    this.state.y=window.pageYOffset
    this.state.idPedido=idPedido
    this.toggleModal('OpenCaseSeller')
    window.scrollTo(0,0)
  }
  carryOnWithOpenCase=()=>{
    window.scrollTo(this.state.x,this.state.y)
    this.state.showAlert=false//NOTE: Inicianco el carryOn siempre con showAlert=false
    this.toggleAlert('casoCreadoConExito')
    setTimeout(() => {
      this.toggleAlert(null) 
    }, 6000);
  }

  showItemCaseDetails=(e,idPedido,pedidoObjeto)=>{
    e.preventDefault()
    this.state.x=window.pageXOffset
    this.state.y=window.pageYOffset
    this.state.idPedido=idPedido
    // this.state.pedidoObjeto=pedidoObjeto
    this.toggleModal('SellerCaseDetails')
    window.scrollTo(0,0)
  }

  handleFinishedCaseSuccess=()=>{
    this.toggleModal(null)
    this.state.showAlert=false//NOTE: Inicianco el carryOn siempre con showAlert=false
    this.toggleAlert('casoFinalizadoConExito')
    setTimeout(() => {
      this.toggleAlert(null) 
    }, 6000);
  }


  
  
  trackScrolling = () => {
    const wrappedElement = document.getElementById('end');
    if (wrappedElement.getBoundingClientRect().bottom-window.innerHeight<1) {
      console.log('Se alcanzo el bottom, se lanzara getOrders("cargarMas")');
      this.getOrders('cargarMas')
      document.removeEventListener('scroll', this.trackScrolling);//NOTE: Desactivando el listener de scroll to bottom para que no mande varios getOrders
    }
  };

  
  render() {
    const {userOrders,showModal,whatModalToShow,idPedido,tiempoCreacion,direccionVendedor,showAlert,whatAlertToShow}=this.state
    const {customersUser}=this.props
    const pedidoObjetoVector=userOrders.filter(order=>order.id===idPedido)//NOTE: Obteniendo el objetoPedido para los modales
    const pedidoObjeto=pedidoObjetoVector[0]
    return (
        <div id="end" className="pcControlerScreen ">

          <div className="row">
            <p className="accountTitle">Resumen de tus pedidos</p>
          </div>
          
          <TabsSelector 
            namesTabs={['Todos','Contra entrega','Pago Online']} 
            onClick={this.applyFilterByPay}
            activeTab={this.state.selectedPay}>
          </TabsSelector>

          {customersUser?
          <FiltersOrdersComponent
            vectorClientes={customersUser}
            applyFilterByCustomer={this.applyFilterByCustomer}
            toggleModal={this.toggleModal}
            selectedOrderState={this.state.selectedOrderState}>
          </FiltersOrdersComponent>
          :
          console.log('Render sin clientes del usuairio vendedor... esperando que se cargen...')
          }
                
          {this.state.userOrders.length>0?
          userOrders.map(pedido=>
            <OrderCard
              pedidoObjeto={pedido}//NOTE: Esta propiedad puede remplazar las demas...
              idProducto={pedido.idProducto}
              idPedido={pedido.id} 
              posibleCancelar={pedido.posibleCancelar} 
              cambioLaDireccion={pedido.cambioLaDireccion}
              tipoPago={pedido.tipoPago} 
              estado={pedido.estado} 
              fecha={pedido.fecha} 
              idProveedor={pedido.idProveedor} 
              nombreProveedor={pedido.nombreProveedor} 
              imagenProducto={pedido.imagenProducto} 
              costo={pedido.costo} 
              ganancia={pedido.ganancia} 
              precioVenta={pedido.precioVenta} 
              idCliente={pedido.idCliente} 
              direccionCliente={pedido.direccionCliente}
              tiempoCreacion={pedido.tiempoCreacion}
              
              
              function_cancelOrder={this.cancelOrder}
              function_changeShippingAddress={this.changeShippingAddress}
              function_openCase={this.openCase}
              function_showItemCaseDetails={this.showItemCaseDetails}>
            </OrderCard>  
          )
          :
          console.log('Render sin pedidos cargados... esperando que se carguen...')}



          {(function showModal(user,showModal,whatModalToShow,toggleModal,applyFilterByState,carryOnWithCancelOrder,carryOnWithChangeShippingAddress,carryOnWithOpenCase,handleFinishedCaseSuccess) {
            if(showModal){
              switch (whatModalToShow) {
                case 'OpenCaseSeller':
                  return <Modal><OpenCaseSeller carryOnWithOpenCase={carryOnWithOpenCase} toggleModal={toggleModal} idPedido={idPedido}/></Modal>
                case 'SellerCaseDetails':
                  return <Modal><SellerFlowCase user={user}/**TODO: user debe ser pasado pero en el componente correspondiente al del proveedor. Aca funciona como prueba... */ handleFinishedCaseSuccess={handleFinishedCaseSuccess} pedidoObjeto={pedidoObjeto}  toggleModal={toggleModal} idPedido={idPedido}/></Modal>
                case 'filterByState':
                  return <Modal><ModalFilterStateOrders toggleModal={toggleModal} applyFilterByState={applyFilterByState}/></Modal>
                case 'cancelOrder':
                  return <Modal><CancelOrderModal pedidoObjeto={pedidoObjeto} toggleModal={toggleModal} idPedido={idPedido} tiempoCreacion={tiempoCreacion} carryOnWithCancelOrder={carryOnWithCancelOrder}/></Modal>
                case 'changeShippingAddress':
                  return <Modal><ChangeShippingAddressModal user={user} pedidoObjeto={pedidoObjeto} toggleModal={toggleModal} idPedido={idPedido} direccionVendedor={direccionVendedor} carryOnWithChangeShippingAddress={carryOnWithChangeShippingAddress}/></Modal>
                default:
                  break;
              }
            }
          })(this.props.user,showModal,whatModalToShow,this.toggleModal,this.applyFilterByState,this.carryOnWithCancelOrder,this.carryOnWithChangeShippingAddress,this.carryOnWithOpenCase,this.handleFinishedCaseSuccess)}


          
          {(function showAlert(showAlert,whatAlertToShow) {
            if(showAlert){
              switch (whatAlertToShow) {
                case 'noEsPosibleCancelar':
                    return <Alert mode="alertCard-red"><i style={{marginRight:20,fontSize:30}} className="icon-cancel-circled"/> No es posible cancelar el pedido ya que han pasado mas de 24 hr desde su creacion.</Alert>
                case 'noEsPosibleCambiarDireccion':
                    return <Alert mode="alertCard-red"><i style={{marginRight:20,fontSize:30}} className="icon-cancel-circled"/> No es posible cambiar la direccion ya que el pedido ha sido despachado.</Alert>
                case 'pedidoCanceladoConExito':
                    return <Alert mode="alertCard-green"><i style={{marginRight:20,fontSize:30}} className="icon-check-circle"/> ¡El pedido ha sido cancelado exitosamente!</Alert>
                case 'direccionCambiadaConExito':
                    return <Alert mode="alertCard-green"><i style={{marginRight:20,fontSize:30}} className="icon-check-circle"/> ¡La direccion ha sido cambiada exitosamente!</Alert>
                case 'casoCreadoConExito':
                    return <Alert mode="alertCard-green"><i style={{marginRight:20,fontSize:30}} className="icon-check-circle"/> ¡Caso creado exitosamente!</Alert>
                case 'casoFinalizadoConExito':
                    return(<Alert mode="alertCard-green"><i style={{marginRight:20,fontSize:30}} className="icon-check-circle"/>¡Se ha finalizado el caso exitosamente!.</Alert>);    
                default:
                  break;
              }
            }
          })(showAlert,whatAlertToShow)}
          {/* <StickyFooter/> */}

          {this.state.isBottom?<SpinnerInChargeMore/>:null}
          {this.state.isDocuments?null:
          <div className="row">
            <div className="snapEmpty col-12 d-flex justify-content-center align-items-center">
              No hay mas pedidos
            </div>
          </div>
          }
        </div>
      )
  }
};

const mapStateToProps=(state)=>{
  return{
    user:state.firebase.profile,
    uid:state.firebase.auth.uid,
    customersUser:state.firebase.profile.clientes,
  }
}
export default connect(mapStateToProps,null)(OrdersDetails)

