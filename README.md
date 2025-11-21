## Enunciado

Crea un **ÁRBOL DE DIRECTORIOS** usando una lista de elementos correspondientes a **CARPETAS, SUBCARPETAS y ARCHIVOS** (que deben tener extensión), e incluye al menos un **FORMULARIO en HTML**.

El flujo de la aplicación será el siguiente:

1. Inicialmente solo existe la carpeta raíz `/`, que **no se puede borrar**.

2. Cada **carpeta** tendrá:  
   - Un símbolo "+" a su derecha para agregar un nuevo archivo o subcarpeta.  
   - Un símbolo "X" a su izquierda para eliminarla, si está vacía.  
   - Una **casilla de verificación** al lado del símbolo "+" que, si está marcada, muestra el contenido de la carpeta; si está desmarcada, lo oculta.

3. Cada **archivo** tendrá solo un "X" para borrarlo.

4. Los **nuevos archivos o carpetas** obtendrán su nombre de un cuadro de entrada en el formulario.  
   - Si ya existe un elemento con ese nombre, no se creará.

5. Se podrá filtrar los elementos mediante otro cuadro de entrada en el formulario (o formulario diferente), mostrando solo los elementos que coincidan con el nombre ingresado y ocultando el resto.

6. La aplicación deberá utilizar **keyboard y mouse event listeners**.  
   - Opcionalmente, al presionar la tecla **TAB** dentro del cuadro de búsqueda, si hay una **única coincidencia**, se completará automáticamente el nombre del archivo o carpeta buscado.

7. Se debe implementar la gestión del DOM usando métodos como `appendChild`, `setAttribute`, y **query selectors exclusivamente**.

---

## Evaluación

| Criterio | Valoración |
|---------|------------|
| Sangrado y comentarios correctos. Nombres de variables en camelCase significativos, comentarios, mensajes y menús | Pendiente |
| Robustez (sin errores en el funcionamiento de la aplicación) | Pendiente |
| Filtrado correcto de nombres | Pendiente |
| Código optimizado (funciones modulares, sin instrucciones repetidas) | Pendiente |
| Utilización de objetos definidos por el usuario | Pendiente |
| Correcta gestión de las cadenas de caracteres | Pendiente |
| Uso de métodos explicados (`appendChild`, `setAttribute`, etc.) | Pendiente |
| Uso exclusivo de query selectors | Pendiente |
| Uso de keyboard y mouse event listeners | Pendiente |
| Funciones opcionales (autocompletar) | Pendiente |
