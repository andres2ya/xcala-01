import React, { Component } from 'react'
import './FriendsCard.css'
import TwoWordsCircle from '../../TwoWordsCircle/TwoWordsCircle'

export default class FriendsCard extends Component {
    render() {
        const {firstName,lastName,styleTwoWords,twoWords,friendImg}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="FriendsCard d-flex justify-content-center">
                            <div>
                                <div className="FriendsCard_img d-flex justify-content-center align-items-center">
                                {
                                    friendImg?
                                    <img src={friendImg} alt=""/>
                                    :
                                    <TwoWordsCircle
                                    style={styleTwoWords}
                                    TwoWords={twoWords}
                                    />
                                }
                                </div>
                                <div className="FriendsCard_firstName">{firstName}</div>
                                <div className="FriendsCard_lastName">{lastName}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
