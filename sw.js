
importScripts('js/helpers/sw-utils.js');

const STATIC_CACHE    = 'static-v1';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1'; 

const APP_SHELL = [
    '/',
    '/index.html',
    '/css/style.css',
    '/public/bibliapp.png',
    '/public/vite.svg',    
    '/js/componentes/AreaEstudio.js',
    '/js/componentes/Encabezado.js',
    '/js/componentes/Menu.js',
    '/js/funciones/capitulo_del_libro.js',
    '/js/funciones/Funciones.js',
    '/js/funciones/libro_completo.js',
    '/js/funciones/libros.js',    
    '/js/funciones/texto_aleatorio.js',
    '/js/helpers/sw-utils.js',
    '/js/helpers/wp_api.js',
    '/main.js',
    'sw.js' 
];
 

const APP_SHELL_INMUTABLE = [
    'https://use.fontawesome.com/79d2d8e64e.js'    
];


 self.addEventListener('install', e =>{

     const cacheStatic = caches.open( STATIC_CACHE ).then( cache =>{        
       return cache.addAll( APP_SHELL )
        
    });

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then( cache =>{
       return cache.addAll( APP_SHELL_INMUTABLE )
    });


   e.waitUntil( Promise.all( [cacheStatic, cacheInmutable] ) ); 
});
 



self.addEventListener('activate', e =>{
        const respuesta = caches.keys().then( keys =>{
            keys.forEach( key =>{
                if( key !== STATIC_CACHE && key.includes('static')){
                    return caches.delete( key );
                }
            });
        });

        e.waitUntil( respuesta );
});
 

   

self.addEventListener('fetch', e => {
   
  const respuesta = caches.match( e.request ).then( res =>{
    
        if(res ){
                actualizaCacheStatico( STATIC_CACHE, e.request, APP_SHELL_INMUTABLE ); ////
                
            return res;
        }else{
            return fetch( e.request ).then( newRes =>{                
                return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );
            });
        }
    });

    e.respondWith( respuesta );
});