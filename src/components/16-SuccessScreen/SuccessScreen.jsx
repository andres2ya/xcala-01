import React, { Component } from 'react'
import './SuccessScreen.css'
import AnimatedCheck from './AnimatedCheck/AnimatedCheck'

export default class SuccessScreen extends Component {
    state={
        userName:this.props.match.params.userName,
    }
    render() {
        return (
            <div className="SuccessScreenContainer container-fluid">
                <div className="row SuccessScreenContainer_AnimateCheck">
                    <div className="col-12">
                        <div className="d-flex justify-content-center">
                            <AnimatedCheck/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="shadowAnimatedCheck"/>
                        </div>
                    </div>
                </div>

                <div className="row SuccessScreenContainer_MsgSuccess">
                    <div className="col-12">
                            <div className="SuccessScreenContainer_MsgSuccess_userName d-flex justify-content-center">{this.state.userName}</div>
                            <div className="d-flex justify-content-center">tu cuenta fue creada con exito!</div>
                    </div>
                </div>
            </div>
        )
    }
}
