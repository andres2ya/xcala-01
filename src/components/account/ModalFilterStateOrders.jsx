import React, { Component } from 'react'
import {connect} from 'react-redux';

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
    

    render() {

        if(!this.props.showApplyStateFilterToOrdersModal){
            // document.getElementById('ownModal').removeAttribute('class')
            // console.log('no')
            return(null)
        }else{
            // document.getElementById('ownModal').className='ownModal'
            // document.body.className='overFlowYHidden'
            // console.log('yes')
            return (
                <div>
                    modal
                </div>
            )
        }

    }
}
const mapStateToProps=(state)=>({
    showApplyStateFilterToOrdersModal:state.showOrHideApplyStateFilterReducer.showApplyStateFilterToOrdersModal
})
export default connect(mapStateToProps,null)(ModalFilterStateOrders)