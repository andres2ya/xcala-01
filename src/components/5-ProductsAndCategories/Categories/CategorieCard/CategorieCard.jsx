import React, { Component } from 'react'
import firebase from "firebase/app";
import numeral from 'numeral';
import {Link} from 'react-router-dom'
import LinkWithDelay from './../../../../helpers/LinkWithDelay'
import {truncateLongString} from './../../../../helpers/truncateLongStrings' //NOTE: funcion que corta despues de un terminado numero de caracteres y coloca ... al final.
import './CategorieCard.css'
import RippleButton from '../../../layout/RippleButton/RippleButton';
import {getDeviceOS} from './../../../../helpers/getDeviceOS'
import OverImgCategory from '../../../10-LayOuts/OverImgCategory/OverImgCategory';

export default class CategorieCard extends Component {
    state={
        isDownloading:false,
        textShareButton:'Compartir',
        device:undefined,
        multipleFilesArray:[],
        filesUploaded:false,

    }

    componentDidMount=()=>{
        //NOTE: obteniendo el dispositivo desde el cual se esta conectando!
        let device=getDeviceOS()
        this.setState({device:device})
    }

    shareCategoryProducts=async()=>{
        const {categorie}=this.props
        // console.log('Compartiendo... categoria:',this.props.categorie.nombreCategoria)
        this.setState({textShareButton:'Descargando...'})
 
        let URLs_imgProductsCategory=[]
        const getURLs=async()=>{
            await firebase.storage().ref(`/imagenes/categorias/${categorie.id}`)
            .listAll()
            .then(async(res) =>{
                console.log(`El listado de archivos en /imagenes/categorias/${categorie.id}, es:`,res.items)
                return Promise.all(
                    res.items.map(async (item)=>{
                        return new Promise((response,reject)=>{
                            item.getDownloadURL()
                            .then((url)=>{
                                response(URLs_imgProductsCategory.push(url))
                            })
                            .catch(err=>{
                                reject(console.log('ocurrio un error al obtener URL',err))
                                this.setState({textShareButton:`error 1...${err}`})
                            })
                        })
                    })
                )
            })
            .catch(err=>{
                console.log(`ocurrio un error al obtener lista de archivos en ref: /imagenes/categorias/${categorie.id}`,err)
                this.setState({textShareButton:`error 2...${err}`})
            })
        }
        await getURLs()
        console.log(`la URL de los files contenido en /imagenes/categorias/${categorie.id}, son:`,URLs_imgProductsCategory)


        const getFiles=async()=>{
            return Promise.all(
                URLs_imgProductsCategory.map(async(url,index)=>{
                    const response = await fetch(url);
                    const blob = await response.blob();
                    let extension=blob.type.split('/').pop()
                    const file =  new File([blob], `xName${index}.${extension}`,{type:blob.type});
                    return Promise.resolve(file)
                })
            )}
        getFiles()
        .then(async files=>{
            console.log('recibiendo archivos files...')
            files.forEach(file=>{
                this.state.multipleFilesArray.push(file)
            })
            await this.setState({filesUploaded:true})
            console.log('Enviando a compartir...')
            this.compartirProducto()
        })
        .catch(err=>{
            //TODO: Usar <Alert/> para mostrar el error.
            console.log('ocurrio un erro al obtener los archivos...',err)
            this.setState({textShareButton:`error 3${err}`})
        })
    }

    compartirProducto=()=>{
        console.log('recibiendo vector con files en compartirProducto',this.state.multipleFilesArray)
        const {multipleFilesArray}=this.state
        const {categorie}=this.props
        if(navigator.share){
            this.state.redirectTOCHROME=false
            navigator.share({
                files:multipleFilesArray,
                title:categorie.nombreCategoria,
                text:`Hola!!!, mira estos ${categorie.nombreCategoria}, si te interesa cuentame, estare feliz de atenderte!!!`
            })
            .then(()=>
                this.setState({oneFileArray:[],multipleFilesArray:[],textShareButton:'Compartir'})
            )
            .catch((err)=>{
                //TODO: Usar <Alert/> para mostrar el error.
                console.log('ocurrio un error al enviar archivos mediante shareAPI',err)
                this.setState({oneFileArray:[],multipleFilesArray:[],mensaje:'OCURRIO UN PROBLEMA :'+err,textShareButton:'Compartir'})
                this.setState({textShareButton:`error 4...${err}`})
            })
        }else{
            //TODO: Usar <Alert/> para mostrar el error.
            console.log('EL navegador no soporta esta funcion',navigator.vendor)
            this.state.redirectTOCHROME=true
            this.setState({oneFileArray:[],multipleFilesArray:[]})
            this.setState({textShareButton:'error 5...'})
        }
    }



    render() {
        const {categorie,loadedImg}=this.props
        if(categorie.fotoPortada){
            return (
                <div>

                    <img onLoad={(e)=>loadedImg(e)} className="img-backgroundCategorie" src={categorie.fotoPortada}/>

                    {/*TODO: Espacio donde iba el overGradient */}

                    <OverImgCategory/>
                </div> 
            )
        }else{
            return(null)
        }
    }
}
