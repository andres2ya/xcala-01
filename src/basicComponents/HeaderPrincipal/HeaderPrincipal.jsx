import React, { Component } from 'react'
import './HeaderPrincipal.css'
import sideMenu from '../../assets/sideMenuIcon.svg'
import moreIcon from '../../assets/moreIconSide.svg'

//NOTE: Forma de llamar al Componente
{/* <HeaderPrincipal userName={'Leidy'} userProfit={'$98.500'}/> */}
export default class HeaderPrincipal extends Component {
    state={
        userName:this.props.userName,
        userProfit:this.props.userProfit
    }
    render() {
        return (
            <div className="container-fluid HeaderPrincipal sticky-top">
                <div className="row">
                    <div className="col-12 d-flex align-items-center">
                        <div className="HeaderPrincipal_sideMenuIcon">
                            <img height="20" src={sideMenu} alt=""/>
                        </div>

                        <div>
                            <div className="row HeaderPrinciapl_hiNameUser align-items-end">
                                ¡Hola {this.state.userName}!
                            </div>
                            <div className="row HeaderPrinciapl_profitUser align-items-end">
                            {this.state.userProfit} <span>Ganancia total</span>
                            </div>
                        </div>

                        <div className="HeaderPrincipal_floatRigthIcon">
                            <img height="60" src={moreIcon} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
