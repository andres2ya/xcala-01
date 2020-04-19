import React, { Component } from 'react'
import './FooterProductPage.css'

export default class FooterProductPage extends Component {
    state={
        loadingSharing:false
    }

    componentWillUnmount=()=>{
        clearTimeout(this.loadingTime)
    }

    loading=()=>{
        clearTimeout(this.loadingTime)
        this.setState({loadingSharing:!this.state.loadingSharing})
        this.loadingTime=setTimeout(() => {
            this.setState({loadingSharing:!this.state.loadingSharing})
        },3000)
    }

    render() {
        return (
            <footer className="sticky-footer">
                <div className="row FooterProductPage">
                    <div className="col-12 FooterProductPage_col d-flex">
                        <div className="FooterProductPage-A d-flex align-items-center justify-content-center">
                            X
                        </div>
                        <div className="FooterProductPage-B d-flex align-items-center justify-content-center">
                            <div>
                                <div><i className="FooterProductPage_icon icon-shoppingcaricon"/></div>
                                <div>Crear pedido</div>
                            </div>
                        </div>
                        <div onClick={this.loading} style={this.state.loadingSharing?{opacity:0.5}:{opacity:1}} className="FooterProductPage-C d-flex align-items-center justify-content-center">
                            <div>
                                <div><i className="FooterProductPage_icon icon-whatsapp"/></div>
                                <div>{this.state.loadingSharing?'Cargando...':'Compartir'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
