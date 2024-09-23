function bebidas() {
    let div = document.querySelector('div');
    let carrito = []; // Array para almacenar las bebidas seleccionadas

    let array = [
        { nombre: "COCA COLA", precio: 800 },
        { nombre: "SPRITE", precio: 800 },
        { nombre: "FANTA", precio: 790 },
        { nombre: "AGUA", precio: 500 },
        { nombre: "A. SABORIZADA DE PERA", precio: 800 },
        { nombre: "A. SABORIZADA DE NARANJA", precio: 600 },
        { nombre: "A. SABORIZADA DE POMELO", precio: 600 },
        { nombre: "FERNET", precio: 8000 },
        { nombre: "VINO", precio: 1000 }
    ];

    for (let i = 0; i < array.length; i++) {
        let producto = array[i];

        // Crear un elemento p para mostrar el producto
        let elemento = document.createElement('p');
        elemento.classList.add('elemento')
        elemento.textContent = `${producto.nombre} $${producto.precio}`;
        

        // Crear un botón para agregar al carrito
        let boton = document.createElement('button');
        boton.textContent = 'Agregar al Carrito';
        boton.classList.add('boton-elemento')
        boton.addEventListener('click', () => agregarAlCarrito(producto));

        // Agregar el elemento y el botón al contenedor
        div.appendChild(elemento);
        div.appendChild(boton);
    }

    function agregarAlCarrito(producto) {
        carrito.push(producto);
        actualizarCarrito();
    }

    function actualizarCarrito() {
        // Mostrar el carrito y calcular el total
        let carritoDiv = document.getElementById('carrito');
        carritoDiv.innerHTML = ''; // Limpiar el contenido anterior

        let total = 0;

        for (let i = 0; i < carrito.length; i++) {
            let item = document.createElement('p');
            item.classList.add('elemento')
            item.textContent = `${carrito[i].nombre} $${carrito[i].precio}`;
            carritoDiv.appendChild(item);
            total += carrito[i].precio;
        }

        let totalElemento = document.createElement('p');
        totalElemento.classList.add('elemento')
        totalElemento.textContent = `Total: $${total}`;
        carritoDiv.appendChild(totalElemento);
    }

    function realizarPedido() {
        let mensajes = carrito.map(producto => producto.nombre).join('%0A');
        let total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
        let enlaceWhatsApp = `https://wa.me/543424473172?text=*Hola, quiero pedir:*%0A${mensajes}%0A*Total:* $${total}`;
        window.open(enlaceWhatsApp, '_blank');
    }        

    // Crear un contenedor para el carrito
    let carritoDiv = document.createElement('div');
    carritoDiv.id = 'carrito';
    div.appendChild(carritoDiv);

    // Crear un botón para realizar el pedido
    let botonPedido = document.createElement('button');
    botonPedido.classList.add('boton-elemento')
    botonPedido.classList.add('boton-pedido')
    botonPedido.textContent = 'Realizar Pedido';
    botonPedido.addEventListener('click', realizarPedido);
    div.appendChild(botonPedido);

}

bebidas();