// DEFINICIÓN DE FORMULARIOS Y LISTA

const searchForm=document.forms[0]; // Accede al primer formulario en el documento (índice [0]) y lo almacena en 'searchForm'.

const addForm=document.forms["add-ex"]; // Accede al formulario con el nombre add-ex y lo guarda en addForm.

const list = document.querySelector('#ex-list ul'); // Selecciona el elemento 'ul' dentro del contenedor ''#ex-list' y lo asigna a list, donde se listarán los ejercicios.

// BORRAR EJERCICIOS

// Añade un evento 'click' al elemento 'list' que se ejecutará cada vez que se haga clic en él.
list.addEventListener('click', function(e) {
  // Verifica si el elemento clicado tiene la clase 'delete', que indica que se ha clicado el botón para eliminar.
  if(e.target.className == 'delete'){
    const li = e.target.parentElement; // Selecciona el elemento 'li' padre del botón de eliminación, que es el elemento de la lista a eliminar.    
    li.parentNode.removeChild(li); // Elimina el elemento 'li' del DOM
    
   // Dos formas alternativas de ocultar el elemento sin eliminarlo (estableciendo el estilo display: none).
   //li.setAttribute ('style', 'display: none');
   //li.style.display="none"; 
    
    }
});


// OCULTAR EJERCICIOS


const hideBox = document.querySelector('#hide'); 
// Añade un evento 'change' al checkbox 'hideBox' que se dispara al marcar o desmarcar.
hideBox.addEventListener('change', function(){
  // Si hideBox está marcado 'checked', oculta la lista de ejercicios (display: none); 
  if(hideBox.checked){
    list.style.display = "none";
    // si está desmarcado, vuelve a mostrarla (display: initial).
  } else {
    list.style.display = "initial";
  }
});


// AÑADIR EJERCICIOS

// Añade un evento 'click' al botón dentro del formulario 'addForm' que se ejecutará al hacer clic en él.
addForm.querySelector("button").addEventListener('click', function(e){

 // Previene la acción por defecto del botón para evitar que la página se recargue.
  e.preventDefault();
  

 // CREAR ELEMENTOS
  
  
  const value = addForm.querySelector('input[type="text"]').value; // Obtiene el valor del campo de entrada de texto en addForm, que representa el nombre del ejercicio.
  // Crea tres elementos HTML (<li>, <span> para el nombre del ejercicio, y otro <span> para el botón de eliminación).
  const li = document.createElement('li');
  const ExName = document.createElement('span');
  const deleteBtn = document.createElement('span');

// AGREGAR CONTENIDO DE TEXTO
  
  // Asigna el texto del ejercicio al span ExName y la palabra delete al botón deleteBtn.
  ExName.textContent = value;
  deleteBtn.textContent = 'delete';
  
// AGREGAR CLASES
  
  // Añade la clase 'name' a 'ExName' y 'delete' a 'deleteBtn' para estilización y referencia.
  ExName.classList.add('name');
  deleteBtn.classList.add('delete');


// AÑADIR AL DOM
  // Inserta 'ExName' y 'deleteBtn' dentro del 'li', y después añade este 'li' al final de list.
  li.appendChild(ExName);
  li.appendChild(deleteBtn);
  list.appendChild(li);
  });

// FILTRAR EJERCICIOS
// Selecciona el campo de entrada dentro del formulario search-ex para buscar ejercicios y lo guarda en searchBar.
const searchBar = document.forms['search-ex'].querySelector('input'); 

searchBar.addEventListener('keyup',(e)=>{
   
  const term = e.target.value.toLowerCase();
  
  const exercises = list.getElementsByTagName('li');
  
  Array.from(exercises).forEach(function (exer){ 
    
    const title = exer.firstElementChild.textContent;   
    
    if(title.toLowerCase().indexOf(term) == -1){ 
      exer.style.display = 'none';
     
    } else {
      exer.style.display = 'block';
    }
  });
});