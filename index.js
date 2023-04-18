/* recuperar elementos del dom */
const storeDiv = document.getElementById("tienda");
const finishButton = document.getElementById("finalizar");
let counterCart = document.getElementById('contadorCarrito')
const contentCart = document.getElementById('contenedorCarrito') 


//captación de nodos para la modificación de la cantidad en el carrito
const quantityCart = document.getElementById("cantidad");
const totalQuantity = document.getElementById("cantidadTotal");

//totalización del carrito

const totalPrice = document.getElementById("precioTotal");

//Evento vaciar carrito en Modal
const emptyBtn = document.getElementById("vaciarCarrito");
emptyBtn.addEventListener("click", ()=>{
   cart.length=0;
   updateCart();
})


/* función que ejecute el Fetch de todos los productos y consumo de API fakestore*/

const fetchProducts = async () => {
  const productsAPI = await fetch("https://fakestoreapi.com/products");
  const productsJson = await productsAPI.json();
  //console.log(productsJson);
  return productsJson;
};


//función que ejecute el fetch de un solo producto

const fetchOneproduct = async (id) => {
    const productAPI = await fetch(`https://fakestoreapi.com/products/${id}`)
    const productJson = await productAPI.json()
    //console.log(productJson)
    return productJson
  };


/* función para renderizar productos */

const renderProducts = async () => {
  const products = await fetchProducts();
  products.forEach((prod) => {
    const {id, title, price, category, image } = prod; //destructuración de array
    storeDiv.innerHTML += `
        <div class="card"">
        <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h4 class="card-title class="${category}">${title}</h4>
    <p class="card-text">$ ${price}</p>
    <div class="card-buttons">
    <button id="${id}" onclick="addProduct(${id})">AGREGAR</button>
    <button id="${id}" onclick="removeProduct(${id})">REMOVER</button>
    </div>
  </div>
</div>
`;
  });
};

renderProducts();

//creación de carrito
let cart=[]

//función agregar al carrito

const addProduct= async(id)=>{
    const product= await fetchOneproduct(id)
    const searchProductCart= cart.find(prod=>prod.id === product.id)
    if (!searchProductCart){
        cart.push({
                id:product.id,
                name:product.title,
                quantity:1,
                price:product.price
            })
    } else {
        searchProductCart.quantity++
    }
    messageAddProduct()
    updateCart()
    console.log(cart)
}

//función quitar cantidades de un producto del carrito

const removeProduct= async (id)=>{
    const searchProductCart= cart.find((prod)=> prod.id === id)
    if (!searchProductCart){
      messageNoProduct()
    } else {
        if (searchProductCart.quantity === 1){
            cart = cart.filter((prod)=> prod.id !== id)
        }else{
            searchProductCart.quantity--
        }
        messageRemoveProduct()
    }
    updateCart()
    console.log(cart)
}



//Mensaje Producto Agregado

const messageAddProduct= ()=>{
    Swal.fire({
        text: 'Product Added',
        timer: 1000
      })
}

//Mensaje Producto Removido del Carrito

const messageRemoveProduct= ()=>{
    Swal.fire({
        text: 'Product Removed',
        timer: 1000
      })
}

// Mensaje Error

const messageNoProduct= ()=>{
    Swal.fire({
        text: 'You dont have this product in the cart',
        timer: 1000
      })
}



//función actualizar carrito

const updateCart= async (id)=>{
  contentCart.innerHTML = "";
  //recorre el array y lo rellena con la info seleccionada
  cart.forEach((prod) => {
    const divModal = document.createElement("div");
    divModal.className = "productoEnCarrito";
    divModal.innerHTML = `
            <p class="nombreProdModal">${prod.name}</p>
            <p>P.VTA $ ${prod.price}</p>
            <p>Cantidad: <span id="cantidad">${prod.quantity}</span></p>
            <button onclick= "removeFromModalCart(${prod.id})" class="removeModalBtn"><i class="fas fa-trash-alt"></i></button>
            `;
    contentCart.appendChild(divModal);
    //seteo item del local storage en el carrito
    localStorage.setItem('cart', JSON.stringify(cart));
  });


  counterCart.innerText = cart.length;
  console.log(cart);
  totalPrice.innerText = cart.reduce(
    (acc, prod) => acc + prod.quantity * prod.price,
    0
  ).toFixed(2);
}

//eliminar del carrito
const removeFromModalCart = (prodId) => {
  const item = cart.find((prod) => prod.id === prodId);
  const index = cart.indexOf(item);
  cart.splice(index, 1);
  updateCart();
  console.log(cart);
};