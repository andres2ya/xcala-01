// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);




export function register(config) {
  console.log('inside of register sw',config)
  // if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    if ('serviceWorker' in navigator) { //TODO: Volver a poner ==='production'
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }
    

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
         console.log('This is running on localhost. Lets check if a service worker still exists or not.')
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentatio
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        console.log('Is not localhost. Just register service worker')

        registerValidSW(swUrl, config);
      }
    });
  }
}




function registerValidSW(swUrl, config) {
  console.log('Inside registerValidSW',swUrl,config)

  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      console.log('Exito al registrar servicio, registration=',registration)





      console.log('se agregara a registration un .onupdatefount = a una funcion')
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        console.log('dentro de registration.onupdatefount verificando si registration.installingr==null')
        if (installingWorker == null) {
          console.log('registration.installing==null , se va a return...esto quiere decir que no hay en proceso nuevas instalacciones y por lo tanto ya todo el contenido esta actualizado')
          return;
        }
        console.log('registration.installing != null, es:',registration.installing ,' esto quiere decir que hay instalacciones en proceso que traen actualizaciones... por lo tanto no retorna y deberia seguir en esta linea y al registration.installing añadir .onstatechange que es igual a una funcion..')
        installingWorker.onstatechange = () => {
          console.log('dentro de la funcion registration.installing.onstatechange evalua si registration.installing.state === installed:::',installingWorker.state)
          
          
          
          if (installingWorker.state === 'installed') {
            console.log('registration.installing===installed, esto quiere decir que cuando el estado de la instalaccion sea "installed", se ejecutan las siguientes linea de comando: las cuales evaluan si ya se ha actualizado completamente el SW o si por el contrario se debe esperar a que el usuario cierre y vuelva a cargar todos los tabs ya que el anterior SW aun sigue controlando la aplicacion')
            if (navigator.serviceWorker.controller) {
              console.log('navigator.serviceWorker.controller existe y es:',navigator.serviceWorker.controller)
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log('// At this point, the updated precached content has been fetched,// but the previous service worker will still serve the older// content until all client tabs are closed.')
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );
              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('navigator.serviceWorker.controller no existe, esto quiere decir que ya se ha cargado y actualizado el nuevo SW por lo que el anterior SW ya no controla')
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }


          



        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}




function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  console.log('Inside checkValidServiceWorker',swUrl,config)

  fetch(swUrl)
    .then(response => {
      console.log('Inside fetch.then',response)

      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        console.log('No service worker found. Probably a different app. Reload the page.....')
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        
        // Service worker found. Proceed as normal.
        console.log('Service worker found. Proceed as normal.')
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}




export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
