import React, { Component } from 'react'
import Hammer from 'hammerjs';
import numeral from 'numeral';
import './StickyFooter.css'

export default class StickyFooter extends Component {
    state={
        panUpTotalOrderBox:false,
        panDownTotalOrderBox:false
    }
  
    componentDidMount=()=>{
        /**Integraccion HammerJS */
      // 1)  Seleccionando el elemento al cual se le aplicara el listener de hammer
        var totalOrderBox=document.getElementById('totalOrderBox');
      // 2)  Creando una instancia de hammer
        var totalOrderBoxHammer= new Hammer(totalOrderBox)
      // 3)  Bloqueando el vertical scrolling cuando se toca el elementoByid seleccionado
        totalOrderBoxHammer.get('pan').set({direction:Hammer.DIRECTION_ALL})
      // 4)  Creando el listener de hammer al elemento by id
        totalOrderBoxHammer.on('panup pandown',(e)=>this.panHammer(e))
    }
  
    componentWillUnmount=()=>{
      document.getElementById('ownModal').removeAttribute('class')
      document.body.removeAttribute('class')
      document.body.className='myAccountStyle'
    }
  
    panHammer=(e)=>{
        const {panUpTotalOrderBox,panDownTotalOrderBox}=this.state
        if(e.type==='panup' && panUpTotalOrderBox===false){
          this.setState({
              panUpTotalOrderBox:true,
              panDownTotalOrderBox:false
          })
        }
        if(e.type==='pandown' && panDownTotalOrderBox===false){
          this.setState({
              panDownTotalOrderBox:true,
              panUpTotalOrderBox:false
          })
        }
    }

    render() {
        const {panUpTotalOrderBox}=this.state
        return (
        <footer className='sticky-footer' >
          <i className={`${panUpTotalOrderBox?'swipeDownIcon icon-down-open-big':'swipeUpIcon icon-up-open-big'} d-flex justify-content-center align-items-end`}></i>
          <div id="totalOrderBox" className={`${panUpTotalOrderBox?'totalOrderBoxOn':'totalOrderBoxOff'}`}>
            <div id="totalOrderBoxContent" className={`row ${panUpTotalOrderBox?'totalOrderBoxContentOn':'totalOrderBoxContentOff'}`}>
               {panUpTotalOrderBox?
               <div className="col-12">
                <div id="totalOrderTitle" className="totalOrderTitle">Total pedido</div>

                <div className="row yourIncome">
                    <div className="col-7 d-flex align-items-center">
                        <div className="totalLabelSubtotal">Tu ingreso total:</div>   
                    </div>
                    <div className="col-5 d-flex align-items-center">
                        <div className="totalValueSubtotal">{numeral('10000').format('$0,0')}</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-7">
                        <div className="totalLabel">Costo productos:</div>   
                    </div>
                    <div className="col-5">
                        <div className="totalValue">-{numeral('10000').format('$0,0')}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7">
                        <div className="totalLabel">Costo envio:</div>   
                    </div>
                    <div className="col-5">
                        <div className="totalValue">-{numeral('10000').format('$0,0')}</div>
                    </div>
                </div>
                <div className="row totalCostSubTotal">
                    <div className="col-7 d-flex align-items-center">
                        <div className="totalLabelSubtotal">Costo total:</div>   
                    </div>
                    <div className="col-5 d-flex align-items-center">
                        <div className="totalValueSubtotal">-{numeral('10000').format('$0,0')}</div>
                    </div>
                </div>

                <div className="row yourUtility">
                    <div className="col-7 d-flex align-items-center">
                        <div className="totalLabelSubtotal">Tu ganancia total:</div>   
                    </div>
                    <div className="col-5 d-flex align-items-center">
                        <div className="totalValueSubtotal">{numeral('10000').format('$0,0')}</div>
                    </div>
                </div>

                <div className="row specificOrderOptionsBtn">
                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <button onClick={()=>console.log('Rastreando pedido...')}>Rastrear pedido</button>
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <button onClick={()=>console.log('Abriendo caso...')}>Abrir caso</button>
                    </div>
                </div>
               </div>
                :
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <div id="orderDetailsTitlePanUp" className="row totalOrderTitle">Detalles del pedido</div>
                </div>
               } 
            </div>
          </div>
        </footer>
        )
    }
}
