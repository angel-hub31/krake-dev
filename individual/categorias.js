// El array 'categorias' debe estar definido en 'scripts.js' (asumido).
// Las funciones 'recuperarTexto', 'mostrarTexto', 'mostrarTextoEnCaja', 'mostrarTextoHTML'
// se asumen que vienen de 'utilitarios.js' (asumido).

// Función: agregar categoría
function agregarCategoria() {
  /*
      - Obtener datos desde inputs
      - Validar campos obligatorios y evitar duplicados
      - Agregar categoría a la lista
      - Limpiar campos y actualizar lista de categorías
    */

  // 1. Obtener datos desde inputs
  const nombre = recuperarTexto("nombreCategoria").trim();
  const descripcion = recuperarTexto("descripcionCategoria").trim();

  // Limpiar errores previos
  mostrarTexto("errorNombreCategoria", "");
  mostrarTexto("errorDescripcionCategoria", "");

  let esValido = true;

  // 2. Validar campos obligatorios y evitar duplicados

  // Validar Nombre obligatorio
  if (nombre === "") {
    mostrarTexto("errorNombreCategoria", "El nombre de la categoría es obligatorio.");
    esValido = false;
  }

  // Validar duplicados (insensible a mayúsculas/minúsculas)
  // Se asume la existencia del array global 'categorias'
  if (esValido) {
    const nombreNormalizado = nombre.toUpperCase();
    const categoriaExistente = categorias.find(cat => cat.nombre.toUpperCase() === nombreNormalizado);
    if (categoriaExistente) {
      mostrarTexto("errorNombreCategoria", `La categoría "${nombre}" ya existe.`);
      esValido = false;
    }
  }

  // Validar longitud de la descripción si no está vacía
  if (descripcion.length > 50) {
    mostrarTexto("errorDescripcionCategoria", "La descripción no debe exceder los 50 caracteres.");
    esValido = false;
  }

  // 3. Agregar categoría a la lista
  if (esValido) {
    const nuevaCategoria = {
      nombre: nombre,
      descripcion: descripcion
    };
    categorias.push(nuevaCategoria);

    // 4. Limpiar campos y actualizar lista de categorías
    mostrarTextoEnCaja("nombreCategoria", "");
    mostrarTextoEnCaja("descripcionCategoria", "");
    
    // Opcional: Mostrar mensaje de éxito temporal
    // mostrarTexto("errorNombreCategoria", "Categoría agregada con éxito!");

    mostrarCategorias(); // Actualiza la lista en la interfaz
  }
}

// Función: mostrar categorías
function mostrarCategorias() {
  /*
      - Recorrer la lista de categorías
      - Mostrar en lista HTML con botón para eliminar
    */
  
  let htmlLista = "<ul>"; // Añadido <ul> para mejor estructura

  // 1. Recorrer categorías y mostrar en lista HTML
  // Se asume la existencia del array global 'categorias'
  categorias.forEach((categoria, index) => {
    // 2. Agregar botón para eliminar categoría
    htmlLista += `
      <li class="categoria-item">
        <strong>${categoria.nombre}</strong> 
        ${categoria.descripcion ? `(${categoria.descripcion})` : ''} 
        <button type="button" onclick="eliminarCategoria(${index})">Eliminar</button>
      </li>
    `;
  });

  htmlLista += "</ul>"; // Cierre del <ul>

  // Mostrar el HTML en el elemento 'listaCategorias'
  mostrarTextoHTML("listaCategorias", htmlLista);
}


// Función: eliminar categoría
function eliminarCategoria(index) {
  /*
      - Confirmar con el usuario
      - Eliminar categoría de la lista
      - Actualizar lista en pantalla
    */

  // 1. Confirmar con el usuario
  if (confirm(`¿Estás seguro de que quieres eliminar la categoría "${categorias[index].nombre}"?`)) {
    // 2. Eliminar categoría de la lista
    categorias.splice(index, 1);

    // 3. Actualizar lista en pantalla
    mostrarCategorias();
  }
}

// Inicializar la vista de categorías al cargar el DOM
document.addEventListener('DOMContentLoaded', mostrarCategorias);