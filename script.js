recuperarCarpetas("/");
//localStorage.clear();



//RECUPERAR CARPETAS GUARDADAS
function recuperarCarpetas(ruta) {
  var ruta = ruta;
  var objetosEnRuta = JSON.parse(localStorage.getItem(ruta));
console.log(objetosEnRuta);
  
if(objetosEnRuta != null){
  for (let index = 0; index < objetosEnRuta.length; index++) {
    const list = document.querySelector('#ex-list ul'); // Selecciona el elemento 'ul' dentro del contenedor ''#ex-list' y lo asigna a list, donde se listarán los ejercicios.


  const value = objetosEnRuta[index]; 
  const li = document.createElement('li');
  const ExName = document.createElement('span');
  const addBtn = document.createElement('span');
  const deleteBtn = document.createElement('span');
  const img = document.createElement('img');

  ExName.textContent = value;
  deleteBtn.textContent = 'delete';
  addBtn.textContent = '+';
  
  ExName.classList.add('name');
  addBtn.classList.add('add');
  deleteBtn.classList.add('delete');
  img.setAttribute('src', '/imgs/emptyFolder.png');

  li.appendChild(img);
  li.appendChild(ExName);
  li.appendChild(addBtn);
  li.appendChild(deleteBtn);
  list.appendChild(li);
  
}
}
}




// DEFINICIÓN DE FORMULARIOS Y LISTA

const searchForm=document.forms[0]; // Accede al primer formulario en el documento (índice [0]) y lo almacena en 'searchForm'.

const addForm=document.forms["add-ex"]; // Accede al formulario con el nombre add-ex y lo guarda en addForm.

const list = document.querySelector('#ex-list ul'); // Selecciona el elemento 'ul' dentro del contenedor ''#ex-list' y lo asigna a list, donde se listarán los ejercicios.




// BORRAR EJERCICIOS

// Añade un evento 'click' al elemento 'list' que se ejecutará cada vez que se haga clic en él.
list.addEventListener('click', function(e) {
  const value = addForm.querySelector('input[type="text"]').value; // Obtiene el valor del campo de entrada de texto en addForm, que representa el nombre del ejercicio.
  var test = e.target.previousElementSibling.innerHTML;
  // Verifica si el elemento clicado tiene la clase 'delete', que indica que se ha clicado el botón para eliminar.
  if(e.target.className == 'delete'){
    const li = e.target.parentElement; // Selecciona el elemento 'li' padre del botón de eliminación, que es el elemento de la lista a eliminar. 
    borrar(ruta, test)   
    li.parentNode.removeChild(li); // Elimina el elemento 'li' del DOM
  }
  //AGREGAR A CARPETA ESPECIFICA
  if (e.target.className == 'add'){
    guardar(ruta+test+"/", value);
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


  e.preventDefault();
  
  
  const value = addForm.querySelector('input[type="text"]').value;
  guardar(ruta, value);/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  recuperarCarpetas(ruta);
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






function guardar(ruta, archivo) {
  console.log(ruta);
  var objetosEnRuta = JSON.parse(localStorage.getItem(ruta));
  if(objetosEnRuta == null){
    objetosEnRuta = [];
  }
  objetosEnRuta.push(archivo);
  localStorage.setItem(ruta, JSON.stringify(objetosEnRuta));
  console.log(ruta + archivo + " guardado correctamente.");
}

function borrar (ruta, archivo){
  var objetosEnRuta = JSON.parse(localStorage.getItem(ruta));
  console.log(objetosEnRuta);
  console.log(objetosEnRuta.indexOf(archivo) );
  if(objetosEnRuta.indexOf(archivo) != -1){
    objetosEnRuta.splice(objetosEnRuta.indexOf(archivo), 1);
    localStorage.setItem(ruta, JSON.stringify(objetosEnRuta));
    console.log(ruta + archivo + " borrado correctamente.");
  }
  else{
    console.log("No existe el archivo " + archivo);
  }
}
