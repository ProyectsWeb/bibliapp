import { API_URL, API_NAME_LIBRO, API_CAP_LIBRO, API_VERSO_ALEAT } from "../helpers/wp_api.js";
import { escritosHebreos, escritosGriegos} from "./libros.js";

export let ultimoCapitulo;
export let numeroCapitulo;

//Funcion 1 -Muestra el listado de todos los libros
export const NombreDeLibros = function (){ 
       const mesaEstudio = document.querySelector('.mesa-estudio'); 
       const areaEstudio = document.querySelector('.area-estudio');       

       mesaEstudio.classList.toggle('area-libros');
       areaEstudio.classList.toggle('ocultar-area');      

       limpiarHTML(mesaEstudio);
        mesaEstudio.innerHTML = '<h1 class="listado-libros">Libros de la Biblia</h1>';           
        mesaEstudio.innerHTML += '<div class="listado-libros">Escritos Hebreos</div>';
       SeccionBiblica(escritosHebreos, mesaEstudio);
       mesaEstudio.innerHTML += '<div class="listado-libros">Escritos Griegos</div>';
       SeccionBiblica(escritosGriegos, mesaEstudio);
}


export const libroCompleto = function (nombreLibro, getNombreLibro){    

  const libro = {
    nombrelibro : getNombreLibro
  }  
 
  return fetch( `${API_URL}/${API_NAME_LIBRO}`, 
 {
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



export const capituloDelLibro = function(libro, capitulo){

  const capLibro = {
    nombrelibro : libro,
    capitulolibro : capitulo
  } 

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

    const mesaEstudio = document.querySelector('.mesa-estudio'); 
    const areaEstudio = document.querySelector('.area-estudio'); 
    
    const mas = document.querySelector('.mas');
    numeroCapitulo = parseInt(capitulo); 
       
      mesaEstudio.classList.add('area-libros');     
      areaEstudio.classList.add('ocultar-area');       

      limpiarHTML(mesaEstudio);        
             
        mesaEstudio.innerHTML= `
        <div class='titulo-libro'>
         <span class='menos'><</span>${libro} ${numeroCapitulo}<span class='mas'>></span> 
       </div>`;    
     
      
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


//FUNCIONES
export const ultimoCapituloDelLibro = (arr) => { 
    let lastItem=arr[arr.length-1];     
    return lastItem.chapter;
}  

//Limpiar el area de estudio cuando cambia de seccion
function limpiarHTML( etiqueta){
  etiqueta.innerHTML = '';
}

//Las 2 secciones Escritos Hebreos y Griegos
function SeccionBiblica (secionEscritos, lugarEstudio){   
    secionEscritos.forEach( (element) => {                          
    lugarEstudio.innerHTML +=  `<button class='btn-libro'>${element}</button>`;           
  });  
  
}


export const textoAleatorio = function (){ 
 
  return fetch(`${API_URL}/${API_VERSO_ALEAT}`)
        .then(response => response.json())
        .then(response => {    
                     
          const verso = document.querySelector('.verso');
          const versiculo = document.querySelector('.versiculo');       

          response.forEach( (element) => {

            const {bookname, chapter, verse, text } = element;           
            verso.innerHTML = `${JSON.stringify(bookname)} ${JSON.stringify(chapter)}: ${JSON.stringify(verse)}
            <div class="versiculo">${text}</div>                               
            `;            
           });           
        });
} 