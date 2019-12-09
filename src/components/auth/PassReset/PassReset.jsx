import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {resetPassword,confirmNewPassword} from '../../../ducks/authDucks/authDuckRecoveryPassword'
import logoXcala from '../../../assets/logoXcala.png';

class PassReset extends Component {

    state={
        newPassword:'',
        tryResetPassword:false
    }

    componentDidMount=()=>{
        document.body.className='loginStyle'
        const {actionCode,resetPassword}=this.props
        resetPassword(actionCode)
    }

    componentDidUpdate=()=>{
        if(this.props.internetError){
            this.setState({
                tryResetPassword:false
            })
        }
    }

    leerNewPass=(newPass)=>{
        this.setState({
            newPassword:newPass.target.value,
            tryResetPassword:false
        })
    }

    confirmarNewPass=(e)=>{
        e.preventDefault()
        this.setState({
            tryResetPassword:true
        })
        this.props.confirmNewPassword(this.props.actionCode,this.state.newPassword)
    }

    render() {
        if(!this.props.successResetPassVerify)
        return(
            <div className={`auth simpleFormScreen centerHorizontal ${this.props.showPreloader===true?'preloaderOn':null}`}>
                <img className="authLogoCenter" src={logoXcala} alt="Xcala Colombia"/>
                <div className="messageSimpleFormScreen">
                    <p className="authTitle">{this.props.msg}</p>
                </div>
                
                <Link to="/"><button>Ir al inicio</button></Link>
            </div>
        )

        return (
            <div className={`auth simpleFormScreen centerHorizontal ${this.props.showPreloader===true?'preloaderOn':null}`}>
                
                <img className="authLogoCenter" src={logoXcala} alt="Xcala Colombia"/>
                
                {this.props.ShowFormResetPassword? 
                    <div>
                        <div className="messageSimpleFormScreen">
                            {this.props.passChanged? 
                                <div>
                                    <p className="authTitle">¡Tu contraseña ha sido cambiada con exito!</p>
                                </div>
                            :   
                                <div>
                                    <p className="authTitle">Recupera tu contraseña</p>
                                    <p className="authParagraph">Porfavor introduce una nueva contraseña:</p>
                                </div>
                            }
                        </div>

                            {this.props.passChanged?
                                <Link to="/"><button>Entrar a mi cuenta</button></Link>
                            :
                            <div>
                                <div className="simpleForm">
                                    <div className=" centerVerticalAndHorizontal">
                                        <i className="icon icon-locked centerVertical "></i>
                                        <input value={this.state.newPassword} onChange={this.leerNewPass} type="password" id="newPassword"  placeholder="Nueva contraseña" required autoComplete="off"/>
                                    </div>
                                    <div className="grossInputDivider"/>

                                    {this.state.tryResetPassword?
                                        <div>
                                            {this.props.erroWhenTryResetPassword?
                                                <div className="errorMsg centerHorizontal">
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

                                <button onClick={this.confirmarNewPass} >Restablecer contraseña</button>
                            </div>
                            }
                    </div>
                    
                :

                    <div className="messageSimpleFormScreen">
                        <p className="authTitle">Recupera tu contraseña</p>
                        <p className="authParagraph">{this.props.msg}</p>
                    </div>
                } 
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        ShowFormResetPassword:state.authRecoveryPasswordReducer.ShowFormResetPassword,
        msg:state.authRecoveryPasswordReducer.msg,
        passChanged:state.authRecoveryPasswordReducer.passChanged,
        successResetPassVerify:state.authRecoveryPasswordReducer.successResetPassVerify,
        erroWhenTryResetPassword:state.authRecoveryPasswordReducer.erroWhenTryResetPassword,
        errorEspañol:state.handlerErrorsReducer.errorEspañol,
        internetError:state.handlerErrorsReducer.internetError,
        showPreloader:state.preloaderReducer.showPreloader,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        resetPassword:(code)=>dispatch(resetPassword(code)),
        confirmNewPassword:(code,newPass)=>dispatch(confirmNewPassword(code,newPass))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PassReset)