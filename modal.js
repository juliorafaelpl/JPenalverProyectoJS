
const modalContent = document.getElementsByClassName('modal-contenedor')[0]
const openBtn = document.getElementById('boton-carrito')
const closeBtn = document.getElementById('carritoCerrar')
const cartModal = document.getElementsByClassName('modal-carrito')[0]


openBtn.addEventListener('click', ()=>{
    modalContent.classList.toggle('modal-active')
})
closeBtn.addEventListener('click', ()=>{
    modalContent.classList.toggle('modal-active')
})

modalContent.addEventListener('click', (event) =>{
    modalContent.classList.toggle('modal-active')

})
cartModal.addEventListener('click', (event) => {
    event.stopPropagation() //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //padre
})