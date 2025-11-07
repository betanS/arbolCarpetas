//INICIALIZACION
//localStorage.clear();
sessionStorage.setItem("ruta", "/");
var ruta = sessionStorage.getItem("ruta");


//OBJETOS + CONSTRUCTOR          
class objeto{
  constructor(nombre, tipo){
    this.nombre = nombre;
    this.tipo = tipo;           
  }
}

//FUNCIONES
function mostrarArchivos(ruta){
  const lista = document.querySelector('ex-list');
  const uls = lista.getElementByClassName("uls");






function guardarRutas(ruta, archivo) {
  localStorage.setItem(ruta, archivo.nombre);
}
function obtenerArchivos(nombre){
  return localStorage.getItem(nombre);
}
function eliminarArchivos(nombre){
  localStorage.removeItem(nombre);
}
function eliminarArchivoDeRuta(nombre){
  localStorage.removeItem(ruta, nombre);
}