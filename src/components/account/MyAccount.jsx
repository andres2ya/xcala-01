import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {logOut} from '../../ducks/authDucks/authDuckLogin';
import {connect} from 'react-redux';
import './account.css'
import LinkWithDelay from '../../helpers/LinkWithDelay';

class MyAccount extends Component {

    componentDidMount=()=>{
        document.body.removeAttribute('class')
        document.body.className='myAccountStyle'
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
                        <LinkWithDelay to='/orderDetails' delay={40}>    
                            <div className="firstBoxAccountOptionOver" >
                                
                                <i className="icon-order-details-7px iconOpcion centerVerticalAndHorizontal d-flex justify-content-center"/>
                                
                                <span className="titleBoxAccountOption centerVerticalAndHorizontal d-flex justify-content-center">Detalles de tus pedidos</span>
                                
                            </div>
                        </LinkWithDelay>
                    </div>
                    <div className="col-6 secondBoxAccountOption">
                        <LinkWithDelay to='/accountDetails' delay={40}>
                            <div className="secondBoxAccountOptionOver">
                                
                                <i className="icon-accoun-tdetails-7px accountDetailsIcon iconOpcion centerVerticalAndHorizontal d-flex justify-content-center"/>
                                
                                <span className="titleBoxAccountOption centerVerticalAndHorizontal d-flex justify-content-center">Detalles de tu cuenta</span>
                                
                            </div>
                        </LinkWithDelay>
                    </div>
                </div>
                <div className="row secondRow">
                    <div className="col-6 thirdBoxAccountOption ">
                        <LinkWithDelay to='/invoiceAddress' delay={40}>
                            <div className="thirdBoxAccountOptionOver">
                                
                                <i className="icon-invoice-address-7px invoiceAddresIcon iconOpcion centerVerticalAndHorizontal d-flex justify-content-center"/>
                                
                                <span className="titleBoxAccountOption centerVerticalAndHorizontal d-flex justify-content-center">Direccion de facturaccion</span>
                                
                            </div>
                        </LinkWithDelay>
                    </div>
                    <div className="col-6 fourthBoxAccountOption">
                        <div className="fourthBoxAccountOptionOverDos"/>
                        <LinkWithDelay to='/shippingAddress' delay={40}>
                            <div className="fourthBoxAccountOptionOver">
                                
                                <i className="icon-shipping-address-7px iconOpcion centerVerticalAndHorizontal d-flex justify-content-center"/>
                                
                                <span className="titleBoxAccountOption centerVerticalAndHorizontal d-flex justify-content-center">Direcciones de envio</span>
                                
                            </div>
                        </LinkWithDelay>
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
