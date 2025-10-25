// ====================================================================
// BASES DE DATOS (ARRAYS GLOBALES)
// Las siguientes estructuras de datos simulan el estado de un sistema de E-commerce.
// ====================================================================

// Lista base de productos
const productos = [
    { // Inicio del objeto producto 1
        nombre: "Camisa", // Nombre del producto (clave para búsqueda y actualización)
        descripcion: "Camisa blanca de algodón", // Descripción detallada del producto
        categoria: "Ropa", // Categoría a la que pertenece (clave externa a 'categorias')
        precio: 25.99, // Precio unitario (valor numérico flotante)
        stock: 50, // Cantidad disponible en inventario (valor numérico entero)
    }, // Fin del objeto producto 1
    { // Inicio del objeto producto 2
        nombre: "Pantalón",
        descripcion: "Pantalón azul jeans",
        categoria: "Ropa",
        precio: 40.0,
        stock: 30,
    }, // Fin del objeto producto 2
    { // Inicio del objeto producto 3
        nombre: "Zapatos",
        descripcion: "Zapatos deportivos",
        categoria: "Calzado",
        precio: 60.5,
        stock: 20,
    }, // Fin del objeto producto 3
]; // Fin del array de productos

// Lista base de categorías (Se utiliza en la sección de Gestión de Categorías)
const categorias = [
    { nombre: "Ropa", descripcion: "Prendas de vestir" }, // Objeto categoría 1
    { nombre: "Calzado", descripcion: "Zapatos, sandalias y más" }, // Objeto categoría 2
]; // Fin del array de categorías

// Carrito de compras actual (productos seleccionados por el cliente)
const carrito = [
    { nombre: "Camisa", cantidad: 2, precio: 25.99 }, // Item 1 en el carrito (nombre, cantidad, precio unitario al añadir)
    { nombre: "Zapatos", cantidad: 1, precio: 60.5 }, // Item 2 en el carrito
]; // Fin del array carrito

// Registro histórico de ventas finalizadas
const ventas = [
    { // Inicio del objeto venta 1
        cliente: { // Datos del cliente que realizó la compra
            nombre: "Juan Pérez",
            email: "juan.perez@example.com",
            telefono: "0991234567",
            direccion: "Av. Siempre Viva 123",
        },
        productosComprados: [ // Detalle de los productos vendidos en esta transacción
            { nombre: "Camisa", cantidad: 2, precio: 25.99 },
            { nombre: "Pantalón", cantidad: 1, precio: 40.0 }
        ],
        total: 91.98, // Total pagado por la compra
        fecha: new Date().toLocaleDateString(), // Fecha de la venta
    }, // Fin del objeto venta 1
    { // Inicio del objeto venta 2
        cliente: {
            nombre: "María López",
            email: "maria.lopez@example.com",
            telefono: "0987654321",
            direccion: "Calle Falsa 456",
        },
        productosComprados: [ // Detalle de los productos vendidos en esta transacción
            { nombre: "Zapatos", cantidad: 1, precio: 60.5 }
        ],
        total: 60.5,
        fecha: new Date().toLocaleDateString(),
    }, // Fin del objeto venta 2
]; // Fin del array ventas

// Objeto temporal para guardar los datos del cliente durante el proceso de compra
let clienteDatos = {};


// ====================================================================
// FUNCIONES DE VALIDACIÓN
// Conjunto de funciones para asegurar que los datos ingresados cumplen con ciertos criterios.
// ====================================================================

/**
 * Valida un nombre de producto o cliente: no vacío, solo letras/espacios, primera mayúscula.
 * @param {string} nombre El texto a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarNombre(nombre) {
    if (!nombre || nombre.trim() === "") { // Verifica si el campo está vacío o solo contiene espacios
        return { error: "El nombre no puede quedar vacío.", valido: false }; // Retorna error si está vacío
    }
    const nombreLimpio = nombre.trim(); // Elimina espacios al inicio y final
    if (!/^[a-zA-Z\s]+$/.test(nombreLimpio)) { // Regex: verifica que solo haya letras (mayús/minús) y espacios
        return { error: "El nombre debe contener solo letras y espacios.", valido: false }; // Retorna error si contiene otros caracteres
    }

    const primeraLetra = nombreLimpio.charAt(0); // Obtiene el primer carácter
    // Asume que la función esMayuscula existe en utilitarios.js (o está definida arriba)
    if (!esMayuscula(primeraLetra)) { // Verifica si la primera letra es mayúscula (función simulada/externa)
        return { error: "La primera letra debe ser mayúscula.", valido: false }; // Retorna error si no es mayúscula
    }

    // Formatea el nombre: Primera mayúscula, resto minúsculas.
    const nombreFormateado = primeraLetra.toUpperCase() + nombreLimpio.slice(1).toLowerCase(); // Formatea la cadena

    return { error: "", valido: true, valor: nombreFormateado }; // Retorna éxito y el valor formateado
}

/**
 * Valida una descripción: no vacía, solo letras/espacios/números/puntuación básica, primera mayúscula.
 * @param {string} descripcion El texto a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarDescripcion(descripcion) {
    if (!descripcion || descripcion.trim() === "") { // Verifica si está vacío
        return { error: "La descripción no puede quedar vacía.", valido: false };
    }
    const descripcionLimpio = descripcion.trim();
    // Permite letras, espacios, números y puntuación básica (puntos, comas)
    if (!/^[a-zA-Z0-9\s.,]+$/.test(descripcionLimpio)) { 
         return { error: "La descripción debe contener letras, números y espacios/puntuación básica.", valido: false }; // Retorna error por caracteres inválidos
    }

    const primeraLetra = descripcionLimpio.charAt(0);
    if (!esMayuscula(primeraLetra)) { // Verifica si la primera letra es mayúscula
        return { error: "La primera letra debe ser mayúscula.", valido: false };
    }

    const descripcionFormateado = primeraLetra.toUpperCase() + descripcionLimpio.slice(1); // Formatea: Primera mayúscula, mantiene el resto de mayús/minús
    
    return { error: "", valido: true, valor: descripcionFormateado };
}

/**
 * Valida una categoría: no vacía, solo letras/espacios, primera mayúscula.
 * @param {string} categoria El texto a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarCategoria(categoria) {
    if (!categoria || categoria.trim() === "") { // Verifica si está vacío
        return { error: "La categoría es obligatoria.", valido: false };
    }
    const categoriaLimpia = categoria.trim();
    if (!/^[a-zA-Z\s]+$/.test(categoriaLimpia)) { // Regex: solo letras y espacios
        return { error: "La categoría debe tener formato válido (solo letras y espacios).", valido: false };
    }

    const primeraLetra = categoriaLimpia.charAt(0);
    if (!esMayuscula(primeraLetra)) { // Verifica si la primera letra es mayúscula
        return { error: "La primera letra de la categoría debe ser mayúscula.", valido: false };
    }

    // Formatea: Primera mayúscula, resto minúsculas (ej: "ROpA" -> "Ropa")
    const categoriaFormateada = primeraLetra.toUpperCase() + categoriaLimpia.slice(1).toLowerCase(); 

    return { error: "", valido: true, valor: categoriaFormateada };
}


/**
 * Valida el nombre de una categoría (similar a validarCategoria).
 * @param {string} nombre El texto a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarNomCategoria(nombre) { 
    return validarCategoria(nombre); // Reutiliza la lógica de validación de categoría
}

/**
 * Valida la descripción de una categoría (similar a validarDescripcion pero con el mensaje específico).
 * @param {string} descripcion El texto a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarDescripCategoria(descripcion) {
    // Verifica que la descripción de la categoría no esté vacía.
    if (!descripcion || descripcion.trim() === "") {
        return { error: "La descripción de la categoría es obligatoria.", valido: false };
    }
    const descripcionLimpia = descripcion.trim();
    // Verifica que solo contenga letras y espacios y puntuación básica
    if (!/^[a-zA-Z0-9\s.,]+$/.test(descripcionLimpia)) {
        return { error: "La descripción debe tener formato válido (letras, números, espacios).", valido: false };
    }

    const primeraLetra = descripcionLimpia.charAt(0);
    if (!esMayuscula(primeraLetra)) {
        return { error: "La primera letra de la descripción debe ser mayúscula.", valido: false };
    }

    // Formatea la categoría: Primera mayúscula, resto sin forzar minúsculas.
    const descripcionFormateada = primeraLetra.toUpperCase() + descripcionLimpia.slice(1);

    return { error: "", valido: true, valor: descripcionFormateada };
}


/**
 * Valida el stock: número entero, no negativo.
 * @param {string} stockTexto El texto del stock a validar.
 * @returns {{error: string, valido: boolean, valor?: number}} Resultado de la validación.
 */
function validarStock(stockTexto) {
    const stock = parseInt(stockTexto, 10); // Intenta convertir el texto a entero
    // Verifica si no es un número, no es entero o es negativo
    if (isNaN(stock) || !Number.isInteger(stock) || stock < 0) { 
        return { error: "Ingrese un stock válido (entero, 0 o más).", valido: false }; // Retorna error
    }
    return { error: "", valido: true, valor: stock }; // Retorna éxito con el valor numérico
}

/**
 * Valida el precio: número flotante, no negativo, se redondea a 2 decimales.
 * @param {string} precioTexto El texto del precio a validar.
 * @returns {{error: string, valido: boolean, valor?: number}} Resultado de la validación.
 */
function validarPrecio(precioTexto) {
    const precio = parseFloat(precioTexto); // Intenta convertir el texto a flotante
    if (isNaN(precio) || precio < 0) { // Verifica si no es un número o es negativo
        return { error: "Ingrese un precio válido mayor o igual a cero.", valido: false };
    }
    // Retorna el precio redondeado a dos decimales.
    return { error: "", valido: true, valor: parseFloat(precio.toFixed(2)) }; // Redondea a 2 decimales y retorna
}

/**
 * Valida el formato de email.
 * @param {string} email El email a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarEmail(email) {
    if (!email || email.trim() === "") { // Verifica si está vacío
        return { error: "El correo electrónico es obligatorio.", valido: false };
    }
    // Regex estándar para formato de email (ej: usuario@dominio.com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email.trim())) { // Comprueba si el email cumple el formato
        return { error: "Formato de correo electrónico inválido (ej: usuario@dominio.com).", valido: false }; // Retorna error de formato
    }
    return { error: "", valido: true, valor: email.trim() }; // Retorna éxito y el email limpio
}

/**
 * Valida el teléfono: solo dígitos, 7 a 15 caracteres.
 * @param {string} telefono El teléfono a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarTelefono(telefono) {
    if (!telefono || telefono.trim() === "") { // Verifica si está vacío
        return { error: "El teléfono es obligatorio.", valido: false };
    }
    const telefonoLimpio = telefono.replace(/[\s-()]/g, ''); // Remueve espacios, guiones y paréntesis para la validación
    // Verifica que sean solo dígitos y tenga entre 7 y 15 caracteres.
    if (!/^\d{7,15}$/g.test(telefonoLimpio)) { 
        return { error: "Teléfono inválido (solo dígitos, 7-15 caracteres).", valido: false }; // Retorna error de longitud o caracteres
    }
    return { error: "", valido: true, valor: telefonoLimpio }; // Retorna éxito con el teléfono limpio
}

/**
 * Valida la dirección: no vacía, mínimo 5 caracteres.
 * @param {string} direccion La dirección a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarDireccion(direccion) {
    if (!direccion || direccion.trim() === "") { // Verifica si está vacío
        return { error: "La dirección es obligatoria.", valido: false };
    }
    if (direccion.trim().length < 5) { // Verifica la longitud mínima
        return { error: "La dirección debe tener al menos 5 caracteres.", valido: false }; // Retorna error de longitud
    }
    return { error: "", valido: true, valor: direccion.trim() }; // Retorna éxito con la dirección limpia
}


// ====================================================================
// CRUD PRODUCTOS (Sección 1)
// Funciones para Crear, Leer, Actualizar y Eliminar productos del inventario.
// ====================================================================

/**
 * Limpia los inputs y mensajes de error del formulario de producto.
 */
function limpiarCamposProducto() {
    mostrarTextoEnCaja("txtNombre", ""); // Limpia el input del nombre (asume función DOM)
    mostrarTextoEnCaja("txtDescripcion", ""); // Limpia el input de la descripción
    mostrarTextoEnCaja("txtCategoria", ""); // Limpia el input de la categoría
    mostrarTextoEnCaja("txtPrecio", ""); // Limpia el input del precio
    mostrarTextoEnCaja("txtStock", ""); // Limpia el input del stock

    mostrarTexto("lblErrorNombre", ""); // Limpia el label de error del nombre (asume función DOM)
    mostrarTexto("lblErrorDescripcion", ""); // Limpia el label de error de la descripción
    mostrarTexto("lblErrorCategoria", ""); // Limpia el label de error de la categoría
    mostrarTexto("lblErrorPrecio", ""); // Limpia el label de error del precio
    mostrarTexto("lblErrorStock", ""); // Limpia el label de error del stock
}

/**
 * Agrega un nuevo producto o actualiza uno existente.
 */
function agregarProducto() {
    let esValido = true; // Flag de validación general

    // 1. Obtener datos (asume función DOM para obtener valores de inputs)
    const nombreTexto = recuperarTexto("txtNombre");
    const descripcionTexto = recuperarTexto("txtDescripcion");
    const categoriaTexto = recuperarTexto("txtCategoria");
    const precioTexto = recuperarTexto("txtPrecio");
    const stockTexto = recuperarTexto("txtStock");

    // 2. Validar campos
    const valNombre = validarNombre(nombreTexto);
    const valDescripcion = validarDescripcion(descripcionTexto);
    const valCategoria = validarCategoria(categoriaTexto);
    const valPrecio = validarPrecio(precioTexto);
    const valStock = validarStock(stockTexto);

    // 3. Mostrar errores (asume función DOM para mostrar texto en labels de error)
    mostrarTexto("lblErrorNombre", valNombre.error);
    mostrarTexto("lblErrorDescripcion", valDescripcion.error);
    mostrarTexto("lblErrorCategoria", valCategoria.error);
    mostrarTexto("lblErrorPrecio", valPrecio.error);
    mostrarTexto("lblErrorStock", valStock.error);

    // 4. Verificar validez general
    if (!valNombre.valido || !valDescripcion.valido || !valCategoria.valido || !valPrecio.valido || !valStock.valido) {
        esValido = false; // Si alguna validación falla, marca como inválido
    }

    if (esValido) { // Si todos los campos son válidos
        const nuevoProducto = { // Crea el objeto producto con los valores validados
            nombre: valNombre.valor,
            descripcion: valDescripcion.valor,
            categoria: valCategoria.valor,
            precio: valPrecio.valor,
            stock: valStock.valor,
        };

        // Buscar si el producto ya existe (por nombre)
        const indiceExistente = productos.findIndex(p => p.nombre === nuevoProducto.nombre); // Busca el índice

        if (indiceExistente !== -1) {
            // Actualizar producto si ya existe
            productos[indiceExistente] = nuevoProducto; // Reemplaza el objeto existente
            alert("Producto actualizado exitosamente.");
        } else {
            // Agregar nuevo producto si no existe
            productos.push(nuevoProducto); // Añade al array global
            alert("Producto agregado exitosamente.");
        }

        // 5. Limpiar campos y actualizar vistas 
        limpiarCamposProducto();
        mostrarProductos(); // Vuelve a renderizar la tabla de productos
        actualizarEstadisticasProductos(); // Actualiza los totales de inventario
    }
}

/**
 * Genera y muestra la tabla de productos.
 */
function mostrarProductos() {
    const IVA = 0.12; // Tasa de Impuesto al Valor Agregado
    let htmlTabla = `
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Categoría</th>
                    <th>Precio ($)</th>
                    <th>Stock</th>
                    <th>Precio con IVA ($)</th>
                </tr>
            </thead>
            <tbody>
    `; // Estructura inicial de la tabla

    productos.forEach(producto => { // Itera sobre el array de productos
        const precioConIVA = producto.precio * (1 + IVA); // Calcula el precio final con IVA
        htmlTabla += ` // Concatena una fila de tabla por cada producto
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.categoria}</td>
                <td>${producto.precio.toFixed(2)}</td> // Muestra el precio con 2 decimales
                <td>${producto.stock}</td>
                <td>${precioConIVA.toFixed(2)}</td> // Muestra el precio con IVA con 2 decimales
            </tr>
        `;
    });

    htmlTabla += `
            </tbody>
        </table>
    `; // Cierre de la tabla

    mostrarTextoHTML("tablaProductos", htmlTabla); // Muestra la tabla en el elemento del DOM (asume función DOM)

    if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles(); // Llama a la función de la sección 3 si existe
}

/**
 * Elimina un producto por nombre.
 */
function eliminarProducto() {

    const nombreAEliminar = recuperarTexto("txtEliminar"); // Obtiene el nombre del input
    mostrarTexto("lblEliminar", ""); // Limpia el mensaje de error anterior

    if (!nombreAEliminar || nombreAEliminar.trim() === "") {
        mostrarTexto("lblEliminar", "El nombre a eliminar no puede estar vacío.");
        return; // Termina la función si el campo está vacío
    }

    // Busca el índice del producto por nombre exacto (formateado)
    // Intenta formatear el nombre para buscar, si falla, usa el texto limpio
    const nombreLimpio = validarNombre(nombreAEliminar).valor || nombreAEliminar.trim(); 
    const indice = productos.findIndex(p => p.nombre === nombreLimpio); // Encuentra el índice

    if (indice !== -1) { // Si el producto fue encontrado
        if (confirm(`¿Está seguro de que desea eliminar el producto "${productos[indice].nombre}"?`)) { // Pide confirmación
            productos.splice(indice, 1); // Elimina 1 elemento en la posición del índice
            mostrarTextoEnCaja("txtEliminar", "");
            mostrarProductos(); // Actualiza la tabla de productos
            actualizarEstadisticasProductos(); // Actualiza las estadísticas
            if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles(); // Actualiza lista del carrito
            alert("Producto eliminado exitosamente.");
        }
    } else {
        mostrarTexto("lblEliminar", `No se encontró producto con el nombre: "${nombreAEliminar.trim()}".`); // Muestra error si no lo encuentra
    }
}

/**
 * Calcula y muestra el total de productos, stock y valor de inventario.
 */
function actualizarEstadisticasProductos() {

    let totalProductos = productos.length; // Cantidad total de productos únicos
    let stockTotal = 0; // Inicializa el contador de stock
    let valorInventario = 0; // Inicializa el valor monetario del inventario

    productos.forEach(producto => { // Itera sobre cada producto
        stockTotal += producto.stock; // Suma el stock de cada producto
        valorInventario += producto.precio * producto.stock; // Calcula (precio * stock) y suma al total
    });

    mostrarTexto("totalProductos", totalProductos); // Muestra la cantidad de productos únicos
    mostrarTexto("stockTotal", stockTotal); // Muestra el total de unidades en stock
    mostrarTexto("valorInventario", valorInventario.toFixed(2)); // Muestra el valor total con 2 decimales
}

/**
 * Inicializa la vista de la sección de productos.
 */
function inicializarVistaProductos() {
    mostrarProductos(); // Renderiza la tabla de productos
    actualizarEstadisticasProductos(); // Renderiza las estadísticas
}


// ====================================================================
// CRUD CATEGORÍAS (Sección 2)
// Funciones para Crear, Leer, Actualizar y Eliminar categorías.
// ====================================================================

/**
 * Limpia los inputs y mensajes de error del formulario de categoría.
 */
function limpiarCamposCategoria() {
    mostrarTextoEnCaja("txtNombreCategoria", "");
    mostrarTextoEnCaja("txtDescripcionCategoria", "");
    mostrarTexto("lblErrorNombreCategoria", "");
    mostrarTexto("lblErrorDescripcionCate", "");
}

/**
 * Agrega una nueva categoría o actualiza una existente.
 */
function agregarCategoria() {
    let esValido=true; // Flag de validación
    
    // 1. Obtener datos
    const nombreTexto = recuperarTexto("txtNombreCategoria");
    const descripcionTexto = recuperarTexto("txtDescripcionCategoria");


    // 2. Validar campos
    const valNombre = validarNomCategoria(nombreTexto); // Usa la función de validación de nombre de categoría
    const valDescripcion = validarDescripCategoria(descripcionTexto); // Usa la función de validación de descripción de categoría

    // 3. Mostrar errores
    mostrarTexto("lblErrorNombreCategoria", valNombre.error);
    mostrarTexto("lblErrorDescripcionCate", valDescripcion.error);

    // 4. Verificar validez general
    if (!valNombre.valido || !valDescripcion.valido ) {
        esValido = false;
    }
    
    if (esValido) {
        const nuevaCategoria = { // Crea el objeto categoría
            nombre: valNombre.valor,
            descripcion: valDescripcion.valor,
        };

        // 5. Verificar si la categoría ya existe (por nombre)
        const indiceExistente = categorias.findIndex(c => c.nombre === nuevaCategoria.nombre);

        if (indiceExistente !== -1) {
            // Si existe, se actualiza la descripción
            categorias[indiceExistente].descripcion = nuevaCategoria.descripcion; // Actualiza solo la descripción
            alert(`Categoría "${nuevaCategoria.nombre}" actualizada exitosamente.`);
        } else {
            // Si no existe, se agrega
            categorias.push(nuevaCategoria); // Añade al array global
            alert(`Categoría "${nuevaCategoria.nombre}" agregada exitosamente.`);
        }

        // 6. Limpiar campos y actualizar vistas 
        limpiarCamposCategoria();
        mostrarCategorias(); // Vuelve a renderizar la lista de categorías
    }
}


/**
 * Muestra la lista de categorías registradas con opción de eliminar.
 */
function mostrarCategorias() {
    let htmlLista = ""; // Inicializa la cadena HTML

    categorias.forEach((categoria, index) => { // Itera sobre el array de categorías, obteniendo el índice
        htmlLista += ` // Concatena un ítem de lista por cada categoría
            <li class="categoria-item">
                <strong>${categoria.nombre}</strong> 
                ${categoria.descripcion ? `(${categoria.descripcion})` : ''} // Muestra descripción si existe
                <button type="button" onclick="eliminarCategoria(${index})">Eliminar</button> // Botón de eliminar, pasa el índice
            </li>
        `;
    });

    mostrarTextoHTML("listaCategorias", htmlLista); // Muestra la lista en el elemento del DOM
}


/**
 * Elimina una categoría por su índice.
 * @param {number} index Índice de la categoría a eliminar.
 */
function eliminarCategoria(index) {
    if (confirm(`¿Estás seguro de que quieres eliminar la categoría "${categorias[index].nombre}"?`)) { // Pide confirmación
        // Verificar si hay productos que dependen de esta categoría
        const productosAsociados = productos.filter(p => p.categoria === categorias[index].nombre); // Filtra productos con esa categoría
        
        if (productosAsociados.length > 0) { // Si hay productos asociados, no permite eliminar
            alert(`No se puede eliminar la categoría "${categorias[index].nombre}" porque hay ${productosAsociados.length} producto(s) asociado(s).`);
            return;
        }

        categorias.splice(index, 1); // Elimina 1 elemento en la posición del índice
        mostrarCategorias(); // Actualiza la lista
        alert("Categoría eliminada exitosamente.");
    }
}


// ====================================================================
// GESTIÓN DE CARRITO (Sección 3 y 4)
// Funciones para la interacción del cliente con la compra.
// ====================================================================

/**
 * Muestra la lista de productos disponibles para añadir al carrito.
 */
function mostrarProductosDisponibles() {
    let htmlLista = "<ul>"; // Inicia la lista HTML

    productos.forEach(producto => { // Itera sobre los productos
        if (producto.stock > 0) { // Solo muestra productos con stock positivo
            htmlLista += ` // Concatena el ítem del producto
                <li class="producto-item">
                    <strong>${producto.nombre}</strong> - $${producto.precio.toFixed(2)} (Stock: ${producto.stock})
                    <button type="button" onclick="agregarAlCarrito('${producto.nombre}')">Añadir al Carrito</button> // Botón de añadir, pasando el nombre
                </li>
            `;
        }
    });

    htmlLista += "</ul>"; // Cierra la lista
    mostrarTextoHTML("productosDisponibles", htmlLista); // Muestra la lista en el DOM
}


/**
 * Añade un producto al carrito, solicitando la cantidad.
 * @param {string} nombreProducto Nombre del producto a añadir.
 */
function agregarAlCarrito(nombreProducto) {
    const productoEnStock = productos.find(p => p.nombre === nombreProducto); // Busca el producto en el inventario

    if (!productoEnStock || productoEnStock.stock <= 0) { // Verifica si hay stock
        alert(`El producto "${nombreProducto}" no está disponible o no tiene stock.`);
        return;
    }

    const cantidadStr = prompt(`¿Cuántas unidades de "${nombreProducto}" desea agregar? (Stock disponible: ${productoEnStock.stock})`); // Pide la cantidad al usuario
    
    // Si el usuario presiona Cancelar o cierra el prompt
    if (cantidadStr === null) return;
    
    const cantidad = parseInt(cantidadStr, 10); // Convierte a entero

    // Validaciones de cantidad
    if (isNaN(cantidad) || !Number.isInteger(cantidad) || cantidad <= 0) {
        alert("Cantidad inválida. Debe ingresar un número entero positivo.");
        return;
    }

    // Validar cantidad contra stock disponible
    if (cantidad > productoEnStock.stock) {
        alert(`Solo hay ${productoEnStock.stock} unidades de "${nombreProducto}" en stock.`);
        return;
    }

    const productoEnCarrito = carrito.find(item => item.nombre === nombreProducto); // Busca si ya está en el carrito

    if (productoEnCarrito) { // Si ya existe en el carrito
        const nuevaCantidad = productoEnCarrito.cantidad + cantidad;

        // Re-valida que la nueva cantidad total no exceda el stock
        if (nuevaCantidad > productoEnStock.stock) {
            alert(`No puedes añadir ${cantidad} unidades más. Excederías el stock disponible (${productoEnStock.stock}).`);
            return;
        }
        productoEnCarrito.cantidad = nuevaCantidad; // Aumenta la cantidad
    } else { // Si es un producto nuevo en el carrito
        carrito.push({ // Añade el nuevo ítem
            nombre: nombreProducto,
            cantidad: cantidad,
            precio: productoEnStock.precio // Guarda el precio actual del inventario
        });
    }

    alert(`${cantidad} unidad(es) de "${nombreProducto}" agregadas al carrito.`);
    mostrarCarrito(); // Actualiza la vista del carrito
}


/**
 * Muestra el resumen del carrito de compras y calcula el total.
 */
function mostrarCarrito() {
    let htmlTablaBody = "";
    let totalGeneral = 0;

    carrito.forEach((item, index) => { // Itera sobre los ítems del carrito
        const subtotal = item.cantidad * item.precio; // Calcula el subtotal del ítem
        totalGeneral += subtotal; // Suma al total general

        htmlTablaBody += ` // Concatena una fila de tabla para el carrito
            <tr>
                <td>${item.nombre}</td>
                <td>
                    <input type="number" 
                            value="${item.cantidad}" 
                            min="1" 
                            id="cantidad-carrito-${index}" // ID dinámico para recuperar el valor
                            onchange="editarCantidadCarrito(${index})" // Llama a la función de edición al cambiar
                            style="width: 60px; text-align: center;">
                </td>
                <td>$${subtotal.toFixed(2)}</td>
                <td>
                    <button type="button" onclick="eliminarDelCarrito(${index})">Eliminar</button> // Botón de eliminar, pasa el índice
                </td>
            </tr>
        `;
    });

    mostrarTextoHTML("cuerpoTablaCarrito", htmlTablaBody); // Muestra los ítems en la tabla
    mostrarTexto("totalCarrito", totalGeneral.toFixed(2)); // Muestra el total
}

/**
 * Edita la cantidad de un producto en el carrito.
 * @param {number} index Índice del ítem del carrito a editar.
 */
function editarCantidadCarrito(index) {
    const nuevoValorTexto = recuperarTexto(`cantidad-carrito-${index}`); // Obtiene el nuevo valor del input
    const nuevaCantidad = parseInt(nuevoValorTexto, 10);
    const item = carrito[index]; // Obtiene el ítem del carrito

    if (!item) return; // Si el ítem no existe (caso raro), termina

    // Validaciones de cantidad
    if (isNaN(nuevaCantidad) || !Number.isInteger(nuevaCantidad) || nuevaCantidad <= 0) {
        alert("Cantidad inválida. Debe ingresar un número entero positivo.");
        mostrarTextoEnCaja(`cantidad-carrito-${index}`, item.cantidad); // Restaura el valor anterior en el input
        return;
    }

    const productoEnStock = productos.find(p => p.nombre === item.nombre); // Busca el stock actual

    if (!productoEnStock) {
        alert("Error: Producto no encontrado en el inventario.");
        mostrarCarrito();
        return;
    }

    if (nuevaCantidad > productoEnStock.stock) { // Si la nueva cantidad excede el stock
        alert(`Solo hay ${productoEnStock.stock} unidades de "${item.nombre}" en stock. La cantidad se ajustará al máximo disponible.`);
        item.cantidad = productoEnStock.stock; // Ajusta la cantidad al máximo
        mostrarTextoEnCaja(`cantidad-carrito-${index}`, item.cantidad); // Muestra el valor ajustado en el input
    } else {
        item.cantidad = nuevaCantidad; // Actualiza la cantidad
    }

    mostrarCarrito(); // Vuelve a calcular y mostrar el carrito
}


/**
 * Elimina un producto del carrito por su índice.
 * @param {number} index Índice del ítem del carrito a eliminar.
 */
function eliminarDelCarrito(index) {
    if (confirm(`¿Estás seguro de que quieres eliminar "${carrito[index].nombre}" del carrito?`)) {
        carrito.splice(index, 1); // Elimina 1 elemento en la posición del índice
        mostrarCarrito(); // Actualiza la vista del carrito
        if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles(); // Actualiza la lista de disponibilidad (Sección 3)
    }
}


// ====================================================================
// FINALIZAR COMPRA (Sección 4)
// Funciones para el checkout y registro de venta.
// ====================================================================

/**
 * Limpia los inputs y mensajes de error del formulario de cliente.
 */
function limpiarFormularioCliente() {
    mostrarTextoEnCaja("nombreCliente", "");
    mostrarTextoEnCaja("emailCliente", "");
    mostrarTextoEnCaja("telefonoCliente", "");
    mostrarTextoEnCaja("direccionCliente", "");

    mostrarTexto("errorNombreCliente", "");
    mostrarTexto("errorEmailCliente", "");
    mostrarTexto("errorTelefonoCliente", "");
    mostrarTexto("errorDireccionCliente", "");

    clienteDatos = {}; // Vacía el objeto temporal de datos del cliente
}

/**
 * Guarda y valida los datos del cliente.
 * @returns {boolean} True si los datos son válidos, False en caso contrario.
 */
function guardarDatosCliente() {

    let esValido = true; // Flag de validación

    // 1. Obtener datos cliente
    const nombreTexto = recuperarTexto("nombreCliente");
    const emailTexto = recuperarTexto("emailCliente");
    const telefonoTexto = recuperarTexto("telefonoCliente");
    const direccionTexto = recuperarTexto("direccionCliente");

    // 2. Validar campos (usando las funciones de validación)
    const valNombre = validarNombre(nombreTexto);
    const valEmail = validarEmail(emailTexto);
    const valTelefono = validarTelefono(telefonoTexto);
    const valDireccion = validarDireccion(direccionTexto);

    // 3. Mostrar errores
    mostrarTexto("errorNombreCliente", valNombre.error);
    mostrarTexto("errorEmailCliente", valEmail.error);
    mostrarTexto("errorTelefonoCliente", valTelefono.error);
    mostrarTexto("errorDireccionCliente", valDireccion.error);

    // 4. Verificar validez general
    if (!valNombre.valido || !valEmail.valido || !valTelefono.valido || !valDireccion.valido) {
        esValido = false;
    }

    // 5. Guardar datos para la compra si es válido
    if (esValido) {
        clienteDatos = { // Almacena los datos validados en el objeto global temporal
            nombre: valNombre.valor,
            email: valEmail.valor,
            telefono: valTelefono.valor,
            direccion: valDireccion.valor,
        };
        // No mostrar alert aquí para no interrumpir el flujo de finalizarCompra
    } else {
        alert("Por favor, corrige los errores en los datos del cliente para finalizar la compra.");
    }

    return esValido; // Retorna el resultado de la validación
}

/**
 * Procesa la finalización de la compra: valida, registra la venta, actualiza el stock y vacía el carrito.
 */
function finalizarCompra() {
    // 1. Validar que el carrito no esté vacío
    if (carrito.length === 0) {
        alert("El carrito de compras está vacío. Agrega productos para finalizar la compra.");
        return;
    }

    // 2. Validar y guardar datos del cliente
    if (!guardarDatosCliente()) {
        return; // Si la validación del cliente falla, termina
    }

    // Recalcular el total final de la compra
    let totalCompra = 0;
    carrito.forEach(item => {
        totalCompra += item.cantidad * item.precio; // Suma el subtotal de cada ítem
    });

    if (totalCompra <= 0) {
        alert("El total de la compra es cero o negativo, no se puede finalizar.");
        return;
    }

    // 3. Crear registro de venta
    const nuevaVenta = {
        cliente: { ...clienteDatos }, // Copia los datos del cliente (evita referencias)
        productosComprados: JSON.parse(JSON.stringify(carrito)), // Copia profunda del carrito
        total: parseFloat(totalCompra.toFixed(2)), // Total con 2 decimales
        fecha: new Date().toLocaleDateString(),
    };

    ventas.push(nuevaVenta); // Agrega la venta al historial

    // 4. Actualizar stock de productos vendidos
    carrito.forEach(itemCarrito => {
        const productoEnStock = productos.find(p => p.nombre === itemCarrito.nombre);
        if (productoEnStock) {
            productoEnStock.stock -= itemCarrito.cantidad; // Reduce el stock
        }
    });

    // 5. Vaciar carrito
    carrito.length = 0; // Vacía el array del carrito

    // 6. Actualizar tablas y estadísticas
    if (typeof mostrarProductos === 'function') mostrarProductos(); // Actualiza la tabla de productos (Sección 1)
    if (typeof actualizarEstadisticasProductos === 'function') actualizarEstadisticasProductos(); // Actualiza estadísticas de stock (Sección 1)
    if (typeof mostrarCarrito === 'function') mostrarCarrito(); // Vacia/actualiza la vista del carrito (Sección 4)
    if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles(); // Actualiza la lista de compra (Sección 3)
    if (typeof mostrarVentas === 'function') mostrarVentas(); // Muestra el nuevo registro en la tabla de ventas (Sección 5)
    // Si la función actualizarEstadisticasVentas existe, la llama.
    if (typeof actualizarEstadisticasVentas === 'function') actualizarEstadisticasVentas(); // Actualiza estadísticas de ventas (Sección 5)

    // 7. Mostrar mensaje éxito y limpiar formulario cliente
    alert(`¡Compra finalizada con éxito!\nTotal: $${nuevaVenta.total.toFixed(2)}`);

    limpiarFormularioCliente(); // Limpia los inputs del cliente

    // Opcional: Navegar a la sección de Resumen de Ventas
    if (typeof mostrarSeccion === 'function') mostrarSeccion('seccion5'); // Intenta cambiar de vista si la función existe
}


// ====================================================================
// ESTADÍSTICAS Y VENTAS (Sección 5)
// Funciones para reportes y visualización de historial de ventas.
// ====================================================================

/**
 * Calcula el nombre del producto más vendido (por cantidad de unidades).
 * @returns {string} El nombre del producto más vendido o "-" si no hay ventas.
 */
function calcularProductoMasVendido() {
    const conteoVentas = {}; // Objeto para almacenar {nombreProducto: cantidadTotalVendida}
    let maxCantidad = 0; // Contador para la cantidad máxima encontrada
    let productoMasVendido = "-"; // Nombre del producto con la máxima cantidad

    // Recorre todas las ventas y suma las cantidades de cada producto
    ventas.forEach(venta => { // Itera sobre cada venta
        venta.productosComprados.forEach(item => { // Itera sobre los productos de esa venta
            const nombre = item.nombre;
            // Suma la cantidad al contador de ese producto (o lo inicializa en 0 si es la primera vez)
            conteoVentas[nombre] = (conteoVentas[nombre] || 0) + item.cantidad; 
        });
    });

    // Encontrar el producto con la cantidad más alta
    for (const nombreProducto in conteoVentas) { // Itera sobre las claves del objeto conteoVentas
        const cantidadVendida = conteoVentas[nombreProducto];
        if (cantidadVendida > maxCantidad) { // Si la cantidad actual es mayor que la máxima registrada
            maxCantidad = cantidadVendida; // Actualiza el máximo
            productoMasVendido = nombreProducto; // Actualiza el nombre del producto
        }
    }

    return productoMasVendido; // Retorna el nombre del más vendido
}

/**
 * Muestra el resumen de ventas en la tabla y las estadísticas.
 */
function mostrarVentas() {
    let htmlTablaBody = "";
    let totalGlobalVentas = 0; // Contador de la suma total de dinero de todas las ventas

    ventas.forEach(venta => { // Itera sobre cada venta
        totalGlobalVentas += venta.total; // Suma el total de la venta al global

        // Formatea el detalle de los productos comprados (ej: Camisa x2 ($51.98))
        const detallesProductos = venta.productosComprados.map(item =>
            `${item.nombre} x${item.cantidad} ($${(item.cantidad * item.precio).toFixed(2)})`
        ).join('<br>'); // Une los detalles con saltos de línea HTML

        htmlTablaBody += ` // Concatena una fila a la tabla de ventas
            <tr>
                <td>
                    <strong>${venta.cliente.nombre}</strong><br>
                    <small>${venta.fecha || 'N/D'}</small>
                </td>
                <td>${detallesProductos}</td>
                <td>$${venta.total.toFixed(2)}</td>
            </tr>
        `;
    });

    mostrarTextoHTML("cuerpoTablaVentas", htmlTablaBody); // Muestra el cuerpo de la tabla
    mostrarTexto("totalVentas", totalGlobalVentas.toFixed(2)); // Muestra la suma total de dinero
    const productoMasVendido = calcularProductoMasVendido(); // Llama a la función de cálculo
    mostrarTexto("productoMasVendido", productoMasVendido); // Muestra el producto más vendido
}

/**
 * Actualiza solo las estadísticas de ventas.
 */
function actualizarEstadisticasVentas() {
    let totalGlobalVentas = 0;
    ventas.forEach(venta => {
        totalGlobalVentas += venta.total;
    });
    mostrarTexto("totalVentas", totalGlobalVentas.toFixed(2)); // Muestra la suma total de dinero
    const productoMasVendido = calcularProductoMasVendido(); // Llama a la función de cálculo
    mostrarTexto("productoMasVendido", productoMasVendido); // Muestra el producto más vendido
}