import { Encabezado } from "./js/componentes/Encabezado.js";
import Menu from "./js/componentes/Menu.js";
import AreaEstudio from "./js/componentes/AreaEstudio.js";
import { capituloDelLibro, libroCompleto, NombreDeLibros, numeroCapitulo, ultimoCapitulo } from "./js/funciones/Funciones.js";


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

  
  if(e.target.classList.value === 'mas' && numeroCapitulo+1 <= ultimoCapitulo){          
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