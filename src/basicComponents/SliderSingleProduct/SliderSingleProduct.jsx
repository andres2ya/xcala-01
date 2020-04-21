import React, { Component } from 'react'
import './SliderSingleProduct.css'

export default class SliderSingleProduct extends Component {
    render() {
        const {images}=this.props
        return (
            <div data-pause="hover" data-interval="3000" id="SliderSingleProduct" className="SliderSingleProduct carousel slide" data-ride="carousel">
            <ol className="SliderSingleProduct_pointIndicators carousel-indicators">
                {
                    images.map((img,index)=>
                        <li data-target="#SliderSingleProduct" data-slide-to={index} className={index===0?"active":''}/> 
                    )
                }
            </ol>
            <div className="SliderSingleProduct_carrusel carousel-inner">

                {
                    images.map((img,index)=>
                        <div onClick={()=>alert(img.url)} className={`carousel-item ${index===0?'active':''}`}>
                            <img className="SliderSingleProduct_slide d-block w-100" src={img.img} alt={img.nombre}/>
                        </div>
                    )
                }
            </div>
            <a className="carousel-control-prev" href="#SliderSingleProduct" role="button" data-slide="prev">
                <span className="SliderSingleProduct_arrowButton carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#SliderSingleProduct" role="button" data-slide="next">
                <span className="SliderSingleProduct_arrowButton carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
        )
    }
}
