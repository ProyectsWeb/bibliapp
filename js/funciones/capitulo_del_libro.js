import { API_URL, API_CAP_LIBRO  } from "../helpers/wp_api.js";
import { limpiarHTML } from "./Funciones.js";

export let numeroCapitulo;

export const capituloDelLibro = function(libro, capitulo){
   
    const capLibro = {
      nombrelibro : libro,
      capitulolibro : capitulo
    } 

   if(window.navigator.onLine === false){
   
    let libroCompletoAlmacenado = JSON.parse(localStorage.getItem(libro));    

      libroCompletoAlmacenado.sort( function (a, b){
      if(a.verse < b.verse){ return -1; }  
      if(a.verse > b.verse){ return 1;  }      
      return 0;
    })   

    const mesaEstudio = document.querySelector('.mesa-estudio'); 
    const areaEstudio = document.querySelector('.area-estudio'); 
        
    const mas = document.querySelector('.mas');
    numeroCapitulo = parseInt(capitulo); 
          
         mesaEstudio.classList.add('area-libros');     
         areaEstudio.classList.add('ocultar-area');        
   
         limpiarHTML(mesaEstudio);        
                
           mesaEstudio.innerHTML= `
           <div class='titulo-libro'>
            <span class='menos'>< </span>${libro} ${numeroCapitulo}<span class='mas'> ></span> 
          </div>`;        

        for(let resp of libroCompletoAlmacenado){          

            if(resp.chapter === numeroCapitulo){               
                mesaEstudio.innerHTML += `     
                  <p class='verso-texto'><span class='verso-numero'>${resp.verse}</span>  ${resp.text}</p>
                  `;
            }                    
         }  

   }else{ 
  
  return fetch(`${API_URL}/${API_CAP_LIBRO}`, {
    method: 'POST',    
    headers: {
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify( capLibro )
  }
  )
  .then(response => response.json())
      .then(response => {         
        console.log(response)
       const mesaEstudio = document.querySelector('.mesa-estudio'); 
       const areaEstudio = document.querySelector('.area-estudio'); 
       
     const mas = document.querySelector('.mas');
      numeroCapitulo = parseInt(capitulo); 
         
        mesaEstudio.classList.add('area-libros');     
        areaEstudio.classList.add('ocultar-area');        
  
        limpiarHTML(mesaEstudio);        
               
          mesaEstudio.innerHTML= `
          <div class='titulo-libro'>
           <span class='menos'>< </span>${libro} ${numeroCapitulo}<span class='mas'> ></span> 
         </div>`;      
  
  console.log(response)
       response.sort( (a, b ) =>{         
        if(a.verse < b.verse){ return -1; }  
        if(a.verse > b.verse){ return 1;  }      
        return 0;
      }    
      
      );  
  
      for(let resp of response){         
        mesaEstudio.innerHTML += `     
              <p class='verso-texto'><span class='verso-numero'>${resp.verse}</span>  ${resp.text}</p>
              `;            
            }           
    })
      .catch(err =>{ console.error(err) } );
  }
} 