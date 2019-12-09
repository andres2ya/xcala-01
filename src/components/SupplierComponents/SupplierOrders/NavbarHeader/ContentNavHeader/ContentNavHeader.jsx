import React, { Component } from 'react'
import './ContentNavHeader.css'

class ContentNavHeader extends Component {
    render() {
        return (
            <div className="col-12">

                <div className="row ContentNavHeaderSpace"></div>

                <div className="row">
                    <div className="col-12 d-flex align-items-center">
                        <div className="ContentNavHeaderInfoBtn-info">!</div>
                        <div className="ContentNavHeaderTitle">Pedidos en stock</div>
                        <div className="ContentNavHeaderQuantityCircel">0</div>
                    </div>
                </div>

                <div className="row ContentNavHeaderSpaceLess"></div>

                <div className="row">
                    <div className="col-12">
                        <div className="ContentNavHeaderParagraph">
                            Aca encuentras los pedidos que por algun motivo han regresado o no han saldo de tus instalaciones.
                        </div>
                    </div>
                </div>
                
                <div className="row ContentNavHeaderSpace"></div>
            </div>
        )
    }
}
export default  ContentNavHeader