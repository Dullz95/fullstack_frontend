// all products page
const storage = window.localStorage

let base_URL = "https://backendfs.herokuapp.com/product-table/";

function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let products = data;
      document.querySelector(".products").innerHTML = ``;
      products["data"].forEach((product) => {
        document.querySelector(
          ".products"
        ).innerHTML += `<div  id="item-${product[0]}" class="all"><br><span class="products-span"><img src='${product[5]}' alt='product'></img><br><div class="bottom"><br>ID: ${product[0]}<br>Sold by: ${product[1]}<br>Name: ${product[2]}<br>Price: ${product[4]}<br>Description: ${product[3]}'</span><br><button class="add-to-cart" id=${product[0]}>Add to cart</button></div></div>`;
        
      });
      document.querySelectorAll(".add-to-cart").forEach(button => button.addEventListener("click", addToCart))
    });
}

getData(base_URL);



// create cart

let cart = [];
if (storage["cart"]){
  cart = JSON.parse(storage.getItem("cart"))
} 
  function addToCart(e){
   let product = {};
   let prody = e.target.id;
   console.log(prody);
   fetch(`https://backendfs.herokuapp.com/view-product/${prody}`, {
        method: 'GET',
        headers: {
        "Content-Type": "application/json",
      }}) 
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        product.name = data["data"][0][1]
        product.price = data["data"][0][3]
        product.image = data["data"][0][5]
        console.log(product.name)
        console.log(product.price)
        console.log(product.image)

        for (let item in cart){
          console.log(item)
          if (product.name == cart[item].name){

              alert('item already in cart')
              return
          };
        }
        cart = cart.concat(product)
        storage.setItem("cart", JSON.stringify(cart))
        console.log(cart)
        alert("item added succesfully")
        
      });
  }