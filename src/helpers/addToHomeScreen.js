export async function addToHomeScreen() {
    let res
    let deferredPrompt=window.XcalaWindowVaraible.deferredPrompt//NOTE: Leyendo varianle global
    await deferredPrompt.prompt()//NOTE: Lanzando prompt de google
    await deferredPrompt.userChoice //NOTE: Leyendo respuesta usuario
    .then(choice=>{
        console.log('choice is:',choice)
        if(choice.outcome==='accepted'){
            console.log('El usuario acepto installar app')
            res= choice.outcome
        }else{
            console.log('el usuario rechazo instalar app')
            res= choice.outcome
        }
    })
    deferredPrompt=null
    window.XcalaWindowVaraible.deferredPrompt=null
    return(res)
}