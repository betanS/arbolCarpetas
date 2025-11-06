//INICIALIZACION
//localStorage.clear();
sessionStorage.setItem("ruta", "/");
var ruta = sessionStorage.getItem("ruta");
mostrarCarpetas(ruta);




//OBJETOS + CONSTRUCTOR           Podria ser innecesario si archivos ya guardara nombre y tipo por bloque
class objeto{
  constructor(nombre, tipo, ruta){
    this.nombre = nombre;
    this.tipo = tipo;
    //this.ruta = ruta;             //No hace falta si guardamos por ruta
  }
}

//RECUPERAR CARPETAS GUARDADAS  
function mostrarCarpetas(ruta) {
  const list = document.querySelector('#ex-list ul'); // Selecciona el elemento 'ul' dentro del contenedor ''#ex-list' y lo asigna a list, donde se listarán los ejercicios.
  list.innerHTML = ""; // Limpia la lista de ejercicios antes de mostrar las carpetas de la nueva ruta.
  var objetosEnRuta = JSON.parse(localStorage.getItem(ruta));
  
  const titulo = document.querySelector('#ex-list h2');
  titulo.textContent = "Contenido de: " + ruta;
  if(ruta != "/"){
    const backLi = document.createElement('li');
    const backSpan = document.createElement('span');
    const backbutton = document.createElement('button');

    backbutton.textContent = "Volver";
    backbutton.addEventListener('click', function(){
      var rutaArray = ruta.split("/");
      rutaArray.pop(); // Elimina el último elemento vacío después de la última barra
      rutaArray.pop(); // Elimina el nombre de la carpeta actual
      var nuevaruta = rutaArray.join("/") + "/";
      if (nuevaruta == "//"){
        nuevaruta = "/";
      }
      sessionStorage.setItem("ruta", nuevaruta);
      ruta = sessionStorage.getItem("ruta");
      mostrarCarpetas(ruta);
      console.log("Ruta actual: " + ruta);
    });
    backSpan.appendChild(backbutton);
    backLi.appendChild(backSpan);
    list.appendChild(backLi);
  }

if(objetosEnRuta != null){  
  for (let index = 0; index < objetosEnRuta.length; index++) {  //FOR EACH (objetosEnRuta where [i].tipo == "carpeta" mostrarCarpetas([i].ruta)  else mostrar file)


  const value = objetosEnRuta[index].nombre; //nombre del archivo o carpeta
  const tipo = objetosEnRuta[index].tipo; //tipo: carpeta o file

  
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
  if (tipo != "carpeta"){
    img.setAttribute('src', '/imgs/file.png');
  }else if(localStorage.getItem(ruta + value + "/") != null){
    img.setAttribute('src', '/imgs/filledFolder.png');
    li.classList.add('carpeta');
  } else{
  img.setAttribute('src', '/imgs/emptyFolder.png');
  li.classList.add('carpeta');
  }

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

const botonCarpeta = list.querySelectorAll('#carpeta'); // Selecciona el botón con el id 'carpeta' y lo guarda en botonCarpeta.



// BORRAR EJERCICIOS

// Añade un evento 'click' al elemento 'list' que se ejecutará cada vez que se haga clic en él.
list.addEventListener('click', function(e) {
  const value = addForm.querySelector('input[type="text"]').value; // Obtiene el valor del campo de entrada de texto en addForm, que representa el nombre del ejercicio.
  // Verifica si el elemento clicado tiene la clase 'delete', que indica que se ha clicado el botón para eliminar.
  if(e.target.className == 'delete'){
    var test = e.target.previousElementSibling.innerHTML; // Obtiene el nombre del ejercicio a eliminar desde el elemento hermano anterior al botón de eliminación.
    const li = e.target.parentElement; // Selecciona el elemento 'li' padre del botón de eliminación, que es el elemento de la lista a eliminar. 
    borrar(ruta, test)   
    li.parentNode.removeChild(li); // Elimina el elemento 'li' del DOM
  }
  //AGREGAR A CARPETA ESPECIFICA
  else if (e.target.className == 'add'){
    var tipo = "";
    if (isFile(value)){
      console.log("Es un archivo");
      tipo = "file";
    }else{
      console.log("Es una carpeta");
      tipo = "carpeta";
    }
  
    var nuevoArchivo = new objeto(value, tipo);

    guardar(ruta+test+"/", nuevoArchivo);
  }

  else if (e.target.className == 'carpeta'){
    var nombre = e.target.querySelector('.name').innerHTML;
    console.log("Carpeta clicada: " + nombre);
    list.innerHTML = ""; // Limpia la lista de ejercicios antes de mostrar las carpetas de la nueva ruta.
    var nuevaruta = ruta + nombre + "/"; 
    sessionStorage.setItem("ruta", nuevaruta);
    ruta = sessionStorage.getItem("ruta");
    mostrarCarpetas(ruta);
    console.log("Ruta actual: " + ruta);
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
  var tipo = "";
  if (isFile(value)){
    console.log("Es un archivo");
    tipo = "file";
  }else{
    console.log("Es una carpeta");
    tipo = "carpeta";
  }
  
  var nuevoArchivo = new objeto(value, tipo);

  guardar(ruta, nuevoArchivo);/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  mostrarCarpetas(ruta);
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




//STORAGE FUNCTIONS
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
function isFile(nombre) {
    const extensiones = ['.txt', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.jpg', '.jpeg', '.png', '.gif', '.mp3', '.mp4', '.avi', '.mov', '.zip', '.rar', '.html', '.css', '.js', '.php', '.py', '.java', '.c', '.cpp', '.htaccess'];
    extensiones.forEach(ext => {
      if(nombre.toLowerCase().endsWith(ext)){
        return true;;
      }else{
        return false;
      }
    });
}