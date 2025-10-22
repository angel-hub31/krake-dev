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

function validarNombre(nombre) {
    // Verifica que el nombre no esté vacío.
    if (!nombre || nombre.trim() === "") {
        return { error: "El nombre no puede quedar vacío.", valido: false };
    }
    const nombreLimpio = nombre.trim();
    // Verifica que solo contenga letras y espacios.
    if (!/^[a-zA-Z\s]+$/.test(nombreLimpio)) {
        return { error: "El nombre debe contener solo letras y espacios.", valido: false };
    }

    const primeraLetra = nombreLimpio.charAt(0);
    // Asume que la función esMayuscula existe en un archivo utilitarios.js
    if (!esMayuscula(primeraLetra)) {
        return { error: "La primera letra debe ser mayúscula.", valido: false };
    }

    // Formatea el nombre: Primera mayúscula, resto minúsculas.
    const nombreFormateado = primeraLetra.toUpperCase() + nombreLimpio.slice(1).toLowerCase();

    return { error: "", valido: true, valor: nombreFormateado };
}

function validarDescripcion(descripcion) {
    // Verifica que la descripción no esté vacía.
    if (!descripcion || descripcion.trim() === "") {
        return { error: "La descripción es obligatoria y debe ser válida.", valido: false };
    }
    // Permite letras, números, espacios y algunos caracteres especiales (acentos, puntos, comas, etc.)
    if (!/^[\w\sáéíóúÁÉÍÓÚñÑ.,\-()&]+$/.test(descripcion.trim())) {
        return { error: "La descripción contiene caracteres especiales inválidos.", valido: false };
    }
    return { error: "", valido: true, valor: descripcion.trim() };
}

function validarCategoria(categoria) {
    // Verifica que la categoría no esté vacía.
    if (!categoria || categoria.trim() === "") {
        return { error: "La categoría es obligatoria.", valido: false };
    }
    const categoriaLimpia = categoria.trim();
    // Verifica que solo contenga letras y espacios.
    if (!/^[a-zA-Z\s]+$/.test(categoriaLimpia)) {
        return { error: "La categoría debe tener formato válido (solo letras y espacios).", valido: false };
    }

    const primeraLetra = categoriaLimpia.charAt(0);
    // Asume que la función esMayuscula existe en un archivo utilitarios.js
    if (!esMayuscula(primeraLetra)) {
        return { error: "La primera letra de la categoría debe ser mayúscula.", valido: false };
    }

    // Formatea la categoría: Primera mayúscula, resto minúsculas.
    const categoriaFormateada = primeraLetra.toUpperCase() + categoriaLimpia.slice(1).toLowerCase();

    return { error: "", valido: true, valor: categoriaFormateada };
}

function validarStock(stockTexto) {
    const stock = parseInt(stockTexto, 10);
    // Verifica que sea un número entero válido y no negativo.
    if (isNaN(stock) || !Number.isInteger(stock) || stock < 0) {
        return { error: "Ingrese un stock válido (entero, 0 o más).", valido: false };
    }
    return { error: "", valido: true, valor: stock };
}

function validarPrecio(precioTexto) {
    const precio = parseFloat(precioTexto);
    // Verifica que sea un número válido y no negativo.
    if (isNaN(precio) || precio < 0) {
        return { error: "Ingrese un precio válido mayor o igual a cero.", valido: false };
    }
    // Retorna el precio redondeado a dos decimales.
    return { error: "", valido: true, valor: parseFloat(precio.toFixed(2)) };
}

function validarEmail(email) {
    if (!email || email.trim() === "") {
        return { error: "El correo electrónico es obligatorio.", valido: false };
    }
    // Regex simple para verificar formato de email (algo@algo.algo).
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return { error: "Formato de correo electrónico inválido.", valido: false };
    }
    return { error: "", valido: true, valor: email.trim() };
}

// Función de validación de teléfono simple (solo números y longitud)
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

// Función de validación de dirección simple
function validarDireccion(direccion) {
    if (!direccion || direccion.trim() === "") {
        return { error: "La dirección es obligatoria.", valido: false };
    }
    // Verifica longitud mínima.
    if (direccion.trim().length < 5) {
        return { error: "La dirección debe tener al menos 5 caracteres.", valido: false };
    }
    return { error: "", valido: true, valor: direccion.trim() };
}


// ====================================================================
// CRUD PRODUCTOS (Sección 1)
// ====================================================================

function agregarProducto() {
    let esValido = true;

    // 1. Obtener datos (se asume recuperarTexto de utilitarios.js)
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

    // 3. Mostrar errores (se asume mostrarTexto de utilitarios.js)
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
        // Objeto producto con los valores validados y formateados
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
        } else {
            // Agregar nuevo producto si no existe
            productos.push(nuevoProducto);
        }

        // 5. Limpiar campos y actualizar vistas 
        limpiarCamposProducto();
        mostrarProductos(); // Actualiza la tabla de productos
        actualizarEstadisticasProductos(); // Actualiza el resumen de inventario

        // CORRECCIÓN: Separar el alert y limpiar el mensaje de error del nombre
        alert("Producto agregado/actualizado exitosamente.");
        mostrarTexto("lblErrorNombre", "");
    }
}

function mostrarProductos() {
    const IVA = 0.12;
    let htmlTabla = `
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Categoría</th>
                    <th>Precio ($)</th>
                    <th>Stock</th>
                    <th>Precio con IVA ($)</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Recorre el array global de productos para generar las filas de la tabla
    productos.forEach(producto => {
        const precioConIVA = producto.precio * (1 + IVA); // Calcula el precio con IVA
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

    // Muestra la tabla en el elemento con id 'tablaProductos' (asume mostrarTextoHTML de utilitarios.js)
    mostrarTextoHTML("tablaProductos", htmlTabla);

    // Si la función existe, actualiza la lista de productos disponibles para la compra.
    if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles();
}

function eliminarProducto() {

    const nombreAEliminar = recuperarTexto("txtEliminar");
    mostrarTexto("lblEliminar", "");

    if (!nombreAEliminar || nombreAEliminar.trim() === "") {
        mostrarTexto("lblEliminar", "El nombre a eliminar no puede estar vacío.");
        return;
    }

    // Busca el índice del producto por nombre exacto
    const indice = productos.findIndex(p => p.nombre === nombreAEliminar.trim());

    if (indice !== -1) {
        // Pide confirmación antes de eliminar.
        if (confirm(`¿Está seguro de que desea eliminar el producto "${productos[indice].nombre}"?`)) {
            productos.splice(indice, 1); // Elimina 1 elemento en el índice encontrado
            mostrarTextoEnCaja("txtEliminar", ""); // Limpia el input
            mostrarProductos(); // Refresca la tabla
            actualizarEstadisticasProductos(); // Refresca las estadísticas
            if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles(); // Actualiza la lista de productos en el carrito
        }
    } else {
        mostrarTexto("lblEliminar", "No se encontró producto con ese nombre.");
    }
}

function actualizarEstadisticasProductos() {

    let totalProductos = productos.length;
    let stockTotal = 0;
    let valorInventario = 0;

    // Recorre los productos para sumar stock y calcular el valor total
    productos.forEach(producto => {
        stockTotal += producto.stock;
        valorInventario += producto.precio * producto.stock;
    });

    // Muestra las estadísticas en los elementos correspondientes (asume mostrarTexto de utilitarios.js)
    mostrarTexto("totalProductos", totalProductos);
    mostrarTexto("stockTotal", stockTotal);
    mostrarTexto("valorInventario", valorInventario.toFixed(2));
}

function limpiarCamposProducto() {

    // Limpia los inputs del formulario de producto (asume mostrarTextoEnCaja de utilitarios.js)
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtDescripcion", "");
    mostrarTextoEnCaja("txtCategoria", "");
    mostrarTextoEnCaja("txtPrecio", "");
    mostrarTextoEnCaja("txtStock", "");

    // Limpia los mensajes de error
    mostrarTexto("lblErrorNombre", "");
    mostrarTexto("lblErrorDescripcion", "");
    mostrarTexto("lblErrorCategoria", "");
    mostrarTexto("lblErrorPrecio", "");
    mostrarTexto("lblErrorStock", "");
}

// Inicializa las vistas de la sección de productos
function inicializarVistaProductos() {
    mostrarProductos();
    actualizarEstadisticasProductos();
}

// Escucha el evento de carga del DOM para inicializar la vista de productos
document.addEventListener('DOMContentLoaded', inicializarVistaProductos);


// ====================================================================
// CRUD CATEGORÍAS (Sección 2)
// ====================================================================

function agregarCategoria() {
    // Obtener datos desde inputs
    const nombre = recuperarTexto("nombreCategoria").trim();
    const descripcion = recuperarTexto("descripcionCategoria").trim();

    // Limpiar errores previos
    mostrarTexto("errorNombreCategoria", "");
    mostrarTexto("errorDescripcionCategoria", "");

    let esValido = true;

    // Validar Nombre obligatorio
    if (nombre === "") {
        mostrarTexto("errorNombreCategoria", "El nombre de la categoría es obligatorio.");
        esValido = false;
    }

    // Validar duplicados (insensible a mayúsculas/minúsculas)
    if (esValido) {
        const nombreNormalizado = nombre.toUpperCase();
        // Busca si ya existe una categoría con el mismo nombre (ignorando mayúsculas)
        const categoriaExistente = categorias.find(cat => cat.nombre.toUpperCase() === nombreNormalizado);
        if (categoriaExistente) {
            mostrarTexto("errorNombreCategoria", `La categoría "${nombre}" ya existe.`);
            esValido = false;
        }
    }

    // Validar longitud de descripción (si existe)
    if (descripcion.length > 50) {
        mostrarTexto("errorDescripcionCategoria", "La descripción no debe exceder los 50 caracteres.");
        esValido = false;
    }

    // Agregar categoría a la lista
    if (esValido) {
        const nuevaCategoria = {
            nombre: nombre,
            descripcion: descripcion
        };
        categorias.push(nuevaCategoria);

        // Limpiar campos
        mostrarTextoEnCaja("nombreCategoria", "");
        mostrarTextoEnCaja("descripcionCategoria", "");

        mostrarCategorias(); // Actualiza la lista en la interfaz
    }
}

// Función: mostrar categorías en la lista HTML
function mostrarCategorias() {
    let htmlLista = "";

    // Recorre el array global de categorías
    categorias.forEach((categoria, index) => {
        // Genera un ítem de lista con un botón de eliminación que llama a eliminarCategoria(index)
        htmlLista += `
            <li class="categoria-item">
                <strong>${categoria.nombre}</strong> 
                ${categoria.descripcion ? `(${categoria.descripcion})` : ''} 
                <button type="button" onclick="eliminarCategoria(${index})">Eliminar</button>
            </li>
        `;
    });

    // Muestra el HTML en el elemento 'listaCategorias' (asume mostrarTextoHTML de utilitarios.js)
    mostrarTextoHTML("listaCategorias", htmlLista);
}


// Función: eliminar categoría
function eliminarCategoria(index) {
    // 1. Confirmar con el usuario
    if (confirm(`¿Estás seguro de que quieres eliminar la categoría "${categorias[index].nombre}"?`)) {
        // 2. Eliminar categoría de la lista usando su índice
        categorias.splice(index, 1);

        // 3. Actualizar lista en pantalla
        mostrarCategorias();
    }
}

// Inicializar la vista al cargar
document.addEventListener('DOMContentLoaded', mostrarCategorias);


// ====================================================================
// GESTIÓN DE CARRITO (Sección 3 y 4)
// ====================================================================

// Función: mostrar productos disponibles para añadir al carrito
function mostrarProductosDisponibles() {
    let htmlLista = "<ul>";

    // Recorrer la lista global de productos
    productos.forEach(producto => {
        // Solo muestra productos con stock disponible
        if (producto.stock > 0) {
            // Genera un ítem de lista con un botón para añadir al carrito
            htmlLista += `
                <li class="producto-item">
                    <strong>${producto.nombre}</strong> - $${producto.precio.toFixed(2)} (Stock: ${producto.stock})
                    <button type="button" onclick="agregarAlCarrito('${producto.nombre}')">Añadir al Carrito</button>
                </li>
            `;
        }
    });

    htmlLista += "</ul>";
    // Muestra el HTML en el elemento 'productosDisponibles'
    mostrarTextoHTML("productosDisponibles", htmlLista);
}


// Función: añadir producto al carrito
function agregarAlCarrito(nombreProducto) {
    // Busca el producto en el inventario
    const productoEnStock = productos.find(p => p.nombre === nombreProducto);

    if (!productoEnStock || productoEnStock.stock <= 0) {

        // este signo de dolar $ Permite incrustar (interpolar) el valor de una variable o una expresión directamente dentro de una cadena de texto.
        alert(`El producto "${nombreProducto}" no está disponible o no tiene stock.`);
        return;
    }

    // Pide la cantidad al usuario (usa prompt, idealmente sería un input en la UI)
    //utilizamos prompt para mostrar un cuadro de diálogo al usuario que le solicita ingresar un valor (texto, número, etc.)
    const cantidadStr = prompt(`¿Cuántas unidades de "${nombreProducto}" desea agregar? (Stock disponible: ${productoEnStock.stock})`);
    const cantidad = parseInt(cantidadStr, 10);

    // Valida que la cantidad sea un número entero positivo
    if (isNaN(cantidad) || !Number.isInteger(cantidad) || cantidad <= 0) {
        alert("Cantidad inválida. Debe ingresar un número entero positivo.");
        return;
    }

    // 1. Validar cantidad contra stock disponible
    if (cantidad > productoEnStock.stock) {

        // este signo de dolar $ Permite incrustar (interpolar) el valor de una variable o una expresión directamente dentro de una cadena de texto.
        alert(`Solo hay ${productoEnStock.stock} unidades de "${nombreProducto}" en stock.`);
        return;
    }

    // 2. Añadir producto o aumentar cantidad en carrito
    const productoEnCarrito = carrito.find(item => item.nombre === nombreProducto);

    if (productoEnCarrito) {
        const nuevaCantidad = productoEnCarrito.cantidad + cantidad;

        // Re-valida que la nueva cantidad total no exceda el stock
        if (nuevaCantidad > productoEnStock.stock) {
            // este signo de dolar $ Permite incrustar (interpolar) el valor de una variable o una expresión directamente dentro de una cadena de texto.
            alert(`No puedes añadir ${cantidad} unidades más. Excederías el stock disponible (${productoEnStock.stock}).`);
            return;
        }
        productoEnCarrito.cantidad = nuevaCantidad; // Actualiza la cantidad
    } else {
        // Agrega el nuevo producto al carrito
        carrito.push({
            nombre: nombreProducto,
            cantidad: cantidad,
            precio: productoEnStock.precio
        });
    }
    // este signo de dolar $ Permite incrustar (interpolar) el valor de una variable o una expresión directamente dentro de una cadena de texto.
    alert(`${cantidad} unidad(es) de "${nombreProducto}" agregadas al carrito.`);

    // 3. Actualizar resumen y total del carrito
    mostrarCarrito();
}


// Función: mostrar resumen del carrito
function mostrarCarrito() {
    let htmlTablaBody = "";
    let totalGeneral = 0;

    // Recorrer los productos en el carrito para construir la tabla
    carrito.forEach((item, index) => {
        const subtotal = item.cantidad * item.precio;
        totalGeneral += subtotal;

        // Fila de la tabla con input para editar cantidad y botón para eliminar

        // este signo de dolar $ Permite incrustar (interpolar) el valor de una variable o una expresión directamente dentro de una cadena de texto.
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

    // Muestra el cuerpo de la tabla (asume un elemento con id 'cuerpoTablaCarrito')
    mostrarTextoHTML("cuerpoTablaCarrito", htmlTablaBody);

    // Muestra el total general de la compra
    mostrarTexto("totalCarrito", totalGeneral.toFixed(2));
}

// Función: editar cantidad de producto en carrito
function editarCantidadCarrito(index) {
    const nuevoValorTexto = recuperarTexto(`cantidad-carrito-${index}`);
    const nuevaCantidad = parseInt(nuevoValorTexto, 10);
    const item = carrito[index];

    if (!item) return; // Si el índice no existe

    // 1. Validar nueva cantidad
    if (isNaN(nuevaCantidad) || !Number.isInteger(nuevaCantidad) || nuevaCantidad <= 0) {
        alert("Cantidad inválida. Debe ingresar un número entero positivo.");
        mostrarTextoEnCaja(`cantidad-carrito-${index}`, item.cantidad); // Restaura el valor previo
        return;
    }

    // Buscar el stock disponible en el inventario
    const productoEnStock = productos.find(p => p.nombre === item.nombre);
    if (!productoEnStock) {
        alert("Error: Producto no encontrado en el inventario.");
        mostrarCarrito();
        return;
    }

    // 2. Validar nueva cantidad contra stock
    if (nuevaCantidad > productoEnStock.stock) {
        alert(`Solo hay ${productoEnStock.stock} unidades de "${item.nombre}" en stock. La cantidad se ajustará al máximo disponible.`);
        item.cantidad = productoEnStock.stock;
        mostrarTextoEnCaja(`cantidad-carrito-${index}`, item.cantidad); // Restaura el valor al máximo stock
    } else {
        // 3. Actualizar cantidad en carrito
        item.cantidad = nuevaCantidad;
    }

    // 4. Actualizar tabla y total
    mostrarCarrito();
}


// Función: eliminar producto del carrito
function eliminarDelCarrito(index) {
    if (confirm(`¿Estás seguro de que quieres eliminar "${carrito[index].nombre}" del carrito?`)) {
        // 1. Eliminar producto del carrito usando el índice
        carrito.splice(index, 1);

        // 2. Actualizar tabla, total y lista de disponibles (por si se libera stock visible)
        mostrarCarrito();
        if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles();
    }
}

// Inicializa las vistas de la sección de compra al cargar
document.addEventListener('DOMContentLoaded', () => {
    if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles();
    if (typeof mostrarCarrito === 'function') mostrarCarrito();
});


// ====================================================================
// FINALIZAR COMPRA (Sección 4)
// ====================================================================

// Función: guardar y validar datos del cliente
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
        alert("Por favor, corrige los errores en los datos del cliente.");
    }

    // 5. Guardar datos para la compra si es válido
    if (esValido) {
        clienteDatos = {
            nombre: valNombre.valor,
            email: valEmail.valor,
            telefono: valTelefono.valor,
            direccion: valDireccion.valor,
        };
        alert("Datos del cliente guardados correctamente.");
    }

    return esValido;
}

// Función: finalizar compra
function finalizarCompra() {
    // 1. Validar que el carrito no esté vacío
    if (carrito.length === 0) {
        alert("El carrito de compras está vacío. Agrega productos para finalizar la compra.");
        return;
    }

    // 2. Validar y guardar datos del cliente
    if (!guardarDatosCliente()) {
        return; // Detiene la compra si los datos del cliente son inválidos
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

    // 3. Crear registro de venta (copia de datos del cliente y carrito actual)
    const nuevaVenta = {
        cliente: { ...clienteDatos },
        productosComprados: JSON.parse(JSON.stringify(carrito)), // Copia profunda del carrito
        total: parseFloat(totalCompra.toFixed(2)),
        fecha: new Date().toLocaleDateString(),
    };

    // Agrega la nueva venta al historial
    ventas.push(nuevaVenta);

    // 4. Actualizar stock de productos vendidos en el inventario global
    carrito.forEach(itemCarrito => {
        const productoEnStock = productos.find(p => p.nombre === itemCarrito.nombre);
        if (productoEnStock) {
            productoEnStock.stock -= itemCarrito.cantidad; // Reduce el stock
        }
    });

    // 5. Vaciar carrito
    carrito.length = 0;

    // 6. Actualizar tablas y estadísticas (asume la existencia de estas funciones)
    if (typeof mostrarProductos === 'function') mostrarProductos();
    if (typeof actualizarEstadisticasProductos === 'function') actualizarEstadisticasProductos();
    if (typeof mostrarCarrito === 'function') mostrarCarrito();
    if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles();
    if (typeof mostrarVentas === 'function') mostrarVentas();
    if (typeof actualizarEstadisticasVentas === 'function') actualizarEstadisticasVentas();

    // 7. Mostrar mensaje éxito y limpiar formulario cliente
    alert(`¡Compra finalizada con éxito!\nTotal: $${nuevaVenta.total.toFixed(2)}`);

    limpiarFormularioCliente();

    // Opcional: Navegar a la sección de Resumen de Ventas
    if (typeof mostrarSeccion === 'function') mostrarSeccion('seccion5');
}


// Función auxiliar para limpiar el formulario del cliente
function limpiarFormularioCliente() {
    // Limpia los inputs del formulario
    mostrarTextoEnCaja("nombreCliente", "");
    mostrarTextoEnCaja("emailCliente", "");
    mostrarTextoEnCaja("telefonoCliente", "");
    mostrarTextoEnCaja("direccionCliente", "");

    // Limpia los mensajes de error
    mostrarTexto("errorNombreCliente", "");
    mostrarTexto("errorEmailCliente", "");
    mostrarTexto("errorTelefonoCliente", "");
    mostrarTexto("errorDireccionCliente", "");

    clienteDatos = {}; // Limpia los datos guardados temporalmente
}


// ====================================================================
// ESTADÍSTICAS Y VENTAS (Sección 5)
// ====================================================================

// Función: mostrar resumen de ventas
function mostrarVentas() {
    let htmlTablaBody = "";
    let totalGlobalVentas = 0;

    // 1. Recorre las ventas registradas para construir la tabla
    ventas.forEach(venta => {
        totalGlobalVentas += venta.total;

        // Formatea los productos comprados para mostrarlos en una celda
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

    // Muestra el cuerpo de la tabla (Busca el tbody de la tablaVentas)
    const tbodyVentas = document.querySelector("#tablaVentas tbody");
    if (tbodyVentas) {
        mostrarTextoHTML(tbodyVentas.id || tbodyVentas.parentNode.id, htmlTablaBody);
    } else {
        // Si no hay tbody, sobrescribe toda la tabla (incluyendo el thead)
        mostrarTextoHTML("tablaVentas", `
            <thead>
                <tr>
                    <th>Cliente y Fecha</th>
                    <th>Productos</th>
                    <th>Total ($)</th>
                </tr>
            </thead>
            <tbody>
                ${htmlTablaBody}
            </tbody>
        `);
    }

    // 2. Muestra totales globales y producto más vendido
    mostrarTexto("totalVentas", totalGlobalVentas.toFixed(2));

    const productoMasVendido = calcularProductoMasVendido();
    mostrarTexto("productoMasVendido", productoMasVendido);
}


function calcularProductoMasVendido() {
    const conteoVentas = {}; // Almacena { 'NombreProducto': CantidadTotalVendida }
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


// Función auxiliar para actualizar solo las estadísticas
function actualizarEstadisticasVentas() {
    let totalGlobalVentas = 0;
    ventas.forEach(venta => {
        totalGlobalVentas += venta.total;
    });

    mostrarTexto("totalVentas", totalGlobalVentas.toFixed(2));

    const productoMasVendido = calcularProductoMasVendido();
    mostrarTexto("productoMasVendido", productoMasVendido);
}

// Inicializar la vista de ventas al cargar el script.
document.addEventListener('DOMContentLoaded', mostrarVentas);