//NOTE: 1. Creando variable global con window usando un nombre unico: XcalaWindowVariable, con getters y setters y un lsitener para saber desde cualquier parte del app cuando se cambio el valor de deferredPrompt
window.XcalaWindowVaraible={
    deferredPromptInternal:null,
    appInstalledInternal:false,
    deferredPrompt_listener:function(val){},
    appInstalled_listener:function(val){},
    set deferredPrompt(val){
        this.deferredPromptInternal=val;
        this.deferredPrompt_listener(val);
    },
    get deferredPrompt(){
        return this.deferredPromptInternal;
    },
    set appInstalled(val){
        this.appInstalledInternal=val
        this.appInstalled_listener(val);
    },
    get appInstalled(){
        return this.appInstalledInternal;
    },
    listenerDeferredPrompt:function(listener){
        this.deferredPrompt_listener=listener;
    },
    listenerAppInstalled:function(listener){
        this.appInstalled_listener=listener;
    },
}

//NOTE: 2. Setting window.XcalaWindowVaraible.deferredPrompt
console.log('1.Se va a capturar a beforeinstallprompt')
window.addEventListener('beforeinstallprompt', (e)=>{
    console.log('2. beforeinstallprompt fue capturado! con exito y es este ->',e)
    e.preventDefault()//NOTE: Para versiones Chrome 76 (July 2019) esta linea evita que se muestre el mensjae de invitacion a instalar con la UI de google
    window.XcalaWindowVaraible.deferredPrompt=e//NOTE: Guarda a nivel global el evento (usando una variable de window). Asi, podra ser usado desde cualquier lugar del app que se desee.
})

//NOTE: 3. PEGAR ESTE FRAGMENTO EN EL COMPONENTDIDMOUNT DEL COMPONENTE QUE CARGA EL BOTON DE AÑADIR: 
//Listening changes in window.XcalaWindowVaraible.deferredPrompt
// window.XcalaWindowVaraible.listenerDeferredPrompt(function(val){
//     console.log('Se escucho la captura de beforeinstallPrompt!',val)
//     // alert('Se escucho la captura de beforeinstallPrompt!'+' '+val)
//     //Mostrar boton de añadir...
// })

