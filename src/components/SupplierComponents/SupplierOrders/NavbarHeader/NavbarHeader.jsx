import React, { Component } from "react";
import { connect } from "react-redux";
import LinkWithDelay from "../../../../helpers/LinkWithDelay";
import logoXcalaSupplier from "../../../../assets/logoXcalaSupplier.png";
import MenuWidget from "../../../navbars/Widgets/MenuWidget/MenuWidget";
import "./NavbarHeader.css";
import MainContentNavHeader from "./MainContentNavHeader/MainContentNavHeader";
import ContentNavHeader from "./ContentNavHeader/ContentNavHeader";

class NavbarHeader extends Component {
  render() {
    return (
      <div>

        <div className="row NavbarHeaderXsupplier">
          <div className="col-12">
            {/*-----------------------------------------------------------------------------------*/}
            {/* Fila logo | back Arrow | profile | menu */}
            <div className="row">
              <div className="col-5 justify-content-start align-items-center logoXcalaSupplier">
                <img width="150" src={logoXcalaSupplier} alt="Xcala Colombia" />
              </div>

              <div className="col-7 d-flex justify-content-end align-items-center">
                <LinkWithDelay to={"/my-account"} delay={30}> 
                  <i className="iconBack icon-backarrow centerVerticalAndHorizontal"></i>
                </LinkWithDelay>
                <div className="betweenWidgetsLeftSecondNav" />
                <div className="betweenWidgetsRightSecondNav" />

                <LinkWithDelay to={"/my-account"} delay={30}>
                  <i className="iconProfile icon-profile centerVerticalAndHorizontal"></i>
                </LinkWithDelay>

                <div className="betweenWidgetsLeftSecondNav" />
                <div className="betweenWidgetsRightSecondNav" />
                <MenuWidget classNavIcon={"menuWidgetNavSupplier"} />
              </div>
            </div>

            {/*-----------------------------------------------------------------------------------*/}
            {/* Contenido */}
            <div className="row">
              <MainContentNavHeader/>
              {/* <ContentNavHeader/> */}
            </div>
          </div>
        </div>


      </div>
    );
  }
}
const mapStateToProps = state => ({

});
export default connect(mapStateToProps, null)(NavbarHeader);
