import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {logOut} from '../../../ducks/authDucks/authDuckLogin'
import './ControlPanelXcala.css';


class ControlPanelXcala extends Component {
    render() {
        const {userRole}=this.props
        if(userRole!=='adminXcala'){
            return <Redirect to='/'/>
        }
        return (
            <div className="container-control-panel-xcala">
                <div className="row headerControlPanelAdminXcala sticky-top">
                    <div className="col-12 d-flex align-items-center">
                        Panel control Xcala - Admin
                    </div>
                </div>

                <Link to="/xcala-new-supplier">
                <div className="row">
                        <div className="col-12 newSupplierBtn d-flex justify-content-center align-items-center">
                            <button>Crear nuevo proveedor</button>
                        </div>
                </div>
                </Link>

                <Link to="/new-category">
                <div className="row">
                    <div className="col-12 newSupplierBtn d-flex justify-content-center align-items-center">
                        <button>Crear nueva categoria</button>
                    </div>
                </div>
                </Link>

                <Link to="/xcala-orders-admin">
                <div className="row">
                    <div className="col-12 newSupplierBtn d-flex justify-content-center align-items-center">
                        <button>Ver pedidos</button>
                    </div>
                </div>
                </Link>

                <div className="row d-flex justify-content-center buttonLogout logoutXcalaAdminPanel">
                    <button onClick={()=>this.props.logOut()}>Salir de la cuenta</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    userRole:state.firebase.profile.role,
})
const mapDispatchToProps=(dispatch)=>{
    return {
        logOut:()=>dispatch(logOut())
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(ControlPanelXcala)

