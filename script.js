// ==========================
// INICIALIZACIÓN Y SELECTORES
// ==========================
if (!localStorage.getItem('arbol')) {
  const raiz = { nombre: "/", tipo: "carpeta", contenido: {} };
  localStorage.setItem('arbol', JSON.stringify(raiz));
}
let arbol = JSON.parse(localStorage.getItem('arbol'));
const lista = document.querySelector('#ex-list ul');
const addForm = document.querySelector('#add-ex');
const addInput = addForm.querySelector('input[type="text"]');
const addButton = addForm.querySelector('button');
const searchBar = document.querySelector('#search-ex input');
const hideAllCheckbox = document.querySelector('#hide');

// Carpeta objetivo para la próxima creación (se selecciona al pulsar '+')
let carpetaDestinoParaAgregar = null;

// ==========================
// CLASE OBJETO Y UTILIDADES
// ==========================
class Objeto {
  constructor(nombre, tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
    if (tipo === 'carpeta') this.contenido = {}; // solo las carpetas tienen contenido
  }
}
function guardarArbol() { localStorage.setItem('arbol', JSON.stringify(arbol)); }
function esArchivo(nombre) {
  const extensiones = [
    '.txt', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
    '.jpg', '.jpeg', '.png', '.gif', '.mp3', '.mp4', '.avi', '.mov',
    '.zip', '.rar', '.html', '.css', '.js', '.php', '.py', '.java',
    '.c', '.cpp', '.htaccess'
  ];

  nombre = nombre.toLowerCase();

  for (let i = 0; i < extensiones.length; i++) {
    if (nombre.endsWith(extensiones[i])) {
      return true;
    }
  }
  return false;
}

/*
// ==========================
// EJEMPLO DE ESTRUCTURA DEL ÁRBOL
// ==========================
{
  nombre: "Carpeta raíz",
  tipo: "carpeta",
  contenido: {
    "Objeto1": {
      nombre: "objeto1",
      tipo: "carpeta",
      contenido: {
        "objeto2.txt": { 
          nombre: "informe.txt", 
          tipo: "archivo"
        }
      }
    },
    "imagen.png": {
      nombre: "imagen.png",
      tipo: "archivo"
    }
  }
}
*/



// ==========================
// RENDERIZADO DEL ÁRBOL
// ==========================
function mostrarArbolObjeto(objeto, contenedor) {
  contenedor.innerHTML = '';
  for (const nombre in objeto.contenido) {
    const item = objeto.contenido[nombre];
    const li = document.createElement('li');

    if (item.tipo === 'carpeta') {
      // Elementos de carpeta: checkbox, icono, nombre, +, X, ul hijo
      const check = document.createElement('input'); check.type = 'checkbox'; check.checked = true;
      const icon = document.createElement('img');
      icon.src = Object.keys(item.contenido).length ? '/imgs/filledFolder.png' : '/imgs/emptyFolder.png';                   //si la carpeta posee valor en contenido aparece con la imagen filled !: vacia
      const spanNombre = document.createElement('span'); spanNombre.classList.add('nombre'); spanNombre.textContent = nombre;
      const addBtn = document.createElement('span'); addBtn.classList.add('add'); addBtn.textContent = '+';
      const delBtn = document.createElement('span'); delBtn.classList.add('delete'); delBtn.textContent = 'X';
      const subUl = document.createElement('ul');

      // Eventos
      check.addEventListener('change', () => { subUl.style.display = check.checked ? 'block' : 'none'; });
      addBtn.addEventListener('click', () => {
        carpetaDestinoParaAgregar = item; // guardamos referencia al objeto carpeta
        addInput.focus();
        addInput.placeholder = `Agregar en: ${getRutaDelObjeto(item) || '/'}`; // actualizar placeholder a la ruta
      });
      delBtn.addEventListener('click', () => eliminarElemento(objeto, nombre));

      // Montaje y recursión
      li.append(icon, check, spanNombre, addBtn, delBtn, subUl);
      contenedor.appendChild(li);
      mostrarArbolObjeto(item, subUl);

    } else {
      // Elementos archivo: icono, nombre, X
      const icon = document.createElement('img'); icon.src = '/imgs/file.png';
      const spanNombre = document.createElement('span'); spanNombre.classList.add('nombre'); spanNombre.textContent = nombre;
      const delBtn = document.createElement('span'); delBtn.classList.add('delete'); delBtn.textContent = 'X';
      delBtn.addEventListener('click', () => eliminarElemento(objeto, nombre));
      li.append(icon, spanNombre, delBtn);
      contenedor.appendChild(li);
    }
  }
   console.log(`[CARGAR] Refrescamos carpetas desde localStorage`);
}

// Auxiliar: obtener "ruta" textual (solo para placeholder) recorriendo árbol (por referencia)
function getRutaDelObjeto(targetObjeto) {
  // Búsqueda "Depth-First Search" para reconstruir ruta desde raíz; devuelve ruta tipo "/A/B"
  if (targetObjeto === arbol) return '/';
  const path = [];
  let found = false;
  function dfs(node, rutaAcum) {
    if (found) return;
    for (const key in node.contenido) { //por cada hijo de la carpeta actual
      const child = node.contenido[key];
      if (child === targetObjeto) {     //comprobar si es el objeto buscado
        path.push(key);
        found = true;
        return;
      }
      if (child.tipo === 'carpeta') {  //si es carpeta, seguir buscando
        dfs(child, rutaAcum + '/' + key);
        if (found) { path.unshift(key); return; }
      }
    }
  }
  dfs(arbol, '');
  return path.length ? '/' + path.join('/') : '';
}

// ==========================
// AÑADIR Y BORRAR ELEMENTOS
// ==========================
function agregarDesdeFormulario(e) {
  e.preventDefault();
  const nombre = addInput.value.trim(); 
  if (!nombre) { alert('Introduce un nombre.'); return; } // control nombre vacío
  const destino = carpetaDestinoParaAgregar || arbol; // si no se seleccionó carpeta, añade en raíz
  if (destino.contenido[nombre]) { alert('Ya existe ese nombre en la carpeta destino.'); return; } // control duplicados
  const tipo = esArchivo(nombre) ? 'file' : 'carpeta';
  destino.contenido[nombre] = new Objeto(nombre, tipo);
  guardarArbol();
  console.log(`[CREAR] ${tipo} "${nombre}" en "${getRutaDelObjeto(destino) || '/'}"`);
  carpetaDestinoParaAgregar = null;
  addInput.value = '';
  addInput.placeholder = 'Agregar un Ejercicio...'; //devolver placeholder original
  mostrarArbol();
}
function eliminarElemento(padreObjeto, nombre) {
  const elem = padreObjeto.contenido[nombre];
  if (!elem) return;
  if (elem.tipo === 'carpeta' && Object.keys(elem.contenido).length > 0) {
    alert('No se puede eliminar una carpeta con contenido.');
    return;
  }
  delete padreObjeto.contenido[nombre];
  guardarArbol();
  console.log(`[ELIMINAR] ${elem.tipo} "${nombre}" de "${getRutaDelObjeto(padreObjeto) || '/'}"`);
  mostrarArbol();
}

// ==========================
// FILTRADO + VISIBILIDAD DE ANCESTROS
// ==========================
function filtrarArbol(term) {
  term = term.trim().toLowerCase();
  // Recorremos DOM y aplicamos visibilidad: si un li tiene nombre que coincide o alguno de sus descendientes coincide => mostrarlo.
  document.querySelectorAll('#ex-list li').forEach(li => {
    const nombreSpan = li.querySelector('.nombre');
    const nombre = nombreSpan ? nombreSpan.textContent.toLowerCase() : '';
    if (!term) {
      li.style.display = 'block';
      return;
    }
    // si este Objeto coincide
    if (nombre.includes(term)) {
      li.style.display = 'block';
      // mostrar ancestros
      let p = li.parentElement;
      while (p && p.id !== 'ex-list') { if (p.tagName.toLowerCase() === 'li') p.style.display = 'block'; p = p.parentElement; }
    } else {
      // si alguno de sus descendants coincide (comprobación sencilla: búsqueda en subtree text)
      const subtreeText = li.textContent.toLowerCase();
      li.style.display = subtreeText.includes(term) ? 'block' : 'none';
    }
  });
}

// ==========================
// EVENTOS GLOBALES (teclado/ratón)
// ==========================
addForm.addEventListener('submit', agregarDesdeFormulario);
addInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { carpetaDestinoParaAgregar = null; addInput.placeholder = 'Agregar un Ejercicio...'; addInput.value = ''; }
});
searchBar.addEventListener('keyup', (e) => filtrarArbol(e.target.value));
hideAllCheckbox.addEventListener('change', () => {
  lista.style.display = hideAllCheckbox.checked ? 'none' : 'initial';
});

// Re-mostrar al principio
function mostrarArbol() { mostrarArbolObjeto(arbol, lista); }
mostrarArbol();
