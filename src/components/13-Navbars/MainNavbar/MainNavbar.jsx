import React, { Component } from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import numeral from 'numeral';
import "./MainNavbar.css";
import logoXcala from "../../../assets/logoXcala.png";
import userWithoutPhoto from '../../../assets/userWithoutPhoto.jpg';
import ShoppingCarWidget from '../Widgets/ShoppingCarWidget/ShoppingCarWidget';
import MenuWidget from '../Widgets/MenuWidget/MenuWidget';
import {uploadFile} from '../../../ducks/accountDuck-NO-USADO/uploadFilesDuck-NO-USADO';
import LinkWithDelay from "../../../helpers/LinkWithDelay";

class MainNavbar extends Component {

  uploadPhoto=(e)=>{
    const file=e.target.files[0]
    const {uid}=this.props
    this.props.uploadFile(file,uid)
}

onIMGError=()=>{
  console.log('erro img')
}

  render() {
    const {userPhotoURLFromProfile,userRole}=this.props

    if(userRole!=='vendedor'){
      return null
    }
    
    return (
    <div className="sticky-top">
    <div className="absoluteParentIMG"><div className="parentIMG"><img src={userPhotoURLFromProfile!==null?userPhotoURLFromProfile:userWithoutPhoto} className="backImagen" alt="userBackgroundPhoto"/></div></div>
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
              <LinkWithDelay to="/shopping-car" delay={10}><ShoppingCarWidget classNavIcon={'ShoppingCarWidgetMainNavbar'} numberItemsInCar={'10'}/></LinkWithDelay>
              <div className="betweenWidgetsLeft"/>
              <div className="betweenWidgetsRight"/>
              <MenuWidget classNavIcon={'menuWidgetMainNav'}/>
          </div>
        </div>
        {/* ---------------------------------------------- */}
        <div className="row rowName">
          <div className="col-5" />
          <div className="col-7 col-name">
            <div className="row rowNameChild d-flex align-items-center">
              <span className="nameItem">
                {`¡Hola 
                ${this.props.nombreUsuario!==undefined?
                this.props.nombreUsuario
                :
                'nos alegra verte'}!`}
              </span>
            </div>
          </div>
        </div>
        {/* ---------------------------------------------- */}
        <div className="row rowSummary centerVertical">
          <div className="col-1 col-imagen centerVertical">
            <Link to="/my-account">
              <img src={userPhotoURLFromProfile? userPhotoURLFromProfile:userWithoutPhoto} className="roundImage" alt=" " />
            </Link>
            <label className="iconInputFile d-flex align-items-center justify-content-center" htmlFor="inputFile"><i className="icon-edit-pencil centerVerticalAndHorizontal"/></label>
            <input id="inputFile" className="inputFile" type="file" onChange={this.uploadPhoto}/>
          </div>
          <div className="col-3 col-sm-1 col-relleno" />
          <div className="col-4 col-income">
            <p>{numeral(this.props.gananciaTotal).format('$0,0')}</p>
            <span>Ganancia</span>
          </div>
          <div className="col-3 col-sales">
            <p>{this.props.ventasTotal>0?this.props.ventasTotal:0}</p>
            <span>Ventas</span>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
const mapStateToProps=(state)=>({
  // photoURLProfileChanged:state.uploadFileReducer.photoURLProfileChanged,
  userPhotoURLFromProfile:state.firebase.profile.userPhotoURL,
  nombreUsuario:state.firebase.profile.nombreUsuario,
  gananciaTotal:state.firebase.profile.gananciaTotal,
  ventasTotal:state.firebase.profile.ventasTotal,
  uid:state.firebase.auth.uid,
  userRole:state.firebase.profile.role,
})

const mapDispatchToProps = (dispatch)=>{
  return{
    uploadFile:(file,userID)=>dispatch(uploadFile(file,userID))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainNavbar);
