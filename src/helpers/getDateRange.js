import moment from 'moment';
export const getDateRange=(existingDates)=>{
    var auxFecha;var dia;var mes;var auxMesNumero;var mesNumero;var año;var fechaLimiteInferior=null;var fechaLimiteSuperior=null;var auxDia=0;var diaNumero;var auxCount=0
    //if(año actual es bisiesto){
        //const meses=[{nombre:'ene.',dias:31},{nombre:'feb.',dias:29},{nombre:'mar.',dias:31},{nombre:'abr.',dias:30},{nombre:'may.',dias:31},{nombre:'jun.',dias:30},{nombre:'jul.',dias:31},{nombre:'ago.',dias:31},{nombre:'sep.',dias:30},{nombre:'oct.',dias:31},{nombre:'nov.',dias:30},{nombre:'dic.',dias:31}]
    //}else{
    const meses=[{nombre:'ene.',dias:31},{nombre:'feb.',dias:28},{nombre:'mar.',dias:31},{nombre:'abr.',dias:30},{nombre:'may.',dias:31},{nombre:'jun.',dias:30},{nombre:'jul.',dias:31},{nombre:'ago.',dias:31},{nombre:'sep.',dias:30},{nombre:'oct.',dias:31},{nombre:'nov.',dias:30},{nombre:'dic.',dias:31}]
    //}


    meses.map(mesConst=>{
        existingDates.map(fecha=>{
            auxFecha=moment(new Date(fecha)).format('DD/MM/YYYY')
            console.log(auxFecha)
            dia=moment(new Date(fecha)).format('DD')
            mes=moment(new Date(fecha)).format('MMM')
            auxMesNumero=1 + moment(new Date(fecha)).month();if(auxMesNumero<10){mesNumero='0'+auxMesNumero}else{mesNumero=auxMesNumero}
            año=moment(new Date(fecha)).format('YYYY')
                        
            if(mesConst.nombre===mes){
                    //si el mes de la constante es igual al mes actual
                    if(mesConst.nombre===moment(new Date()).format('MMM')){
                        for (let index = 1+auxCount; index <= moment(new Date()).format('DD'); index++) {if(index<10){auxDia='0'+index}else{auxDia=index}
                            if(dia<10){diaNumero=Math.trunc(dia)}else{diaNumero=dia}
                            if(dia!==auxDia && fechaLimiteInferior===null && diaNumero>index){
                                // console.log('if :'+dia+' es diferente de? '+auxDia)
                                let x = moment(new Date(auxDia+'/'+mesNumero+'/'+año)).format('L')
                                let y = moment(new Date(dia+'/'+mesNumero+'/'+año)).format('L')
                                fechaLimiteInferior=moment(new Date(x)).format('L')
                                fechaLimiteSuperior=moment(new Date(y)).format('L')
                                // console.log(fechaLimiteInferior)
                                // console.log(fechaLimiteSuperior)
                            }else if(dia!==auxDia && fechaLimiteInferior!==null && fechaLimiteSuperior===null && diaNumero>index){
                                // console.log('else if :'+dia+' es diferente de? '+auxDia)
                                let y = moment(new Date(dia+'/'+mesNumero+'/'+año)).format('L')
                                fechaLimiteSuperior=moment(new Date(y)).format('L')
                                // console.log(fechaLimiteSuperior)
                            }else{
                                    // console.log('else :'+dia+' es diferente de? '+auxDia)
                                    auxCount=auxCount+1
                                    break;
                                }
                        }
                    }else{
                        console.log(':-.-:')
                        console.log(mesConst.nombre)
                        console.log(mesConst.dias)
                        console.log(auxCount)
                        for (let index = 1+auxCount; index <= mesConst.dias; index++) {if(index<10){auxDia='0'+index}else{auxDia=index}
                            if(dia<10){diaNumero=Math.trunc(dia)}else{diaNumero=dia}

                            console.log(dia+'es diferente de?'+auxDia)
                            if(dia!==auxDia && fechaLimiteInferior===null && diaNumero>index){
                                console.log('entro!')
                                console.log(diaNumero+': es mayor que :'+index)
                                let x = moment(new Date(auxDia+'/'+mesNumero+'/'+año)).format('L')
                                fechaLimiteInferior=moment(new Date(x)).format('L')
                            }else{
                                // console.log('else :'+dia+' es diferente de? '+auxDia)
                                auxCount=auxCount+1
                                break;
                            }
                        }
                    }
                    //TODO: No guarda el ultimo dia encontrado de ese mes, sino el primero
                    console.log(dia+auxCount)
                    console.log(dia===auxCount)
                    if(fechaLimiteInferior===null && dia===auxCount){
                        let x = moment(new Date(dia+'/'+mesNumero+'/'+año)).format('L')
                        fechaLimiteInferior=moment(new Date(x)).format('L')
                    }
            }
        })
        //TODO: No ubica el limite superior adecuado al evaluar el siguiente mes
        console.log('limite inferior :'+fechaLimiteInferior)
        console.log('limite superior :'+fechaLimiteSuperior)
    })

return {'limite inferior':fechaLimiteInferior,'limite superior':fechaLimiteSuperior}
}