import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {signIn} from '../../../ducks/authDucks/authDuckLogin'
import {recoveryPassword} from '../../../ducks/authDucks/authDuckRecoveryPassword'
import logoXcala from '../../../assets/logoXcala.png';
import './Login.css';
import Checkbox from '../../../components/layout/Checkbox/Checkbox';


class Login extends Component {
    
    state={
        email:'', 
        password:'',
        tryLogin:false,
        retry:false
    }

    componentDidMount=()=>{
        document.body.className='loginStyle'
    }

    componentDidUpdate=()=>{
        console.log('from componentDidUpdate')
        console.log(this.state.tryLogin)
        console.log(this.state.retry)
        const {tryLogin,retry}=this.state
        if(retry===true && tryLogin===false){
            console.log('removing...')
            document.getElementById('authError').remove()
            this.setState({retry:false})
        }
    }

    leerDatos=(e)=>{
        console.log('entrando a leer')
        if(this.state.tryLogin===true){
            this.setState({retry:true,tryLogin:false})
        }
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    iniciarSesion=(e)=>{
        e.preventDefault()
        this.setState({tryLogin:true})//aca de va a actualizar
        console.log('iniciar sesion')
        console.log(this.props.estado)
        const {signIn} = this.props
        signIn(this.state)
        this.setState({
            email:'',
            password:''
        })
    }

    resetPassword=(e)=>{
        e.preventDefault()
        this.props.recoveryPassword(this.state.email)
    }

    check=(e)=>{
        e.preventDefault()
        console.log(this.props.fire)
    }

    render() {
        return (
            <div>

                <img className="logo centerHorizontal" src={logoXcala} alt="Xcala Colombia"/>
                <div id="seccionIngresar">
                    <div className=" centerVertical centerHorizontal" id="inputEmail">
                        <i className="icon icon-arroba centerVertical"></i>
                        <input value={this.state.email} onChange={this.leerDatos} type="email" name="email"  placeholder="Correo de usuario" required autoComplete="off"/>
                    </div>

                    <div className="divider centerHorizontal"></div>

                    <div className=" centerVertical centerHorizontal" id="inputPassword">
                        <i className="icon icon-locked centerVertical "></i>
                        <input value={this.state.password} onChange={this.leerDatos} type="password" name="password"  placeholder="Contraseña" required autoComplete="off"/>
                    </div>
                </div>

                <div id="authError" className="errorMsg centerHorizontal">
                    <p>{this.props.authError}</p>
                </div>

                <button onClick={this.iniciarSesion} type="submit" className="button">Ingresar</button>


                <Checkbox mode={'keepSesion'} link={null} styleBox={'box'} styleCheck={'check'} text={'Recordarme'} id={'recordarmeCheck'}/>
                <Link className="textWhiteCenter centerHorizontal" to="/passforgot" > <span className="subrayar">Olvide mi contraseña</span> </Link>
                
                <div id="seccionIngresosExtra" >
                    <p className="textWhiteCenter">¿Deseas generar ingresos extra en tu tiempo libre?</p>
                    <Link to="/signup"><button  type="button" className="button">Hazlo con Xcala</button></Link>
                    <button onClick={this.check}>check</button>
                </div>
            </div>
        )
    }

}

const mapStateToProps=(state)=>({
    authError:state.authLoginReducer.authError,
    authSuccess:state.authLoginReducer.authSuccess,
    fire:state
})

const mapDispatchToProps=(dispatch)=>{
    return {
        signIn:(creds)=>dispatch(signIn(creds)),
        recoveryPassword:(email)=>dispatch(recoveryPassword(email))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)


