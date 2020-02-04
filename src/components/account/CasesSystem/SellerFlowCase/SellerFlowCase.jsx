import React, { Component } from 'react'
import SellerCaseDetails from './../SellerCaseDetails/SellerCaseDetails'
import HeaderCaseSystem from './../../CasesSystem/SellerCaseStyleComponents/Header/HeaderCaseSystem'
import BodyFlowCase from './BodyFlowCase/BodyFlowCase'




// NOTE: NO BORRAR!!!!! Este seria el componente para el vendedor, este se queda aca! 
export default class SellerFlowCase extends Component {
    state={
        showCaseDetails:false,
    }

    
    showCaseDetailsEvent=()=>{
        this.setState({showCaseDetails:!this.state.showCaseDetails})
    }

    
    //NOTE: Dependiendo de variables del pedido como: 
        //"casoResuelto": no resuelto : a favor del vendedor : a favor del proveedor, asi como de
        //"guiaCargada": true, false, y
        //"bonoReintegro":true,false
        //renderizar diferentes componentes tanto al vendedor como al proveedor
        //para cada una de esas vistas, mostrar, donde sea posible, la opcion de ver los detalles del caso + el visualizador de imagenes Dragable
    render() {
        const {showCaseDetails}=this.state
        const {pedidoObjeto,idPedido,toggleModal,handleFinishedCaseSuccess}=this.props
        const {casoResuelto,guiaCargada,guiaURL,bonoReintegroActivado,bonoReintegroCodigo,respuestaProveedor}=this.props.pedidoObjeto 
        


        if(showCaseDetails===false){
            return (
                <div className="container modalOpenCaseInsideCard">
                    <HeaderCaseSystem 
                        idPedido={idPedido} 
                        subtitulo={''} 
                        parrafo={''}
                        toggleModal={toggleModal}>
                    </HeaderCaseSystem>

                    {/* NOTE: Con esta funcion, se renderiza el componente BodyFlowCase de acuerdo al estado dentro del flujo en el cual esta el caso */}
                    {(function mode(pedidoObjeto,datosProveedor,casoResuelto,guiaCargada,guiaURL,bonoReintegroActivado,bonoReintegroCodigo,toggleModal,respuestaProveedor,handleFinishedCaseSuccess) {
                        if(casoResuelto==='noResuelto'){
                            return <BodyFlowCase idPedido={idPedido} titulo={'Tu solicitud ya fue atendida y esta proxima a ser resuelta.'} parrafo={'Porfavor revisa los detalles de este pedido para conocer la resolucion del caso una vez se haya finalizado.'} mode={'esperandoResolucion'} toggleModal={toggleModal}/>
                        }else if(casoResuelto==='resueltoAfavorDelVendedor' && guiaCargada===false){
                            return <BodyFlowCase datosProveedor={datosProveedor} idPedido={idPedido} titulo={'El proveedor ha aceptado resolver tu solicitud.'} parrafo={'Debes devolver el producto a las instalaciones del proveedor y cargar la guia de envio para continuar con el proceso.'} mode={'resueltoAfavorDelVendedor'}/>
                        }else if(casoResuelto==='resueltoAfavorDelVendedor' && guiaCargada===true){
                            return <BodyFlowCase pedidoObjeto={pedidoObjeto} bonoReintegroActivado={bonoReintegroActivado} bonoReintegroCodigo={bonoReintegroCodigo} idPedido={idPedido} titulo={'Pronto el proveedor finalizara tu solicitud.'} parrafo={''} mode={'esperandoBono_o_reintegro'} handleFinishedCaseSuccess={handleFinishedCaseSuccess}/>
                        }else if(casoResuelto==='resueltoAfavorDelProveedor'){
                            return <BodyFlowCase idPedido={idPedido} titulo={'El proveedor ha presentado una objecion a tu solicitud:'} parrafo={''} mode={'resueltoAfavorDelProveedor'} respuestaProveedor={respuestaProveedor} toggleModal={toggleModal} handleFinishedCaseSuccess={handleFinishedCaseSuccess}/>
                        }
                    })(pedidoObjeto,pedidoObjeto.datosProveedor,casoResuelto,guiaCargada,guiaURL,bonoReintegroActivado,bonoReintegroCodigo,toggleModal,respuestaProveedor,handleFinishedCaseSuccess)}

                    <div style={{marginTop:40}} className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <div className="seeCaseResume" onClick={this.showCaseDetailsEvent}>Ver detalles</div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
            <SellerCaseDetails
            pedidoObjeto={pedidoObjeto}
            idPedido={idPedido}
            toggleModal={toggleModal}
            showCaseDetailsEvent={this.showCaseDetailsEvent}
            />
            )
        }
    }
}




// export default class SellerFlowCase extends Component {
// //NOTE: Este seria el componente para el proveedor, DEBE PASARSE A LOS COMPONENTES DEL PROVEEDOR
//     state={
//         showCaseDetails:false,
//     }

//     componentDidMount=()=>{
//         console.log(this.props.user)
//     }

//     showCaseDetailsEvent=()=>{
//         this.setState({showCaseDetails:!this.state.showCaseDetails})
//     }

//     //NOTE: Dependiendo de variables del pedido como: 
//         //"casoResuelto": no resuelto : a favor del vendedor : a favor del proveedor, asi como de
//         //"guiaCargada": true, false, y
//         //"bonoReintegro":true,false
//         //renderizar diferentes componentes tanto al vendedor como al proveedor
//         //para cada una de esas vistas, mostrar, donde sea posible, la opcion de ver los detalles del caso + el visualizador de imagenes Dragable
//     render() {
//         console.log('Se renderizo!')
//         const {showCaseDetails}=this.state
//         const {user,pedidoObjeto,idPedido,toggleModal,handleFinishedCaseSuccess}=this.props
//         const {casoResuelto,guiaCargada,guiaURL,bonoReintegroActivado,bonoReintegroCodigo,respuestaProveedor}=this.props.pedidoObjeto
        

       
//         if(showCaseDetails===false){
//             return (
//                 <div className="container modalOpenCaseInsideCard">
//                     <HeaderCaseSystem 
//                         idPedido={idPedido} 
//                         subtitulo={''} 
//                         parrafo={''}
//                         toggleModal={toggleModal}>
//                     </HeaderCaseSystem>

//                     {/* NOTE: Con esta funcion, se renderiza el componente BodyFlowCase de acuerdo al estado dentro del flujo en el cual esta el caso */}
//                     {(function mode(pedidoObjeto,casoResuelto,guiaCargada,guiaURL,bonoReintegroActivado,bonoReintegroCodigo,toggleModal,respuestaProveedor,handleFinishedCaseSuccess) {
//                         if(casoResuelto==='noResuelto'){
//                             return <BodyFlowCase idPedido={idPedido} titulo={'Has recibido una solicitud por parte de un cliente.'} parrafo={'Debes decidir, basado en la informacion que te ha suministrado el cliente (ver detalles) si aceptas responder a su solicitud o si encuentras argumentos suficientes para no hacerlo.'} mode={'esperandoResolucion'} toggleModal={toggleModal}/>
//                         }else if(casoResuelto==='resueltoAfavorDelVendedor'){
//                             return <BodyFlowCase pedidoObjeto={pedidoObjeto} bonoReintegroActivado={bonoReintegroActivado} bonoReintegroCodigo={bonoReintegroCodigo} guiaURL={guiaURL} guiaCargada={guiaCargada} idPedido={idPedido} titulo={'Has aceptado resolver la solicitud.'} parrafo={'Tu cliente recibira instrucciones para enviar a tus instalacciones el producto en cuestion.'} mode={'resueltoAfavorDelVendedor'}/>
//                         }else if(casoResuelto==='resueltoAfavorDelProveedor'){
//                             return <BodyFlowCase idPedido={idPedido} titulo={'No has aceptado resolver la solicitud'} parrafo={'Tu cliente recibira esta notificacion junto con tu respuesta. Esta pantalla desaparecera hasta cuando tu cliente cierre el caso.'} mode={'resueltoAfavorDelProveedor'} respuestaProveedor={respuestaProveedor} toggleModal={toggleModal}/>
//                         }
//                     })(pedidoObjeto,casoResuelto,guiaCargada,guiaURL,bonoReintegroActivado,bonoReintegroCodigo,toggleModal,respuestaProveedor,handleFinishedCaseSuccess)}

//                     <div style={{marginTop:40}} className="row">
//                         <div className="col-12 d-flex justify-content-center">
//                             <div className="seeCaseResume" onClick={this.showCaseDetailsEvent}>Ver detalles</div>
//                         </div>
//                     </div>
//                 </div>
//             )
//         }else{
//             return(
//             <SellerCaseDetails
//             pedidoObjeto={pedidoObjeto}
//             idPedido={idPedido}
//             toggleModal={toggleModal}
//             showCaseDetailsEvent={this.showCaseDetailsEvent}
//             casoResuelto={casoResuelto}
//             user={user}
//             />
//             )
//         }
//     }
// }
