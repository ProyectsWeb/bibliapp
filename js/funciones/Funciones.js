import { escritosHebreos, escritosGriegos} from "./libros.js";

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

//FUNCIONES
export const ultimoCapituloDelLibro = (arr) => { 
    let lastItem=arr[arr.length-1];     
    return lastItem.chapter;
}  

//Limpiar el area de estudio cuando cambia de seccion
export function limpiarHTML( etiqueta){
  etiqueta.innerHTML = '';
}

//Las 2 secciones Escritos Hebreos y Griegos
function SeccionBiblica (secionEscritos, lugarEstudio){   
    secionEscritos.forEach( (element) => {                          
    lugarEstudio.innerHTML +=  `<button class='btn-libro'>${element}</button>`;           
  });    
} 