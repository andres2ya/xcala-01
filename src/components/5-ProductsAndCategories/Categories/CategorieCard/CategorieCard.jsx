import React, { Component } from 'react'
import numeral from 'numeral';
import {truncateLongString} from './../../../../helpers/truncateLongStrings' //NOTE: funcion que corta despues de un terminado numero de caracteres y coloca ... al final.
import './CategorieCard.css'

export default class CategorieCard extends Component {
    render() {
        const {categorie}=this.props
        if(categorie.fotoPortada){
            return (
                <div>
                    <img className="img-backgroundCategorie" src={categorie.fotoPortada}/>
                    
                    <div className="overGradient-information">
                        <div className="container-fluid contentInfoCategoria">
                            <div className="row">
                                <div className="col-12">
                                    <div className="nombreCategoria"> {categorie.nombreCategoria?categorie.nombreCategoria.truncateLongString(35):'...'}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="cantidadReferencias_y_menorPrecio">
                                        {categorie.idsProductos.length} Referencias - Desde {numeral(categorie.menorPrecio).format('$0,0')}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex align-items-center">
                                    <div className="labelsCategorias">
                                        <div className="valorEnvioLabel-CategorieCard">Valor envio <strong>{numeral(categorie.valorEnvio).format('$0,0')}</strong></div>
                                        <div className="envioDias-CategorieCard">Envio {categorie.diasEnvio} dias habiles</div>
                                    </div>
                                    <div className="buttonsCategorias">
                                        {/* TODO: al presionar ver categoria debe llevar a la pagina de ver productos de la categoria, mostrando solo los productos asociados a esta. */}
                                        <div className="verCategorias-CategorieCard d-flex align-items-center justify-content-center" >Ver categorias</div>
                                        {/* TODO: Este div de compartir solo debe ser visible en dispositivos android -si es iphone debe ocultarse */}
                                        {/* TODO: al presionar compartir debe ejecutar una funcion que cargue todas las fotos de los productos asociados a esta categoria y las envie mediante el Share API a whatsapp para ser compartidas... */}
                                        <div className="compartirCategoria-CategorieCard d-flex align-items-center justify-content-center"><i className=" whatsappIcon icon-whatsapp"/> Compartir</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div> 
            )
        }else{
            return(null)
        }
    }
}
