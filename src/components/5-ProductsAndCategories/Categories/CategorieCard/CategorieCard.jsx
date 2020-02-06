import React, { Component } from 'react'
import './CategorieCard.css'

export default class CategorieCard extends Component {
    render() {
        const {categorie}=this.props
        return (
            <div>
                    {
                    categorie.fotoPortada?
                    <img className="img-backgroundCategorie" src={categorie.fotoPortada}/>
                    :
                    null
                    }

                    {/* TODO: Hacer de overGradient-information un relative p absolute para que quede encima */}
                    <div className="overGradient-information"></div>
            
            
                    <div>
                        {categorie.nombreCategoria}
                    </div>
            </div>
        )
    }
}
