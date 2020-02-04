import React, { Component } from 'react'
import './ModalFilterStateOrders.css'

export default class ModalFilterStateOrders extends Component {

    componentDidMount=()=>{
      window.scrollTo(0, 0)//Seteando el scroll en las posiciones iniciales para no afectar el modal
      console.log('Se cargó el ModalFilterStateOrders con idPedido=',this.props.idPedido)
    }
    componentWillUnmount=()=>{
        console.log('Se desmonto el ModalFilterStateOrders con idPedido=',this.props.idPedido)
    }

    selectFilterByState=(option)=>{
        setTimeout(
            ()=>{
              if(option==='removerFiltro'){
                this.props.applyFilterByState(undefined)
                this.props.toggleModal(null)
              }else{
                this.props.applyFilterByState(option)
                this.props.toggleModal(null)
              }
            },80
        )
    }
    

    render() {
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
                        onClick={() =>this.props.toggleModal(null)}
                        className="col-3 col-modalExitBtn">
                        <i className="backOrderDetails icon-arrow-circle-left"/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                            <div 
                            onClick={()=>this.selectFilterByState('Pendiente')} 
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSPendiente"/>
                                <span className="stateText">Pendiente</span>
                            </div>
                            <div 
                            onClick={()=>this.selectFilterByState('Despachado')} 
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSDespachado"/>
                                <span className="stateText">Despachado</span>
                            </div>
                        </div>
                        <div className="row">
                            <div 
                            onClick={()=>this.selectFilterByState('Caso abierto')} 
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSCaso-abierto"/>
                                <span className="stateText">Caso abierto</span>
                            </div>
                            <div 
                            onClick={()=>this.selectFilterByState('Cancelado')} 
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSCancelado"/>
                                <span className="stateText">Cancelado</span>
                            </div>
                        </div>
                        <div className="row">
                            <div 
                            onClick={()=>this.selectFilterByState('Entregado')}
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSEntregado"/>
                                <span className="stateText">Entregado</span>
                            </div>
                            <div 
                            onClick={()=>this.selectFilterByState('Desembolsado')}
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSDesembolsado"/>
                                <span className="stateText">Desembolsado</span>
                            </div>
                        </div>
                        <div className="row">
                            <div 
                            onClick={()=>this.selectFilterByState('Reintegrado')}
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSReintegrado"/>
                                <span className="stateText">Reintegrado</span>
                            </div>
                            <div 
                            onClick={()=>this.selectFilterByState('Fallido')}
                            className="col-6 filterByStateOptionBox d-flex align-items-center">
                                <div className="circleState CSFallido"/>
                                <span className="stateText">Fallido</span>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div 
                    onClick={()=>this.selectFilterByState('removerFiltro')}
                    className="row removeFilter d-flex align-items-center">
                        <div className="col-12 d-flex align-items-center">
                        <i className="removeFilterIcon icon-cancel-circled centerVertical"/>Remover filtro
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            );
        }
}
