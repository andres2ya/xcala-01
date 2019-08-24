import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {resetPassword,confirmNewPassword} from '../../../ducks/authDucks/authDuckRecoveryPassword'
import logoXcala from '../../../assets/logoXcala.png';
import './PassReset.css'

class PassReset extends Component {

    state={
        newPassword:''
    }

    componentDidMount=()=>{
        document.body.className='loginStyle'
        const {actionCode,resetPassword}=this.props
        resetPassword(actionCode)
    }

    leerNewPass=(newPass)=>{
        this.setState({
            newPassword:newPass.target.value
        })
        console.log(this.state.newPassword)
    }

    confirmarNewPass=(e)=>{
        e.preventDefault()
        this.props.confirmNewPassword(this.props.actionCode,this.state.newPassword)
    }

    render() {
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
                                <Link to="/myaccount"><button>Ir a mi cuenta</button></Link>
                            :
                                <div className="seccionBtnInputPassReset centerHorizontal">
                                    <div className=" centerVertical centerHorizontal" id="inputPassword">
                                        <i className="icon icon-locked centerVertical "></i>
                                        <input value={this.state.newPassword} onChange={this.leerNewPass} type="password" id="newPassword"  placeholder="Nueva contraseña" required autoComplete="off"/>
                                    </div>
                                    <div className="divider"></div>
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
        passChanged:state.authRecoveryPasswordReducer.passChanged
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        resetPassword:(code)=>dispatch(resetPassword(code)),
        confirmNewPassword:(code,newPass)=>dispatch(confirmNewPassword(code,newPass))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PassReset)