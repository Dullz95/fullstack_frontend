
if (window.localStorage.getItem("cart")){let cart = JSON.parse(window.localStorage.getItem("cart"))
console.log(cart)
cart.forEach(cartItem => document.querySelector(".cart-items").innerHTML += `<div class="all"><br><span class="products-span"><img src='${cartItem.image}' alt='product' class="cartImg"></img><br>Name: ${cartItem.name}<br>Price: ${cartItem.price}<br><button id="${cartItem.name}" class="deleteItem">delete item</button></div>`);}

function clearCart(){
    cart = []
    window.localStorage.setItem("cart", JSON.stringify(cart))
    window.location.reload()
}
if(document.querySelectorAll(".deleteItem")){

    document.querySelectorAll(".deleteItem").forEach(button => button.addEventListener("click", deleteFromCart))
}

function deleteFromCart(e){
let name = e.target.id
for(let item in cart){
    if (name==cart[item].name){
        cart.splice(item, 1)
        window.localStorage.setItem("cart", JSON.stringify(cart))
        window.location.reload()
    }
};
}