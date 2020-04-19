import React, { Component } from 'react'
import './CustomerCard.css'
import TwoWordsCircle from '../TwoWordsCircle/TwoWordsCircle'

export default class CustomerCard extends Component {
    render() {
        const {isSelected,showDetails,customerName,city,phone,addressFirstLine,addressSecondLine,addressPostalCode}=this.props
        return (
            <div className='container CustomerCard'>
                <div className="row">
                    <div className="col-12">
                        <div className={`${isSelected?'CustomerCard_shadow':null}`}>
                            <div style={isSelected?{backgroundColor:'rgb(41, 171, 226)',borderRadius:'25px 25px 25px 25px'}:{backgroundColor:'#f2f2f2',borderRadius:'50px 50px 50px 50px'}} className="CustomerCard_box d-flex align-items-center">
                                <div className="CustomerCard_TwoWordCircle">
                                    {
                                    isSelected?
                                        <TwoWordsCircle TwoWords={'CM'} style={{backgroundColor:'white',color:'rgb(41, 171, 226)'}}/>
                                        :
                                        <TwoWordsCircle TwoWords={'CM'} style={{backgroundColor:'rgb(41, 171, 226)',color:'white'}}/>
                                    }
                                </div>
                                <div>
                                    <div style={isSelected?{color:'white'}:{color:'rgb(78, 78, 78)'}} className="CustomerCard_customerName">{customerName}</div>
                                    <div style={isSelected?{color:'white'}:{color:'rgb(78, 78, 78)'}} className="CustomerCard_city">Se enviara {city} </div>
                                </div>
                                <div style={isSelected?{color:'white'}:{color:'rgb(78, 78, 78)'}} className="d-flex align-items-center CustomerCard_icon">
                                    {
                                        showDetails?
                                        <i className="icon-pencilonly"/>
                                        :
                                        '>'
                                    }
                                </div>
                            </div>

                            {
                            showDetails?
                            <div className="CustomerCard_boxDown d-flex align-items-center">
                                <div className="d-flex align-items-center justify-content-center CustomerCard_phone">
                                    {phone}
                                </div>
                                <div style={{borderLeft:'1px solid black'}} className="d-flex align-items-center justify-content-center CustomerCard_phone">
                                    <div className="CustomerCard_address">
                                        <div>-{addressFirstLine}</div>
                                        <div>-{addressSecondLine}</div>
                                        <div>-{addressPostalCode}</div>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                            }
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}
