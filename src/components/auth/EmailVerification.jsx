import React, { Component } from 'react'
import {connect} from 'react-redux'
import {changeEmail} from '../../ducks/authDucks/authUpdatePassAndEmailDuck'
import {verifyEmail} from '../../ducks/authDucks/authDuckSignUp'
import {getParameterByName} from '../../helpers/getParameterByName'
import {loadState} from '../../helpers/localStorage'

class EmailVerification extends Component {

    state=loadState()

    componentDidMount=()=>{
        var actionCode=getParameterByName('oobCode')
        var {newEmail}=this.state
        var {isAuth}=this.state
        console.log('desde pagina de verificacion de email:'+newEmail+':'+isAuth)
        console.log(this.state)
        if(isAuth){
            console.log('ya estaba verificado.. mandando a cambiar el correo...')
            this.props.changeEmail(newEmail)
        }else{
            console.log('No estaba verificado.. mandando a verificar el correo... y luego si actualizar')
            this.props.verifyEmail(actionCode)
            this.props.changeEmail(newEmail)
        }
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
mensaje:state.authReducer.msg,
isAuth:state.authReducer.isAuth,
newEmail:state.authReducer.newEmail
})

const mapDispatchToProps=(dispatch)=>{
return{
    verifyEmail:(code)=>dispatch(verifyEmail(code)),
    changeEmail:(newEmail)=>dispatch(changeEmail(newEmail))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(EmailVerification)