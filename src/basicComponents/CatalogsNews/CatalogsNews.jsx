import React, { Component } from 'react'
import './CatalogsNews.css'
import SharingButton from '../SharingButton/SharingButton'

export default class CatalogsNews extends Component {
    state={
        sixImg:this.props.sixImg,
        catalogName:this.props.catalogName,
        catalogDescription:this.props.catalogDescription,
        urlCatalogo:this.props.urlCatalogo,
        isSharingButton:this.props.isSharingButton,
        buttonName:this.props.buttonName,
        colorButton:this.props.colorButton
    }
    render() {
        return (
            <div className="container-fluid CatalogsNews">
                <div onClick={()=>alert('redireccionar a la pagina del catalogo con su url'+this.state.urlCatalogo)}>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <img src={this.state.sixImg[0]} alt="1"/>
                            <img src={this.state.sixImg[1]} alt="2"/>
                            <img src={this.state.sixImg[2]} alt="3"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <img src={this.state.sixImg[3]} alt="4"/>
                            <img src={this.state.sixImg[4]} alt="5"/>
                            <div>
                                <div className="CatalogsNews_BlackOver d-flex align-items-center justify-content-center">
                                    <span>+57</span>
                                </div>
                                <img id='CatalogsNews_FinalImg' src={this.state.sixImg[5]} alt="6"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row CatalogsNews_footerRow">
                    <div className="col-12 d-flex align-items-center ">
                        <div>
                            <div className="row">
                                <div className="col-12 CatalogsNews_catalogName">
                                    {this.state.catalogName}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 CatalogsNews_catalogDescription">
                                    {this.state.catalogDescription}
                                </div>
                            </div>
                        </div>
                        <div className="CatalogsNews_floatRigth">
                            {
                                this.state.isSharingButton?
                                <SharingButton/>
                                :
                                <button style={{color:'white',borderRadius:'10px',border:'none',backgroundColor:this.state.colorButton,height:'40px',width:'auto',padding:'0px 10px 0px 10px',display:'flex',alignItems:'center',outline:'none'}}>
                                    {this.state.buttonName}
                                </button>          
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 CatalogsNews_separator">
                    </div>
                </div>
            </div>
        )
    }
}
