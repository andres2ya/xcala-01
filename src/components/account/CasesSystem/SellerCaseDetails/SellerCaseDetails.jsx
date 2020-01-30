import React, { Component } from 'react'
import './SellerCaseDetails.css'
import {connect} from 'react-redux';
import {handleErrorMsg} from '../../../../ducks/errorsDuck/handleErrors'


class SellerCaseDetails extends Component {

    componentDidMount=()=>{
        console.log('Se cargó el SellerCaseDetails con idPedido=',this.props.idPedido)
    }
    componentWillUnmount=()=>{
        console.log('Se desmonto el SellerCaseDetails con idPedido=',this.props.idPedido)
    }

    render() {
        //TODO: Dependiendo de variables del pedido como: 
        //"casoResuelto": no resuelto : a favor del vendedor : a favor del proveedor, asi como de
        //"guiaCargada": true, false, y
        //"bonoReintegro":true,false
        //renderizar diferentes componentes tanto al vendedor como al proveedor
        //para cada una de esas vistas, mostrar, donde sea posible, la opcion de ver los detalles del caso + el visualizador de imagenes Dragable
        const {idPedido,toggleModal}=this.props
        
            return (
                <div className="modalOpenCaseInsideCard">
                    SellerCaseDetails <span>{idPedido}</span>
                    <button onClick={()=>toggleModal(null)}>Cerrar</button>
                </div>
            )
        
    }
}

const mapStateToProps=(state)=>({
    errorEspañol:state.handlerErrorsReducer.errorEspañol,
})

const mapDispatchToProps=(dispatch)=>{
    return{
        handleErrorMsg:(msg)=>dispatch(handleErrorMsg(msg))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SellerCaseDetails) 