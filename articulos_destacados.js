/*----------------------------------------*/
/*--|funcionalidad_articulos_destacados|--*/
/*----------------------------------------*/
const articulos = document.querySelectorAll(".articulo");
const botonReset = document.getElementById("restablecerTodo");
const mensajeGeneral = document.getElementById("mensajeGeneral");
/*-------------------------------*/
/*--|datos_guardados_iniciales|--*/
/*-------------------------------*/
const datosIniciales = {
    1: {
        imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        nombre: "Zapatillas deportivas",
        precio: 180000
    },
    2: {
        imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        nombre: "Reloj de pulsera",
        precio: 250000
    },
    3: {
        imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        nombre: "Audífonos inalámbricos",
        precio: 320000
    }
};
/*--------------------------------------*/
/*--|obtener_datos_desde_localstorage|--*/
/*--------------------------------------*/
function obtenerDatos(id) {
    const datos = localStorage.getItem(`articulo_${id}`);
    if (datos) {
        return JSON.parse(datos);
    }
    return datosIniciales[id];
}
/*-----------------------*/
/*--|mostrar_los_datos|--*/
/*-----------------------*/
function mostrarDatos(articulo) {
    const id = articulo.dataset.id;
    const datos = obtenerDatos(id);
    const imagen = articulo.querySelector(".imagen_producto");
    const campoImagen = articulo.querySelector(".campo_imagen");
    const campoNombre = articulo.querySelector(".campo_nombre");
    const campoPrecio = articulo.querySelector(".campo_valor");
    imagen.src = datos.imagen;
    campoImagen.value = datos.imagen;
    campoNombre.value = datos.nombre;
    campoPrecio.value = datos.precio;
}
/*---------------------------------------*/
/*--|guardar_los_datos_en_localstorage|--*/
/*---------------------------------------*/
function guardarDatos(articulo) {
    const id = articulo.dataset.id;
    const imagen = articulo.querySelector(".campo_imagen").value.trim();
    const nombre = articulo.querySelector(".campo_nombre").value.trim();
    const precio = articulo.querySelector(".campo_valor").value;
    const elementoImagen = articulo.querySelector(".imagen_producto");
    const mensaje = articulo.querySelector(".mensaje");
    if (imagen === "" || nombre === "" || precio === "") {
        mensaje.textContent = "Completa todos los campos.";
        mensaje.style.color = "#c0392b";
        return;
    }
    if (Number(precio) < 0) {
        mensaje.textContent = "El precio no puede ser negativo.";
        mensaje.style.color = "#c0392b";
        return;
    }
    const datos = {
        imagen: imagen, nombre: nombre, precio: Number(precio)
    };
    localStorage.setItem(`articulo_${id}`, JSON.stringify(datos));
    elementoImagen.src = imagen;
    mensaje.textContent = "Artículo guardado correctamente.";
    mensaje.style.color = "#388e3c";
    setTimeout(function() {
        mensaje.textContent = "";
    }, 2500);
}
/*-----------------------------------------------------------------*/
/*--|restaurar_y_restablecer_todos_los_datos_usando_localstorage|--*/
/*-----------------------------------------------------------------*/
function restaurarDatos(articulo) {
    const id = articulo.dataset.id;
    localStorage.setItem(`articulo_${id}`, JSON.stringify(datosIniciales[id]));
    mostrarDatos(articulo);
    const mensaje = articulo.querySelector(".mensaje");
    mensaje.textContent = "Artículo restaurado.";
    mensaje.style.color = "#697580";
    setTimeout(function() {
        mensaje.textContent = "";
    }, 2500);
}
function restablecerTodos() {
    const confirmacion = confirm("¿Deseas restablecer todos los artículos?");
    if (!confirmacion) {
        return;
    }
    articulos.forEach(function(articulo) {
        const id = articulo.dataset.id;
        localStorage.setItem(`articulo_${id}`, JSON.stringify(datosIniciales[id]));
        mostrarDatos(articulo);
    });
    mensajeGeneral.textContent = "Todos los artículos fueron restaurados.";
    mensajeGeneral.style.color = "#388e3c";
    setTimeout(function() {
        mensajeGeneral.textContent = "";
    }, 2500);
}
/*------------------------------*/
/*--|eventos_de_los_articulos|--*/
/*------------------------------*/
articulos.forEach(function(articulo) {
    const botonGuardar = articulo.querySelector(".guardar");
    const botonRestaurar = articulo.querySelector(".restaurar");
    botonGuardar.addEventListener("click", function() {
        guardarDatos(articulo);
    });
    botonRestaurar.addEventListener("click", function() {
        restaurarDatos(articulo);
    });
});
/*--------------------*/
/*--|evento_general|--*/
/*--------------------*/
botonReset.addEventListener("click", function() {
    restablecerTodos();
});
/*-----------------------------*/
/*--|actualizar_las_imagenes|--*/
/*-----------------------------*/
articulos.forEach(function(articulo) {
    const campoImagen = articulo.querySelector(".campo_imagen");
    const imagen = articulo.querySelector(".imagen_producto");
    campoImagen.addEventListener("change", function() {
        if (campoImagen.value.trim() !== "") {
            imagen.src = campoImagen.value.trim();
        }
    });
});
/*----------------------*/
/*--|cargar_los_datos|--*/
/*----------------------*/
articulos.forEach(function(articulo) {
    mostrarDatos(articulo);
});