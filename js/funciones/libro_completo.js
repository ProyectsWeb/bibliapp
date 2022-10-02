 import { API_URL, API_NAME_LIBRO } from "../helpers/wp_api.js";
import { limpiarHTML, ultimoCapituloDelLibro } from "./Funciones.js";

export let ultimoCapitulo;


export const libroCompleto = function (nombreLibro, getNombreLibro){   
    const libro = {
       nombrelibro : getNombreLibro
     }  
  
 if(window.navigator.onLine === false){     
       let libroCompletoAlmacenado = localStorage.getItem(libro.nombrelibro);     

       const mesaEstudio = document.querySelector('.mesa-estudio'); 
       const areaEstudio = document.querySelector('.area-estudio');   
       limpiarHTML(mesaEstudio);   
       mesaEstudio.classList.toggle('area-libros');
       areaEstudio.classList.toggle('ocultar-area');

       areaEstudio.innerHTML= `<div class='titulo-libro'>${libro.nombrelibro}</div>`;
       for(let i=1; i<= ultimoCapituloDelLibro(JSON.parse(libroCompletoAlmacenado)); i++){        
         areaEstudio.innerHTML += `<div class='cuadro-capitulo'>${i}</div>`;  
       };  

   }else{

      return fetch( `${API_URL}/${API_NAME_LIBRO}`, {
 method: 'POST',    
 headers: {
   'Content-Type': 'application/json'
 },
 body:  JSON.stringify( libro )
})
    .then(response => response.json())
   .then(response => {      
       const mesaEstudio = document.querySelector('.mesa-estudio'); 
       const areaEstudio = document.querySelector('.area-estudio');   

       mesaEstudio.classList.toggle('area-libros');
       areaEstudio.classList.toggle('ocultar-area');
      
       response.sort( (a, b ) =>{   
           if(a.chapter < b.chapter){ return -1; }  
           if(a.chapter > b.chapter){ return 1;  }            
           return 0;
       });

 localStorage.setItem(libro.nombrelibro, JSON.stringify(response));              
  
ultimoCapituloDelLibro(response);
ultimoCapitulo = ultimoCapituloDelLibro(response); 

     // TODOS LOS CAPITULOS DEL LIBRO
     areaEstudio.innerHTML= `<div class='titulo-libro'>${getNombreLibro}</div>`;
     for(let i=1; i<= ultimoCapituloDelLibro(response); i++){        
       areaEstudio.innerHTML += `<div class='cuadro-capitulo'>${i}</div>`;  
     };  
 })
   .catch(err => console.error(err));
}
} 