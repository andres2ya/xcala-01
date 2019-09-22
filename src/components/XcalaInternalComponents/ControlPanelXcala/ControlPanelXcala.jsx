import React, { Component } from 'react'
import './ControlPanelXcala.css';


class ControlPanelXcala extends Component {
    render() {
        return (
            <div className="container-control-panel-xcala">
                <div className="row headerControlPanelAdminXcala sticky-top">
                    <div className="col-12 d-flex align-items-center">
                        Panel control Xcala - Admin
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 newSupplierBtn d-flex justify-content-center align-items-center">
                        <button>Crear nuevo proveedor</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 newSupplierBtn d-flex justify-content-center align-items-center">
                        <button>Crear nueva categoria</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 newSupplierBtn d-flex justify-content-center align-items-center">
                        <button>Ver pedidos</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default  ControlPanelXcala

