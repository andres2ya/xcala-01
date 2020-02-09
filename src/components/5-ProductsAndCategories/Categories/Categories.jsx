import React, { Component } from 'react'
import CategorieCard from './CategorieCard/CategorieCard'
import EllipsisLoading from './../../layout/EllipsisLoading/EllipsisLoading'
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
        listener:null,
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

    componentWillUnmount=()=>{
        this.removeListener()
    }

    changeCategorie=async(e)=>{
        const {panleftcategorieDiv,panrightcategorieDiv}=this.state

        if(e.type==='panleft' && panleftcategorieDiv===false){
            await this.setState({
                panleftcategorieDiv:true,
                panrightcategorieDiv:false,
                stopQuery:false,
            })
            this.getCategorie('nextCategorie')
        }
        if(e.type==='panright' && panrightcategorieDiv===false){
            await this.setState({
                panleftcategorieDiv:false,
                panrightcategorieDiv:true,
                stopQuery:false,
            })
            this.getCategorie('prevCategorie')
        }
    }

    removeListener=()=>{
        const {listener}=this.state
        if(listener!==null){
            listener()
            this.setState({listener:null})
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

        this.removeListener()//NOTE: Removiendo anterior listener
        let querySelected
        if(origen==='firstCategorie' || currentCategorieDoc===null){
            querySelected=queryCategories.orderBy('creationDate','desc').limit(1)
        }else if(origen==='prevCategorie'){
            querySelected=queryCategories.orderBy('creationDate','asc').limit(1).startAfter(currentCategorieDoc)
        }else if(origen==='nextCategorie'){
            querySelected=queryCategories.orderBy('creationDate','desc').limit(1).startAfter(currentCategorieDoc)
        }

        if(stopQuery===false){
            this.state.listener=querySelected.onSnapshot(snap=>{
                if(!snap.empty){
                    this.state.currentCategorieDoc=snap.docs[0]//NOTE: Guardando currentCategoriDoc para pasarlo luego en el startAfter o en endBefore
                    let auxCategorie
                    snap.forEach(doc=>{
                        auxCategorie=doc.data()
                    })
                    this.setState({categorie:auxCategorie})
                }else{
                    this.setState({panleftcategorieDiv:false,panrightcategorieDiv:false,stopQuery:true})
                }
            })
        }
    }

    //NOTE: Funcion heredada a CategorieCard que se lanza cuando la imagen de la categoria de carga completamente. Permite desbloquear los controles de slide solo si la imagen ya ha sido mostrada.
    loadedImg=(e)=>{
        e.preventDefault()
        setTimeout(() => {
            this.setState({panleftcategorieDiv:false,panrightcategorieDiv:false})
        }, 50);
    }

    render() {
        const {categorie}=this.state
        if(categorie){
            return (
                <div id="categorieDiv">
                    <CategorieCard  categorie={categorie}  loadedImg={this.loadedImg}/>
                </div>
            )
        }else{
            return(
                <div style={{minHeight:'80vh'}} className="d-flex justify-content-center align-items-center" id="categorieDiv">
                    <EllipsisLoading/>
                </div>
            )
        }
    }
}
