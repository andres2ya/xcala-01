import React, { Component } from 'react'
import {connect} from 'react-redux'
import {verifyEmail} from '../../ducks/authDuck'
import {getParameterByName} from '../../helpers/getParameterByName'

class EmailVerification extends Component {

    componentDidMount=()=>{
        var actionCode=getParameterByName('oobCode')
        console.log(actionCode)
        this.props.verifyEmail(actionCode)
    }

    render() {
        return (
            <div>
               <h1>Verificando email</h1> 
               <p>{this.props.mensaje}</p>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
mensaje:state.authReducer.msg
})
const mapDispatchToProps=(dispatch)=>{
return{
    verifyEmail:(code)=>dispatch(verifyEmail(code))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(EmailVerification)