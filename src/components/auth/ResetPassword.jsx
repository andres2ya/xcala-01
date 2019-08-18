import React, { Component } from 'react'
import {connect} from 'react-redux'
import {resetPassword,confirmNewPassword} from '../../ducks/authDucks/authDuckRecoveryPassword'
import {getParameterByName} from '../../helpers/getParameterByName'

class ResetPassword extends Component {

    state={
        newPassword:'',
        code:''
    }

    componentDidMount=()=>{
        var actionCode=getParameterByName('oobCode')
        console.log(actionCode)
        this.setState({
            code:actionCode
        })
        this.props.resetPassword(actionCode)
    }

    leerNewPass=(newPass)=>{
        this.setState({
            newPassword:newPass.target.value
        })
        console.log(this.state.newPassword)
    }

    confirmarNewPass=(e)=>{
        e.preventDefault()
        this.props.confirmNewPassword(this.state.code,this.state.newPassword)

    }

    render() {
        return (
            <div>
                <h1>Recuperar contraseña</h1>

                {this.props.ShowFormNewPass? 
                <div><input onChange={this.leerNewPass} type="password" placeholder="Nueva contraseña" /> 
                <button onClick={this.confirmarNewPass} >Confirmar</button></div> 
                : null }

                {this.props.mensage?   <p>{this.props.mensage}</p>   :   null }
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        ShowFormNewPass:state.authReducer.ShowFormResetPassword,
        mensage:state.authReducer.msg
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        resetPassword:(code)=>dispatch(resetPassword(code)),
        confirmNewPassword:(code,newPass)=>dispatch(confirmNewPassword(code,newPass))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ResetPassword)