import React, { Component } from 'react'
import {connect} from 'react-redux'
import {recoveryPassword} from '../../../ducks/authDucks/authDuckRecoveryPassword'
import logoXcala from '../../../assets/logoXcala.png';

class PassForgot extends Component {

    state={
        email:'',
        trysendResetPasswordEmail:false
    }

    componentDidMount=()=>{
        document.body.className='loginStyle'
    }

    componentDidUpdate=()=>{
        if(this.props.internetError){
            this.setState({
                trysendResetPasswordEmail:false
            })
        }
    }

    leerDatos=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
            trysendResetPasswordEmail:false
        })
    }

    sendEmailToResetPass=()=>{
        this.setState({
            trysendResetPasswordEmail:true
        })
        console.log(this.state)
        const {recoveryPassword}= this.props
        const {email}= this.state
        recoveryPassword(email)
    }

    render() {
        return (
            <div className={`auth simpleFormScreen centerHorizontal ${this.props.showPreloader===true?'preloaderOn':null}`}>
                <img className="authLogoCenter" src={logoXcala} alt="Xcala Colombia"/>
                
                <div className="messageSimpleFormScreen">
                    <p className="authTitle">Recupera tu contraseña</p>
                    <p className="authParagraph">¿Olvidaste tu contraseña? Introduce el correo electronico que utilizaste para el registro. Te enviaremos instrucciones para crear una nueva contraseña.</p>
                </div>

                <div className="simpleForm">
                    <div className=" centerVerticalAndHorizontal" >
                            <i className="icon icon-arroba centerVertical"></i>
                            <input value={this.state.email} onChange={this.leerDatos} name="email" type="email"  placeholder="Correo de usuario" required autoComplete="off"/>
                    </div>

                    <div className="grossInputDivider centerHorizontal"/>

                    {this.state.trysendResetPasswordEmail?
                        <div>
                            {this.props.errorWhenTrySendResetPassEmail?
                                <div id="authError" className="errorMsg centerHorizontal">
                                    {this.props.errorEspañol}
                                </div>
                            :    
                                <p className="authParagraph">{this.props.msg}</p>
                            }
                        </div>
                    :
                        null
                    }
                </div>

                    {this.props.emailHasBeenSent?null:<button onClick={this.sendEmailToResetPass}>Restablecer contraseña</button>} 
                    
                    {this.props.emailHasBeenSent?<button onClick={this.sendEmailToResetPass}>Reenviar correo</button>:null}
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    emailHasBeenSent:state.authRecoveryPasswordReducer.emailHasBeenSent,
    msg:state.authRecoveryPasswordReducer.msg,
    errorWhenTrySendResetPassEmail:state.authRecoveryPasswordReducer.errorWhenTrySendResetPassEmail,
    errorEspañol:state.handlerErrorsReducer.errorEspañol,
    internetError:state.handlerErrorsReducer.internetError,
    showPreloader:state.preloaderReducer.showPreloader,
})

const mapDispatchToProps=(dispatch)=>{
    return {
        recoveryPassword:(email)=>dispatch(recoveryPassword(email))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PassForgot)
