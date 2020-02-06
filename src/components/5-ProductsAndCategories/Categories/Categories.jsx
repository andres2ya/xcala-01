import React, { Component } from 'react'
import CategorieCard from './CategorieCard/CategorieCard'
import Hammer from 'hammerjs';
import firebase from "firebase/app";
import "firebase/firestore";


export default class Categories extends Component {
    state={
        categorie:null,
        currentCategorieDoc:null,
        stopQuery:false,
        panleftcategorieDiv:false,
        panrightcategorieDiv:false,
    }

    componentDidMount=()=>{
    /**Integraccion HammerJS */
    // 1)  Seleccionando el elemento al cual se le aplicara el listener de hammer
    var categorieDiv=document.getElementById('categorieDiv');
    // 2)  Creando una instancia de hammer
    var categorieDivHammer= new Hammer(categorieDiv)
    // 3)  Bloqueando el vertical scrolling cuando se toca el elementoByid seleccionado
    categorieDivHammer.get('pan').set({direction:Hammer.DIRECTION_ALL})
    // 4)  Creando el listener de hammer al elemento by id
    categorieDivHammer.on('panleft panright',(e)=>this.changeCategorie(e))
    
    this.getCategorie('firstCategorie')
}

    changeCategorie=async(e)=>{
        const {panleftcategorieDiv,panrightcategorieDiv}=this.state

        if(e.type==='panleft' && panleftcategorieDiv===false){
        //   console.log('Mostrando siguiente categoria')
            await this.setState({
                panleftcategorieDiv:true,
                panrightcategorieDiv:false,
                stopQuery:false,
            })
            this.getCategorie('nextCategorie')
        }
        if(e.type==='panright' && panrightcategorieDiv===false){
        //   console.log('Mostrando anterior categoria')
            
            await this.setState({
                panleftcategorieDiv:false,
                panrightcategorieDiv:true,
                stopQuery:false,
            })
            this.getCategorie('prevCategorie')
        }
        
    }

    getCategorie=(origen)=>{
        //NOTE: Para lograr hacer un prev * next con limit(1) entonces;
        // se tienen dos indices para el query que se va a usar
        //1. firebase.firestore().collection('categorias').where('estado','==','Publicada').orderBy('creationDate','desc') notese que el orderBy esta DESC
        //2. firebase.firestore().collection('categorias').where('estado','==','Publicada').orderBy('creationDate','asc') notose que el orderBy esta en ASC
        //Se manejo de esta manera por las razones que se explican con el siguiente ejemplo

        // orderBy('creationDate','asc')                          |  orderBy('creationDate','desc')
        //--------------------------------------------------------|---------------------------------
        //    1:00 PM                                             |              2:00 PM startAfter.limit(1) ->Esto es Next
        //    1:10 PM  Actual                                     |              1:10 PM Actual
        //    2:00 PM  starAfter.limit(1) ->Esto es Prev          |              1:00 PM
        //
        //Lo anterior explica que, queriendo presentar la informacion en DESC, para obtener el next del actual, se usa orderBy('creationDate','DESC') ya que al combinarlo 
        //con startAfter(actual).limit(1) necesariamente traera el siguiente (siguiente con mayor hora e.j)
        //Y para obtener el Prev, se debe usar orderBy('creationDate','ASC') ya que al organizarlo al reves de como se quiere presentar la informacion al usuario (DESC)
        //necesariamente traera el siguiente en orden ASC, que a su vez corresponde al anterior en el order DESC.

        let {currentCategorieDoc,stopQuery}=this.state
        const queryCategories=firebase.firestore().collection('categorias').where('estado','==','Publicada')
        
        let querySelected
        if(origen==='firstCategorie' || currentCategorieDoc===null){
            console.log('actual')
            console.log('actual categoria',currentCategorieDoc)
            querySelected=queryCategories.orderBy('creationDate','desc').limit(1)
        }else if(origen==='prevCategorie'){
            console.log('previo')
            console.log('actual categoria',currentCategorieDoc.data().nombreCategoria)
            querySelected=queryCategories.orderBy('creationDate','asc').limit(1).startAfter(currentCategorieDoc)
        }else if(origen==='nextCategorie'){
            console.log('siguiente')
            console.log('actual categoria',currentCategorieDoc.data().nombreCategoria)
            querySelected=queryCategories.orderBy('creationDate','desc').limit(1).startAfter(currentCategorieDoc)
        }

        if(stopQuery===false){
            querySelected.onSnapshot(snap=>{
                if(!snap.empty){
                    this.state.currentCategorieDoc=snap.docs[0]//NOTE: Guardando currentCategoriDoc para pasarlo luego en el startAfter o en endBefore
                    console.log('nombre cat guardada como ultima en abrir:',snap.docs[0].data().nombreCategoria)
                    let auxCategorie
                    snap.forEach(doc=>{
                        console.log(doc.id,doc.data().nombreCategoria)
                        auxCategorie=doc.data()
                    })
                    this.setState({categorie:auxCategorie})
                    setTimeout(() => {
                        this.setState({panleftcategorieDiv:false,panrightcategorieDiv:false})
                    }, 1000);
                }else{
                    console.log('snap vacio')
                    setTimeout(() => {
                        this.setState({panleftcategorieDiv:false,panrightcategorieDiv:false,stopQuery:true})
                    }, 1000);
                }
            })
        }
    }

    
    render() {
        const {categorie}=this.state
        return (
            <div id="categorieDiv">
                {categorie?
                <CategorieCard categorie={categorie} />
                :
                null
                }
            </div>
        )
    }
}
