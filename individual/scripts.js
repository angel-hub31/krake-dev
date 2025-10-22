
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

// Lista base de categorías (No usada en la lógica actual de agregar producto, pero se mantiene)
const categorias = [
    { nombre: "Ropa", descripcion: "Prendas de vestir" },
    { nombre: "Calzado", descripcion: "Zapatos, sandalias y más" },
];

const carrito = [
    { nombre: "Camisa", cantidad: 2, precio: 25.99 },
    { nombre: "Zapatos", cantidad: 1, precio: 60.5 },
];

const ventas = [
    {
        cliente: {
            nombre: "Juan Pérez",
            email: "juan.perez@example.com",
            telefono: "0991234567",
            direccion: "Av. Siempre Viva 123",
        },
        total: 112.48,
    },
    {
        cliente: {
            nombre: "María López",
            email: "maria.lopez@example.com",
            telefono: "0987654321",
            direccion: "Calle Falsa 456",
        },
        total: 40.0,
    },
];


function validarNombre(nombre) {
    if (!nombre || nombre.trim() === "") {
        return { error: "El nombre no puede quedar vacío.", valido: false };
    }
    const nombreLimpio = nombre.trim();
    if (!/^[a-zA-Z\s]+$/.test(nombreLimpio)) {
        return { error: "El nombre debe contener solo letras y espacios.", valido: false };
    }

    const primeraLetra = nombreLimpio.charAt(0);
    // esMayuscula viene de utilitarios.js
    if (!esMayuscula(primeraLetra)) {
        return { error: "La primera letra debe ser mayúscula.", valido: false };
    }

    // Formato final: Primera mayúscula, resto minúsculas
    const nombreFormateado = primeraLetra.toUpperCase() + nombreLimpio.slice(1).toLowerCase();
    
    return { error: "", valido: true, valor: nombreFormateado };
}

function validarDescripcion(descripcion) {
    if (!descripcion || descripcion.trim() === "") {
        return { error: "La descripción es obligatoria y debe ser válida.", valido: false };
    }
    if (!/^[\w\sáéíóúÁÉÍÓÚñÑ.,\-()&]+$/.test(descripcion.trim())) {
        return { error: "La descripción contiene caracteres especiales inválidos.", valido: false };
    }
    return { error: "", valido: true, valor: descripcion.trim() };
}

function validarCategoria(categoria) {
    if (!categoria || categoria.trim() === "") {
        return { error: "La categoría es obligatoria.", valido: false };
    }
    const categoriaLimpia = categoria.trim();
    if (!/^[a-zA-Z\s]+$/.test(categoriaLimpia)) {
        return { error: "La categoría debe tener formato válido (solo letras y espacios).", valido: false };
    }

    const primeraLetra = categoriaLimpia.charAt(0);
    // esMayuscula viene de utilitarios.js
    if (!esMayuscula(primeraLetra)) {
        return { error: "La primera letra de la categoría debe ser mayúscula.", valido: false };
    }
    
    const categoriaFormateada = primeraLetra.toUpperCase() + categoriaLimpia.slice(1).toLowerCase();
    
    return { error: "", valido: true, valor: categoriaFormateada };
}

function validarStock(stockTexto) {
    const stock = parseInt(stockTexto, 10);
    if (isNaN(stock) || !Number.isInteger(stock) || stock < 0) {
        return { error: "Ingrese un stock válido (entero, 0 o más).", valido: false };
    }
    return { error: "", valido: true, valor: stock };
}

function validarPrecio(precioTexto) {
    const precio = parseFloat(precioTexto);
    if (isNaN(precio) || precio < 0) {
        return { error: "Ingrese un precio válido mayor o igual a cero.", valido: false };
    }
    return { error: "", valido: true, valor: parseFloat(precio.toFixed(2)) };
}


// ====================================================================
// CRUD & STATS FUNCTIONS
// ====================================================================

function agregarProducto() {
    let esValido = true;

    // 1. Obtener datos (utiliza recuperarTexto de utilitarios.js)
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

    // 3. Mostrar errores (utiliza mostrarTexto de utilitarios.js)
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

        const indiceExistente = productos.findIndex(p => p.nombre === nuevoProducto.nombre);

        if (indiceExistente !== -1) {
            // Actualizar producto
            productos[indiceExistente] = nuevoProducto;
        } else {
            // Agregar nuevo producto
            productos.push(nuevoProducto);
        }

        // 5. Limpiar campos y actualizar vistas 
        limpiarCamposProducto();
        mostrarProductos(); 
        actualizarEstadisticasProductos();
        mostrarTexto("lblErrorNombre"+ alert("Producto agregado/actualizado exitosamente.")); 
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

    // utiliza mostrarTextoHTML de utilitarios.js
    mostrarTextoHTML("tablaProductos", htmlTabla);
    
    
}

function eliminarProducto() {

    const nombreAEliminar = recuperarTexto("txtEliminar");
    mostrarTexto("lblEliminar", ""); 
    
    if (!nombreAEliminar || nombreAEliminar.trim() === "") {
        mostrarTexto("lblEliminar", "El nombre a eliminar no puede estar vacío.");
        return;
    }

    const indice = productos.findIndex(p => p.nombre === nombreAEliminar.trim());

    if (indice !== -1) {
        // Usa la función nativa confirm del navegador
        if (confirm(`¿Está seguro de que desea eliminar el producto "${productos[indice].nombre}"?`)) { 
            productos.splice(indice, 1);
            mostrarTextoEnCaja("txtEliminar", ""); 
            mostrarTexto("lblEliminar", `Producto "${nombreAEliminar.trim()}" eliminado correctamente.`);
            mostrarProductos(); 
            actualizarEstadisticasProductos(); 
        }
    } else {
        mostrarTexto("lblEliminar", "No se encontró producto con ese nombre.");
    }
}

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

function limpiarCamposProducto() {

    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtDescripcion", "");
    mostrarTextoEnCaja("txtCategoria", "");
    mostrarTextoEnCaja("txtPrecio", "");
    mostrarTextoEnCaja("txtStock", "");

    // Limpiar mensajes de error
    mostrarTexto("lblErrorNombre", "");
    mostrarTexto("lblErrorDescripcion", "");
    mostrarTexto("lblErrorCategoria", "");
    mostrarTexto("lblErrorPrecio", "");
    mostrarTexto("lblErrorStock", "");
}

function inicializarVistaProductos() {
    mostrarProductos();
    actualizarEstadisticasProductos();
}

// Inicia la carga de la vista de productos al cargar el script.
document.addEventListener('DOMContentLoaded', inicializarVistaProductos);
















