// ====================================================================
// BASES DE DATOS (ARRAYS GLOBALES)
// ====================================================================

// Lista base de productos
const productos = [
    {
        nombre: "Camisa",
        descripcion: "Camisa blanca de algodón",
        categoria: "Ropa",
        precio: 25.99,
        stock: 50,
    },
    {
        nombre: "Pantalón",
        descripcion: "Pantalón azul jeans",
        categoria: "Ropa",
        precio: 40.0,
        stock: 30,
    },
    {
        nombre: "Zapatos",
        descripcion: "Zapatos deportivos",
        categoria: "Calzado",
        precio: 60.5,
        stock: 20,
    },
];

// Lista base de categorías (Se utiliza en la sección de Gestión de Categorías)
const categorias = [
    { nombre: "Ropa", descripcion: "Prendas de vestir" },
    { nombre: "Calzado", descripcion: "Zapatos, sandalias y más" },
];

// Carrito de compras actual (productos seleccionados por el cliente)
const carrito = [
    { nombre: "Camisa", cantidad: 2, precio: 25.99 },
    { nombre: "Zapatos", cantidad: 1, precio: 60.5 },
];

// Registro histórico de ventas finalizadas
const ventas = [
    {
        cliente: {
            nombre: "Juan Pérez",
            email: "juan.perez@example.com",
            telefono: "0991234567",
            direccion: "Av. Siempre Viva 123",
        },
        productosComprados: [ // Detalle de los productos vendidos en esta transacción
            { nombre: "Camisa", cantidad: 2, precio: 25.99 },
            { nombre: "Pantalón", cantidad: 1, precio: 40.0 }
        ],
        total: 91.98,
        fecha: new Date().toLocaleDateString(),
    },
    {
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
    },
];

// Objeto temporal para guardar los datos del cliente durante el proceso de compra
let clienteDatos = {};


// ====================================================================
// FUNCIONES DE VALIDACIÓN
// ====================================================================

/**
 * Valida un nombre de producto o cliente: no vacío, solo letras/espacios, primera mayúscula.
 * @param {string} nombre El texto a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarNombre(nombre) {
    if (!nombre || nombre.trim() === "") {
        return { error: "El nombre no puede quedar vacío.", valido: false };
    }
    const nombreLimpio = nombre.trim();
    if (!/^[a-zA-Z\s]+$/.test(nombreLimpio)) {
        return { error: "El nombre debe contener solo letras y espacios.", valido: false };
    }

    const primeraLetra = nombreLimpio.charAt(0);
    // Asume que la función esMayuscula existe en utilitarios.js
    if (!esMayuscula(primeraLetra)) {
        return { error: "La primera letra debe ser mayúscula.", valido: false };
    }

    // Formatea el nombre: Primera mayúscula, resto minúsculas.
    const nombreFormateado = primeraLetra.toUpperCase() + nombreLimpio.slice(1).toLowerCase();

    return { error: "", valido: true, valor: nombreFormateado };
}

/**
 * Valida una descripción: no vacía, solo letras/espacios, primera mayúscula.
 * @param {string} descripcion El texto a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarDescripcion(descripcion) {
    if (!descripcion || descripcion.trim() === "") {
        return { error: "La descripción no puede quedar vacía.", valido: false };
    }
    const descripcionLimpio = descripcion.trim();
    // Permite letras, espacios y números (para descripciones más realistas)
    if (!/^[a-zA-Z0-9\s.,]+$/.test(descripcionLimpio)) {
         return { error: "La descripción debe contener letras, números y espacios/puntuación básica.", valido: false };
    }

    const primeraLetra = descripcionLimpio.charAt(0);
    if (!esMayuscula(primeraLetra)) {
        return { error: "La primera letra debe ser mayúscula.", valido: false };
    }

    const descripcionFormateado = primeraLetra.toUpperCase() + descripcionLimpio.slice(1); // No forzamos a minúsculas
    
    return { error: "", valido: true, valor: descripcionFormateado };
}

/**
 * Valida una categoría: no vacía, solo letras/espacios, primera mayúscula.
 * @param {string} categoria El texto a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarCategoria(categoria) {
    if (!categoria || categoria.trim() === "") {
        return { error: "La categoría es obligatoria.", valido: false };
    }
    const categoriaLimpia = categoria.trim();
    if (!/^[a-zA-Z\s]+$/.test(categoriaLimpia)) {
        return { error: "La categoría debe tener formato válido (solo letras y espacios).", valido: false };
    }

    const primeraLetra = categoriaLimpia.charAt(0);
    if (!esMayuscula(primeraLetra)) {
        return { error: "La primera letra de la categoría debe ser mayúscula.", valido: false };
    }

    const categoriaFormateada = primeraLetra.toUpperCase() + categoriaLimpia.slice(1).toLowerCase();

    return { error: "", valido: true, valor: categoriaFormateada };
}


/**
 * Valida el nombre de una categoría (similar a validarCategoria).
 * @param {string} nombre El texto a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarNomCategoria(nombre) { 
    return validarCategoria(nombre);
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
    const stock = parseInt(stockTexto, 10);
    if (isNaN(stock) || !Number.isInteger(stock) || stock < 0) {
        return { error: "Ingrese un stock válido (entero, 0 o más).", valido: false };
    }
    return { error: "", valido: true, valor: stock };
}

/**
 * Valida el precio: número flotante, no negativo, se redondea a 2 decimales.
 * @param {string} precioTexto El texto del precio a validar.
 * @returns {{error: string, valido: boolean, valor?: number}} Resultado de la validación.
 */
function validarPrecio(precioTexto) {
    const precio = parseFloat(precioTexto);
    if (isNaN(precio) || precio < 0) {
        return { error: "Ingrese un precio válido mayor o igual a cero.", valido: false };
    }
    // Retorna el precio redondeado a dos decimales.
    return { error: "", valido: true, valor: parseFloat(precio.toFixed(2)) };
}

/**
 * Valida el formato de email.
 * @param {string} email El email a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarEmail(email) {
    if (!email || email.trim() === "") {
        return { error: "El correo electrónico es obligatorio.", valido: false };
    }
    // Regex estándar para formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return { error: "Formato de correo electrónico inválido (ej: usuario@dominio.com).", valido: false };
    }
    return { error: "", valido: true, valor: email.trim() };
}

/**
 * Valida el teléfono: solo dígitos, 7 a 15 caracteres.
 * @param {string} telefono El teléfono a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarTelefono(telefono) {
    if (!telefono || telefono.trim() === "") {
        return { error: "El teléfono es obligatorio.", valido: false };
    }
    const telefonoLimpio = telefono.replace(/[\s-()]/g, ''); // Remueve caracteres no deseados
    // Verifica que sean solo dígitos y tenga entre 7 y 15 caracteres.
    if (!/^\d{7,15}$/g.test(telefonoLimpio)) {
        return { error: "Teléfono inválido (solo dígitos, 7-15 caracteres).", valido: false };
    }
    return { error: "", valido: true, valor: telefonoLimpio };
}

/**
 * Valida la dirección: no vacía, mínimo 5 caracteres.
 * @param {string} direccion La dirección a validar.
 * @returns {{error: string, valido: boolean, valor?: string}} Resultado de la validación.
 */
function validarDireccion(direccion) {
    if (!direccion || direccion.trim() === "") {
        return { error: "La dirección es obligatoria.", valido: false };
    }
    if (direccion.trim().length < 5) {
        return { error: "La dirección debe tener al menos 5 caracteres.", valido: false };
    }
    return { error: "", valido: true, valor: direccion.trim() };
}


// ====================================================================
// CRUD PRODUCTOS (Sección 1)
// ====================================================================

/**
 * Limpia los inputs y mensajes de error del formulario de producto.
 */
function limpiarCamposProducto() {
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtDescripcion", "");
    mostrarTextoEnCaja("txtCategoria", "");
    mostrarTextoEnCaja("txtPrecio", "");
    mostrarTextoEnCaja("txtStock", "");

    mostrarTexto("lblErrorNombre", "");
    mostrarTexto("lblErrorDescripcion", "");
    mostrarTexto("lblErrorCategoria", "");
    mostrarTexto("lblErrorPrecio", "");
    mostrarTexto("lblErrorStock", "");
}

/**
 * Agrega un nuevo producto o actualiza uno existente.
 */
function agregarProducto() {
    let esValido = true;

    // 1. Obtener datos
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

    // 3. Mostrar errores
    mostrarTexto("lblErrorNombre", valNombre.error);
    mostrarTexto("lblErrorDescripcion", valDescripcion.error);
    mostrarTexto("lblErrorCategoria", valCategoria.error);
    mostrarTexto("lblErrorPrecio", valPrecio.error);
    mostrarTexto("lblErrorStock", valStock.error);

    // 4. Verificar validez general
    if (!valNombre.valido || !valDescripcion.valido || !valCategoria.valido || !valPrecio.valido || !valStock.valido) {
        esValido = false;
    }

    if (esValido) {
        const nuevoProducto = {
            nombre: valNombre.valor,
            descripcion: valDescripcion.valor,
            categoria: valCategoria.valor,
            precio: valPrecio.valor,
            stock: valStock.valor,
        };

        // Buscar si el producto ya existe (por nombre)
        const indiceExistente = productos.findIndex(p => p.nombre === nuevoProducto.nombre);

        if (indiceExistente !== -1) {
            // Actualizar producto si ya existe
            productos[indiceExistente] = nuevoProducto;
            alert("Producto actualizado exitosamente.");
        } else {
            // Agregar nuevo producto si no existe
            productos.push(nuevoProducto);
            alert("Producto agregado exitosamente.");
        }

        // 5. Limpiar campos y actualizar vistas 
        limpiarCamposProducto();
        mostrarProductos();
        actualizarEstadisticasProductos();
    }
}

/**
 * Genera y muestra la tabla de productos.
 */
function mostrarProductos() {
    const IVA = 0.12;
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
    `;

    productos.forEach(producto => {
        const precioConIVA = producto.precio * (1 + IVA);
        htmlTabla += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.categoria}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>${producto.stock}</td>
                <td>${precioConIVA.toFixed(2)}</td>
            </tr>
        `;
    });

    htmlTabla += `
            </tbody>
        </table>
    `;

    mostrarTextoHTML("tablaProductos", htmlTabla);

    if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles();
}

/**
 * Elimina un producto por nombre.
 */
function eliminarProducto() {

    const nombreAEliminar = recuperarTexto("txtEliminar");
    mostrarTexto("lblEliminar", "");

    if (!nombreAEliminar || nombreAEliminar.trim() === "") {
        mostrarTexto("lblEliminar", "El nombre a eliminar no puede estar vacío.");
        return;
    }

    // Busca el índice del producto por nombre exacto
    const nombreLimpio = validarNombre(nombreAEliminar).valor || nombreAEliminar.trim();
    const indice = productos.findIndex(p => p.nombre === nombreLimpio);

    if (indice !== -1) {
        if (confirm(`¿Está seguro de que desea eliminar el producto "${productos[indice].nombre}"?`)) {
            productos.splice(indice, 1);
            mostrarTextoEnCaja("txtEliminar", "");
            mostrarProductos();
            actualizarEstadisticasProductos();
            if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles();
            alert("Producto eliminado exitosamente.");
        }
    } else {
        mostrarTexto("lblEliminar", `No se encontró producto con el nombre: "${nombreAEliminar.trim()}".`);
    }
}

/**
 * Calcula y muestra el total de productos, stock y valor de inventario.
 */
function actualizarEstadisticasProductos() {

    let totalProductos = productos.length;
    let stockTotal = 0;
    let valorInventario = 0;

    productos.forEach(producto => {
        stockTotal += producto.stock;
        valorInventario += producto.precio * producto.stock;
    });

    mostrarTexto("totalProductos", totalProductos);
    mostrarTexto("stockTotal", stockTotal);
    mostrarTexto("valorInventario", valorInventario.toFixed(2));
}

/**
 * Inicializa la vista de la sección de productos.
 */
function inicializarVistaProductos() {
    mostrarProductos();
    actualizarEstadisticasProductos();
}


// ====================================================================
// CRUD CATEGORÍAS (Sección 2)
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
    let esValido=true;
    
    // 1. Obtener datos
    const nombreTexto = recuperarTexto("txtNombreCategoria");
    const descripcionTexto = recuperarTexto("txtDescripcionCategoria");


    // 2. Validar campos
    const valNombre = validarNomCategoria(nombreTexto);
    const valDescripcion = validarDescripCategoria(descripcionTexto);

    // 3. Mostrar errores
    mostrarTexto("lblErrorNombreCategoria", valNombre.error);
    mostrarTexto("lblErrorDescripcionCate", valDescripcion.error);

    // 4. Verificar validez general
    if (!valNombre.valido || !valDescripcion.valido ) {
        esValido = false;
    }
    
    if (esValido) {
        const nuevaCategoria = {
            nombre: valNombre.valor,
            descripcion: valDescripcion.valor,
        };

        // 5. Verificar si la categoría ya existe
        const indiceExistente = categorias.findIndex(c => c.nombre === nuevaCategoria.nombre);

        if (indiceExistente !== -1) {
            // Si existe, se actualiza la descripción
            categorias[indiceExistente].descripcion = nuevaCategoria.descripcion;
            alert(`Categoría "${nuevaCategoria.nombre}" actualizada exitosamente.`);
        } else {
            // Si no existe, se agrega
            categorias.push(nuevaCategoria);
            alert(`Categoría "${nuevaCategoria.nombre}" agregada exitosamente.`);
        }

        // 6. Limpiar campos y actualizar vistas 
        limpiarCamposCategoria();
        mostrarCategorias();
    }
}


/**
 * Muestra la lista de categorías registradas con opción de eliminar.
 */
function mostrarCategorias() {
    let htmlLista = "";

    categorias.forEach((categoria, index) => {
        htmlLista += `
            <li class="categoria-item">
                <strong>${categoria.nombre}</strong> 
                ${categoria.descripcion ? `(${categoria.descripcion})` : ''} 
                <button type="button" onclick="eliminarCategoria(${index})">Eliminar</button>
            </li>
        `;
    });

    mostrarTextoHTML("listaCategorias", htmlLista);
}


/**
 * Elimina una categoría por su índice.
 * @param {number} index Índice de la categoría a eliminar.
 */
function eliminarCategoria(index) {
    if (confirm(`¿Estás seguro de que quieres eliminar la categoría "${categorias[index].nombre}"?`)) {
        // Verificar si hay productos que dependen de esta categoría
        const productosAsociados = productos.filter(p => p.categoria === categorias[index].nombre);
        
        if (productosAsociados.length > 0) {
            alert(`No se puede eliminar la categoría "${categorias[index].nombre}" porque hay ${productosAsociados.length} producto(s) asociado(s).`);
            return;
        }

        categorias.splice(index, 1);
        mostrarCategorias();
        alert("Categoría eliminada exitosamente.");
    }
}


// ====================================================================
// GESTIÓN DE CARRITO (Sección 3 y 4)
// ====================================================================

/**
 * Muestra la lista de productos disponibles para añadir al carrito.
 */
function mostrarProductosDisponibles() {
    let htmlLista = "<ul>";

    productos.forEach(producto => {
        if (producto.stock > 0) {
            htmlLista += `
                <li class="producto-item">
                    <strong>${producto.nombre}</strong> - $${producto.precio.toFixed(2)} (Stock: ${producto.stock})
                    <button type="button" onclick="agregarAlCarrito('${producto.nombre}')">Añadir al Carrito</button>
                </li>
            `;
        }
    });

    htmlLista += "</ul>";
    mostrarTextoHTML("productosDisponibles", htmlLista);
}


/**
 * Añade un producto al carrito, solicitando la cantidad.
 * @param {string} nombreProducto Nombre del producto a añadir.
 */
function agregarAlCarrito(nombreProducto) {
    const productoEnStock = productos.find(p => p.nombre === nombreProducto);

    if (!productoEnStock || productoEnStock.stock <= 0) {
        alert(`El producto "${nombreProducto}" no está disponible o no tiene stock.`);
        return;
    }


   // "prompt" en JavaScript es una función que realiza la acción de mostrar un cuadro de diálogo interactivo al usuario para solicitarle que ingrese un valor o información.//
    const cantidadStr = prompt(`¿Cuántas unidades de "${nombreProducto}" desea agregar? (Stock disponible: ${productoEnStock.stock})`);
    
    // Si el usuario presiona Cancelar o cierra el prompt
    if (cantidadStr === null) return;
    
    const cantidad = parseInt(cantidadStr, 10);

    if (isNaN(cantidad) || !Number.isInteger(cantidad) || cantidad <= 0) {
        alert("Cantidad inválida. Debe ingresar un número entero positivo.");
        return;
    }

    // Validar cantidad contra stock disponible
    if (cantidad > productoEnStock.stock) {
        alert(`Solo hay ${productoEnStock.stock} unidades de "${nombreProducto}" en stock.`);
        return;
    }

    const productoEnCarrito = carrito.find(item => item.nombre === nombreProducto);

    if (productoEnCarrito) {
        const nuevaCantidad = productoEnCarrito.cantidad + cantidad;

        // Re-valida que la nueva cantidad total no exceda el stock
        if (nuevaCantidad > productoEnStock.stock) {
            alert(`No puedes añadir ${cantidad} unidades más. Excederías el stock disponible (${productoEnStock.stock}).`);
            return;
        }
        productoEnCarrito.cantidad = nuevaCantidad;
    } else {
        carrito.push({
            nombre: nombreProducto,
            cantidad: cantidad,
            precio: productoEnStock.precio
        });
    }

    alert(`${cantidad} unidad(es) de "${nombreProducto}" agregadas al carrito.`);
    mostrarCarrito();
}


/**
 * Muestra el resumen del carrito de compras y calcula el total.
 */
function mostrarCarrito() {
    let htmlTablaBody = "";
    let totalGeneral = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.cantidad * item.precio;
        totalGeneral += subtotal;

        htmlTablaBody += `
            <tr>
                <td>${item.nombre}</td>
                <td>
                    <input type="number" 
                            value="${item.cantidad}" 
                            min="1" 
                            id="cantidad-carrito-${index}"
                            onchange="editarCantidadCarrito(${index})" 
                            style="width: 60px; text-align: center;">
                </td>
                <td>$${subtotal.toFixed(2)}</td>
                <td>
                    <button type="button" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    mostrarTextoHTML("cuerpoTablaCarrito", htmlTablaBody);
    mostrarTexto("totalCarrito", totalGeneral.toFixed(2));
}

/**
 * Edita la cantidad de un producto en el carrito.
 * @param {number} index Índice del ítem del carrito a editar.
 */
function editarCantidadCarrito(index) {
    const nuevoValorTexto = recuperarTexto(`cantidad-carrito-${index}`);
    const nuevaCantidad = parseInt(nuevoValorTexto, 10);
    const item = carrito[index];

    if (!item) return;

    if (isNaN(nuevaCantidad) || !Number.isInteger(nuevaCantidad) || nuevaCantidad <= 0) {
        alert("Cantidad inválida. Debe ingresar un número entero positivo.");
        mostrarTextoEnCaja(`cantidad-carrito-${index}`, item.cantidad);
        return;
    }

    const productoEnStock = productos.find(p => p.nombre === item.nombre);
    if (!productoEnStock) {
        alert("Error: Producto no encontrado en el inventario.");
        mostrarCarrito();
        return;
    }

    if (nuevaCantidad > productoEnStock.stock) {
        alert(`Solo hay ${productoEnStock.stock} unidades de "${item.nombre}" en stock. La cantidad se ajustará al máximo disponible.`);
        item.cantidad = productoEnStock.stock;
        mostrarTextoEnCaja(`cantidad-carrito-${index}`, item.cantidad);
    } else {
        item.cantidad = nuevaCantidad;
    }

    mostrarCarrito();
}


/**
 * Elimina un producto del carrito por su índice.
 * @param {number} index Índice del ítem del carrito a eliminar.
 */
function eliminarDelCarrito(index) {
    if (confirm(`¿Estás seguro de que quieres eliminar "${carrito[index].nombre}" del carrito?`)) {
        carrito.splice(index, 1);
        mostrarCarrito();
        if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles();
    }
}


// ====================================================================
// FINALIZAR COMPRA (Sección 4)
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

    clienteDatos = {};
}

/**
 * Guarda y valida los datos del cliente.
 * @returns {boolean} True si los datos son válidos, False en caso contrario.
 */
function guardarDatosCliente() {

    let esValido = true;

    // 1. Obtener datos cliente
    const nombreTexto = recuperarTexto("nombreCliente");
    const emailTexto = recuperarTexto("emailCliente");
    const telefonoTexto = recuperarTexto("telefonoCliente");
    const direccionTexto = recuperarTexto("direccionCliente");

    // 2. Validar campos
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
        clienteDatos = {
            nombre: valNombre.valor,
            email: valEmail.valor,
            telefono: valTelefono.valor,
            direccion: valDireccion.valor,
        };
        // No mostrar alert aquí para no interrumpir el flujo de finalizarCompra
    } else {
        alert("Por favor, corrige los errores en los datos del cliente para finalizar la compra.");
    }

    return esValido;
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
        return;
    }

    // Recalcular el total final de la compra
    let totalCompra = 0;
    carrito.forEach(item => {
        totalCompra += item.cantidad * item.precio;
    });

    if (totalCompra <= 0) {
        alert("El total de la compra es cero o negativo, no se puede finalizar.");
        return;
    }

    // 3. Crear registro de venta
    const nuevaVenta = {
        cliente: { ...clienteDatos },
        productosComprados: JSON.parse(JSON.stringify(carrito)),
        total: parseFloat(totalCompra.toFixed(2)),
        fecha: new Date().toLocaleDateString(),
    };

    ventas.push(nuevaVenta);

    // 4. Actualizar stock de productos vendidos
    carrito.forEach(itemCarrito => {
        const productoEnStock = productos.find(p => p.nombre === itemCarrito.nombre);
        if (productoEnStock) {
            productoEnStock.stock -= itemCarrito.cantidad;
        }
    });

    // 5. Vaciar carrito
    carrito.length = 0;

    // 6. Actualizar tablas y estadísticas
    if (typeof mostrarProductos === 'function') mostrarProductos();
    if (typeof actualizarEstadisticasProductos === 'function') actualizarEstadisticasProductos();
    if (typeof mostrarCarrito === 'function') mostrarCarrito();
    if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles();
    if (typeof mostrarVentas === 'function') mostrarVentas();
    // Si la función actualizarEstadisticasVentas existe, la llama.
    if (typeof actualizarEstadisticasVentas === 'function') actualizarEstadisticasVentas(); 

    // 7. Mostrar mensaje éxito y limpiar formulario cliente
    alert(`¡Compra finalizada con éxito!\nTotal: $${nuevaVenta.total.toFixed(2)}`);

    limpiarFormularioCliente();

    // Opcional: Navegar a la sección de Resumen de Ventas
    if (typeof mostrarSeccion === 'function') mostrarSeccion('seccion5');
}


// ====================================================================
// ESTADÍSTICAS Y VENTAS (Sección 5)
// ====================================================================

/**
 * Calcula el nombre del producto más vendido.
 * @returns {string} El nombre del producto más vendido o "-" si no hay ventas.
 */
function calcularProductoMasVendido() {
    const conteoVentas = {};
    let maxCantidad = 0;
    let productoMasVendido = "-";

    // Recorre todas las ventas y suma las cantidades de cada producto
    ventas.forEach(venta => {
        venta.productosComprados.forEach(item => {
            const nombre = item.nombre;
            conteoVentas[nombre] = (conteoVentas[nombre] || 0) + item.cantidad;
        });
    });

    // Encontrar el producto con la cantidad más alta
    for (const nombreProducto in conteoVentas) {
        const cantidadVendida = conteoVentas[nombreProducto];
        if (cantidadVendida > maxCantidad) {
            maxCantidad = cantidadVendida;
            productoMasVendido = nombreProducto;
        }
    }

    return productoMasVendido;
}

/**
 * Muestra el resumen de ventas en la tabla y las estadísticas.
 */
function mostrarVentas() {
    let htmlTablaBody = "";
    let totalGlobalVentas = 0;

    ventas.forEach(venta => {
        totalGlobalVentas += venta.total;

        const detallesProductos = venta.productosComprados.map(item =>
            `${item.nombre} x${item.cantidad} ($${(item.cantidad * item.precio).toFixed(2)})`
        ).join('<br>');

        htmlTablaBody += `
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

    mostrarTextoHTML("cuerpoTablaVentas", htmlTablaBody);

    mostrarTexto("totalVentas", totalGlobalVentas.toFixed(2));

    const productoMasVendido = calcularProductoMasVendido();
    mostrarTexto("productoMasVendido", productoMasVendido);
}

/**
 * Actualiza solo las estadísticas de ventas.
 */
function actualizarEstadisticasVentas() {
    let totalGlobalVentas = 0;
    ventas.forEach(venta => {
        totalGlobalVentas += venta.total;
    });

    mostrarTexto("totalVentas", totalGlobalVentas.toFixed(2));

    const productoMasVendido = calcularProductoMasVendido();
    mostrarTexto("productoMasVendido", productoMasVendido);
}