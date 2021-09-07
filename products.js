const storage = window.localStorage

// all products page

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
        ).innerHTML += `<div category=${product[6]} id="item-${product[0]}" class="all"><br><span class="products-span"><img src='${product[5]}' alt='product'></img><br><div class="bottom"><br>ID: ${product[0]}<br>Sold by: ${product[1]}<br>Name: ${product[2]}<br>Price: ${product[4]}<br>Description: ${product[3]}<br>Type: ${product[6]}</span><br><button class="add-to-cart" id=${product[0]}>Add to cart</button></div></div>`;
        
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
  //  console.log(prody);
   fetch(`https://backendfs.herokuapp.com/view-product/${prody}`, {
        method: 'GET',
        headers: {
        "Content-Type": "application/json",
      }}) 
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        product.name = data["data"][0][2]
        product.price = data["data"][0][4]
        product.image = data["data"][0][5]
        product.id = data["data"][0][0]
        // console.log(product.name)
        // console.log(product.price)
        // console.log(product.image)

        for (let item in cart){
          // console.log(item)
          if (product.id == cart[item].id){

              alert('item already in cart')
              return
          };
        }
        cart = cart.concat(product)
        storage.setItem("cart", JSON.stringify(cart))
        let totalPrice = cart.reduce((total, c) => total + parseInt(c.price), 0)
        console.log(totalPrice);
        
        localStorage.setItem('price', JSON.stringify(totalPrice))
        
        console.log(cart)
        alert("item added succesfully")
        
      });
  }

  // function to filter products
function filter(category){
let productCard = document.querySelectorAll(".all");
for( let i = 0; i < productCard.length; i++){
  productCard[i].style.display = "none"
}

let selectedProduct = document.querySelectorAll(`[category=${category}]`)
for(let i = 0; i < selectedProduct.length; i++){
  selectedProduct[i].style.display = "block"
}
}

// function allProducts(){
//   let productCard = document.querySelectorAll(".all");
//   productCard[i].style.display = "block"
// }

// Search function
let searchProducts = []
fetch('https://backendfs.herokuapp.com/product-table/')
.then((res) => res.json())
.then(data => {
    let products = data.data
    let searchBar = document.getElementById("search")
    searchBar.addEventListener("keyup", (s) => {
        const searchText = s.target.value.toLowerCase()
        searchProducts = products.filter((product) => {
            return (
                product[2].toLowerCase().includes(searchText) || product[6].toLowerCase().includes(searchText)
             )
        })
        let container = document.querySelector('.products')
        container.innerHTML = ''
        searchProducts.forEach((product) => {
          container.innerHTML += `<div category=${product[6]} id="item-${product[0]}" class="all"><br><span class="products-span"><img src='${product[5]}' alt='product'></img><br><div class="bottom"><br>ID: ${product[0]}<br>Sold by: ${product[1]}<br>Name: ${product[2]}<br>Price: ${product[4]}<br>Description: ${product[3]}<br>Type: ${product[6]}</span><br><button class="add-to-cart" id=${product[0]}>Add to cart</button></div></div>`;
          
        })       
    })
})