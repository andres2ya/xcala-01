
console.log('1.Se va a capturar a beforeinstallprompt')
//NOTE: Creando variable global con window usando un nombre unico: XcalaWindowVariable
window.XcalaWindowVaraible={}//NOTE: No usar directamente como variable sino como un objeto que guarda variables en su interior.!
window.addEventListener('beforeinstallprompt', (e)=>{
    console.log('2. beforeinstallprompt fue capturado! con exito y es este ->',e)
    e.preventDefault()//NOTE: Para versiones Chrome 76 (July 2019) esta linea evita que se muestre el mensjae de invitacion a instalar con la UI de google
    window.XcalaWindowVaraible.deferredPrompt=e//NOTE: Guarda a nivel global el evento (usando una variable de window). Asi, podra ser usado desde cualquier lugar del app que se desee.
})