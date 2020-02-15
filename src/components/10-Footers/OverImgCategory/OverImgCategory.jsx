import React, { Component } from 'react'
import Hammer from 'hammerjs';
import numeral from 'numeral';
import './OverImgCategory.css'

export default class OverImgCategory extends Component {
    
  
    
  
    
    render() {
        return (
        <footer className='sticky-footer' >
          
          <div className='OverImgCategoryBox'>
            <div className='row OverImgCategoryBoxContent'>
                <div className="col-12 d-flex justify-content-center">
                    <div className="row bty">
                        <div className="col-6">Ver categoria</div>
                        <div className="col-6">Compartir</div>
                    </div>
                </div>
               
            </div>
          </div>
        </footer>
        )
    }
}
