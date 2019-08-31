import React, { Component } from "react";
import "./MainNavbar.css";
import logoXcala from "../../assets/logoXcala.png";
import sampleImg from "../../assets/pp.jpg";
import ShoppingCarWidget from './ShoppingCarWidget/ShoppingCarWidget';
import MenuWidget from './MenuWidget/MenuWidget';

class MainNavbar extends Component {
  render() {
    return (
    <div className="sticky-top">
    <div className="absoluteParentIMG"><div className="parentIMG"><div className="backImagen"/></div></div>
      <div className="degrade"/>
      <div className="content container-fluid">
        <div className="row rowLogoCarAndMenu">
          <div className="col-7 col-logo centerVertical">
            <img
              className="logoMainNavbar"
              src={logoXcala}
              alt="Xcala Colombia"
            />
          </div>
          <div className="col-5 col-carAndMenu centerVerticalAndHorizontal d-flex justify-content-end">
              <ShoppingCarWidget/>
              <div className="betweenWidgetsLeft"/>
              <div className="betweenWidgetsRight"/>
              <MenuWidget/>
          </div>
        </div>
        {/* ---------------------------------------------- */}
        <div className="row rowName">
          <div className="col-5" />
          <div className="col-7 col-name">
            <div className="row rowName ">¡Hola Andres F!</div>
          </div>
        </div>
        {/* ---------------------------------------------- */}
        <div className="row rowSummary centerVertical">
          <div className="col-1 col-imagen">
            <img src={sampleImg} className="roundImage " />
          </div>
          <div className="col-3 col-relleno" />
          <div className="col-4 col-income">
            <p>$5.000.000</p>
            <span>Ganancia</span>
          </div>
          <div className="col-3 col-sales">
            <p>350</p>
            <span>Ventas</span>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
export default MainNavbar;
