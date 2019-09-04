import React, { Component } from 'react'
import {connect} from 'react-redux';
import {applyStateFilterToOrders} from '../../ducks/accountDuck/applyFilterToOrdersDuck';

class ModalFilterStateOrders extends Component {

    componentDidUpdate=()=>{
        const {showApplyStateFilterToOrdersModal}=this.props
        console.log(showApplyStateFilterToOrdersModal)
        if(showApplyStateFilterToOrdersModal===true){
            document.getElementById('ownModal').className='ownModal'
            document.body.className='overFlowYHidden'
            console.log('yes')
        }else{
            document.getElementById('ownModal').removeAttribute('class')
            document.body.removeAttribute('class')
            document.body.className='myAccountStyle'
            console.log('no')
        }
    }

    selectFilterByState=(option)=>{
        setTimeout(
            ()=>this.props.applyStateFilterToOrders(false,option),80
        )
    }
    

    render() {
        const {orderStateFilter}=this.props
        if(!this.props.showApplyStateFilterToOrdersModal){
            return(null)
        }else{
            return (
              <div className="modalFilterByStateInsideCard d-flex justify-content-center">
                <div className="row modalFilterByStateContent">
                  <div className="col-12">
                    <div className="row row-titleAndExitBtn">
                      <div className="col-9 col-modalTitle">
                        <p className="modalTitle">
                          Filtrar por estado de pedido
                        </p>
                      </div>
                      <div
                        onClick={() =>this.props.applyStateFilterToOrders(false,orderStateFilter)}
                        className="col-3 col-modalExitBtn">
                        <i className="backOrderDetails icon-arrow-circle-left"/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                            <div 
                            onClick={()=>this.selectFilterByState('enviadoAlProveedor')} 
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSEnEspera"/>
                                <span className="stateText">En espera</span>
                            </div>
                            <div 
                            onClick={()=>this.selectFilterByState('enProduccion')} 
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSEnProduccion"/>
                                <span className="stateText">Produccion</span>
                            </div>
                        </div>
                        <div className="row">
                            <div 
                            onClick={()=>this.selectFilterByState('despachado')} 
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSDespachado"/>
                                <span className="stateText">Despachado</span>
                            </div>
                            <div 
                            onClick={()=>this.selectFilterByState('listoParaDespacho')} 
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSEnCamino"/>
                                <span className="stateText">En camino</span>
                            </div>
                        </div>
                        <div className="row">
                            <div 
                            onClick={()=>this.selectFilterByState('finalizado')}
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSFinalizado"/>
                                <span className="stateText">Finalizado</span>
                            </div>
                            <div 
                            onClick={()=>this.selectFilterByState('cancelado')}
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSCancelado"/>
                                <span className="stateText">Cancelado</span>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div 
                    onClick={()=>this.selectFilterByState('allOrders')}
                    className="row removeFilter d-flex align-items-center">
                        <div className="col-12 d-flex align-items-center">
                        <i className="removeFilterIcon icon-cancel-circled centerVertical"/>Remover filtro
                        </div>
                    </div>
                    {/* <div className="row">
                      <div className="col-12 applyFilterBtn  d-flex justify-content-center align-items-center ">
                          <button>Aplicar filtro</button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            );
        }

    }
}
const mapStateToProps=(state)=>({
    showApplyStateFilterToOrdersModal:state.showOrHideApplyStateFilterReducer.showApplyStateFilterToOrdersModal,
    orderStateFilter:state.showOrHideApplyStateFilterReducer.orderStateFilter
})
const mapDispatchToProps=(dispatch)=>{
    return {
      applyStateFilterToOrders:(option,orderState)=>dispatch(applyStateFilterToOrders(option,orderState))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(ModalFilterStateOrders)