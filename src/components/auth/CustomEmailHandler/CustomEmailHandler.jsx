import React, { Component } from 'react'
import {getParameterByName} from  '../../../helpers/getParameterByName'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import PassForgot from '../PassForgot/PassForgot'

class CustomEmailHandler extends Component {

    state={
        mode:'',
        code:'',
        url:''
    }

    componentDidMount=()=>{
        document.body.className='loginStyle'
        var actionMode=getParameterByName('mode')
        var actionCode=getParameterByName('oobCode')
        var continueUrl=getParameterByName('continueUrl')
        this.setState({
            mode:actionMode,
            code:actionCode,
            url:continueUrl
        })
        console.log(this.state)
    }
    
    render() {
        const {mode,code,url}=this.state
        switch (mode) {
            case 'resetPassword':
                    return (
                        <Login/>
                    )
                break;
            case 'recoverEmail':
                    return (
                        <SignUp/>
                    )
                break;
            case 'verifyEmail':
                    return (
                        <PassForgot/>
                    )
                break;
            default:
                    return(
                        <div>Codigo de action invalido</div>
                    )
                break;
        }      
    }
}
export default  CustomEmailHandler 