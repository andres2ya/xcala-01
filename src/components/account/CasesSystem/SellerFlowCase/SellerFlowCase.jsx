import React, { Component } from 'react'
import SellerCaseDetails from './../SellerCaseDetails/SellerCaseDetails'
import HeaderCaseSystem from './../../CasesSystem/SellerCaseStyleComponents/Header/HeaderCaseSystem'
import BodyFlowCase from './BodyFlowCase/BodyFlowCase'

//NOTE: NO BORRAR!!!!! Este seria el componente para el vendedor, este se queda aca! 
// export default class SellerFlowCase extends Component {
//     state={
//         showCaseDetails:false
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
//         const {showCaseDetails}=this.state
//         const {pedidoObjeto,idPedido,toggleModal,handleFinishedCaseSuccess}=this.props
//         const {casoResuelto,guiaCargada,guiaURL,bonoReintegroActivado,bonoReintegroCodigo}=this.props.pedidoObjeto //TODO: incluir "respuestaProveedor"
        

//         let respuestaProveedor='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'

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
//                     {(function mode(casoResuelto,guiaCargada,guiaURL,bonoReintegroActivado,bonoReintegroCodigo,toggleModal,respuestaProveedor,handleFinishedCaseSuccess) {
//                         if(casoResuelto==='noResuelto'){
//                             return <BodyFlowCase idPedido={idPedido} titulo={'Tu solicitud ya fue atendida y esta proxima a ser resuelta.'} parrafo={'Porfavor revisa los detalles de este pedido para conocer la resolucion del caso una vez se haya finalizado.'} mode={'esperandoResolucion'} toggleModal={toggleModal}/>
//                         }else if(casoResuelto==='resueltoAfavorDelVendedor' && guiaCargada===false){
//                             return <BodyFlowCase idPedido={idPedido} titulo={'El proveedor ha aceptado resolver tu solicitud. Sigue las instrucciones:'} parrafo={'Debes devovler el producto a las instalaciones del proveedor ubicadas en: ${direccionProveedor}, y cargar la guia de devolucion para continuar con el proceso.'} mode={'resueltoAfavorDelVendedor'}/>
//                         }else if(casoResuelto==='resueltoAfavorDelVendedor' && guiaCargada===true){
//                             return <BodyFlowCase bonoReintegroActivado={bonoReintegroActivado} bonoReintegroCodigo={bonoReintegroCodigo} idPedido={idPedido} titulo={'Pronto el proveedor creara un bono que podras usar para hacer efectiva tu solicitud.'} parrafo={'Debes estar pendiente del codigo que aparecera abajo y usarlo para cambiar el producto y/o hacer efectiva la garantia.'} mode={'esperandoBono_o_reintegro'}/>
//                         }else if(casoResuelto==='resueltoAfavorDelProveedor'){
//                             return <BodyFlowCase idPedido={idPedido} titulo={'El proveedor ha presentado una objecion a tu solicitud:'} parrafo={''} mode={'resueltoAfavorDelProveedor'} respuestaProveedor={respuestaProveedor} toggleModal={toggleModal} handleFinishedCaseSuccess={handleFinishedCaseSuccess}/>
//                         }
//                     })(casoResuelto,guiaCargada,guiaURL,bonoReintegroActivado,bonoReintegroCodigo,toggleModal,respuestaProveedor,handleFinishedCaseSuccess)}

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
//             />
//             )
//         }
//     }
// }




export default class SellerFlowCase extends Component {
//NOTE: Este seria el componente para el proveedor, DEBE PASARSE A LOS COMPONENTES DEL PROVEEDOR
    state={
        showCaseDetails:false
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
                    {(function mode(casoResuelto,guiaCargada,guiaURL,bonoReintegroActivado,bonoReintegroCodigo,toggleModal,respuestaProveedor,handleFinishedCaseSuccess) {
                        if(casoResuelto==='noResuelto'){
                            return <BodyFlowCase idPedido={idPedido} titulo={'Has recibido una solicitud por parte de un cliente.'} parrafo={'Debes decidir, basado en la informacion que te ha suministrado el cliente (ver detalles) si aceptas responder a su solicitud o si encuentras argumentos suficientes para no hacerlo.'} mode={'esperandoResolucion'} toggleModal={toggleModal}/>
                        }else if(casoResuelto==='resueltoAfavorDelVendedor'){
                            return <BodyFlowCase bonoReintegroActivado={bonoReintegroActivado} bonoReintegroCodigo={bonoReintegroCodigo} guiaURL={guiaURL} guiaCargada={guiaCargada} idPedido={idPedido} titulo={'Has aceptado resolver la solicitud.'} parrafo={'Tu cliente recibira instrucciones para enviar a tus instalacciones el producto en cuestion. Cuando recibas la guia, porfavor activa el codigo con el cual se dara respuesta a esta solicitud.'} mode={'resueltoAfavorDelVendedor'}/>
                        }else if(casoResuelto==='resueltoAfavorDelProveedor'){
                            return <BodyFlowCase idPedido={idPedido} titulo={'No has aceptado resolver la solicitud'} parrafo={'Tu cliente recibira esta notificacion junto con tu respuesta. Esta pantalla desaparecera hasta cuando tu cliente cierre el caso.'} mode={'resueltoAfavorDelProveedor'} respuestaProveedor={respuestaProveedor} toggleModal={toggleModal}/>
                        }
                    })(casoResuelto,guiaCargada,guiaURL,bonoReintegroActivado,bonoReintegroCodigo,toggleModal,respuestaProveedor,handleFinishedCaseSuccess)}

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
            casoResuelto={casoResuelto}
            />
            )
        }
    }
}
