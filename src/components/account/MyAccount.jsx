import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {logOut} from '../../ducks/authDucks/authDuckLogin';
import {connect} from 'react-redux';
import './account.css'
import LinkWithDelay from '../../helpers/LinkWithDelay';

class MyAccount extends Component {

    componentDidMount=()=>{
        document.body.removeAttribute('class')
        document.body.className='myAccountStyle'
    }

    uploadPhoto=(e)=>{
        const file=e.target.files[0]
        const {isAuth}=this.props
        this.props.uploadFile(file,isAuth)
    }

    render() {
        console.log(this.props.fire)
        if(!this.props.isAuth){
            return <Redirect to='/'/>
        }else if(this.props.isAuth){
            if(this.props.userRole==='adminXcala'){
                return <Redirect to='/xcala-admin'/>
            }else if(this.props.userRole==='proveedor'){
                return <Redirect to='/supplier-panel'/>
            }else{
                


        if(this.props.userRole!=='vendedor'){
            return null
        }else{

        return (          
            <div className="pcControlerScreen">
                <div className="row">
                    <p className="accountTitle">Opciones de tu cuenta</p>   
                </div>
                <LinkWithDelay to="/order-details" delay={30}>
                <div className="menuOptionsContainer">
                    <div className="col-12 container">
                        <div className="overMenuOpcionIcon firstOverMenuOptionIcon d-flex justify-content-center align-items-center">
                            <i className="iconMenuOption firstIconMenuOption icon-order-details-7px centerVertical"></i>
                        </div>
                        <div className="row menuOpcionCard">
                            <div className="col-12">
                                <div className="row">
                                        <div className="col-10 menuOptionTitleCard firstMenuOptionTitleCard d-flex  align-items-end">
                                            <span>Detalles de tus pedidos</span>
                                        </div>
                                        <div className="col-2 iconArrowMenuOption firstIconArrowMenuOption arrowMenuOptionCard d-flex justify-content-center align-items-center">
                                            <i className="icon-right-open-big centerVertical"></i>
                                        </div>
                                </div>
                                <div className="row">
                                    <div className="col-11 menuOptionDescriptionCard d-flex  align-items-start">
                                        <span>Conoce el estado de tus pedidos y realiza reclamaciones.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </LinkWithDelay>
                {/* SecondMenuOption */}

                <div className="menuOptionsContainer">
                    <div className="col-12 container">
                        <div className="overMenuOpcionIcon secondOverMenuOptionIcon d-flex justify-content-center align-items-center">
                            <i className="iconMenuOption secondIconMenuOption icon-accoun-tdetails-7px centerVertical"></i>
                        </div>
                        <div className="row menuOpcionCard">
                            <div className="col-12">
                                <div className="row">
                                        <div className="col-10 menuOptionTitleCard secondMenuOptionTitleCard d-flex  align-items-end">
                                            <span>Detalles de tu cuenta</span>
                                        </div>
                                        <div className="col-2 iconArrowMenuOption secondIconArrowMenuOption arrowMenuOptionCard d-flex justify-content-center align-items-center">
                                            <i className="icon-right-open-big centerVertical"></i>
                                        </div>
                                </div>
                                <div className="row">
                                    <div className="col-11 menuOptionDescriptionCard d-flex  align-items-start">
                                        <span>Administra los datos personales y de contacto de tu cuenta.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ThirdMenuOption */}

                <div className="menuOptionsContainer">
                    <div className="col-12 container">
                        <div className="overMenuOpcionIcon thirdOverMenuOptionIcon d-flex justify-content-center align-items-center">
                            <i className="iconMenuOption thirdIconMenuOption icon-invoice-address-7px centerVertical"></i>
                        </div>
                        <div className="row menuOpcionCard">
                            <div className="col-12">
                                <div className="row">
                                        <div className="col-10 menuOptionTitleCard thirdMenuOptionTitleCard d-flex  align-items-end">
                                            <span>Facturacion y pagos</span>
                                        </div>
                                        <div className="col-2 iconArrowMenuOption thirdIconArrowMenuOption arrowMenuOptionCard d-flex justify-content-center align-items-center">
                                            <i className="icon-right-open-big centerVertical"></i>
                                        </div>
                                </div>
                                <div className="row">
                                    <div className="col-11 menuOptionDescriptionCard d-flex  align-items-start">
                                        <span>Administra tu direccion de facturacion y cuenta bancaria.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* fourthMenuOption */}

                <div className="menuOptionsContainer fourthMenuOptionsContainer">
                    <div className="col-12 container">
                        <div className="overMenuOpcionIcon fourthOverMenuOptionIcon d-flex justify-content-center align-items-center">
                            <i className="iconMenuOption fourthIconMenuOption icon-shipping-address-7px centerVertical"></i>
                        </div>
                        <div className="row menuOpcionCard">
                            <div className="col-12">
                                <div className="row">
                                        <div className="col-10 menuOptionTitleCard fourthMenuOptionTitleCard d-flex  align-items-end">
                                            <span>Direcciones de envio</span>
                                        </div>
                                        <div className="col-2 iconArrowMenuOption fourthIconArrowMenuOption arrowMenuOptionCard d-flex justify-content-center align-items-center">
                                            <i className="icon-right-open-big centerVertical"></i>
                                        </div>
                                </div>
                                <div className="row">
                                    <div className="col-11 menuOptionDescriptionCard d-flex  align-items-start">
                                        <span>Administra las direcciones de envio y detalles de tus clientes.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                



                <div className="row d-flex justify-content-center buttonLogout">
                    <button onClick={()=>this.props.logOut()}>Salir de la cuenta</button>
                </div>
                {/* <button onClick={()=>console.log(this.props.fire)}>Check</button> */}
            </div>
        )
        }
    }
}
}
}

const mapStateToProps=(state)=>({
        isAuth:state.firebase.auth.uid,
        userRole:state.firebase.profile.role,
        fire:state
})

const mapDispatchToProps=(dispatch)=>{
   return {
       logOut:()=>dispatch(logOut())
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(MyAccount)
