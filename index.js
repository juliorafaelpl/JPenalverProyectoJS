class Producto {
  constructor(id, categoria, cantidad, img, nombre, precio) {
    this.id = id;
    this.categoria = categoria;
    this.cantidad = cantidad;
    this.img = img;
    this.nombre = nombre;
    this.precio = precio;
  }
}
// creamos  productos
const cheeseBurger = new Producto(
  1,
  "hamburguesas",
  1,
  "./img/american-burger.png",
  "American Burger",
  2100
);
const triLayer = new Producto(
  2,
  "hamburguesas",
  1,
  "./img/american-burger.png",
  " 3Carnes Burger",
  2200
);
const jamAndCheese = new Producto(
  3,
  "hamburguesas",
  1,
  "./img/american-burger.png",
  "Napo Burger",
  2250
);
const veggie = new Producto(
  4,
  "hamburguesas",
  1,
  "./img/american-burger.png",
  "Veggie Burger",
  3000
);
const agua = new Producto(
  5,
  "bebidas",
  1,
  "./img/agua-saborizada.png",
  "Agua de Frutos Rojos",
  300
);
const gaseosa = new Producto(
  6,
  "bebidas",
  1,
  "./img/agua-saborizada.png",
  "Gasesosas",
  350
);
const frosties = new Producto(
  7,
  "bebidas",
  1,
  "./img/agua-saborizada.png",
  "Frosties",
  800
);
const paleta = new Producto(
  8,
  "helados",
  1,
  "./img/KitKat.png",
  "Paletas Frutales",
  400
);
const cremoso = new Producto(
  9,
  "helados",
  1,
  "./img/KitKat.png",
  "1/4kg Helado Cremoso",
  900
);
const kitkat = new Producto(
  10,
  "helados",
  1,
  "./img/KitKat.png",
  "Paletas de Helado Kitkat",
  1200
);
  
  // ARRAY  (LISTA DE PRODUCTOS)
  let productos = [
    cheeseBurger,
    triLayer,
    jamAndCheese,
    veggie,
    agua,
    gaseosa,
    frosties,
    paleta,
    cremoso,
    kitkat,
  ];
  console.log(productos);
  


//RENDERIZACIÓN

const tienda = document.getElementById("tienda"); //contenedor-productos
const contenedorCarrito = document.getElementById("carrito-contenedor");

//Captación nodo para Modificación del contador del carrito

const contadorCarrito = document.getElementById("contadorCarrito");

//captación de nodo vaciar carrito
const botonVaciar = document.getElementById("vaciar-carrito");

//captación de nodos para la modificación de la cantidad en el carrito
const cantidad = document.getElementById("cantidad");
const cantidadTotal = document.getElementById("cantidadTotal");

//totalización del carrito

const precioTotal = document.getElementById("precioTotal");

//CREACIÓN CARRITO
let carrito = [];

//LOCAL STORAGE

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carrito")) {
      carrito = JSON.parse(localStorage.getItem("carrito"));
      actualizarCarrito();
    }
  });
  

  //función vaciar carrito
botonVaciar.addEventListener("click", () => {
    carrito.length = 0;
    actualizarCarrito();
  });

//Creación de las Tarjetas de Productos e inyección al HTML desde el JavaScript

productos.forEach((producto) => {
  const productCard = document.createElement("div"); //div
  productCard.classList.add("producto");
  productCard.innerHTML = `
    <img src=${producto.img} class= "producto__img"alt= "${producto.categoria}">
    <h3>${producto.nombre}</h3>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `;

  tienda.appendChild(productCard);

  //se capta botón agregar producto
  const boton = document.getElementById(`agregar${producto.id}`);
  //on click, agrega al carrito
  boton.addEventListener("click", () => {
    //esta funcion ejecuta el agregar el carrito con la id del producto
    agregarAlCarrito(producto.id);
  });
});

//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {
  //verifica si existe el prdocuto y no duplica los items
  const existe = carrito.some((prod) => prod.id === prodId);

  if (existe) {
    const prod = carrito.map(prod => {
      //creamos un nuevo arreglo e iteramos sobre cada curso y cuando
      // map encuentre cual es el q igual al que está agregado, le suma la cantidad
      if (prod.id === prodId) {
        //se actualiza la cantidad
        prod.cantidad++
      }
    })
  } else {
    //EN CASO DE QUE NO ESTÉ, AGREGAMOS EL CURSO AL CARRITO
    const item = productos.find((prod) => prod.id === prodId); //Trabajamos con las ID
    //Una vez obtenida la ID, lo que haremos es hacerle un push para agregarlo al carrito
    carrito.push(item);
  }
  //Va a buscar el item, agregarlo al carrito y llama a la funcion actualizarCarrito, que recorre
  //el carrito y se ve.
  actualizarCarrito(); //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE
  //MODIFICA EL CARRITO
};

//MODIFICACIÓN DEL MODAL CARRITO

//eliminar del carrito
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
    console.log(carrito);
  };

const actualizarCarrito = () => {
  //borrar el nodo
  contenedorCarrito.innerHTML = "";
  //recorre el array y lo rellena con la info seleccionada
  carrito.forEach((prod) => {
    const divModal = document.createElement("div");
    divModal.className = "productoEnCarrito";
    divModal.innerHTML = `
            <p>${prod.nombre}</p>
            <p>Precio$${prod.precio}</p>
            <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
            <button onclick= "eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
            `;
    contenedorCarrito.appendChild(divModal);
    //seteo item del local storage en el carrito
    localStorage.setItem('carrito', JSON.stringify(carrito));
  });

  contadorCarrito.innerText = carrito.length;
  console.log(carrito);
  precioTotal.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
};






