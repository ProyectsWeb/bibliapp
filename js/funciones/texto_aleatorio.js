import { API_URL, API_VERSO_ALEAT } from "../helpers/wp_api.js";


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