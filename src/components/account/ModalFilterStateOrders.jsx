import React, { Component } from 'react'

export default class ModalFilterStateOrders extends Component {

    componentDidMount=()=>{
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
