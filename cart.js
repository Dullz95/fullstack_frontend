function totals(){
    if(!window.localStorage.getItem('price')){
        document.querySelector(
          ".cart-total"
        ).innerHTML = `R0`; 
    }else{
        let total = window.localStorage.getItem('price')
        document.querySelector(
          ".cart-total"
        ).innerHTML += `R${total}`;
    }
    
  }

if (window.localStorage.getItem("cart")){let cart = JSON.parse(window.localStorage.getItem("cart"))
console.log(cart)
cart.forEach(cartItem => document.querySelector(".cart-items").innerHTML += `<div class="all"><br><span class="products-span"><img src='${cartItem.image}' alt='product' class="cartImg"></img><br>Name: ${cartItem.name}<br>Price: ${cartItem.price}<br><button id="${cartItem.id}" class="deleteItem">delete item</button></div>`);
totals( )}

function clearCart(){
    cart = []
    
    window.localStorage.setItem("cart", JSON.stringify(cart))
    window.localStorage.removeItem("price")
    totals()

    window.location.reload()
}
if(document.querySelectorAll(".deleteItem")){

    document.querySelectorAll(".deleteItem").forEach(button => button.addEventListener("click", deleteFromCart))
}

function deleteFromCart(e){
let id = e.target.id
for(let item in cart){
    if (id==cart[item].id){
        cart.splice(item, 1)
        window.localStorage.setItem("cart", JSON.stringify(cart))
        window.location.reload()
    }
};
}