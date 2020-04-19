import React, { Component } from 'react'
import './HeaderSecundary.css'
import whatsappIconShare from '../../assets/whatsappIconShare.svg'
import ShippingCarWidget from '../shippingCarWidget/ShippingCarWidget'
import FavoriteWidget from '../FavoriteWidget/FavoriteWidget'
import sideMenu from '../../assets/sideMenuIcon.svg'
import NewItemButton from '../NewItemButton/NewItemButton'


export default class HeaderSecundary extends Component {
    state={
        leftIcon:this.props.leftIcon,
        rightOption:this.props.rightOption,
        newItemText:this.props.newItemText,
        itemsInside:this.props.itemsInCar,
        title:this.props.title,
        titleDescription:this.props.titleDescription,
    }
    render() {
        return (
            <div className="container-fluid HeaderSecundary">
                <div className="row">
                    <div className="col-12 d-flex align-items-center">
                        <div className="HeaderSecundary_backRowIcon">
                            {
                            this.state.leftIcon!=='backRow'?
                                <img height="20" src={sideMenu} alt=""/>
                                :
                                <i className="icon-left-open-big"/>
                            }
                        </div>

                        <div>
                            <div className="row HeaderSecundary_title">
                                {this.state.title}
                            </div>
                            <div className="row HeaderSecundary_titleDescription">
                                {this.state.titleDescription}
                            </div>
                        </div>
                        

                        {
                            this.state.rightOption?
                                <div className="d-flex HeaderSecundary_iconsFloatRight">                            
                                    {
                                    this.state.rightOption!=='newItem'?
                                    <>
                                        <div style={{marginRight:'2px'}}>
                                            <img height="40" src={whatsappIconShare} alt=""/>
                                        </div>

                                        <div style={{marginLeft:'2px'}}>
                                            <ShippingCarWidget itemsInside={this.state.itemsInside}/>
                                        </div> 
                                    </>
                                    :
                                    <div>
                                        <NewItemButton newItemText={this.state.newItemText}/>
                                    </div>

                                    }

                                </div>
                                :
                                null
                        }


                    </div>
                </div>
            </div>
        )
    }
}
