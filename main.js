let url = window.location.href;
let swLocation = '/bibliapp/sw.js';


if(navigator.serviceWorker){ 
  if ( url.includes('localhost') ) {
    swLocation = '/sw.js';
  }  
  navigator.serviceWorker.register(swLocation); 
  console.log("SERVICEWORKER")     
}


import { Encabezado } from "./js/componentes/Encabezado.js";
import Menu from "./js/componentes/Menu.js";
import AreaEstudio from "./js/componentes/AreaEstudio.js";
import { NombreDeLibros } from "./js/funciones/Funciones.js";
import { libroCompleto, ultimoCapitulo } from "./js/funciones/libro_completo.js";
import { capituloDelLibro, numeroCapitulo } from "./js/funciones/capitulo_del_libro.js";



document.addEventListener("DOMContentLoaded", (e) => {   
  const App = document.querySelector('#app');   

  App.innerHTML = ` 
  ${Encabezado()}      
  ${Menu()}  
  ${AreaEstudio()}  
  `;
  NombreDeLibros();    
 
App.addEventListener('click', (e)=>{ 
 
  let numeroCap = parseInt(localStorage.getItem('numero-capitulo'));
  let getNombreLibro = localStorage.getItem('libroName');    

  if(e.target.classList.value === 'libros') NombreDeLibros();  

  if(e.target.classList.value === 'btn-libro'){    
    localStorage.setItem('libroName', e.target.textContent);
    let getNombreLibro = localStorage.getItem('libroName');
    libroCompleto(e.target.textContent, getNombreLibro); 
  }  


  if(e.target.classList.value === 'cuadro-capitulo'){      
    localStorage.setItem('numero-capitulo', e.target.textContent); 
    capituloDelLibro(getNombreLibro, e.target.textContent);    
  }  
  

  if((e.target.classList.value === 'mas' && numeroCapitulo+1 <= ultimoCapitulo) 
      || (window.navigator.onLine === false && e.target.classList.value === 'mas')){    
     let sumarCapitulo = numeroCap +1;    
     localStorage.setItem('numero-capitulo', sumarCapitulo);     
     capituloDelLibro(getNombreLibro, sumarCapitulo );     
  }


if(e.target.classList.value === 'menos' && (numeroCap -1) >= 1){   
   let restarCapitulo = numeroCap -1;  
   localStorage.setItem('numero-capitulo', restarCapitulo);
   capituloDelLibro(getNombreLibro, restarCapitulo ); 
}

});
});  