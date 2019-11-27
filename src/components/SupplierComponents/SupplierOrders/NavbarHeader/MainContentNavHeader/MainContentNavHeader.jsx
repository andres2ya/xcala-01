import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './MainContentNavHeader.css'
import { thisExpression } from '@babel/types';

export class MainContentNavHeaderButton extends Component {
  render() {
    return (
      <div className="MainContentNavHeader-Button">

        <div className="row">
          <div className="col-12 d-flex justify-content-center">{this.props.title}</div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">0</div>
        </div>

      </div>
    );
  }
}





export class MainContentNavHeaderInfoBtn extends Component {
    render() {
        return (
                <div className="MainContentNavHeaderInfoBtn-card col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 d-flex align-items-center">
                    <div className="MainContentNavHeaderInfoBtn-info">!</div>
                    <Link to={this.props.link}>
                        <div className="MainContentNavHeaderInfoBtn-infoText">
                        <span className="MainContentNavHeaderInfoBtn-infoTextSpace"/>
                        {this.props.text}</div>
                    </Link>
                    <div className="MainContentNavHeaderInfoBtn-separator">
                        .........</div>
                    <div className="MainContentNavHeaderInfoBtn-quantity">
                        {this.props.quantity}</div>
                </div>                
        )
    }
}




class MainContentNavHeader extends Component {
    render() {
        return (
            <div className="col-12">
                <div className="row MainContentNavHeaderSpace"/>
                <div className="row">
                    <div className="col-12 d-flex">
                        <div>
                            <span className="MainContentNavHeaderTitle">Panel de pedidos</span>
                            <p className="MainContentNavHeaderParagraph">Informacion principal de tus pedidos</p>
                        </div>

                        <div className="d-none d-md-block">
                            <div className="MainContentNavHeader-SpacerInMD"></div>
                        </div>

                        <MainContentNavHeaderButton title="En lista"/>
                        <div className="MainContentNavHeader-buttonSpacer"/>           
                        <div className="MainContentNavHeader-buttonDivider"/>           
                        <div className="MainContentNavHeader-buttonSpacer"/>           
                        <MainContentNavHeaderButton title="Despachos"/>             
                    </div>
                </div>
            </div>
        )
    }
}
export default MainContentNavHeader