import React, { Component } from 'react'
import {connect} from 'react-redux';
import {openModalTrackOrder} from '../../ducks/accountDuck/trackOrderDuck';


class ModalTrackorder extends Component {

    componentDidUpdate=()=>{
        const {showTrackOrderModal}=this.props
        if(showTrackOrderModal===true){
            document.getElementById('ownModal').className='ownModal'
            document.body.className='overFlowYHidden'
        }else{
            document.getElementById('ownModal').removeAttribute('class')
            document.body.removeAttribute('class')
            document.body.className='myAccountStyle'
        }
    }
    render() {
        

        const {showTrackOrderModal}=this.props
        if(showTrackOrderModal){
            const {idTrackOrderData}=this.props
            return (
              <div className="container modalTrackOrderInsideCard">
                <div className="row modalTrackOrderContent">
                  <div className="col-12">
                    <div className="row trackOrderIdAndBackArrow">
                      <div className="col-8 numberOrderTitleModal d-flex justify-content-star align-items-center">
                          Pedido #{idTrackOrderData?idTrackOrderData[0].numeroPedido:null}
                      </div>
                      <div className="col-4 d-flex justify-content-end">
                        <i
                          onClick={() => this.props.openModalTrackOrder(false)}
                          className="backOrderDetails icon-arrow-circle-left centerVertical"
                        />
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-12 paragraphOrderDetails d-flex align-items-center">
                            Estado del pedido:
                        </div>
                    </div>
                    <div className="row orderStates">
                        <div className="col-12 col-orderStates">
                            Desplegar estados
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            );
        }else{
            return null
        }
    }
}
const mapStateToProps=(state)=>({
    showTrackOrderModal:state.trackOrderReducer.showTrackOrderModal,
    idTrackOrderData:state.trackOrderReducer.idTrackOrderData
})
const mapDispatchToProps=(dispatch)=>{
    return{
      openModalTrackOrder:(option)=>dispatch(openModalTrackOrder(option))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ModalTrackorder)
