import React, { Component } from 'react'
import './VariantBox.css'
export default class VariantBox extends Component {
    render() {
        const {variantName,variantFormat}=this.props
        return (
            <div className="container VariantBox">
                <div className="row">
                    <div className="col-12">
                        <div className="VariantBox_variantName">
                            {variantName}
                        </div>

                        <div className="VariantBox_variantFormat">
                            {
                            ((variantFormat)=>{
                                switch (variantFormat) {
                                    case 1:
                                        return <div>Uno</div>
                                    case 2:
                                        return <div>Dos</div>
                                    case 3:
                                        return <div>Tres</div>
                                    case 4:
                                        return <div>Cuatro</div>
                                    case 5:
                                        return <div>Cinco</div>
                                    case 6:
                                        return <div>Seis</div>
                                    case 7:
                                        return <div>Siete</div>
                                    default:
                                        break;
                                }
                            })(variantFormat)
                            }
                        </div>

                        <div className="VariantBox_label">
                            *Seleccionar una opcion
                        </div>
                    </div>
                </div>                
            </div>
        )
    }
}
