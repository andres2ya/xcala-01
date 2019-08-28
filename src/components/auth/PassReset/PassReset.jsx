import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {resetPassword,confirmNewPassword} from '../../../ducks/authDucks/authDuckRecoveryPassword'
import logoXcala from '../../../assets/logoXcala.png';
import './PassReset.css'

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
            <div>
                <img className="logo centerHorizontal" src={logoXcala} alt="Xcala Colombia"/>
                <div className="seccionAUnPasoConXcala centerHorizontal">
                    <div>
                        <p className="AUnPasoTitulo">{this.props.msg}</p>
                    </div>
                </div>
                <div className="seccionBtnInputPassReset centerHorizontal">
                    <Link to="/"><button>Ir al inicio</button></Link>
                </div>
            </div>
        )

        return (
            <div>
                
                <img className="logo centerHorizontal" src={logoXcala} alt="Xcala Colombia"/>
                
                {this.props.ShowFormResetPassword? 
                    <div>
                        <div className="seccionAUnPasoConXcala centerHorizontal">
                            {this.props.passChanged? 
                                <div>
                                    <p className="AUnPasoTitulo">¡Tu contraseña ha sido cambiada con exito!</p>
                                    <p className="AUnPasoParrafo">{null}</p>
                                </div>
                            :   
                                <div>
                                    <p className="AUnPasoTitulo">Recupera tu contraseña</p>
                                    <p className="AUnPasoParrafo">Porfavor introduce una nueva contraseña:</p>
                                </div>
                            }

                        </div>
                            {this.props.passChanged?
                                <Link to="/"><button>Entrar a mi cuenta</button></Link>
                            :
                                <div className="seccionBtnInputPassReset centerHorizontal">
                                    <div className=" centerVertical centerHorizontal" id="inputPassword">
                                        <i className="icon icon-locked centerVertical "></i>
                                        <input value={this.state.newPassword} onChange={this.leerNewPass} type="password" id="newPassword"  placeholder="Nueva contraseña" required autoComplete="off"/>
                                    </div>
                                    <div className="divider"/>

                                    {this.state.tryResetPassword?
                                        <div>
                                            {this.props.erroWhenTryResetPassword?
                                                <div id="authError" className="errorMsg centerHorizontal">
                                                    {this.props.errorEspañol}
                                                </div>
                                            :    
                                                <p className="AUnPasoParrafo">{this.props.msg}</p>
                                            }
                                        </div>
                                    :
                                        null
                                    }
                                    
                                    <div className="separadorBtn"/>

                                    <button onClick={this.confirmarNewPass} >Restablecer contraseña</button>
                                </div>
                            }
                    </div>
                    
                    :

                    <div className="seccionAUnPasoConXcala centerHorizontal">
                        <p className="AUnPasoTitulo">Recupera tu contraseña</p>
                        <p className="AUnPasoParrafo">{this.props.msg}</p>
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
        errorEspañol:state.authLoginReducer.errorEspañol,
        internetError:state.authLoginReducer.internetError
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        resetPassword:(code)=>dispatch(resetPassword(code)),
        confirmNewPassword:(code,newPass)=>dispatch(confirmNewPassword(code,newPass))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PassReset)