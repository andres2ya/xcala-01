import React, { Component } from 'react'
import firebase from "firebase/app";
import numeral from 'numeral';
import {Link} from 'react-router-dom'
import LinkWithDelay from './../../../../helpers/LinkWithDelay'
import {truncateLongString} from './../../../../helpers/truncateLongStrings' //NOTE: funcion que corta despues de un terminado numero de caracteres y coloca ... al final.
import './CategorieCard.css'
import RippleButton from '../../../layout/RippleButton/RippleButton';
import {getDeviceOS} from './../../../../helpers/getDeviceOS'

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
        console.log('Compartiendo... categoria:',this.props.categorie.nombreCategoria)
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
                            })
                        })
                    })
                )
            })
            .catch(err=>console.log(`ocurrio un error al obtener lista de archivos en ref: /imagenes/categorias/${categorie.id}`,err))
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
        })
    }

    compartirProducto=()=>{
        console.log('recibiendo vector con files en compartirProducto',this.state.multipleFilesArray)
        const {multipleFilesArray}=this.state
        const {categorie}=this.state
        if(navigator.share){
            this.state.redirectTOCHROME=false
            navigator.share({
                files:multipleFilesArray,
                title:this.props.categorie.nombreCategoria,
                text:`Hola!!!, mira estos ${categorie.nombreCategoria}, si te interesa cuentame, estare feliz de atenderte!!!`
            })
            .then(()=>
                this.setState({oneFileArray:[],multipleFilesArray:[],textShareButton:'Compartir'})
            )
            .catch((err)=>{
                //TODO: Usar <Alert/> para mostrar el error.
                console.log('ocurrio un error al enviar archivos mediante shareAPI',err)
                this.setState({oneFileArray:[],multipleFilesArray:[],mensaje:'OCURRIO UN PROBLEMA :'+err,textShareButton:'Compartir'})
            })
        }else{
            //TODO: Usar <Alert/> para mostrar el error.
            console.log('EL navegador no soporta esta funcion',navigator.vendor)
            this.state.redirectTOCHROME=true
            this.setState({oneFileArray:[],multipleFilesArray:[]})
        }
    }



    render() {
        const {categorie,loadedImg}=this.props
        if(categorie.fotoPortada){
            return (
                <div>

                    <img onLoad={(e)=>loadedImg(e)} className="img-backgroundCategorie" src={categorie.fotoPortada}/>

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
                                        

                
                                        {/* TODO: al presionar compartir debe ejecutar una funcion que cargue todas las fotos de los productos asociados a esta categoria y las envie mediante el Share API a whatsapp para ser compartidas... */}


                                        {(function showShareButton(device){
                                            if(device==='Windows'){
                                               return <LinkWithDelay delay={100} to={`categories-id=${categorie.nombreCategoria}`}>
                                                    <RippleButton
                                                        segAnimation={1.2}
                                                        texto={'Ver categoria'} textoDobleLinea={false}
                                                        styleButton={{background:'white',backgroundColor:'#fffeff',borderRadius:10,height:35,width:'100%',margin:'0px 0px 0px 0px'}}
                                                        styleTexto={{marginTop:25,maxHeight:20,fontSize:14,fontWeight:600,color:'#444d84'}}
                                                        styleRipple={{height:'100px',width:'100px',borderRadius:'100%',backgroundColor:'rgba(0, 0, 0, 0.1)',}}>
                                                    </RippleButton>
                                                </LinkWithDelay>
                                            }else if(device!==undefined){
                                               return <LinkWithDelay delay={100} to={`categories-id=${categorie.nombreCategoria}`}>
                                                    <RippleButton
                                                        segAnimation={1.2}
                                                        texto={'Ver categoria'} textoDobleLinea={false}
                                                        styleButton={{background:'white',backgroundColor:'#fffeff',borderRadius:10,height:45.2,width:'100%',margin:'0px 0px 0px 0px'}}
                                                        styleTexto={{marginTop:25,maxHeight:20,fontSize:14,fontWeight:600,color:'#444d84'}}
                                                        styleRipple={{height:'100px',width:'100px',borderRadius:'100%',backgroundColor:'rgba(0, 0, 0, 0.1)',}}>
                                                    </RippleButton>
                                                </LinkWithDelay>
                                            }
                                        })(this.state.device)}  
                           
                                        {this.state.device==='Windows'?
                                            <section onClick={this.shareCategoryProducts}>
                                                <RippleButton
                                                    segAnimation={2}
                                                    texto={this.state.textShareButton} textoDobleLinea={false} classNameIcon={"icon-whatsapp"}
                                                    styleButton={{background:'-moz-linear-gradient(180deg, #61fd7d 0%, #2bb826 100%)',background:'-webkit-linear-gradient(180deg, rgba(97,253,125,1) 0%, rgba(43,184,38,1) 100%)',background:'linear-gradient(180deg, rgba(97,253,125,1) 0%, rgba(43,184,38,1) 100%)',
                                                    borderRadius:10,height:35,width:'100%',margin:'6px 0px 0px 0px'}}
                                                    styleIcon={{padding:'0px 5px 0px 0px',margin:'',color:'',fontSize:25,fontWeight:'700',}}
                                                    styleTexto={{padding:'0px 5px 6px 0px',marginTop:25,maxHeight:20,fontSize:14,fontWeight:600,color:'white'}}
                                                    styleRipple={{height:'100px',width:'100px',borderRadius:'100%',backgroundColor:'rgb(143, 255, 164,0.8)',}}>
                                                </RippleButton>
                                            </section>
                                        :
                                            null
                                        }

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
