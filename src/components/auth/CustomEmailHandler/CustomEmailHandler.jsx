import React, { Component } from 'react'
import {getParameterByName} from  '../../../helpers/getParameterByName'
import PassReset from '../PassReset/PassReset'
import EmailConfirm from '../EmailConfirm/EmailConfirm'
import SignUp from '../SignUp/SignUp'

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
        const {mode,code}=this.state
        switch (mode) {
            case 'resetPassword':
                    console.log(mode,code)
                    return (
                        <PassReset actionCode={code}/>
                    )
            case 'recoverEmail':
                    return (
                        <SignUp/>
                    )
            case 'verifyEmail':
                    return (
                        <EmailConfirm actionCode={code}/>
                    )
            default:
                    return(
                        <div>Codigo de action invalido</div>
                    )
        }      
    }
}
export default  CustomEmailHandler 