import React, { Component } from 'react'
import {logOut} from '../../ducks/authDucks/authDuckLogin';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import './account.css'

class MyAccount extends Component {

    componentDidMount=()=>{
        document.body.removeAttribute('class')
        document.body.className='myAccountStyle'
        console.log(this.state)
    }

    uploadPhoto=(e)=>{
        const file=e.target.files[0]
        const {isAuth}=this.props
        this.props.uploadFile(file,isAuth)
    }

    render() {
        if(!this.props.isAuth)
        return <Redirect to='/'/>

        return (
            <div>
                <div className="row">
                    <p className="accountTitle">Opciones de tu cuenta</p>   
                </div>
                <div className="row firstRow ">
                    <div className="col-6 firstBoxAccountOption">
                        <div className="firstBoxAccountOptionOver">
                            {/* <div className="row d-flex justify-content-center"> */}
                                <i className="icon-order-details-5px iconOpcion centerVerticalAndHorizontal d-flex justify-content-center"/>
                            {/* </div> */}
                            {/* <div className="row d-flex justify-content-center"> */}
                                <span className="titleBoxAccountOption centerVerticalAndHorizontal d-flex justify-content-center">Detalles de tus pedidos</span>
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="col-6 secondBoxAccountOption">
                        <div className="secondBoxAccountOptionOver">
                            
                            <i className="icon-account-details-5px accountDetailsIcon iconOpcion centerVerticalAndHorizontal d-flex justify-content-center"/>
                            
                            <span className="titleBoxAccountOption centerVerticalAndHorizontal d-flex justify-content-center">Detalles de tu cuenta</span>
                            
                        </div>
                    </div>
                </div>
                <div className="row secondRow">
                    <div className="col-6 thirdBoxAccountOption ">
                        <div className="thirdBoxAccountOptionOver">
                            
                            <i className="icon-invoice-address-5px invoiceAddresIcon iconOpcion centerVerticalAndHorizontal d-flex justify-content-center"/>
                            
                            <span className="titleBoxAccountOption centerVerticalAndHorizontal d-flex justify-content-center">Direccion de facturaccion</span>
                            
                        </div>
                    </div>
                    <div className="col-6 fourthBoxAccountOption">
                        <div className="fourthBoxAccountOptionOverDos"/>
                        <div className="fourthBoxAccountOptionOver">
                            
                            <i className="icon-shipping-address-5px iconOpcion centerVerticalAndHorizontal d-flex justify-content-center"/>
                            
                            <span className="titleBoxAccountOption centerVerticalAndHorizontal d-flex justify-content-center">Direcciones de envio</span>
                            
                        </div>
                    </div>
                </div>
                
                <div className="row d-flex justify-content-center buttonLogout">
                    <button onClick={()=>this.props.logOut()}>Salir de la cuenta</button>
                </div>
                {/* <button onClick={()=>console.log(this.props.fire)}>Check</button> */}
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
        isAuth:state.firebase.auth.uid,
        fire:state
})

const mapDispatchToProps=(dispatch)=>{
   return {
       logOut:()=>dispatch(logOut())
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(MyAccount)
