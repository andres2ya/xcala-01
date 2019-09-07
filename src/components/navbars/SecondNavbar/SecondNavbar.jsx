import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MenuWidget from '../Widgets/MenuWidget/MenuWidget';
import ShoppingCarWidget from '../Widgets/ShoppingCarWidget/ShoppingCarWidget';
import logoXcalaSecondNavbar from "../../../assets/logoXcalaSecondNavbar.png";
import userWithoutPhoto from '../../../assets/userWithoutPhoto.jpg';
import LinkWithDelay from "../../../helpers/LinkWithDelay";
import './SecondNavbar.css';

class SecondNavbar extends Component {
    render() {
        return (
            <div className="sticky-top container-fluid SecondNavbar">
                <div className="row SecondNavbarContent">
                    <div className="col-4 d-flex align-items-center">
                        <img className="logoXcalaSecondNavbar" src={logoXcalaSecondNavbar} alt="logoXcala"/>
                    </div>
                    <div className="col-8 d-flex justify-content-end align-items-center">
                        <LinkWithDelay to={'/my-account'} delay={30}>
                        <img className="userPhotoSecondNavbar" src={this.props.userPhotoURLFromProfile?this.props.userPhotoURLFromProfile:userWithoutPhoto} alt="userPhoto"/>
                        </LinkWithDelay>
                            <div className="betweenWidgetsLeftSecondNav"/>
                            <div className="betweenWidgetsRightSecondNav"/>
                        <Link to={'/shopping-car'}>
                        <ShoppingCarWidget classNavIcon={'ShoppingCarWidgetSecondNavbar'} numberItemsInCar={10}/>
                        </Link>
                            <div className="betweenWidgetsLeftSecondNav"/>
                            <div className="betweenWidgetsRightSecondNav"/>
                        <MenuWidget classNavIcon={'menuWidgetSecondNav'}/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    userPhotoURLFromProfile:state.firebase.profile.userPhotoURL
  })

  
export default connect(mapStateToProps,null)(SecondNavbar);