import { textoAleatorio } from "../funciones/Funciones.js";

export default function Menu(){
  
    return `
    <nav class="navegacion">       
         <i class="fa fa-bars" aria-hidden="true"></i>
        <button class='libros'>Libros</button>  
    </nav> 
        <br>       
        <div class='verso'>${textoAleatorio()}</div>        
     `;
}